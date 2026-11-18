"use client";

import { useEffect, useState } from "react";
import { Alert, Dialog, Icon, Spinner } from "@/design-system";
import { ACCOUNT_KIND_LABEL, authAdapter, type LinkedAccount } from "@/lib/auth/adapter";

/**
 * "Choose an account" modal for customers with several linked accounts.
 * Accounts come from the auth adapter (never hard-coded here). Picking a row calls the adapter's selectAccount, then
 * `onSelected`. The step is mandatory in this prototype, so there is no close button, Escape or backdrop dismissal.
 * Every row is one button: the whole row is the target, it shows a spinner while that account is being activated,
 * and other rows wait until the request ends. A failure keeps the list and offers another try.
 */
export function AccountPicker({ onSelected }: { onSelected: (account: LinkedAccount) => void }) {
  const [accounts, setAccounts] = useState<LinkedAccount[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authAdapter.listAccounts().then(setAccounts, () => setLoadError(true));
  }, []);

  async function choose(a: LinkedAccount) {
    if (pending) return;
    setPending(a.id);
    setError(null);
    const r = await authAdapter.selectAccount(a.id);
    setPending(null);
    if (r.ok) onSelected(a);
    else setError(`We couldn't switch to ${a.name}. Please try again.`);
  }

  return (
    <Dialog
      openOnMount
      dismissible={false}
      title="Choose an account"
      description="Select the account you'd like to use for orders, payments and saved details."
      trigger={() => null}
    >
      <div className="grid gap-4">
        {loadError ? (
          <Alert tone="error">We couldn&apos;t load your accounts. Reload the page to try again.</Alert>
        ) : accounts === null ? (
          <div className="grid place-items-center py-8">
            <Spinner label="Loading your accounts" />
          </div>
        ) : accounts.length === 0 ? (
          <Alert tone="info">No accounts are linked to this sign-in yet. Contact customer service and we&apos;ll help you.</Alert>
        ) : (
          <ul className="grid gap-2" aria-label="Your accounts">
            {accounts.map((a) => {
              const busy = pending === a.id;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => choose(a)}
                    disabled={!!pending && !busy}
                    aria-busy={busy || undefined}
                    className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 rounded-md border border-line bg-surface-alt px-3.5 py-3 text-left transition-colors duration-fast ease-standard hover:border-line-strong hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-60 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
                  >
                    <span aria-hidden="true" className="row-span-2 grid h-10 w-10 place-items-center rounded-md bg-surface text-fg shadow-[inset_0_0_0_1px_rgb(var(--ds-color-line))] sm:row-span-1">
                      <Icon name={a.kind === "company" ? "apartment" : "user"} size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-body font-bold leading-snug text-fg [overflow-wrap:anywhere]">{a.name}</span>
                      {a.detail ? <span className="block text-body-sm text-fg-muted [overflow-wrap:anywhere]">{a.detail}</span> : null}
                    </span>
                    <span className="col-start-2 text-label font-medium text-fg-secondary sm:col-start-auto sm:whitespace-nowrap">{ACCOUNT_KIND_LABEL[a.kind]}</span>
                    <span aria-hidden="true" className="col-start-3 row-span-2 row-start-1 grid place-items-center text-fg-secondary sm:col-start-auto sm:row-span-1">
                      {busy ? <Spinner size="sm" label="Switching account" /> : <Icon name="arrow-right" size={20} className="transition-transform duration-fast group-hover:translate-x-0.5" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {error ? <Alert tone="error">{error}</Alert> : null}
        <div className="border-t border-line pt-3 text-body-sm text-fg-muted">
          <p>Your selected account determines which orders, payments and saved logos you can access.</p>
          <p className="mt-0.5">You can switch accounts later from My account.</p>
        </div>
      </div>
    </Dialog>
  );
}
