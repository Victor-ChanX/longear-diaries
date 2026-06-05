import Link from "next/link";

import { ArrowRight } from "lucide-react";

import type { AnimalMarker } from "@/lib/data/animals";

export function AnimalGrid({ animals }: { animals: AnimalMarker[] }) {
  if (animals.length === 0) {
    return (
      <p className="team-empty">
        No animals have been added yet. Once admins publish profiles in the
        admin panel, they&apos;ll appear here.
      </p>
    );
  }

  const [hero, ...rest] = animals;

  return (
    <div className="catalogue">
      <Link className="catalogue-hero" href={`/content/${hero.id}`}>
        {hero.image ? (
          <div
            aria-hidden="true"
            className="catalogue-hero-media"
            style={{
              backgroundImage: `url(${hero.image})`,
              backgroundPosition: hero.objectPosition,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="catalogue-hero-media animal-image-placeholder"
          >
            {hero.caption.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div className="catalogue-hero-body">
          <p className="eyebrow">Latest entry</p>
          <h2>{hero.caption}</h2>
          <p className="catalogue-hero-science">{hero.scientificName}</p>
          <p className="catalogue-hero-desc">{hero.description}</p>
          <span className="catalogue-hero-link">
            Read the entry <ArrowRight aria-hidden="true" />
          </span>
        </div>
      </Link>

      {rest.length > 0 && (
        <ul className="catalogue-grid" role="list">
          {rest.map((animal, i) => (
            <li key={animal.id}>
              <Link className="catalogue-card" href={`/content/${animal.id}`}>
                <span className="catalogue-card-number">
                  {(i + 2).toString().padStart(2, "0")}
                </span>
                {animal.image ? (
                  <div
                    aria-hidden="true"
                    className="catalogue-card-media"
                    style={{
                      backgroundImage: `url(${animal.image})`,
                      backgroundPosition: animal.objectPosition,
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="catalogue-card-media animal-image-placeholder"
                  >
                    {animal.caption.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <div className="catalogue-card-body">
                  <p className="dispatch-kicker">{animal.origin}</p>
                  <h3>{animal.caption}</h3>
                  <p className="catalogue-card-science">
                    {animal.scientificName}
                  </p>
                  <p className="catalogue-card-desc">{animal.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
