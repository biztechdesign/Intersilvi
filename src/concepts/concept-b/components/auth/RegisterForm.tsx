"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, ButtonLink, Field, TextInput, describedBy } from "@/design-system";
import { authAdapter } from "@/lib/auth/adapter";
import { AUTH_ROUTES, PASSWORD_MIN_LENGTH } from "@/lib/auth/config";
import { emailError, passwordRuleError } from "@/lib/auth/validate";
import { BASE } from "../../base";
import { PasswordField } from "./PasswordField";

type Key = "firstName" | "lastName" | "email" | "password" | "confirm";
type Errors = Partial<Record<Key, string>>;

const ORDER: Key[] = ["firstName", "lastName", "email", "password", "confirm"];
const IDS: Record<Key, string> = { firstName: "reg-first", lastName: "reg-last", email: "reg-email", password: "reg-password", confirm: "reg-confirm" };
const focus = (k: Key) => document.getElementById(IDS[k])?.focus();

type Values = Record<Key, string>;

const validate = (v: Values): Errors => ({
  firstName: v.firstName.trim() ? undefined : "Enter your first name.",
  lastName: v.lastName.trim() ? undefined : "Enter your last name.",
  email: emailError(v.email),
  password: passwordRuleError(v.password),
  confirm: !v.confirm ? "Confirm your password." : v.confirm !== v.password ? "The passwords don't match." : undefined,
});

/**
 * Registration form: first name, last name, email, password and confirmation (the supported fields only).
 * Registration does not sign the customer in and adds no verification step: success tells them to sign in.
 * Everything typed is kept after an error so the customer fixes only what is wrong.
 */
export function RegisterForm() {
  const [v, setV] = useState<Values>({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const change = (k: Key) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));
  /* Once a field has shown an error, re-check it when the user leaves it, so the message clears as soon as it is fixed. */
  const recheck = (k: Key) => () => {
    if (errors[k]) setErrors((p) => ({ ...p, [k]: validate(v)[k] }));
  };
  const props = (k: Key) => ({
    id: IDS[k],
    required: true,
    value: v[k],
    onChange: change(k),
    onBlur: recheck(k),
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": describedBy(IDS[k], { error: errors[k] }),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const next = validate(v);
    setErrors(next);
    setFormError(null);
    const first = ORDER.find((k) => next[k]);
    if (first) return focus(first);

    setBusy(true);
    const result = await authAdapter.register({ firstName: v.firstName.trim(), lastName: v.lastName.trim(), email: v.email.trim(), password: v.password });
    setBusy(false);
    if (result.ok) return setDone(true);
    if (result.code === "email_exists") {
      setErrors({ email: "An account with this email address already exists. Sign in instead, or use a different email address." });
      focus("email");
    } else {
      setFormError("Something went wrong on our side. Your details are still here, so please try again in a moment.");
    }
  }

  if (done) {
    return (
      <div className="grid gap-5">
        <Alert tone="success" title="Your account has been created">
          Welcome to Silvi, {v.firstName.trim()}. You can now sign in with {v.email.trim()}.
        </Alert>
        <ButtonLink href={`${BASE}${AUTH_ROUTES.login}`} variant="primary" block>
          Sign in
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {formError ? <Alert tone="error">{formError}</Alert> : null}
      <fieldset disabled={busy} className="grid min-w-0 gap-5 border-0 p-0">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={IDS.firstName} label="First name" error={errors.firstName}>
            <TextInput name="firstName" autoComplete="given-name" {...props("firstName")} />
          </Field>
          <Field id={IDS.lastName} label="Last name" error={errors.lastName}>
            <TextInput name="lastName" autoComplete="family-name" {...props("lastName")} />
          </Field>
        </div>
        <Field id={IDS.email} label="Email address" error={errors.email}>
          <TextInput name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} {...props("email")} />
        </Field>
        <PasswordField
          name="password"
          label="Password"
          autoComplete="new-password"
          error={errors.password}
          help={`Use at least ${PASSWORD_MIN_LENGTH} characters.`}
          {...props("password")}
        />
        <PasswordField name="confirmPassword" label="Confirm password" autoComplete="new-password" error={errors.confirm} {...props("confirm")} />
      </fieldset>
      <Button type="submit" variant="primary" size="md" block loading={busy} iconEnd={busy ? undefined : "arrow-right"}>
        {busy ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-body-sm text-fg-secondary">
        Already have an account?{" "}
        <Link href={`${BASE}${AUTH_ROUTES.login}`} className="font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  );
}
