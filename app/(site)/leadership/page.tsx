import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { TeamGrid } from "@/features/leadership/team-grid";

// Read fresh from disk on every request — admin updates show immediately.
export const dynamic = "force-dynamic";

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
          The students who write, illustrate, research, and ship every entry.
          Profiles are managed through the admin panel.
        </p>
      </header>
      <TeamGrid />
    </main>
  );
}
