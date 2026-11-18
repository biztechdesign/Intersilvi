import type { ReactNode } from "react";
import type { Unconfirmed } from "@/lib/content/types";

/**
 * A quieter treatment of an unconfirmed fact than a chip: the value stays at full size and a small asterisk marks it.
 * A visible footnote in the same section must explain the asterisk (see DeliverySection). Confirmed facts render plainly.
 */
export function ConfirmMark<T>({ fact, render }: { fact: Unconfirmed<T>; render?: (value: T) => ReactNode }) {
  const value = render ? render(fact.value) : String(fact.value);
  if (fact.status === "confirmed") return <>{value}</>;
  return (
    <>
      {value}
      <sup title={fact.note} className="ml-0.5 cursor-help text-[0.5em] font-bold text-b-pending">
        *<span className="sr-only"> (to be confirmed: {fact.note})</span>
      </sup>
    </>
  );
}
