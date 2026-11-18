"use client";

import { useState, type FormEvent } from "react";
import { SearchInput } from "@/design-system";

/**
 * Site search on the shared SearchInput (rounded-sm, 1px line-input border, submit button inside the field).
 * SIMULATED: no search backend is connected. Award-synonym search (OPT-6) is not approved and not implemented.
 */
export function SearchForm({ id = "site-search", size = "md" }: { id?: string; size?: "md" | "lg" }) {
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    setMessage(q ? `Prototype: search isn't connected yet, so there are no results for "${q}".` : "Type a product name or an article number.");
  }

  return (
    <form role="search" onSubmit={onSubmit} className="relative w-full">
      {/* Concept B: a visible 1px border (the shared pill style is borderless) and a smaller placeholder than the typed text. */}
      <SearchInput
        id={id}
        name="q"
        size={size}
        placeholder="Search name or article no."
        onChange={() => message && setMessage("")}
        className="[&_input:hover]:!border-fg-secondary [&_input:not(:hover):not(:focus-visible)]:!border-line-input [&_input::placeholder]:text-body-sm"
      />
      <p role="status" aria-live="polite" className="absolute inset-x-0 top-[calc(100%+6px)] z-dropdown rounded-md border border-line bg-surface px-4 py-3 text-body-sm shadow-md empty:hidden">
        {message}
      </p>
    </form>
  );
}
