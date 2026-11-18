/**
 * Auth adapter for the headless storefront.
 *
 * The forms only talk to this interface. The implementation below is a SIMULATION for the prototype: it keeps accounts in
 * memory for the browser session and answers after a short delay. Connect the storefront by replacing `authAdapter` with
 * calls to the real customer API (the form code, validation and states do not change).
 *
 * Demo behaviour:
 *  - Sign in: demo@intersilvi.se / Silvi-demo-1 succeeds. A wrong password gives "invalid_credentials".
 *    An email starting with "error@" simulates a server failure.
 *  - Register: "taken@example.com" simulates an already-registered email. "error@..." simulates a server failure.
 *    A registered account can then sign in during the same session. Registration does NOT sign the user in.
 */
export type SignInResult = { ok: true } | { ok: false; code: "invalid_credentials" | "server_error" };
export type RegisterResult = { ok: true } | { ok: false; code: "email_exists" | "server_error" };

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthAdapter {
  signIn(email: string, password: string): Promise<SignInResult>;
  register(input: RegisterInput): Promise<RegisterResult>;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const accounts = new Map<string, string>([["demo@intersilvi.se", "Silvi-demo-1"]]);

export const authAdapter: AuthAdapter = {
  async signIn(email, password) {
    await wait(700);
    const e = email.trim().toLowerCase();
    if (e.startsWith("error@")) return { ok: false, code: "server_error" };
    return accounts.get(e) === password ? { ok: true } : { ok: false, code: "invalid_credentials" };
  },
  async register({ email, password }) {
    await wait(900);
    const e = email.trim().toLowerCase();
    if (e.startsWith("error@")) return { ok: false, code: "server_error" };
    if (e === "taken@example.com" || accounts.has(e)) return { ok: false, code: "email_exists" };
    accounts.set(e, password);
    return { ok: true };
  },
};
