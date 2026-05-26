import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { animalMarkers } from "@/lib/data/animals";

export function AnimalGrid() {
  return (
    <ul className="animal-grid" role="list">
      {animalMarkers.map((animal) => (
        <li key={animal.id}>
          <Link className="animal-card" href={`/content/${animal.id}`}>
            <div
              className="animal-card-media"
              style={{
                backgroundImage: `url(${animal.image})`,
                backgroundPosition: animal.objectPosition,
              }}
              aria-hidden="true"
            />
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
