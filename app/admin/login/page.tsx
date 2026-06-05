import { LoginForm } from "./login-form";

export const metadata = {
  title: "Sign in — LongEar Admin",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith("/admin") ? next : "/admin";

  return (
    <main className="admin-login-shell">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-brand-mark">LE</span>
          <div>
            <h1>LongEar Admin</h1>
            <p>Sign in with your super-admin account.</p>
          </div>
        </div>
        <LoginForm next={safeNext} />
      </div>
    </main>
  );
}
