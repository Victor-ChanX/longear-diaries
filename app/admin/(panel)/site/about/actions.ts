"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import type { AboutContent } from "@/lib/data/site-defaults";
import { setSection } from "@/lib/storage/site-content";

export type SectionState = {
  error?: string;
  ok?: boolean;
};

const getStr = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function saveAboutAction(
  _prev: SectionState,
  fd: FormData,
): Promise<SectionState> {
  const session = await getCurrentSession();

  if (!session) return { error: "Not authenticated." };

  const data: AboutContent = {
    hero: {
      eyebrow: getStr(fd, "hero.eyebrow"),
      subtitle: getStr(fd, "hero.subtitle"),
      title: getStr(fd, "hero.title"),
    },
    sections: [0, 1, 2, 3].map((i) => ({
      body: getStr(fd, `sections.${i}.body`),
      title: getStr(fd, `sections.${i}.title`),
    })),
  };

  await setSection("about", data);
  revalidatePath("/about");
  revalidatePath("/admin/site/about");

  return { ok: true };
}
