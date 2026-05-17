"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import createGlobe from "cobe";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { animalMarkers, type AnimalMarker } from "./polaroid-data";

type Marker = {
  id: string;
  location: [number, number];
  size: number;
};

type PolaroidStyle = CSSProperties & {
  "--photo-position": string;
  "--polaroid-rotate": string;
  positionAnchor?: string;
};

type GlobePolaroidsProps = {
  isProfileOpen: boolean;
  selectedAnimal: AnimalMarker;
  onSelectAnimal: (animal: AnimalMarker) => void;
};

const getStageSize = (element: HTMLElement | null) => {
  if (!element) {
    return 720;
  }

  const width = element.getBoundingClientRect().width;

  return Math.max(320, Math.round(width || 720));
};

export function GlobePolaroids({
  isProfileOpen,
  onSelectAnimal,
  selectedAnimal,
}: GlobePolaroidsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ t: number; x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffset = useRef(0);
  const thetaOffset = useRef(0);
  const isRotationPaused = useRef(false);
  const speed = useRef(1);
  const [isReady, setIsReady] = useState(false);

  const markers = useMemo<Marker[]>(
    () =>
      animalMarkers.map((marker) => ({
        id: marker.id,
        location: marker.location,
        size: 0.018,
      })),
    [],
  );

  useEffect(() => {
    isRotationPaused.current = isProfileOpen;
    speed.current = isProfileOpen ? 0 : 1;
  }, [isProfileOpen]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      pointerInteracting.current = { x: event.clientX, y: event.clientY };
      lastPointer.current = {
        t: Date.now(),
        x: event.clientX,
        y: event.clientY,
      };
      speed.current = 0;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (!pointerInteracting.current) {
      return;
    }

    const deltaX = event.clientX - pointerInteracting.current.x;
    const deltaY = event.clientY - pointerInteracting.current.y;

    dragOffset.current = {
      phi: deltaX / 280,
      theta: deltaY / 900,
    };

    const now = Date.now();

    if (lastPointer.current) {
      const elapsed = Math.max(now - lastPointer.current.t, 1);
      const maxVelocity = 0.08;

      velocity.current = {
        phi: Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            ((event.clientX - lastPointer.current.x) / elapsed) * 0.24,
          ),
        ),
        theta: Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            ((event.clientY - lastPointer.current.y) / elapsed) * 0.07,
          ),
        ),
      };
    }

    lastPointer.current = {
      t: now,
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current) {
      phiOffset.current += dragOffset.current.phi;
      thetaOffset.current += dragOffset.current.theta;
    }

    pointerInteracting.current = null;
    lastPointer.current = null;
    dragOffset.current = { phi: 0, theta: 0 };
    speed.current = 1;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;

    if (!canvas || !stage) {
      return;
    }

    let frame = 0;
    let phi = -0.75;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = getStageSize(stage);
    const globe = createGlobe(canvas, {
      arcColor: [0.18, 0.34, 0.46],
      arcHeight: 0.25,
      arcWidth: 0.5,
      baseColor: [0.98, 0.94, 0.86],
      dark: 0.08,
      devicePixelRatio: dpr,
      diffuse: 1.35,
      glowColor: [0.88, 0.96, 0.93],
      height: size,
      mapBrightness: 8.6,
      mapSamples: 18000,
      markerColor: [0.16, 0.62, 0.58],
      markerElevation: 0.01,
      markers,
      opacity: 0.86,
      phi,
      scale: 1,
      theta: 0.2,
      width: size,
    });

    const resizeObserver = new ResizeObserver(() => {
      const nextSize = getStageSize(stage);

      globe.update({
        height: nextSize,
        width: nextSize,
      });
    });

    resizeObserver.observe(stage);
    const readyTimer = window.setTimeout(() => setIsReady(true), 160);

    const animate = () => {
      if (!pointerInteracting.current && !isRotationPaused.current) {
        phi += 0.0028 * speed.current;

        if (
          Math.abs(velocity.current.phi) > 0.0001 ||
          Math.abs(velocity.current.theta) > 0.0001
        ) {
          phiOffset.current += velocity.current.phi;
          thetaOffset.current += velocity.current.theta;
          velocity.current.phi *= 0.94;
          velocity.current.theta *= 0.9;
        }

        thetaOffset.current = Math.max(
          -0.32,
          Math.min(0.36, thetaOffset.current),
        );
      }

      globe.update({
        markers,
        phi: phi + phiOffset.current + dragOffset.current.phi,
        theta: 0.2 + thetaOffset.current + dragOffset.current.theta,
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.clearTimeout(readyTimer);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      globe.destroy();

      const wrapper = canvas.parentElement;

      if (wrapper && wrapper !== stage && wrapper.parentElement === stage) {
        stage.insertBefore(canvas, wrapper);
        wrapper.remove();
      }
    };
  }, [markers]);

  return (
    <div className="globe-shell">
      <div
        className="globe-stage"
        onPointerEnter={() => {
          if (!pointerInteracting.current) {
            speed.current = isRotationPaused.current ? 0 : 0.72;
          }
        }}
        onPointerLeave={() => {
          if (!pointerInteracting.current) {
            speed.current = isRotationPaused.current ? 0 : 1;
          }
        }}
        ref={stageRef}
      >
        <canvas
          aria-label="Interactive endangered animal globe"
          className={cn("globe-canvas", isReady && "is-ready")}
          onPointerDown={handlePointerDown}
          ref={canvasRef}
        />
        {animalMarkers.map((marker) => (
          <button
            aria-label={`Open profile for ${marker.caption}`}
            className={cn(
              "polaroid-node",
              selectedAnimal.id === marker.id && "is-selected",
            )}
            key={marker.id}
            onClick={() => {
              isRotationPaused.current = true;
              speed.current = 0;
              onSelectAnimal(marker);
            }}
            style={
              {
                "--photo-position": marker.objectPosition,
                "--polaroid-rotate": `${marker.rotate}deg`,
                filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 7px))`,
                opacity: `var(--cobe-visible-${marker.id}, 0)`,
                positionAnchor: `--cobe-${marker.id}`,
              } as PolaroidStyle
            }
            type="button"
          >
            <img alt="" src={marker.image} />
            <span>{marker.caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
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
        <img alt={`${animal.caption} profile`} src={animal.image} />
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
