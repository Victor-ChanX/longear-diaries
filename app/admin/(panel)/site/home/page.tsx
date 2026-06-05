import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getHomeContent } from "@/lib/storage/site-content";

import { HomeForm } from "./home-form";

export const metadata = {
  title: "Edit home page — LongEar Admin",
};

export default async function EditHomePage() {
  const content = await getHomeContent();

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Home page</h1>
          <p>Hero copy, manifesto, stats, values, and the closing CTA.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/site">
            <ArrowLeft aria-hidden="true" />
            Site content
          </Link>
        </Button>
      </header>

      <section className="admin-form-card">
        <HomeForm content={content} />
      </section>
    </div>
  );
}
