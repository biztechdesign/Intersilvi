def sub(p, a, b):
    t = open(p, encoding="utf-8").read()
    assert a in t, (p, a[:60])
    open(p, "w", encoding="utf-8").write(t.replace(a, b, 1))

A = "src/lib/auth/adapter.ts"
sub(A, "export interface AuthAdapter {", '''export type AccountKind = "company" | "personal";
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
  selectAccount(id: string): Promise<{ ok: true } | { ok: false; code: "server_error" }>;''')
sub(A, "export const authAdapter: AuthAdapter = {", '''/** PROTOTYPE records that mirror the client's reference. A real storefront returns these from the customer API. */
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
  },''')

sub("src/design-system/components/Icon.tsx", '  eye: "visibility",', '  apartment: "apartment",\n  eye: "visibility",')
D = "src/design-system/components/Interactive.tsx"
sub(D, '  variant?: "modal" | "drawer";\n}', '  variant?: "modal" | "drawer";\n  /** Open as soon as it mounts (for a dialog the flow opens itself, not a trigger). */\n  openOnMount?: boolean;\n  /** false: no close button, Escape and outside click do nothing (a step the customer must complete). Default true. */\n  dismissible?: boolean;\n  onClose?: () => void;\n}')
sub(D, 'export function Dialog({ title, description, trigger, children, footer, variant = "modal" }: DialogProps) {', 'export function Dialog({ title, description, trigger, children, footer, variant = "modal", openOnMount, dismissible = true, onClose }: DialogProps) {')
sub(D, '  const drawer = variant === "drawer";\n  return (', '  const drawer = variant === "drawer";\n  useEffect(() => {\n    if (openOnMount && ref.current && !ref.current.open) ref.current.showModal();\n  }, [openOnMount]);\n  return (')
sub(D, '        onClick={(e) => {\n          if (e.target === ref.current) close();\n        }}', '        onClose={onClose}\n        onCancel={dismissible ? undefined : (e) => e.preventDefault()}\n        onClick={(e) => {\n          if (dismissible && e.target === ref.current) close();\n        }}')
sub(D, '            <IconButton icon="close" label="Close" onClick={close} className="-mr-2 -mt-1" />', '            {dismissible ? <IconButton icon="close" label="Close" onClick={close} className="-mr-2 -mt-1" /> : null}')

L = "src/concepts/concept-b/components/auth/LoginForm.tsx"
sub(L, '      router.push(safeNext(new URLSearchParams(window.location.search).get("next"), BASE) ?? `${BASE}${AUTH_ROUTES.account}`);', '''      const next = safeNext(new URLSearchParams(window.location.search).get("next"), BASE);
      const linked = await authAdapter.listAccounts();
      /* Several linked accounts: choose one first, then continue to the intended page. */
      router.push(linked.length > 1 ? `${BASE}/account/choose${next ? `?next=${encodeURIComponent(next)}` : ""}` : next ?? `${BASE}${AUTH_ROUTES.account}`);''')
sub("src/lib/stubSlugs.ts", 'for (const own of ["account/login", "account/register"])', 'for (const own of ["account/login", "account/register", "account/choose"])')
print("ok")
