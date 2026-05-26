import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { TeamGrid } from "@/features/leadership/team-grid";

export const metadata: Metadata = {
  description:
    "The students behind LongEar Diaries — design, research, content, and engineering.",
  title: "Leadership — LongEar Diaries",
};

export default function LeadershipPage() {
  return (
    <main className="page-shell">
      <header className="page-hero">
        <Badge variant="secondary">Leadership</Badge>
        <h1>The people running the diary.</h1>
        <p>
          LongEar Diaries is a student-led project. Every profile, illustration,
          and animation passes through these eight pairs of hands.
        </p>
      </header>
      <TeamGrid />
    </main>
  );
}
