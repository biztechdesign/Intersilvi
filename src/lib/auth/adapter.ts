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
  customerType: "company" | "association" | "individual";
  /** The values of the fields shown for that customer type (see lib/auth/registration.ts). */
  values: Partial<Record<"email" | "password" | "confirm" | "firstName" | "lastName" | "phone" | "street" | "city" | "postalCode" | "country" | "region" | "vatNumber", string>>;
}

export type AccountKind = "company" | "personal";
export interface LinkedAccount {
  id: string;
  name: string;
  /** Secondary line, when the account has one. */
  detail?: string;
  kind: AccountKind;
}
export const ACCOUNT_KIND_LABEL: Record<AccountKind, string> = { company: "Company / Association", personal: "Personal / Kennel" };

export interface AuthAdapter {
  /** Accounts linked to the signed-in customer. One account (or none) means no choice is needed. */
  listAccounts(): Promise<LinkedAccount[]>;
  /** Makes the account the active one for payments, order history and saved logos. */
  selectAccount(id: string): Promise<{ ok: true } | { ok: false; code: "server_error" }>;
  signIn(email: string, password: string): Promise<SignInResult>;
  register(input: RegisterInput): Promise<RegisterResult>;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const accounts = new Map<string, string>([["demo@intersilvi.se", "Silvi-demo-1"]]);

/** PROTOTYPE records that mirror the client's reference. A real storefront returns these from the customer API. */
const demoAccounts: LinkedAccount[] = [
  { id: "a1", name: "Daniel (info) Listerud", detail: "Inter Silvi AB (info)", kind: "company" },
  { id: "a2", name: "Inter Silvi AB (main)", detail: "Inter Silvi AB (main)", kind: "company" },
  { id: "a3", name: "DEED", detail: "DEED", kind: "company" },
  { id: "a4", name: "Daniel Listerud", kind: "personal" },
];
let selectFailures = 1; // the first selection of DEED fails once, so the retry path can be seen

export const authAdapter: AuthAdapter = {
  async listAccounts() {
    await wait(300);
    return demoAccounts;
  },
  async selectAccount(id) {
    await wait(700);
    if (id === "a3" && selectFailures-- > 0) return { ok: false, code: "server_error" };
    return { ok: true };
  },
  async signIn(email, password) {
    await wait(700);
    const e = email.trim().toLowerCase();
    if (e.startsWith("error@")) return { ok: false, code: "server_error" };
    return accounts.get(e) === password ? { ok: true } : { ok: false, code: "invalid_credentials" };
  },
  async register({ values }) {
    await wait(900);
    const e = (values.email ?? "").trim().toLowerCase();
    const password = values.password ?? "";
    if (e.startsWith("error@")) return { ok: false, code: "server_error" };
    if (e === "taken@example.com" || accounts.has(e)) return { ok: false, code: "email_exists" };
    accounts.set(e, password);
    return { ok: true };
  },
};
