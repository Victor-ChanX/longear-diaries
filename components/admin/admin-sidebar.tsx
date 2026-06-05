"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FileText,
  LayoutDashboard,
  LogOut,
  PawPrint,
  Users,
} from "lucide-react";

import { logoutAction } from "@/app/admin/logout/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/animals", icon: PawPrint, label: "Animals" },
  { href: "/admin/volunteers", icon: Users, label: "Volunteers" },
  { href: "/admin/site", icon: FileText, label: "Site content" },
];

type AdminSidebarProps = {
  username: string;
};

export function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="admin-brand-mark">LE</span>
        <div>
          <p className="admin-brand-name">LongEar Admin</p>
          <p className="admin-brand-user">Signed in as {username}</p>
        </div>
      </div>

      <nav aria-label="Admin sections" className="admin-nav">
        {NAV.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              className={cn(
                "admin-nav-link",
                isActive(item.href) && "is-active",
              )}
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="admin-logout">
        <button type="submit">
          <LogOut aria-hidden="true" />
          <span>Sign out</span>
        </button>
      </form>
    </aside>
  );
}
