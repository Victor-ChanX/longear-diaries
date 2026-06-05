import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { listVolunteers } from "@/lib/storage/volunteers";

import { VolunteerTable } from "./volunteer-table";

export const metadata = {
  title: "Volunteers — LongEar Admin",
};

export default async function AdminVolunteersPage() {
  const volunteers = await listVolunteers();

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Volunteer profiles</h1>
          <p>
            Avatar, name, and a short bio — that&apos;s all that&apos;s needed.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/volunteers/new">
            <Plus aria-hidden="true" />
            New volunteer
          </Link>
        </Button>
      </header>

      <section className="admin-table-card">
        <header className="admin-table-card-head">
          <h2>All profiles</h2>
          <span className="admin-muted">{volunteers.length} total</span>
        </header>
        <VolunteerTable volunteers={volunteers} />
      </section>
    </div>
  );
}
