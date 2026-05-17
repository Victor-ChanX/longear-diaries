"use client";

import { useState } from "react";

import { Info, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { AnimalDetailPanel, GlobePolaroids } from "./globe-polaroids";
import { animalMarkers } from "./polaroid-data";

export function HomeExperience() {
  const [selectedAnimal, setSelectedAnimal] = useState(animalMarkers[0]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
      <section className="home-hero">
        <div className="home-copy">
          <Badge className="home-eyebrow" variant="secondary">
            Endangered animal atlas
          </Badge>
          <h1>Endangered animal field notes.</h1>
          <p>
            Click an animal photo on the globe to explore its location, habitat,
            and conservation notes. Dog breeds are temporary placeholders for
            future endangered species.
          </p>
          <div className="home-actions">
            <Button
              onClick={() => {
                setSelectedAnimal(animalMarkers[0]);
                setIsPanelOpen(true);
              }}
            >
              <Info aria-hidden="true" />
              View profile
            </Button>
            <Button asChild variant="outline">
              <a href="#nodes">
                <MapPin aria-hidden="true" />
                {animalMarkers.length} nodes
              </a>
            </Button>
          </div>
        </div>
        <GlobePolaroids
          isProfileOpen={isPanelOpen}
          onSelectAnimal={(animal) => {
            setSelectedAnimal(animal);
            setIsPanelOpen(true);
          }}
          selectedAnimal={selectedAnimal}
        />
        {isPanelOpen && (
          <AnimalDetailPanel
            animal={selectedAnimal}
            onClose={() => setIsPanelOpen(false)}
          />
        )}
      </section>
      <section className="nodes-band" id="nodes">
        <div className="nodes-list" aria-label="Animal nodes">
          {animalMarkers.map((marker) => (
            <button
              className={selectedAnimal.id === marker.id ? "is-selected" : ""}
              key={marker.id}
              onClick={() => {
                setSelectedAnimal(marker);
                setIsPanelOpen(true);
              }}
              type="button"
            >
              {marker.caption}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
