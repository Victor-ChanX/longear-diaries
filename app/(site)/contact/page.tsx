import type { Metadata } from "next";

import { AtSign, Camera, MessageSquareHeart } from "lucide-react";

import { getContactContent } from "@/lib/storage/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "Get in touch with LongEar Diaries on RedNote, Instagram, or email for our community Q&A.",
  title: "Contact — LongEar Diaries",
};

const CHANNEL_ICONS = [MessageSquareHeart, Camera, AtSign] as const;

export default async function ContactPage() {
  const c = await getContactContent();

  return (
    <main className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">{c.hero.eyebrow}</p>
        <h1>{c.hero.title}</h1>
        <p>{c.hero.subtitle}</p>
      </header>

      <ul className="contact-grid" role="list">
        {c.channels.map((channel, i) => {
          const Icon = CHANNEL_ICONS[i] ?? AtSign;
          const isMailto = channel.href.startsWith("mailto:");

          return (
            <li key={`${channel.label}-${i}`}>
              <a
                className="contact-card"
                href={channel.href}
                rel={isMailto ? undefined : "noopener noreferrer"}
                target={isMailto ? undefined : "_blank"}
              >
                <span className="contact-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <p className="contact-card-label">{channel.label}</p>
                  <p className="contact-card-handle">{channel.handle}</p>
                  <p className="contact-card-desc">{channel.description}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
