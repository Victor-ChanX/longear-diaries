"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";

import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="admin-login-form">
      <input name="next" type="hidden" value={next} />
      <label>
        <span>Username</span>
        <input
          autoComplete="username"
          name="username"
          placeholder="admin"
          required
          type="text"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          autoComplete="current-password"
          name="password"
          required
          type="password"
        />
      </label>
      {state.error && <p className="admin-form-error">{state.error}</p>}
      <Button disabled={pending} type="submit">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
