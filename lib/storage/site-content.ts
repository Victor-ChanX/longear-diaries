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

async function getSection<T>(key: SectionKey): Promise<T> {
  const row = await prisma.siteContent.findUnique({ where: { key } });

  return (row?.data as T) ?? (DEFAULTS[key] as T);
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
