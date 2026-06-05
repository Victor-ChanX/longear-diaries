import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAnimalById } from "@/lib/storage/animals";

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

  return (
    <main className="page-shell animal-detail">
      <Button asChild className="animal-detail-back" variant="outline">
        <Link href="/content">
          <ArrowLeft aria-hidden="true" />
          Back to content
        </Link>
      </Button>
      <article className="animal-detail-card">
        {animal.image ? (
          <div
            aria-hidden="true"
            className="animal-detail-media"
            style={{
              backgroundImage: `url(${animal.image})`,
              backgroundPosition: animal.objectPosition,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="animal-detail-media animal-image-placeholder"
          >
            {animal.caption.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div className="animal-detail-body">
          <div className="animal-panel-kicker">
            <Badge variant="secondary">{animal.conservationStatus}</Badge>
            <span>{animal.origin}</span>
          </div>
          <h1>{animal.caption}</h1>
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
            <div>
              <dt>Coordinates</dt>
              <dd>
                {animal.location[0].toFixed(2)}°,{" "}
                {animal.location[1].toFixed(2)}°
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
