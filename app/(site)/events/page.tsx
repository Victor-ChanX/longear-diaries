import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { EventCards } from "@/features/events/event-cards";

export const metadata: Metadata = {
  description:
    "Lectures, Q&As, monthly mini comics, and the upcoming volunteer programme from LongEar Diaries.",
  title: "Events — LongEar Diaries",
};

export default function EventsPage() {
  return (
    <main className="page-shell">
      <header className="page-hero">
        <Badge variant="secondary">Events</Badge>
        <h1>Live talks, Q&amp;As, comics, and ways to get involved.</h1>
        <p>
          Everything below runs out of the same diary — only the format changes.
          Come learn, ask, laugh at our doodles, or pick up volunteer hours when
          the programme opens.
        </p>
      </header>
      <EventCards />
    </main>
  );
}
