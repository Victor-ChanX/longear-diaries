export type GlobeLocation = [number, number];

export type AnimalMarker = {
  caption: string;
  conservationStatus: string;
  description: string;
  habitat: string;
  id: string;
  image: string;
  location: GlobeLocation;
  objectPosition: string;
  origin: string;
  populationNote: string;
  rotate: number;
  scientificName: string;
};

export const animalMarkers: AnimalMarker[] = [
  {
    caption: "Akita",
    conservationStatus: "Placeholder profile",
    description:
      "A powerful northern Japanese breed used here as a stand-in for future endangered animal stories. The final version can replace this card with a species profile, threats, conservation actions, and verified imagery.",
    habitat: "Mountain villages and cold northern regions",
    id: "animal-akita",
    image: "/IMG_7988.jpg",
    location: [39.72, 140.1],
    objectPosition: "48% 42%",
    origin: "Akita, Japan",
    populationNote: "Domestic breed placeholder",
    rotate: -6,
    scientificName: "Canis lupus familiaris",
  },
  {
    caption: "Husky",
    conservationStatus: "Placeholder profile",
    description:
      "A high-endurance sled dog representing Arctic ecosystems for now. Later this node can become a polar species card with sea ice, migration, and climate pressure details.",
    habitat: "Subarctic settlements and sled routes",
    id: "animal-husky",
    image: "/IMG_7988.jpg",
    location: [64.73, 177.51],
    objectPosition: "55% 36%",
    origin: "Chukotka, Russia",
    populationNote: "Domestic breed placeholder",
    rotate: 5,
    scientificName: "Canis lupus familiaris",
  },
  {
    caption: "Saluki",
    conservationStatus: "Placeholder profile",
    description:
      "A desert sighthound with a long cultural history. This temporary node is useful for testing long-form sidebar content before real endangered desert species are added.",
    habitat: "Desert margins and oasis trade routes",
    id: "animal-saluki",
    image: "/IMG_7988.jpg",
    location: [24.45, 54.38],
    objectPosition: "42% 52%",
    origin: "Arabian Peninsula",
    populationNote: "Domestic breed placeholder",
    rotate: -3,
    scientificName: "Canis lupus familiaris",
  },
  {
    caption: "Basenji",
    conservationStatus: "Placeholder profile",
    description:
      "A Central African breed placed on the map to exercise a tropical forest story format. Future content can focus on habitat fragmentation and anti-poaching programs.",
    habitat: "Forest-edge villages and river basins",
    id: "animal-basenji",
    image: "/IMG_7988.jpg",
    location: [0.35, 18.72],
    objectPosition: "62% 48%",
    origin: "Congo Basin",
    populationNote: "Domestic breed placeholder",
    rotate: 7,
    scientificName: "Canis lupus familiaris",
  },
  {
    caption: "Mastiff",
    conservationStatus: "Placeholder profile",
    description:
      "A large highland guardian breed standing in for mountain biodiversity stories. The sidebar is ready for range maps, human-wildlife conflict notes, and conservation partners.",
    habitat: "High plateaus and pastoral communities",
    id: "animal-mastiff",
    image: "/IMG_7988.jpg",
    location: [29.65, 91.12],
    objectPosition: "50% 58%",
    origin: "Tibetan Plateau",
    populationNote: "Domestic breed placeholder",
    rotate: -4,
    scientificName: "Canis lupus familiaris",
  },
  {
    caption: "Dingo",
    conservationStatus: "Placeholder profile",
    description:
      "A wild canid profile placeholder for Australia. The interaction model can later distinguish between species, subspecies, conservation status, and region-specific threats.",
    habitat: "Grasslands, scrubland, and desert edges",
    id: "animal-dingo",
    image: "/IMG_7988.jpg",
    location: [-25.27, 133.78],
    objectPosition: "38% 44%",
    origin: "Australia",
    populationNote: "Wild canid placeholder",
    rotate: 4,
    scientificName: "Canis lupus dingo",
  },
  {
    caption: "Chihuahua",
    conservationStatus: "Placeholder profile",
    description:
      "A small companion breed used as a temporary North American marker. Real species cards can include protection status, pressures, and practical conservation actions.",
    habitat: "Dry valleys and urban companion settings",
    id: "animal-chihuahua",
    image: "/IMG_7988.jpg",
    location: [28.63, -106.08],
    objectPosition: "58% 65%",
    origin: "Chihuahua, Mexico",
    populationNote: "Domestic breed placeholder",
    rotate: 8,
    scientificName: "Canis lupus familiaris",
  },
  {
    caption: "Collie",
    conservationStatus: "Placeholder profile",
    description:
      "A herding breed marker for temperate landscapes. The same panel structure can later introduce endangered grassland or upland species with richer field notes.",
    habitat: "Upland farms and coastal grasslands",
    id: "animal-collie",
    image: "/IMG_7988.jpg",
    location: [56.49, -4.2],
    objectPosition: "44% 70%",
    origin: "Scotland",
    populationNote: "Domestic breed placeholder",
    rotate: -7,
    scientificName: "Canis lupus familiaris",
  },
];
