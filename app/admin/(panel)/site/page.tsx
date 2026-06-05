import Link from "next/link";

import {
  Home as HomeIcon,
  Info,
  Mail,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Site content — LongEar Admin",
};

const SECTIONS = [
  {
    description: "Hero, manifesto, stats, values, CTA copy.",
    href: "/admin/site/home",
    icon: HomeIcon,
    title: "Home page",
  },
  {
    description: "Title, subtitle, and the long-form sections.",
    href: "/admin/site/about",
    icon: Info,
    title: "About page",
  },
  {
    description: "Four event cards — lecture / Q&A / comic / volunteer.",
    href: "/admin/site/events",
    icon: CalendarDays,
    title: "Events page",
  },
  {
    description: "Three contact channels — RedNote, Instagram, Email.",
    href: "/admin/site/contact",
    icon: Mail,
    title: "Contact page",
  },
];

export default function SiteContentIndex() {
  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Site content</h1>
        <p>Edit the text on every public page. Changes go live immediately.</p>
      </header>

      <ul className="admin-section-grid" role="list">
        {SECTIONS.map((s) => {
          const Icon = s.icon;

          return (
            <li key={s.href}>
              <Link className="admin-section-card" href={s.href}>
                <span className="admin-section-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.description}</p>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="admin-section-arrow"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
