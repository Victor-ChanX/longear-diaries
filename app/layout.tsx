import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "LongEar Diaries — endangered animal field notes from a student-led storytelling project.",
  title: "LongEar Diaries",
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f8f3ea",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <div className="site-shell">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
