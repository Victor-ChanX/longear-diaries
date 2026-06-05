import type { Animal } from "@prisma/client";

import type { AnimalMarker } from "@/lib/data/animals";
import { prisma } from "@/lib/db/prisma";

import { deleteObject, getPublicUrl, putObject } from "./r2";

// Prisma error code for "table does not exist" — happens before migrations
// are applied. Treat read calls as empty so the public site stays up.
const isMissingTable = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) return false;
  const code = (error as { code?: string }).code;

  return code === "P2021" || code === "P2022";
};

const toMarker = (row: Animal): AnimalMarker => ({
  caption: row.caption,
  conservationStatus: row.conservationStatus,
  description: row.description,
  habitat: row.habitat,
  id: row.id,
  image: row.imageKey ? getPublicUrl(row.imageKey) : null,
  location: [row.lat, row.lng],
  objectPosition: row.objectPosition,
  origin: row.origin,
  populationNote: row.populationNote,
  rotate: row.rotate,
  scientificName: row.scientificName,
});

export async function listAnimals(): Promise<AnimalMarker[]> {
  try {
    const rows = await prisma.animal.findMany({
      orderBy: [{ sortOrder: "asc" }, { caption: "asc" }],
    });

    return rows.map(toMarker);
  } catch (error) {
    if (isMissingTable(error)) return [];
    throw error;
  }
}

export async function getAnimalById(id: string): Promise<AnimalMarker | null> {
  try {
    const row = await prisma.animal.findUnique({ where: { id } });

    return row ? toMarker(row) : null;
  } catch (error) {
    if (isMissingTable(error)) return null;
    throw error;
  }
}

export async function listAnimalsRaw(): Promise<Animal[]> {
  try {
    return await prisma.animal.findMany({
      orderBy: [{ sortOrder: "asc" }, { caption: "asc" }],
    });
  } catch (error) {
    if (isMissingTable(error)) return [];
    throw error;
  }
}

export async function getAnimalRaw(id: string): Promise<Animal | null> {
  try {
    return await prisma.animal.findUnique({ where: { id } });
  } catch (error) {
    if (isMissingTable(error)) return null;
    throw error;
  }
}

const EXT_BY_MIME: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type AnimalInput = {
  caption: string;
  conservationStatus: string;
  description: string;
  habitat: string;
  id: string;
  image?: { bytes: Buffer; mimeType: string } | null;
  lat: number;
  lng: number;
  objectPosition: string;
  origin: string;
  populationNote: string;
  rotate: number;
  scientificName: string;
  sortOrder?: number;
};

const uploadImage = async (
  id: string,
  image: { bytes: Buffer; mimeType: string },
): Promise<string> => {
  const ext = EXT_BY_MIME[image.mimeType] ?? "jpg";
  const key = `animals/${id}.${ext}`;

  await putObject(key, image.bytes, image.mimeType);

  return key;
};

export async function createAnimal(input: AnimalInput): Promise<Animal> {
  const imageKey = input.image
    ? await uploadImage(input.id, input.image)
    : null;

  return prisma.animal.create({
    data: {
      caption: input.caption,
      conservationStatus: input.conservationStatus,
      description: input.description,
      habitat: input.habitat,
      id: input.id,
      imageKey,
      lat: input.lat,
      lng: input.lng,
      objectPosition: input.objectPosition,
      origin: input.origin,
      populationNote: input.populationNote,
      rotate: input.rotate,
      scientificName: input.scientificName,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}

export async function updateAnimal(
  id: string,
  input: Omit<AnimalInput, "id"> & { id?: string },
): Promise<Animal> {
  const existing = await prisma.animal.findUnique({ where: { id } });

  if (!existing) throw new Error(`Animal not found: ${id}`);

  let imageKey: string | null = existing.imageKey;

  if (input.image) {
    // Replace image: delete the old object first (best-effort).
    if (existing.imageKey) {
      try {
        await deleteObject(existing.imageKey);
      } catch {
        // ignore
      }
    }

    imageKey = await uploadImage(id, input.image);
  }

  return prisma.animal.update({
    data: {
      caption: input.caption,
      conservationStatus: input.conservationStatus,
      description: input.description,
      habitat: input.habitat,
      imageKey,
      lat: input.lat,
      lng: input.lng,
      objectPosition: input.objectPosition,
      origin: input.origin,
      populationNote: input.populationNote,
      rotate: input.rotate,
      scientificName: input.scientificName,
      sortOrder: input.sortOrder ?? existing.sortOrder,
    },
    where: { id },
  });
}

export async function deleteAnimal(id: string): Promise<boolean> {
  const existing = await prisma.animal.findUnique({ where: { id } });

  if (!existing) return false;

  await prisma.animal.delete({ where: { id } });

  if (existing.imageKey) {
    try {
      await deleteObject(existing.imageKey);
    } catch {
      // ignore
    }
  }

  return true;
}
