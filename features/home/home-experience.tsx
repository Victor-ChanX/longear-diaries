"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight, BookOpen, Info, Sparkles, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AnimalMarker } from "@/lib/data/animals";

import { AnimalDetailPanel, GlobePolaroids } from "./globe-polaroids";

type HomeExperienceProps = {
  animals: AnimalMarker[];
};

const VALUES = [
  {
    body: "We publish one careful, single-species profile at a time — habitat, threats, and the story behind why it matters. Reach is a side effect.",
    icon: BookOpen,
    kicker: "Method",
    title: "Story-first, not scroll-first",
  },
  {
    body: "We point readers toward the conservation organisations doing the work on the ground. The diary is a bridge, never a fundraiser.",
    icon: Sprout,
    kicker: "Mission",
    title: "A bridge to the field",
  },
  {
    body: "Built by a small student team learning conservation by doing — design, research, writing, illustration, and engineering.",
    icon: Sparkles,
    kicker: "People",
    title: "Student-led, peer-reviewed",
  },
];

export function HomeExperience({ animals }: HomeExperienceProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalMarker | null>(
    animals[0] ?? null,
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openProfile = (animal: AnimalMarker) => {
    setSelectedAnimal(animal);
    setIsPanelOpen(true);
  };

  const featured = animals[0] ?? null;
  const dispatches = animals.slice(0, 4);

  return (
    <main className="home-root">
      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow home-eyebrow">Species Globe · Issue 01</p>
          <h1>
            Field notes from <em>the edge</em> of disappearance.
          </h1>
          <p>
            Spin the planet. Click any animal pinned to its native range to open
            a profile with habitat, status, and the story behind why it matters.
          </p>
          <div className="home-actions">
            <Button
              disabled={animals.length === 0}
              onClick={() => featured && openProfile(featured)}
            >
              <Info aria-hidden="true" />
              Open the first entry
            </Button>
            <Button asChild variant="outline">
              <a href="#manifesto">
                <ArrowRight aria-hidden="true" />
                Read the manifesto
              </a>
            </Button>
          </div>
        </div>
        <GlobePolaroids
          animals={animals}
          isProfileOpen={isPanelOpen}
          onSelectAnimal={openProfile}
          selectedAnimal={selectedAnimal}
        />
        {isPanelOpen && selectedAnimal && (
          <AnimalDetailPanel
            animal={selectedAnimal}
            onClose={() => setIsPanelOpen(false)}
          />
        )}
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="home-manifesto" id="manifesto">
        <div className="home-manifesto-inner">
          <p className="eyebrow">Manifesto</p>
          <blockquote>
            We don&apos;t fundraise. We don&apos;t broker donations. We sit with
            one animal at a time and write it down — carefully, slowly — then
            point at the people doing the saving.
          </blockquote>
          <p className="home-manifesto-attribution">
            — The editors of LongEar Diaries
          </p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="home-stats" aria-label="At a glance">
        <div className="home-stats-inner">
          <Stat
            label="Species profiled"
            number={animals.length.toString().padStart(2, "0")}
          />
          <Stat label="Issues per month" number="01" suffix="issue" />
          <Stat label="Mini-comics dropped" number="∞" />
          <Stat
            label="Donation forms here"
            number="0"
            suffix="we're a bridge"
          />
        </div>
      </section>

      {/* ===== FEATURED SPOTLIGHT ===== */}
      {featured && (
        <section className="home-spotlight" aria-label="Featured species">
          <div className="home-spotlight-inner">
            <div className="home-spotlight-media">
              {featured.image ? (
                <div
                  aria-hidden="true"
                  className="home-spotlight-image"
                  style={{
                    backgroundImage: `url(${featured.image})`,
                    backgroundPosition: featured.objectPosition,
                  }}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="home-spotlight-image animal-image-placeholder"
                >
                  {featured.caption.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <span className="home-spotlight-tag">Featured profile</span>
            </div>
            <div className="home-spotlight-body">
              <p className="eyebrow">Issue 01 · Spotlight</p>
              <h2>{featured.caption}</h2>
              <p className="home-spotlight-science">
                {featured.scientificName}
              </p>
              <p className="home-spotlight-desc">{featured.description}</p>
              <dl className="home-spotlight-meta">
                <div>
                  <dt>Habitat</dt>
                  <dd>{featured.habitat}</dd>
                </div>
                <div>
                  <dt>Range</dt>
                  <dd>{featured.origin}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{featured.conservationStatus}</dd>
                </div>
              </dl>
              <Button asChild>
                <Link href={`/content/${featured.id}`}>
                  Read the full entry
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ===== VALUES ===== */}
      <section className="home-values" aria-label="Mission values">
        <div className="home-values-inner">
          <header className="home-values-header">
            <p className="eyebrow">How we work</p>
            <h2>Three rules, kept honestly.</h2>
          </header>
          <div className="home-values-grid">
            {VALUES.map((value, i) => {
              const Icon = value.icon;

              return (
                <article className="home-value" key={value.kicker}>
                  <span className="home-value-number">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="home-value-kicker">
                    <Icon aria-hidden="true" />
                    <span>{value.kicker}</span>
                  </p>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DISPATCHES ===== */}
      {dispatches.length > 0 && (
        <section className="home-dispatches" aria-label="Recent dispatches">
          <div className="home-dispatches-inner">
            <header className="home-dispatches-header">
              <p className="eyebrow">Recent dispatches</p>
              <h2>Latest from the diary.</h2>
              <Link className="home-dispatches-link" href="/content">
                See every species
                <ArrowRight aria-hidden="true" />
              </Link>
            </header>
            <ol className="home-dispatches-list">
              {dispatches.map((animal, i) => (
                <li key={animal.id}>
                  <Link
                    className="dispatch-card"
                    href={`/content/${animal.id}`}
                  >
                    <span className="dispatch-number">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {animal.image ? (
                      <div
                        aria-hidden="true"
                        className="dispatch-media"
                        style={{
                          backgroundImage: `url(${animal.image})`,
                          backgroundPosition: animal.objectPosition,
                        }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="dispatch-media animal-image-placeholder"
                      >
                        {animal.caption.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="dispatch-body">
                      <p className="dispatch-kicker">{animal.origin}</p>
                      <h3>{animal.caption}</h3>
                      <p className="dispatch-science">
                        {animal.scientificName}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ===== CTA BAND ===== */}
      <section className="home-cta" aria-label="Call to action">
        <div className="home-cta-inner">
          <p className="eyebrow eyebrow-on-dark">Start anywhere</p>
          <h2>Pick a species. Read its story. Pass it on.</h2>
          <p>
            That&apos;s the whole loop. Every share, every conversation, every
            quiet read counts as conservation reach.
          </p>
          <div className="home-cta-actions">
            <Button asChild>
              <Link href="/content">
                Browse the catalogue
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Send a Q&amp;A question</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  label,
  number,
  suffix,
}: {
  label: string;
  number: string;
  suffix?: string;
}) {
  return (
    <article className="home-stat">
      <p className="home-stat-number">{number}</p>
      <p className="home-stat-label">
        {label}
        {suffix && <span> · {suffix}</span>}
      </p>
    </article>
  );
}
