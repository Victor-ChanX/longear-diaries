"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import type { HomeContent } from "@/lib/data/site-defaults";
import { setSection } from "@/lib/storage/site-content";

export type SectionState = {
  error?: string;
  ok?: boolean;
};

const getStr = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function saveHomeAction(
  _prev: SectionState,
  fd: FormData,
): Promise<SectionState> {
  const session = await getCurrentSession();

  if (!session) return { error: "Not authenticated." };

  const data: HomeContent = {
    cta: {
      body: getStr(fd, "cta.body"),
      eyebrow: getStr(fd, "cta.eyebrow"),
      primaryLabel: getStr(fd, "cta.primaryLabel"),
      secondaryLabel: getStr(fd, "cta.secondaryLabel"),
      title: getStr(fd, "cta.title"),
    },
    hero: {
      body: getStr(fd, "hero.body"),
      ctaPrimary: getStr(fd, "hero.ctaPrimary"),
      ctaSecondary: getStr(fd, "hero.ctaSecondary"),
      eyebrow: getStr(fd, "hero.eyebrow"),
      titleEmphasis: getStr(fd, "hero.titleEmphasis"),
      titlePost: getStr(fd, "hero.titlePost"),
      titlePre: getStr(fd, "hero.titlePre"),
    },
    manifesto: {
      attribution: getStr(fd, "manifesto.attribution"),
      eyebrow: getStr(fd, "manifesto.eyebrow"),
      quote: getStr(fd, "manifesto.quote"),
    },
    stats: {
      item1Label: getStr(fd, "stats.item1Label"),
      item2Label: getStr(fd, "stats.item2Label"),
      item2Number: getStr(fd, "stats.item2Number"),
      item2Suffix: getStr(fd, "stats.item2Suffix"),
      item3Label: getStr(fd, "stats.item3Label"),
      item3Number: getStr(fd, "stats.item3Number"),
      item4Label: getStr(fd, "stats.item4Label"),
      item4Number: getStr(fd, "stats.item4Number"),
      item4Suffix: getStr(fd, "stats.item4Suffix"),
    },
    values: {
      eyebrow: getStr(fd, "values.eyebrow"),
      items: [0, 1, 2].map((i) => ({
        body: getStr(fd, `values.items.${i}.body`),
        kicker: getStr(fd, `values.items.${i}.kicker`),
        title: getStr(fd, `values.items.${i}.title`),
      })),
      title: getStr(fd, "values.title"),
    },
  };

  await setSection("home", data);
  revalidatePath("/");
  revalidatePath("/admin/site/home");

  return { ok: true };
}
