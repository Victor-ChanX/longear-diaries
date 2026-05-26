import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { AnimalGrid } from "@/features/content/animal-grid";

export const metadata: Metadata = {
  description:
    "Every animal profile published by LongEar Diaries, mirrored from our RedNote and Instagram.",
  title: "Content — LongEar Diaries",
};

export default function ContentPage() {
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
      <AnimalGrid />
    </main>
  );
}
