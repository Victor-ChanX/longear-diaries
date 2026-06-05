import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getCurrentSession } from "@/lib/auth/session";

export const metadata = {
  title: "Admin — LongEar Diaries",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  // The proxy already redirects unauthenticated visitors. This is a
  // belt-and-braces fallback (and a way to expose the username to children).
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      <AdminSidebar username={session.username} />
      <div className="admin-content">{children}</div>
    </div>
  );
}
