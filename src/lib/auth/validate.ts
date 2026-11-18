import { PASSWORD_MIN_LENGTH } from "./config";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const emailError = (v: string) => (!v.trim() ? "Enter your email address." : !isEmail(v) ? "Enter an email address like name@example.com." : undefined);

export const passwordRuleError = (v: string) =>
  !v ? "Enter a password." : v.length < PASSWORD_MIN_LENGTH ? `Use at least ${PASSWORD_MIN_LENGTH} characters.` : undefined;

/** Same-site redirect target only: a path inside this site, never an external URL. */
export function safeNext(value: string | null, base: string): string | null {
  if (!value || !value.startsWith(base + "/") || value.startsWith("//") || value.includes("://")) return null;
  return value;
}
