"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/session";
import { addVolunteer, removeVolunteer } from "@/lib/storage/volunteers";

const MAX_AVATAR_BYTES = 4 * 1024 * 1024; // 4 MB
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

export type AddVolunteerState = {
  error?: string;
  ok?: boolean;
};

export async function addVolunteerAction(
  _prev: AddVolunteerState,
  formData: FormData,
): Promise<AddVolunteerState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const avatar = formData.get("avatar");

  if (!name) return { error: "Name is required." };
  if (!bio) return { error: "Bio is required." };
  if (!(avatar instanceof File) || avatar.size === 0) {
    return { error: "Please upload an avatar image." };
  }

  if (avatar.size > MAX_AVATAR_BYTES) {
    return { error: "Avatar must be 4 MB or smaller." };
  }

  if (!ALLOWED_MIME.has(avatar.type)) {
    return { error: "Avatar must be a JPG, PNG, WebP, or GIF image." };
  }

  const arrayBuffer = await avatar.arrayBuffer();

  try {
    await addVolunteer({
      avatar: { bytes: Buffer.from(arrayBuffer), mimeType: avatar.type },
      bio,
      name,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload avatar.";

    return { error: message };
  }

  revalidatePath("/admin/volunteers");
  revalidatePath("/admin");
  revalidatePath("/leadership");

  redirect("/admin/volunteers");
}

export async function removeVolunteerAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await removeVolunteer(id);
    revalidatePath("/admin/volunteers");
    revalidatePath("/admin");
    revalidatePath("/leadership");
  }
}
