"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, ButtonLink, Field, Radio, Select, TextInput, describedBy } from "@/design-system";
import { authAdapter } from "@/lib/auth/adapter";
import { AUTH_ROUTES, PASSWORD_MIN_LENGTH } from "@/lib/auth/config";
import { DEFAULT_COUNTRY, DEFAULT_CUSTOMER_TYPE, countries, customerTypes, fieldDefs, fieldsByType, type CustomerType, type FieldKey } from "@/lib/auth/registration";
import { emailError, passwordRuleError } from "@/lib/auth/validate";
import { BASE } from "../../base";
import { PasswordField } from "./PasswordField";

type Values = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: Values = { email: "", password: "", confirm: "", firstName: "", lastName: "", phone: "", street: "", city: "", postalCode: "", country: DEFAULT_COUNTRY, region: "", vatNumber: "" };
const idOf = (k: FieldKey) => `reg-${k}`;
const focus = (k: FieldKey) => document.getElementById(idOf(k))?.focus();
const required = (label: string) => `Enter your ${label.toLowerCase()}.`;

/** Checks only the fields that the chosen customer type shows. */
function validate(v: Values, keys: FieldKey[]): Errors {
  const e: Errors = {};
  for (const k of keys) {
    const def = fieldDefs[k];
    const value = v[k];
    if (k === "email") e.email = emailError(value);
    else if (k === "password") e.password = passwordRuleError(value);
    else if (k === "confirm") e.confirm = !value ? "Confirm your password." : value !== v.password ? "The passwords don't match." : undefined;
    else if (k === "phone") e.phone = !value.trim() ? required(def.label) : !/^[+()\d\s-]{6,}$/.test(value.trim()) ? "Enter a phone number like +46 479 100 70." : undefined;
    else if (def.required && !value.trim()) e[k] = required(def.label);
  }
  return e;
}

/**
 * Registration form from the current site: customer type (Individual / Kennel by default), then the fields for that type.
 * The field list per type lives in lib/auth/registration.ts. Registration does not sign the customer in and adds no
 * verification step. Everything typed is kept after an error, and switching type keeps what was already entered.
 */
export function RegisterForm() {
  const [type, setType] = useState<CustomerType>(DEFAULT_CUSTOMER_TYPE);
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const keys = fieldsByType[type];

  const change = (k: FieldKey) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));
  /* Once a field has shown an error, re-check it when the user leaves it, so the message clears as soon as it is fixed. */
  const recheck = (k: FieldKey) => () => {
    if (errors[k]) setErrors((p) => ({ ...p, [k]: validate(v, keys)[k] }));
  };
  const common = (k: FieldKey) => ({
    id: idOf(k),
    value: v[k],
    onChange: change(k),
    onBlur: recheck(k),
    required: fieldDefs[k].required,
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": describedBy(idOf(k), { error: errors[k] }),
  });

  function renderField(k: FieldKey) {
    const def = fieldDefs[k];
    if (k === "password")
      return <PasswordField key={k} name="password" label={def.label} autoComplete="new-password" error={errors.password} help={`Use at least ${PASSWORD_MIN_LENGTH} characters.`} {...common(k)} />;
    if (k === "confirm") return <PasswordField key={k} name="confirmPassword" label={def.label} autoComplete="new-password" error={errors.confirm} {...common(k)} />;
    const field = (control: React.ReactNode) => (
      <Field key={k} id={idOf(k)} label={def.label} optional={!def.required} error={errors[k]}>
        {control}
      </Field>
    );
    if (k === "country")
      return field(
        <Select name="country" autoComplete="country-name" {...common(k)}>
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>,
      );
    const attrs: Record<string, Record<string, unknown>> = {
      email: { type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", spellCheck: false },
      firstName: { autoComplete: "given-name" },
      lastName: { autoComplete: "family-name" },
      phone: { type: "tel", inputMode: "tel", autoComplete: "tel" },
      street: { autoComplete: "street-address" },
      city: { autoComplete: "address-level2" },
      postalCode: { autoComplete: "postal-code" },
      region: { autoComplete: "address-level1" },
      vatNumber: { autoComplete: "off", autoCapitalize: "characters" },
    };
    return field(<TextInput name={k} {...attrs[k]} {...common(k)} />);
  }

  /* Short fields that are paired in the definitions share a row from 640px. */
  const rows: FieldKey[][] = [];
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]!;
    const next = keys[i + 1];
    if (fieldDefs[k].pairWithNext && next) {
      rows.push([k, next]);
      i++;
    } else rows.push([k]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const next = validate(v, keys);
    setErrors(next);
    setFormError(null);
    const first = keys.find((k) => next[k]);
    if (first) return focus(first);

    setBusy(true);
    const result = await authAdapter.register({ customerType: type, values: Object.fromEntries(keys.map((k) => [k, v[k].trim()])) as Partial<Record<FieldKey, string>> });
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
        {/* Email comes first, then the customer type, as on the current site. */}
        {rows.slice(0, 1).map((r) => r.map(renderField))}
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="mb-3 p-0 text-label text-fg">What type of customer are you? It is important that you do the right thing!</legend>
          <div className="flex flex-wrap gap-2 [&_label]:whitespace-nowrap">
            {customerTypes.map((t) => (
              <div key={t.id} className={`flex min-h-12 items-center rounded-md border px-3 py-2 transition-colors duration-fast ${type === t.id ? "border-selected bg-selected-surface" : "border-line-input bg-surface hover:border-fg-secondary"}`}>
                <Radio id={`reg-type-${t.id}`} name="customerType" label={t.label} checked={type === t.id} onChange={() => setType(t.id)} />
              </div>
            ))}
          </div>
        </fieldset>
        {rows.slice(1).map((r) =>
          r.length === 2 ? (
            <div key={r.join("-")} className="grid gap-5 sm:grid-cols-2">
              {r.map(renderField)}
            </div>
          ) : (
            renderField(r[0]!)
          ),
        )}
      </fieldset>
      <Button type="submit" variant="primary" size="md" block loading={busy} iconEnd={busy ? undefined : "arrow-right"}>
        {busy ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-body-sm text-fg-secondary">
        Already have an account?{" "}
        <Link href={`${BASE}${AUTH_ROUTES.login}`} className="inline-flex min-h-11 items-center font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  );
}
