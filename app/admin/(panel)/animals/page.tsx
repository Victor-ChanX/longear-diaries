import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { listAnimals } from "@/lib/storage/animals";

import { AnimalTable } from "./animal-table";

export const metadata = {
  title: "Animals — LongEar Admin",
};

export default async function AdminAnimalsPage() {
  const animals = await listAnimals();

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Animals</h1>
          <p>Manage every species profile on the globe and the Content page.</p>
        </div>
        <Button asChild>
          <Link href="/admin/animals/new">
            <Plus aria-hidden="true" />
            New animal
          </Link>
        </Button>
      </header>

      <section className="admin-table-card">
        <header className="admin-table-card-head">
          <h2>All animals</h2>
          <span className="admin-muted">{animals.length} total</span>
        </header>
        <AnimalTable animals={animals} />
      </section>
    </div>
  );
}
