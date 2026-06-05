"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Globe, { type GlobeMethods } from "react-globe.gl";

import { type AnimalMarker } from "@/lib/data/animals";

type GlobeStageProps = {
  animals: AnimalMarker[];
  isProfileOpen: boolean;
  onSelectAnimal: (animal: AnimalMarker) => void;
  selectedAnimal: AnimalMarker | null;
};

type MarkerDatum = AnimalMarker & { lat: number; lng: number };

const EARTH_TEXTURE =
  "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const BUMP_TEXTURE = "//unpkg.com/three-globe/example/img/earth-topology.png";

const getStageSize = (element: HTMLElement | null) => {
  if (!element) return 720;
  const rect = element.getBoundingClientRect();

  return Math.max(320, Math.round(rect.width || 720));
};

export default function GlobeStage({
  animals,
  isProfileOpen,
  onSelectAnimal,
  selectedAnimal,
}: GlobeStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const isProfileOpenRef = useRef(isProfileOpen);
  const [size, setSize] = useState(720);

  useEffect(() => {
    isProfileOpenRef.current = isProfileOpen;
  }, [isProfileOpen]);

  const applyControls = (isOpen: boolean) => {
    const globe = globeRef.current;

    if (!globe) return;

    const controls = globe.controls() as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
    };

    controls.autoRotate = !isOpen;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
  };

  const markerData = useMemo<MarkerDatum[]>(
    () =>
      animals.map((animal) => ({
        ...animal,
        lat: animal.location[0],
        lng: animal.location[1],
      })),
    [animals],
  );

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    setSize(getStageSize(node));

    const observer = new ResizeObserver(() => {
      setSize(getStageSize(node));
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    applyControls(isProfileOpen);
  }, [isProfileOpen]);

  const buildMarkerElement = (raw: object) => {
    const datum = raw as MarkerDatum;
    const el = document.createElement("div");
    el.className = "globe-marker-anchor";
    el.dataset.id = datum.id;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "globe-marker";
    card.setAttribute("aria-label", `Open profile for ${datum.caption}`);
    if (selectedAnimal?.id === datum.id) {
      card.classList.add("is-selected");
    }

    card.style.setProperty("--photo-position", datum.objectPosition);
    card.style.setProperty("--polaroid-rotate", `${datum.rotate}deg`);

    if (datum.image) {
      const img = document.createElement("img");

      img.src = datum.image;
      img.alt = "";
      card.appendChild(img);
    } else {
      const placeholder = document.createElement("div");

      placeholder.className = "globe-marker-placeholder";
      placeholder.textContent = datum.caption.charAt(0).toUpperCase() || "?";
      card.appendChild(placeholder);
    }

    const label = document.createElement("span");

    label.textContent = datum.caption;
    card.appendChild(label);

    card.addEventListener("click", (event) => {
      event.stopPropagation();
      onSelectAnimal(datum);
    });

    el.appendChild(card);

    return el;
  };

  return (
    <div className="globe-shell">
      <div className="globe-stage" ref={stageRef}>
        <Globe
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={EARTH_TEXTURE}
          bumpImageUrl={BUMP_TEXTURE}
          showAtmosphere
          atmosphereColor="#8fd3c4"
          atmosphereAltitude={0.18}
          htmlElementsData={markerData}
          htmlLat={(d: object) => (d as MarkerDatum).lat}
          htmlLng={(d: object) => (d as MarkerDatum).lng}
          htmlAltitude={0.012}
          htmlTransitionDuration={0}
          htmlElement={buildMarkerElement}
          onGlobeReady={() => applyControls(isProfileOpenRef.current)}
        />
      </div>
    </div>
  );
}
