"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import type { ContactContent } from "@/lib/data/site-defaults";
import { setSection } from "@/lib/storage/site-content";

export type SectionState = {
  error?: string;
  ok?: boolean;
};

const getStr = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function saveContactAction(
  _prev: SectionState,
  fd: FormData,
): Promise<SectionState> {
  const session = await getCurrentSession();

  if (!session) return { error: "Not authenticated." };

  const data: ContactContent = {
    channels: [0, 1, 2].map((i) => ({
      description: getStr(fd, `channels.${i}.description`),
      handle: getStr(fd, `channels.${i}.handle`),
      href: getStr(fd, `channels.${i}.href`),
      label: getStr(fd, `channels.${i}.label`),
    })),
    hero: {
      eyebrow: getStr(fd, "hero.eyebrow"),
      subtitle: getStr(fd, "hero.subtitle"),
      title: getStr(fd, "hero.title"),
    },
  };

  await setSection("contact", data);
  revalidatePath("/contact");
  revalidatePath("/admin/site/contact");

  return { ok: true };
}
