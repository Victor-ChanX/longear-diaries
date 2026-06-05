import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getEventsContent } from "@/lib/storage/site-content";

import { EventsForm } from "./events-form";

export const metadata = {
  title: "Edit events page — LongEar Admin",
};

export default async function EditEventsPage() {
  const content = await getEventsContent();

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Events page</h1>
          <p>Hero copy plus the four positional event cards.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/site">
            <ArrowLeft aria-hidden="true" />
            Site content
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <EventsForm content={content} />
      </section>
    </div>
  );
}
