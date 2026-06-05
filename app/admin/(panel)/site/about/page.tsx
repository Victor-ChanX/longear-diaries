import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAboutContent } from "@/lib/storage/site-content";

import { AboutForm } from "./about-form";

export const metadata = {
  title: "Edit about page — LongEar Admin",
};

export default async function EditAboutPage() {
  const content = await getAboutContent();

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>About page</h1>
          <p>Title, subtitle, and the long-form story sections.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/site">
            <ArrowLeft aria-hidden="true" />
            Site content
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <AboutForm content={content} />
      </section>
    </div>
  );
}
