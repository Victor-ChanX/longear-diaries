import { NextResponse, type NextRequest } from "next/server";

import { jwtVerify } from "jose";

import { SESSION_COOKIE } from "@/lib/auth/config";

const isAdminPath = (pathname: string) => pathname.startsWith("/admin");
const isAdminLogin = (pathname: string) =>
  pathname === "/admin/login" || pathname.startsWith("/admin/login/");

const getSecret = (): Uint8Array | null => {
  const value = process.env.ADMIN_SESSION_SECRET;

  if (!value || value.length < 32) return null;

  return new TextEncoder().encode(value);
};

const isValidSession = async (token: string | undefined): Promise<boolean> => {
  if (!token) return false;

  const secret = getSecret();

  if (!secret) return false;

  try {
    await jwtVerify(token, secret);

    return true;
  } catch {
    return false;
  }
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public-site server-action probe shield (unchanged behaviour for non-admin).
  if (request.headers.has("next-action") && !isAdminPath(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (isAdminPath(pathname)) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const authed = await isValidSession(token);

    if (!authed && !isAdminLogin(pathname)) {
      const url = request.nextUrl.clone();

      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);

      return NextResponse.redirect(url);
    }

    if (authed && isAdminLogin(pathname)) {
      const url = request.nextUrl.clone();

      url.pathname = "/admin";
      url.search = "";

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
