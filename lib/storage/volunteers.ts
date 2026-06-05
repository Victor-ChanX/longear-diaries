import { randomUUID } from "node:crypto";

import { prisma } from "@/lib/db/prisma";

import { deleteObject, getPublicUrl, putObject } from "./r2";

export type VolunteerRecord = {
  avatarKey: string;
  bio: string;
  createdAt: string;
  id: string;
  name: string;
};

const isMissingTable = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) return false;
  const code = (error as { code?: string }).code;

  return code === "P2021" || code === "P2022";
};

export async function listVolunteers(): Promise<VolunteerRecord[]> {
  try {
    const rows = await prisma.volunteer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return rows.map((row) => ({
      avatarKey: row.avatarKey,
      bio: row.bio,
      createdAt: row.createdAt.toISOString(),
      id: row.id,
      name: row.name,
    }));
  } catch (error) {
    if (isMissingTable(error)) return [];
    throw error;
  }
}

const EXT_BY_MIME: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type NewVolunteerInput = {
  avatar: { bytes: Buffer; mimeType: string };
  bio: string;
  name: string;
};

export async function addVolunteer(
  input: NewVolunteerInput,
): Promise<VolunteerRecord> {
  const id = randomUUID();
  const ext = EXT_BY_MIME[input.avatar.mimeType] ?? "jpg";
  const avatarKey = `volunteers/${id}.${ext}`;

  await putObject(avatarKey, input.avatar.bytes, input.avatar.mimeType);

  const row = await prisma.volunteer.create({
    data: {
      avatarKey,
      bio: input.bio,
      id,
      name: input.name,
    },
  });

  return {
    avatarKey: row.avatarKey,
    bio: row.bio,
    createdAt: row.createdAt.toISOString(),
    id: row.id,
    name: row.name,
  };
}

export async function removeVolunteer(id: string): Promise<boolean> {
  const target = await prisma.volunteer.findUnique({ where: { id } });

  if (!target) return false;

  await prisma.volunteer.delete({ where: { id } });

  try {
    await deleteObject(target.avatarKey);
  } catch {
    // R2 delete failure shouldn't block DB removal.
  }

  return true;
}

export function getAvatarUrl(key: string): string {
  return getPublicUrl(key);
}
