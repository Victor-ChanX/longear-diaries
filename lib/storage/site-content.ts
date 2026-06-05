import {
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CONTACT_CONTENT,
  DEFAULT_EVENTS_CONTENT,
  DEFAULT_HOME_CONTENT,
  type AboutContent,
  type ContactContent,
  type EventsContent,
  type HomeContent,
} from "@/lib/data/site-defaults";
import { prisma } from "@/lib/db/prisma";

export type SectionKey = "home" | "about" | "events" | "contact";

const DEFAULTS: Record<SectionKey, unknown> = {
  about: DEFAULT_ABOUT_CONTENT,
  contact: DEFAULT_CONTACT_CONTENT,
  events: DEFAULT_EVENTS_CONTENT,
  home: DEFAULT_HOME_CONTENT,
};

// Prisma "P2021 TableDoesNotExist" — happens when migrations haven't been
// applied yet (e.g. first deploy). Treat it the same as "no row found" so the
// public site keeps rendering with default content.
const isMissingTableError = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) return false;
  const code = (error as { code?: string }).code;

  return code === "P2021" || code === "P2022";
};

async function getSection<T>(key: SectionKey): Promise<T> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });

    return (row?.data as T) ?? (DEFAULTS[key] as T);
  } catch (error) {
    if (isMissingTableError(error)) {
      return DEFAULTS[key] as T;
    }

    throw error;
  }
}

export const getHomeContent = () => getSection<HomeContent>("home");

export const getAboutContent = () => getSection<AboutContent>("about");

export const getEventsContent = () => getSection<EventsContent>("events");

export const getContactContent = () => getSection<ContactContent>("contact");

export async function setSection<T extends object>(
  key: SectionKey,
  data: T,
): Promise<void> {
  await prisma.siteContent.upsert({
    create: { data: data as object, key },
    update: { data: data as object },
    where: { key },
  });
}
