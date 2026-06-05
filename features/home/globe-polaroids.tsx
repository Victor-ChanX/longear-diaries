"use client";

import dynamic from "next/dynamic";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type AnimalMarker } from "@/lib/data/animals";

const GlobeStage = dynamic(() => import("./globe-stage"), {
  ssr: false,
  loading: () => <div className="globe-shell" aria-hidden="true" />,
});

type GlobePolaroidsProps = {
  animals: AnimalMarker[];
  isProfileOpen: boolean;
  onSelectAnimal: (animal: AnimalMarker) => void;
  selectedAnimal: AnimalMarker | null;
};

export function GlobePolaroids(props: GlobePolaroidsProps) {
  return <GlobeStage {...props} />;
}

export function AnimalDetailPanel({
  animal,
  onClose,
}: {
  animal: AnimalMarker;
  onClose: () => void;
}) {
  return (
    <aside className="animal-panel" aria-live="polite">
      <div className="animal-panel-image">
        {animal.image ? (
          <img alt={`${animal.caption} profile`} src={animal.image} />
        ) : (
          <div aria-hidden="true" className="animal-image-placeholder">
            {animal.caption.charAt(0).toUpperCase() || "?"}
          </div>
        )}
      </div>
      <div className="animal-panel-body">
        <div className="animal-panel-kicker">
          <Badge variant="secondary">{animal.conservationStatus}</Badge>
          <span>{animal.origin}</span>
        </div>
        <h2>{animal.caption}</h2>
        <p className="animal-science">{animal.scientificName}</p>
        <p>{animal.description}</p>
        <dl>
          <div>
            <dt>Habitat</dt>
            <dd>{animal.habitat}</dd>
          </div>
          <div>
            <dt>Status note</dt>
            <dd>{animal.populationNote}</dd>
          </div>
        </dl>
        <Button
          className="animal-panel-close"
          onClick={onClose}
          variant="outline"
        >
          Close profile
        </Button>
      </div>
    </aside>
  );
}
