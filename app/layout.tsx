import type { Metadata, Viewport } from "next";

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
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
