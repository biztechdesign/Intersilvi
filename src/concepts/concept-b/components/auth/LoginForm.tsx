"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, Field, TextInput, describedBy } from "@/design-system";
import { authAdapter } from "@/lib/auth/adapter";
import { AUTH_ROUTES } from "@/lib/auth/config";
import { emailError, safeNext } from "@/lib/auth/validate";
import { BASE } from "../../base";
import { REVIEW_MODE } from "@/lib/reviewMode";
import { PasswordField } from "./PasswordField";

type Errors = { email?: string; password?: string };

const focus = (id: string) => document.getElementById(id)?.focus();

/**
 * Returning-customer form. Validates in the browser, then calls the auth adapter (simulated in this prototype).
 * Wrong-credential and server messages are deliberately generic: they never say which of the two was wrong.
 * After sign-in it follows ?next= when it is a path inside this site (checkout can set it), otherwise goes to the account page.
 */
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || done) return;
    const next: Errors = { email: emailError(email), password: password ? undefined : "Enter your password." };
    setErrors(next);
    setFormError(null);
    if (next.email) return focus("login-email");
    if (next.password) return focus("login-password");

    setBusy(true);
    const result = await authAdapter.signIn(email, password);
    setBusy(false);
    if (result.ok) {
      setDone(true);
      const next = safeNext(new URLSearchParams(window.location.search).get("next"), BASE);
      const linked = await authAdapter.listAccounts();
      /* Several linked accounts: choose one first, then continue to the intended page. */
      router.push(linked.length > 1 ? `${BASE}/account/choose${next ? `?next=${encodeURIComponent(next)}` : ""}` : next ?? (REVIEW_MODE ? BASE : `${BASE}${AUTH_ROUTES.account}`));
      return;
    }
    setPassword("");
    setFormError(
      result.code === "invalid_credentials"
        ? "We couldn't sign you in. Check your email address and password and try again."
        : "Something went wrong on our side. Please try again in a moment.",
    );
    focus("login-password");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {formError ? <Alert tone="error">{formError}</Alert> : null}
      {done ? <Alert tone="success">Signed in. Taking you to your account…</Alert> : null}
      <fieldset disabled={busy || done} className="grid min-w-0 gap-5 border-0 p-0">
        <Field id="login-email" label="Email address" error={errors.email}>
          <TextInput
            id="login-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("login-email", { error: errors.email })}
          />
        </Field>
        <PasswordField
          id="login-password"
          name="password"
          label="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          below={
            <Link href={`${BASE}${AUTH_ROUTES.forgotPassword}`} className="-my-1 inline-flex min-h-11 items-center justify-self-end text-body-sm font-semibold text-fg-link">
              Forgot password?
            </Link>
          }
        />
      </fieldset>
      <Button type="submit" variant="primary" size="md" block loading={busy} iconEnd={busy ? undefined : "arrow-right"}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
