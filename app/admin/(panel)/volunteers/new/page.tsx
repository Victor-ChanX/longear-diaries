import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { VolunteerForm } from "../volunteer-form";

export const metadata = {
  title: "New volunteer — LongEar Admin",
};

export default function NewVolunteerPage() {
  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>New volunteer profile</h1>
          <p>
            Upload an avatar, type the name and a short bio. After saving,
            you&apos;ll return to the list.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/volunteers">
            <ArrowLeft aria-hidden="true" />
            Back
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <VolunteerForm />
      </section>
    </div>
  );
}
