"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AnimalMarker } from "@/lib/data/animals";

import { AnimalDetailPanel, GlobePolaroids } from "./globe-polaroids";

type HomeExperienceProps = {
  animals: AnimalMarker[];
};

export function HomeExperience({ animals }: HomeExperienceProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalMarker | null>(
    animals[0] ?? null,
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openFirst = () => {
    if (animals.length === 0) return;
    setSelectedAnimal(animals[0]);
    setIsPanelOpen(true);
  };

  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
      <section className="home-hero">
        <div className="home-copy">
          <Badge className="home-eyebrow" variant="secondary">
            Species Globe
          </Badge>
          <h1>Endangered animal field notes.</h1>
          <p>
            Spin the planet. Click any animal pinned to its native range to open
            a profile with habitat, status, and the story behind why it matters.
          </p>
          <div className="home-actions">
            <Button disabled={animals.length === 0} onClick={openFirst}>
              <Info aria-hidden="true" />
              View a profile
            </Button>
            <Button asChild variant="outline">
              <a href="#introduction">
                <ArrowRight aria-hidden="true" />
                Read the intro
              </a>
            </Button>
          </div>
        </div>
        <GlobePolaroids
          animals={animals}
          isProfileOpen={isPanelOpen}
          onSelectAnimal={(animal) => {
            setSelectedAnimal(animal);
            setIsPanelOpen(true);
          }}
          selectedAnimal={selectedAnimal}
        />
        {isPanelOpen && selectedAnimal && (
          <AnimalDetailPanel
            animal={selectedAnimal}
            onClose={() => setIsPanelOpen(false)}
          />
        )}
      </section>

      <section className="home-intro" id="introduction">
        <div className="home-intro-inner">
          <Badge className="home-eyebrow" variant="secondary">
            Introduction
          </Badge>
          <h2>A diary of the long-eared, the lesser-known, the at-risk.</h2>
          <div className="home-intro-grid">
            <p>
              LongEar Diaries is a student-led storytelling project documenting
              endangered and overlooked animals around the world. Every entry
              starts with a single creature&apos;s portrait — where it lives,
              what threatens it, and the people working to protect it — then
              gets shared across our RedNote and Instagram channels.
            </p>
            <p>
              The Species Globe above is the cover of the diary. Each pin marks
              a profile we&apos;ve published; spin the planet to discover them.
              Below, on the Content page, you can browse the full catalogue, and
              on Events you&apos;ll find our upcoming lecture, monthly
              mini-comics, and community Q&amp;A.
            </p>
            <p>
              We are not a fundraising charity. We are a bridge: pointing
              attention, audiences, and curiosity toward the organisations
              actually doing the conservation work. If a story here makes one
              more person care about one more species, the diary did its job.
            </p>
          </div>
          <div className="home-intro-actions">
            <Button asChild>
              <Link href="/content">
                Browse the catalogue
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
