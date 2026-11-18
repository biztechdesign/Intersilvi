"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/design-system";

/**
 * Site search for the Concept A header. SIMULATED: no search backend is connected.
 * Award-synonym search (OPT-6) is not approved and not implemented.
 *
 * The field is one surface: search button on the left, the input, and an optional trailing slot on the right
 * (the header puts the Quickorder chip there from 1024px up). Focus shows on the whole field.
 */
export function SearchForm({ id, trailing }: { id?: string; trailing?: ReactNode }) {
  const autoId = useId();
  const inputId = id ?? `search-${autoId}`;
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    setMessage(q ? `Prototype: search isn't connected yet, so there are no results for "${q}".` : "Type a product name or an article number.");
  }

  return (
    <form role="search" onSubmit={onSubmit} className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>
      <div className="flex min-h-12 items-center gap-1 rounded-md border border-line bg-surface-alt pl-1 pr-1.5 transition-[border-color,box-shadow,background-color] duration-fast ease-standard hover:border-line-strong focus-within:border-focus focus-within:bg-surface focus-within:shadow-[0_0_0_1px_rgb(var(--ds-color-focus))]">
        <button type="submit" aria-label="Search" className="grid h-10 w-10 flex-none place-items-center rounded-sm text-fg-secondary transition-colors duration-fast hover:text-fg">
          <Icon name="search" size={20} />
        </button>
        <input
          id={inputId}
          name="q"
          type="search"
          autoComplete="off"
          placeholder="Search name or article no."
          onChange={() => message && setMessage("")}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-body text-fg placeholder:text-fg-muted focus:outline-none sm:text-body-lg [&::-webkit-search-cancel-button]:hidden"
        />
        {trailing ? <div className="hidden flex-none lg:block">{trailing}</div> : null}
      </div>
      <p role="status" aria-live="polite" className="absolute inset-x-0 top-[calc(100%+6px)] z-dropdown rounded-md border border-line bg-surface px-4 py-3 text-body-sm shadow-md empty:hidden">
        {message}
      </p>
    </form>
  );
}
