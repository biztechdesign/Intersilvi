"use client";

import { useId, useState, type FormEvent } from "react";

/** Footer newsletter sign-up: one rounded field with the Subscribe button inside. SIMULATED: validates only, sends nothing. */
export function FooterNewsletter() {
  const id = useId();
  const [state, setState] = useState<{ kind: "idle" | "error" | "done"; text: string }>({ kind: "idle", text: "" });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState({ kind: "error", text: "Enter an email address like name@club.se." });
    setState({ kind: "done", text: "Prototype: sign-up isn't connected yet, so nothing was sent." });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative w-full md:max-w-[26rem]">
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-full bg-surface p-1.5 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-yellow">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={state.kind === "error"}
          aria-describedby={`${id}-msg`}
          onChange={() => state.kind === "error" && setState({ kind: "idle", text: "" })}
          className="min-h-10 min-w-0 flex-1 bg-transparent pl-4 text-body text-fg placeholder:text-fg-muted focus:outline-none"
        />
        <button
          type="submit"
          className="min-h-11 flex-none rounded-full bg-action-accent px-5 text-button font-bold text-fg-on-accent transition-colors duration-fast ease-standard hover:bg-action-accent-hover"
        >
          Subscribe
        </button>
      </div>
      <p id={`${id}-msg`} role="status" aria-live="polite" className={`mt-2 text-body-sm md:absolute md:inset-x-0 md:top-full ${state.kind === "error" ? "text-brand-yellow" : "text-fg-inverse-muted"}`}>
        {state.text}
      </p>
    </form>
  );
}
