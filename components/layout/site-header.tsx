"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/content", label: "Content" },
  { href: "/events", label: "Events" },
  { href: "/leadership", label: "Leadership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/">
          <span className="site-brand-mark">LE</span>
          <span className="site-brand-name">LongEar Diaries</span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          {NAV_LINKS.map((link) => (
            <Link
              className={cn(
                "site-nav-link",
                isActive(link.href) && "is-active",
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
