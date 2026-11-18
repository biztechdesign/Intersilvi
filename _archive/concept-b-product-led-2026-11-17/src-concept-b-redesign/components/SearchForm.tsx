"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "./Icon";

/**
 * Site search. SIMULATED: no search backend is connected.
 * Award-synonym search (OPT-6) is not approved and not implemented.
 */
export function SearchForm({ id }: { id?: string }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    setMessage(q ? `Prototype: search isn't connected yet, so there are no results for "${q}".` : "Type a product name or an article number.");
  }

  return (
    <form role="search" onSubmit={onSubmit} className="relative flex w-full items-center">
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        autoComplete="off"
        placeholder="Search name or article no."
        onChange={() => message && setMessage("")}
        className="min-h-12 w-full rounded-b border-0 bg-b-linen py-0 pl-4 pr-12 text-b-small shadow-[inset_0_0_0_1px_theme(colors.b.rule)] transition-shadow placeholder:text-b-ink-3 hover:shadow-[inset_0_0_0_1px_theme(colors.b.rule-strong)] focus-visible:bg-b-paper focus-visible:shadow-[inset_0_0_0_1.5px_theme(colors.b.navy),0_0_0_4px_theme(colors.b.yellow)] focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      <button type="submit" aria-label="Search" className="absolute right-0.5 top-0.5 grid h-11 w-11 place-items-center text-b-ink-2 hover:text-b-ink">
        <Icon name="search" size={18} />
      </button>
      <p
        role="status"
        aria-live="polite"
        className="absolute inset-x-0 top-[calc(100%+0.375rem)] z-b-menu rounded-b border border-b-rule bg-b-paper px-4 py-3 text-b-small shadow-b-menu empty:hidden"
      >
        {message}
      </p>
    </form>
  );
}
