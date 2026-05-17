import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "A cobe Polaroids globe built with Next.js, Tailwind, and shadcn.",
  title: "Longear Globe",
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
      <body>{children}</body>
    </html>
  );
}
