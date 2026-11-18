import type { ReactNode } from "react";
import type { Unconfirmed } from "@/lib/content/types";

interface PendingFactProps<T> {
  fact: Unconfirmed<T>;
  render?: (value: T) => ReactNode;
  tone?: "light" | "dark";
}

/**
 * Renders a value from PRODUCT.md's unconfirmed list with a visible "To confirm" tag.
 * Once the client confirms it (status "confirmed"), the tag disappears.
 */
export function PendingFact<T>({ fact, render, tone = "light" }: PendingFactProps<T>) {
  const value = render ? render(fact.value) : String(fact.value);
  if (fact.status === "confirmed") return <>{value}</>;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="underline decoration-dotted decoration-1 underline-offset-[0.25em]">{value}</span>
      <span
        title={fact.note}
        className={`cursor-help whitespace-nowrap rounded-b px-1.5 py-px align-[0.15em] text-[0.75rem] font-semibold leading-normal tracking-[0.02em] ${
          tone === "dark" ? "bg-b-yellow/15 text-b-yellow" : "bg-b-pending-tint text-b-pending"
        }`}
      >
        To confirm
        <span className="sr-only">: {fact.note}</span>
      </span>
    </span>
  );
}
