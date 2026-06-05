import type { Metadata } from "next";

import { EventCards } from "@/features/events/event-cards";
import { getEventsContent } from "@/lib/storage/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "Lectures, Q&As, monthly mini comics, and the upcoming volunteer programme from LongEar Diaries.",
  title: "Events — LongEar Diaries",
};

export default async function EventsPage() {
  const c = await getEventsContent();

  return (
    <main className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">{c.hero.eyebrow}</p>
        <h1>{c.hero.title}</h1>
        <p>{c.hero.subtitle}</p>
      </header>
      <EventCards items={c.items} />
    </main>
  );
}
