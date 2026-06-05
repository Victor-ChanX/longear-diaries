import { cookies } from "next/headers";

import { SignJWT, jwtVerify } from "jose";

import {
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
  getSessionSecret,
} from "./config";

export type AdminSession = {
  username: string;
};

export async function createSessionToken(username: string): Promise<string> {
  const secret = getSessionSecret();

  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<AdminSession | null> {
  try {
    const secret = getSessionSecret();
    const { payload } = await jwtVerify(token, secret);
    const username = payload.username;

    if (typeof username !== "string") return null;

    return { username };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();

  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();

  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCurrentSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  return verifySessionToken(token);
}
