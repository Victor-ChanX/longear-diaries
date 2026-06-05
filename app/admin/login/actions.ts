"use server";

import { redirect } from "next/navigation";

import { getAdminCredentials } from "@/lib/auth/config";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

export type LoginState = {
  error?: string;
};

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) {
    // Still walk the longer string to avoid early-return timing leak.
    const longer = a.length > b.length ? a : b;
    let diff = 1;

    for (let i = 0; i < longer.length; i += 1) {
      diff |= longer.charCodeAt(i);
    }

    return diff === 0;
  }

  let diff = 0;

  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diff === 0;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");

  if (!username || !password) {
    return { error: "Please enter both username and password." };
  }

  const creds = getAdminCredentials();

  const usernameOk = timingSafeEqual(username, creds.username);
  const passwordOk = timingSafeEqual(password, creds.password);

  if (!usernameOk || !passwordOk) {
    return { error: "Wrong username or password." };
  }

  const token = await createSessionToken(creds.username);

  await setSessionCookie(token);

  const safeNext = nextPath.startsWith("/admin") ? nextPath : "/admin";

  redirect(safeNext);
}
