import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getContactContent } from "@/lib/storage/site-content";

import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Edit contact page — LongEar Admin",
};

export default async function EditContactPage() {
  const content = await getContactContent();

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Contact page</h1>
          <p>Hero copy plus the three contact channels.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/site">
            <ArrowLeft aria-hidden="true" />
            Site content
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <ContactForm content={content} />
      </section>
    </div>
  );
}
