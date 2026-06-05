import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { AnimalGrid } from "@/features/content/animal-grid";
import { listAnimals } from "@/lib/storage/animals";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "Every animal profile published by LongEar Diaries, mirrored from our RedNote and Instagram.",
  title: "Content — LongEar Diaries",
};

export default async function ContentPage() {
  const animals = await listAnimals();

  return (
    <main className="page-shell">
      <header className="page-hero">
        <Badge variant="secondary">Content</Badge>
        <h1>Animal profiles, one species at a time.</h1>
        <p>
          Each card below corresponds to a story we&apos;ve published — and
          mirrored on RedNote and Instagram. Tap a card for the full field note.
        </p>
      </header>
      <AnimalGrid animals={animals} />
    </main>
  );
}
