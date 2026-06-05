import {
  CalendarDays,
  MessageCircle,
  PencilLine,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { EventsContent } from "@/lib/data/site-defaults";

// Positional icons — first event uses CalendarDays, second MessageCircle, etc.
const EVENT_ICONS = [
  CalendarDays,
  MessageCircle,
  PencilLine,
  Sparkles,
] as const;

export function EventCards({ items }: { items: EventsContent["items"] }) {
  return (
    <ul className="events-grid" role="list">
      {items.map((event, i) => {
        const Icon = EVENT_ICONS[i] ?? CalendarDays;

        return (
          <li className="event-card" key={`${event.title}-${i}`}>
            <div className="event-card-head">
              <span className="event-card-icon" aria-hidden="true">
                <Icon />
              </span>
              <Badge variant={event.statusTone}>{event.status}</Badge>
            </div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
