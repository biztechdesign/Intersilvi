"use client";

import { useId, useState, type FormEvent } from "react";

/** Newsletter sign-up. SIMULATED: the address is validated but not sent anywhere. */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId();
  const [state, setState] = useState<{ kind: "idle" | "error" | "done"; text: string }>({ kind: "idle", text: "" });
  const dark = tone === "dark";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ kind: "error", text: "Enter an email address like name@club.se." });
      return;
    }
    setState({ kind: "done", text: "Prototype: sign-up isn't connected yet, so nothing was sent." });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-[30rem] gap-2">
      <label htmlFor={`${id}-email`} className={`text-b-label font-semibold ${dark ? "text-b-on-navy-2" : "text-b-ink-2"}`}>
        Email address
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={state.kind === "error"}
          aria-describedby={`${id}-msg`}
          onChange={() => state.kind === "error" && setState({ kind: "idle", text: "" })}
          className="min-h-[3.25rem] min-w-0 flex-[1_1_12rem] rounded-b border-0 bg-b-paper px-4 text-b-body text-b-ink shadow-[inset_0_0_0_1px_theme(colors.b.rule-strong)] focus-visible:shadow-[inset_0_0_0_1.5px_theme(colors.b.navy),0_0_0_4px_theme(colors.b.yellow)] focus-visible:outline-none aria-[invalid=true]:shadow-[inset_0_0_0_2px_theme(colors.b.danger)]"
        />
        <button
          type="submit"
          className={`min-h-[3.25rem] flex-[1_0_auto] rounded-b px-6 text-b-small font-semibold ${dark ? "bg-b-yellow text-b-navy-deep hover:bg-b-yellow-deep" : "bg-b-navy text-b-on-navy hover:bg-b-navy-soft"}`}
        >
          Subscribe
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role="status"
        aria-live="polite"
        className={`min-h-[1.5em] text-b-small ${state.kind === "error" ? (dark ? "text-b-yellow" : "text-b-danger") : dark ? "text-b-on-navy-2" : "text-b-ink-2"}`}
      >
        {state.text}
      </p>
    </form>
  );
}
