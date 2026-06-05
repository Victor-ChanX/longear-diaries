"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight, BookOpen, Info, Sparkles, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AnimalMarker } from "@/lib/data/animals";
import type { HomeContent } from "@/lib/data/site-defaults";

import { AnimalDetailPanel, GlobePolaroids } from "./globe-polaroids";

type HomeExperienceProps = {
  animals: AnimalMarker[];
  content: HomeContent;
};

const VALUE_ICONS = [BookOpen, Sprout, Sparkles] as const;

export function HomeExperience({ animals, content }: HomeExperienceProps) {
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
  const c = content;

  return (
    <main className="home-root">
      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow home-eyebrow">{c.hero.eyebrow}</p>
          <h1>
            {c.hero.titlePre} <em>{c.hero.titleEmphasis}</em> {c.hero.titlePost}
          </h1>
          <p>{c.hero.body}</p>
          <div className="home-actions">
            <Button
              disabled={animals.length === 0}
              onClick={() => featured && openProfile(featured)}
            >
              <Info aria-hidden="true" />
              {c.hero.ctaPrimary}
            </Button>
            <Button asChild variant="outline">
              <a href="#manifesto">
                <ArrowRight aria-hidden="true" />
                {c.hero.ctaSecondary}
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
          <p className="eyebrow">{c.manifesto.eyebrow}</p>
          <blockquote>{c.manifesto.quote}</blockquote>
          <p className="home-manifesto-attribution">
            {c.manifesto.attribution}
          </p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="home-stats" aria-label="At a glance">
        <div className="home-stats-inner">
          <Stat
            label={c.stats.item1Label}
            number={animals.length.toString().padStart(2, "0")}
          />
          <Stat
            label={c.stats.item2Label}
            number={c.stats.item2Number}
            suffix={c.stats.item2Suffix}
          />
          <Stat label={c.stats.item3Label} number={c.stats.item3Number} />
          <Stat
            label={c.stats.item4Label}
            number={c.stats.item4Number}
            suffix={c.stats.item4Suffix}
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
            <p className="eyebrow">{c.values.eyebrow}</p>
            <h2>{c.values.title}</h2>
          </header>
          <div className="home-values-grid">
            {c.values.items.slice(0, 3).map((value, i) => {
              const Icon = VALUE_ICONS[i] ?? BookOpen;

              return (
                <article className="home-value" key={`${value.kicker}-${i}`}>
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
          <p className="eyebrow eyebrow-on-dark">{c.cta.eyebrow}</p>
          <h2>{c.cta.title}</h2>
          <p>{c.cta.body}</p>
          <div className="home-cta-actions">
            <Button asChild>
              <Link href="/content">
                {c.cta.primaryLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">{c.cta.secondaryLabel}</Link>
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
