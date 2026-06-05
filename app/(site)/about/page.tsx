import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "The story, the name, and the mission behind LongEar Diaries.",
  title: "About — LongEar Diaries",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">About</p>
        <h1>Why we started a diary for endangered animals.</h1>
        <p>
          A short version of where the project came from, what the name means,
          and where we&apos;d like it to go next.
        </p>
      </header>

      <article className="about-article">
        <section>
          <h2>Our story</h2>
          <p>
            LongEar Diaries began as a private notebook — a habit of sketching
            and writing about animals we kept reading about in conservation
            papers but never seeing in everyday feeds. The notebook outgrew
            itself. We started turning each entry into a short, shareable
            profile, and a few months later we were a small team.
          </p>
          <p className="about-todo">
            [TODO — replace with the team&apos;s own retelling once Sarah writes
            the longer version.]
          </p>
        </section>

        <section>
          <h2>The name</h2>
          <p>
            &ldquo;LongEar&rdquo; is a nod to the species that are easy to miss:
            the long-eared, the lesser-known, the ones whose ranges sit just
            outside the standard wildlife-doc spotlight. &ldquo;Diaries&rdquo;
            is how we&apos;d like our profiles to feel — careful, personal,
            published one entry at a time.
          </p>
        </section>

        <section>
          <h2>Why we do this</h2>
          <p>
            Conservation organisations are doing the hard work. We&apos;re not
            here to replicate that or fundraise on top of it. We&apos;re here as
            a bridge: pointing audiences and curiosity toward the species,
            ecosystems, and people that need attention — and toward the
            organisations doing something about it.
          </p>
        </section>

        <section>
          <h2>What we&apos;re aiming for</h2>
          <ul>
            <li>
              <strong>Reach.</strong> Every animal we profile reaches at least
              one person who hadn&apos;t heard of it before.
            </li>
            <li>
              <strong>Accuracy.</strong> Every claim traces back to a paper, a
              report, or a partner organisation we can name.
            </li>
            <li>
              <strong>Bridge.</strong> Every entry links readers to a
              conservation org actually doing the work on the ground.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
