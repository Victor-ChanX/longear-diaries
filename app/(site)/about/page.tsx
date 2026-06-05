import type { Metadata } from "next";

import { getAboutContent } from "@/lib/storage/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description: "The story, the name, and the mission behind LongEar Diaries.",
  title: "About — LongEar Diaries",
};

export default async function AboutPage() {
  const c = await getAboutContent();

  return (
    <main className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">{c.hero.eyebrow}</p>
        <h1>{c.hero.title}</h1>
        <p>{c.hero.subtitle}</p>
      </header>

      <article className="about-article">
        {c.sections.map((section, i) => (
          <section key={i}>
            <h2>{section.title}</h2>
            {section.body.split("\n").map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
