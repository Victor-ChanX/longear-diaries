// Shared shape for animals consumed by the home globe and content pages.
// The actual data now lives in Postgres — fetch via lib/storage/animals.ts.

export type GlobeLocation = [number, number];

export type AnimalMarker = {
  caption: string;
  conservationStatus: string;
  description: string;
  habitat: string;
  id: string;
  image: string | null; // resolved URL (R2 public URL), or null when no image uploaded
  location: GlobeLocation;
  objectPosition: string;
  origin: string;
  populationNote: string;
  rotate: number;
  scientificName: string;
};
