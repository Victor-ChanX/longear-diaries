import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AnimalForm } from "../animal-form";

export const metadata = {
  title: "New animal — LongEar Admin",
};

export default function NewAnimalPage() {
  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>New animal</h1>
          <p>
            Add a species profile. After saving, you&apos;ll return to the
            animals list.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/animals">
            <ArrowLeft aria-hidden="true" />
            Back
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <AnimalForm submitLabel="Create animal" />
      </section>
    </div>
  );
}
