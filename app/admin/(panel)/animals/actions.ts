"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/session";
import {
  createAnimal,
  deleteAnimal,
  getAnimalRaw,
  updateAnimal,
  type AnimalInput,
} from "@/lib/storage/animals";

const MAX_IMAGE_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED_MIME = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const requireAdmin = async () => {
  const session = await getCurrentSession();

  if (!session) {
    throw new Error("Not authenticated.");
  }
};

export type AnimalFormState = {
  error?: string;
  ok?: boolean;
};

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const parseImage = (
  formData: FormData,
): { error?: string; image?: { bytes: Buffer; mimeType: string } | null } => {
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return { image: null };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Image must be 6 MB or smaller." };
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return { error: "Image must be JPG, PNG, WebP, or GIF." };
  }

  return { image: { bytes: Buffer.alloc(0), mimeType: file.type } };
};

type PartialPayload = Omit<AnimalInput, "id" | "rotate" | "sortOrder"> & {
  rotate: number | null;
  sortOrder: number | null;
};

const buildPayload = async (
  formData: FormData,
): Promise<
  | { error: string }
  | {
      data: PartialPayload;
      image: { bytes: Buffer; mimeType: string } | null;
      providedId?: string;
    }
> => {
  const caption = String(formData.get("caption") ?? "").trim();
  const scientificName = String(formData.get("scientificName") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const habitat = String(formData.get("habitat") ?? "").trim();
  const conservationStatus = String(
    formData.get("conservationStatus") ?? "",
  ).trim();
  const origin = String(formData.get("origin") ?? "").trim();
  const populationNote = String(formData.get("populationNote") ?? "").trim();
  const objectPositionRaw = String(formData.get("objectPosition") ?? "").trim();
  const objectPosition = objectPositionRaw || "50% 50%";

  const providedId = String(formData.get("id") ?? "").trim();
  const lat = Number.parseFloat(String(formData.get("lat") ?? ""));
  const lng = Number.parseFloat(String(formData.get("lng") ?? ""));

  const rotateRaw = String(formData.get("rotate") ?? "").trim();
  const rotate: number | null =
    rotateRaw === "" ? null : Number.parseInt(rotateRaw, 10);

  const sortOrderRaw = String(formData.get("sortOrder") ?? "").trim();
  const sortOrder: number | null =
    sortOrderRaw === "" ? null : Number.parseInt(sortOrderRaw, 10);

  if (!caption) return { error: "Name (caption) is required." };
  if (!scientificName) return { error: "Scientific name is required." };
  if (!description) return { error: "Description is required." };
  if (!habitat) return { error: "Habitat is required." };
  if (!conservationStatus) {
    return { error: "Conservation status is required." };
  }

  if (!origin) return { error: "Origin is required." };
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
    return { error: "Latitude must be a number between -90 and 90." };
  }

  if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
    return { error: "Longitude must be a number between -180 and 180." };
  }

  if (
    rotate !== null &&
    (!Number.isInteger(rotate) || rotate < -45 || rotate > 45)
  ) {
    return { error: "Rotate must be an integer between -45 and 45." };
  }

  const imageCheck = parseImage(formData);

  if (imageCheck.error) return { error: imageCheck.error };

  // Read the file fully now that the size/type are validated.
  const fileField = formData.get("image");
  let image: { bytes: Buffer; mimeType: string } | null = null;

  if (fileField instanceof File && fileField.size > 0) {
    const ab = await fileField.arrayBuffer();

    image = { bytes: Buffer.from(ab), mimeType: fileField.type };
  }

  return {
    data: {
      caption,
      conservationStatus,
      description,
      habitat,
      lat,
      lng,
      objectPosition,
      origin,
      populationNote,
      // null = derive a default later (random tilt / next sortOrder)
      rotate: rotate ?? null,
      scientificName,
      sortOrder:
        sortOrder !== null && Number.isFinite(sortOrder) ? sortOrder : null,
    },
    image,
    providedId: providedId || undefined,
  };
};

// Deterministic pseudo-random tilt derived from the animal id, so each animal
// always gets the same casual angle but the field doesn't have to be filled in.
const deriveTilt = (id: string): number => {
  let hash = 5381;

  for (let i = 0; i < id.length; i += 1) {
    hash = ((hash << 5) + hash + id.charCodeAt(i)) | 0;
  }

  // Magnitude 3..8 (never near zero so the tilt is always visible).
  const magnitude = (Math.abs(hash) % 6) + 3;

  return hash % 2 === 0 ? magnitude : -magnitude;
};

const nextSortOrder = async (): Promise<number> => {
  const { prisma } = await import("@/lib/db/prisma");
  const agg = await prisma.animal.aggregate({ _max: { sortOrder: true } });

  return (agg._max.sortOrder ?? 0) + 10;
};

export async function createAnimalAction(
  _prev: AnimalFormState,
  formData: FormData,
): Promise<AnimalFormState> {
  await requireAdmin();

  const parsed = await buildPayload(formData);

  if ("error" in parsed) return { error: parsed.error };

  const id = parsed.providedId ?? `animal-${slugify(parsed.data.caption)}`;

  if (!id || id === "animal-") {
    return {
      error: "Could not derive an ID from the caption. Set one manually.",
    };
  }

  const existing = await getAnimalRaw(id);

  if (existing) {
    return { error: `An animal with id "${id}" already exists.` };
  }

  const rotate = parsed.data.rotate ?? deriveTilt(id);
  const sortOrder = parsed.data.sortOrder ?? (await nextSortOrder());

  try {
    await createAnimal({
      ...parsed.data,
      id,
      image: parsed.image,
      rotate,
      sortOrder,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save animal.";

    return { error: message };
  }

  revalidatePath("/admin/animals");
  revalidatePath("/");
  revalidatePath("/content");
  revalidatePath(`/content/${id}`);

  redirect("/admin/animals");
}

export async function updateAnimalAction(
  id: string,
  _prev: AnimalFormState,
  formData: FormData,
): Promise<AnimalFormState> {
  await requireAdmin();

  const parsed = await buildPayload(formData);

  if ("error" in parsed) return { error: parsed.error };

  const rotate = parsed.data.rotate ?? deriveTilt(id);
  const sortOrder = parsed.data.sortOrder ?? (await nextSortOrder());

  try {
    await updateAnimal(id, {
      ...parsed.data,
      image: parsed.image,
      rotate,
      sortOrder,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update animal.";

    return { error: message };
  }

  revalidatePath("/admin/animals");
  revalidatePath("/");
  revalidatePath("/content");
  revalidatePath(`/content/${id}`);

  return { ok: true };
}

export async function deleteAnimalAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await deleteAnimal(id);
    revalidatePath("/admin/animals");
    revalidatePath("/");
    revalidatePath("/content");
  }
}
