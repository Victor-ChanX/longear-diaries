import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAnimalById, listAnimals } from "@/lib/storage/animals";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) return { title: "Not found — LongEar Diaries" };

  return {
    description: animal.description,
    title: `${animal.caption} — LongEar Diaries`,
  };
}

export default async function AnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) notFound();

  const all = await listAnimals();
  const others = all.filter((a) => a.id !== animal.id).slice(0, 3);

  return (
    <main className="article">
      {/* Hero: full-bleed image with caption overlay */}
      <header className="article-hero">
        {animal.image ? (
          <div
            aria-hidden="true"
            className="article-hero-media"
            style={{
              backgroundImage: `url(${animal.image})`,
              backgroundPosition: animal.objectPosition,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="article-hero-media animal-image-placeholder"
          >
            {animal.caption.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div className="article-hero-overlay">
          <Link className="article-back" href="/content">
            <ArrowLeft aria-hidden="true" />
            All species
          </Link>
          <div className="article-hero-inner">
            <p className="eyebrow eyebrow-on-dark">
              Field entry · {animal.origin}
            </p>
            <h1>{animal.caption}</h1>
            <p className="article-science">{animal.scientificName}</p>
          </div>
        </div>
      </header>

      {/* Body: narrow article column with side meta */}
      <div className="article-body">
        <aside className="article-meta" aria-label="At a glance">
          <dl>
            <div>
              <dt>Conservation status</dt>
              <dd>{animal.conservationStatus}</dd>
            </div>
            <div>
              <dt>Habitat</dt>
              <dd>{animal.habitat}</dd>
            </div>
            <div>
              <dt>Range</dt>
              <dd>{animal.origin}</dd>
            </div>
            <div>
              <dt>Population note</dt>
              <dd>{animal.populationNote}</dd>
            </div>
            <div>
              <dt>Coordinates</dt>
              <dd>
                {animal.location[0].toFixed(2)}°,{" "}
                {animal.location[1].toFixed(2)}°
              </dd>
            </div>
          </dl>
        </aside>

        <article className="article-prose">
          <p className="article-lede">{animal.description}</p>

          <blockquote className="pull-quote">
            <p>
              Conservation isn&apos;t one big rescue — it&apos;s a thousand
              small acts of paying attention.
            </p>
          </blockquote>

          <p>
            {animal.populationNote ||
              "Status notes will appear here once the editors finish the field write-up. Until then, share this page with someone who hasn't yet heard of "}
            {!animal.populationNote && <em>{animal.caption}</em>}
            {!animal.populationNote && "."}
          </p>

          <p className="article-credits">
            <span>Issue 01</span>
            <span>·</span>
            <span>Edited by the LongEar team</span>
          </p>
        </article>
      </div>

      {/* Related */}
      {others.length > 0 && (
        <section className="article-related" aria-label="More species">
          <div className="article-related-inner">
            <header>
              <p className="eyebrow">Keep reading</p>
              <h2>Other field entries</h2>
            </header>
            <ul>
              {others.map((other) => (
                <li key={other.id}>
                  <Link className="related-card" href={`/content/${other.id}`}>
                    {other.image ? (
                      <div
                        aria-hidden="true"
                        className="related-media"
                        style={{
                          backgroundImage: `url(${other.image})`,
                          backgroundPosition: other.objectPosition,
                        }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="related-media animal-image-placeholder"
                      >
                        {other.caption.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <p className="dispatch-kicker">{other.origin}</p>
                      <h3>{other.caption}</h3>
                      <span className="related-arrow">
                        Read entry <ArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="article-related-cta">
              <Button asChild variant="outline">
                <Link href="/content">
                  Back to catalogue
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
