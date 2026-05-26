import {
  CalendarDays,
  MessageCircle,
  PencilLine,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

type EventItem = {
  description: string;
  icon: typeof CalendarDays;
  id: string;
  status: string;
  statusTone: "secondary" | "outline";
  title: string;
};

const EVENTS: EventItem[] = [
  {
    description:
      "Our first online lecture is planned for August–September. Topic, speakers, and registration link will be announced here closer to the date — follow our RedNote / Instagram for the drop.",
    icon: CalendarDays,
    id: "lecture",
    status: "Coming Aug–Sep",
    statusTone: "secondary",
    title: "Online Lecture",
  },
  {
    description:
      "We collect questions from our RedNote and Instagram comments on a rolling basis and answer them in a dedicated Q&A session every so often. Drop your question via email or DM and we'll bundle it in.",
    icon: MessageCircle,
    id: "qa",
    status: "Rolling",
    statusTone: "secondary",
    title: "Interactive Q&A",
  },
  {
    description:
      "Once a month we take the animals featured that period and weave them into a short 1–2 page comic — silly dialogue, real biology — to showcase the personalities and traits of endangered species.",
    icon: PencilLine,
    id: "comic",
    status: "Monthly",
    statusTone: "secondary",
    title: "Monthly Mini Comic",
  },
  {
    description:
      "A volunteer programme is in the works: pick an animal we've featured, make a poster or write a 150-word advocacy letter, and submit it for volunteer hours. Submission portal launches in a later release.",
    icon: Sparkles,
    id: "volunteer",
    status: "Coming soon",
    statusTone: "outline",
    title: "Volunteer Programme",
  },
];

export function EventCards() {
  return (
    <ul className="events-grid" role="list">
      {EVENTS.map((event) => {
        const Icon = event.icon;

        return (
          <li className="event-card" key={event.id}>
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
