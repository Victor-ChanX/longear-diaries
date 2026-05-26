import type { Metadata } from "next";

import { AtSign, Camera, MessageSquareHeart } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  description:
    "Get in touch with LongEar Diaries on RedNote, Instagram, or email for our community Q&A.",
  title: "Contact — LongEar Diaries",
};

const CONTACTS = [
  {
    description:
      "Our daily home — every published animal profile lands here first.",
    handle: "@LongEarDiaries",
    href: "https://www.xiaohongshu.com/",
    icon: MessageSquareHeart,
    id: "rednote",
    label: "RedNote (小红书)",
  },
  {
    description:
      "Mirror of our RedNote feed for friends outside mainland China.",
    handle: "@longear.diaries",
    href: "https://www.instagram.com/",
    icon: Camera,
    id: "instagram",
    label: "Instagram",
  },
  {
    description:
      "Send questions for our Interactive Q&A sessions, story pitches, or anything that doesn't fit a DM.",
    handle: "hello@longeardiaries.example",
    href: "mailto:hello@longeardiaries.example",
    icon: AtSign,
    id: "email",
    label: "Email",
  },
];

export default function ContactPage() {
  return (
    <main className="page-shell">
      <header className="page-hero">
        <Badge variant="secondary">Contact</Badge>
        <h1>Reach the diary.</h1>
        <p>
          DMs on RedNote and Instagram are open. Email is the best place to send
          Q&amp;A questions you&apos;d like us to answer in a future session.
        </p>
      </header>

      <ul className="contact-grid" role="list">
        {CONTACTS.map((contact) => {
          const Icon = contact.icon;

          return (
            <li key={contact.id}>
              <a
                className="contact-card"
                href={contact.href}
                rel={contact.id === "email" ? undefined : "noopener noreferrer"}
                target={contact.id === "email" ? undefined : "_blank"}
              >
                <span className="contact-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <p className="contact-card-label">{contact.label}</p>
                  <p className="contact-card-handle">{contact.handle}</p>
                  <p className="contact-card-desc">{contact.description}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
