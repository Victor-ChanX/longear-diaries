import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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

  return (
    <ul className="animal-grid" role="list">
      {animals.map((animal) => (
        <li key={animal.id}>
          <Link className="animal-card" href={`/content/${animal.id}`}>
            {animal.image ? (
              <div
                aria-hidden="true"
                className="animal-card-media"
                style={{
                  backgroundImage: `url(${animal.image})`,
                  backgroundPosition: animal.objectPosition,
                }}
              />
            ) : (
              <div
                aria-hidden="true"
                className="animal-card-media animal-image-placeholder"
              >
                {animal.caption.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="animal-card-body">
              <div className="animal-card-kicker">
                <Badge variant="secondary">{animal.conservationStatus}</Badge>
                <span>{animal.origin}</span>
              </div>
              <h3>{animal.caption}</h3>
              <p className="animal-card-science">{animal.scientificName}</p>
              <p className="animal-card-desc">{animal.description}</p>
              <p className="animal-card-habitat">
                <strong>Habitat.</strong> {animal.habitat}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
