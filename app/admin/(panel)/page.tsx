import Link from "next/link";

import { PawPrint, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { listAnimals } from "@/lib/storage/animals";
import { listVolunteers } from "@/lib/storage/volunteers";

export const metadata = {
  title: "Dashboard — LongEar Admin",
};

export default async function AdminDashboardPage() {
  const [animals, volunteers] = await Promise.all([
    listAnimals(),
    listVolunteers(),
  ]);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Overview of LongEar Diaries admin data.</p>
      </header>

      <section className="admin-stat-grid">
        <article className="admin-stat-card">
          <p className="admin-stat-label">Animals on the globe</p>
          <p className="admin-stat-value">{animals.length}</p>
        </article>
        <article className="admin-stat-card">
          <p className="admin-stat-label">Volunteer profiles</p>
          <p className="admin-stat-value">{volunteers.length}</p>
        </article>
      </section>

      <section className="admin-cta-card">
        <div>
          <h2>Animals</h2>
          <p>
            Add, edit, or remove species. Changes update the globe and /content
            immediately.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/animals">
            <PawPrint aria-hidden="true" />
            Manage animals
          </Link>
        </Button>
      </section>

      <section className="admin-cta-card">
        <div>
          <h2>Volunteers</h2>
          <p>Add a volunteer with their avatar, name, and personal bio.</p>
        </div>
        <Button asChild>
          <Link href="/admin/volunteers">
            <Users aria-hidden="true" />
            Manage volunteers
          </Link>
        </Button>
      </section>
    </div>
  );
}
