"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession } from "@/lib/auth/session";
import type { EventsContent } from "@/lib/data/site-defaults";
import { setSection } from "@/lib/storage/site-content";

export type SectionState = {
  error?: string;
  ok?: boolean;
};

const getStr = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function saveEventsAction(
  _prev: SectionState,
  fd: FormData,
): Promise<SectionState> {
  const session = await getCurrentSession();

  if (!session) return { error: "Not authenticated." };

  const data: EventsContent = {
    hero: {
      eyebrow: getStr(fd, "hero.eyebrow"),
      subtitle: getStr(fd, "hero.subtitle"),
      title: getStr(fd, "hero.title"),
    },
    items: [0, 1, 2, 3].map((i) => {
      const toneRaw = getStr(fd, `items.${i}.statusTone`);
      const statusTone: "secondary" | "outline" =
        toneRaw === "outline" ? "outline" : "secondary";

      return {
        description: getStr(fd, `items.${i}.description`),
        status: getStr(fd, `items.${i}.status`),
        statusTone,
        title: getStr(fd, `items.${i}.title`),
      };
    }),
  };

  await setSection("events", data);
  revalidatePath("/events");
  revalidatePath("/admin/site/events");

  return { ok: true };
}
