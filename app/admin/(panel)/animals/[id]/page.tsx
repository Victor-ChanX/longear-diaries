import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAnimalRaw } from "@/lib/storage/animals";
import { getPublicUrl } from "@/lib/storage/r2";

import { AnimalForm } from "../animal-form";

export const metadata = {
  title: "Edit animal — LongEar Admin",
};

export default async function EditAnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animal = await getAnimalRaw(id);

  if (!animal) notFound();

  const imagePreview = animal.imageKey ? getPublicUrl(animal.imageKey) : null;

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Edit {animal.caption}</h1>
          <p className="admin-muted">{animal.id}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/animals">
            <ArrowLeft aria-hidden="true" />
            Back
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <AnimalForm
          defaults={{
            caption: animal.caption,
            conservationStatus: animal.conservationStatus,
            description: animal.description,
            habitat: animal.habitat,
            id: animal.id,
            imagePreview,
            lat: animal.lat,
            lng: animal.lng,
            objectPosition: animal.objectPosition,
            origin: animal.origin,
            populationNote: animal.populationNote,
            rotate: animal.rotate,
            scientificName: animal.scientificName,
            sortOrder: animal.sortOrder,
          }}
          editId={animal.id}
          submitLabel="Save changes"
        />
      </section>
    </div>
  );
}
