"use client";

import { useEffect, useState } from "react";

/** Shows the choices passed from the homepage builder (?model=...&rings=...). Read in the browser so the page can be exported statically. */
export function QueryFilters() {
  const [filters, setFilters] = useState<string[]>([]);
  useEffect(() => {
    setFilters([...new URLSearchParams(window.location.search)].map(([k, v]) => `${k}: ${v}`));
  }, []);
  if (!filters.length) return null;
  return <p className="rounded-md bg-surface-alt px-4 py-2 text-body-sm text-fg-secondary">Pre-selected from the homepage: {filters.join(", ")}</p>;
}
