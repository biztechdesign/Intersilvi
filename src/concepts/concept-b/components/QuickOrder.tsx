import Link from "next/link";
import { Icon } from "@/design-system";
import { BASE } from "../base";

/**
 * Quickorder entry: a plain link to the Quickorder page (no popup). The page itself is outside the homepage
 * prototype, so it resolves to the placeholder route until Quickorder is built.
 */
export function QuickOrder({ variant = "bar" }: { variant?: "bar" | "tab" | "drawer" }) {
  const cls =
    variant === "tab"
      ? "inline-flex min-h-12 items-center gap-2 self-stretch bg-action-accent px-5 text-body-sm font-bold text-fg-on-accent no-underline transition-colors duration-fast ease-standard hover:bg-action-accent-hover"
      : variant === "bar"
        ? "inline-flex min-h-12 items-center gap-2 text-body-sm font-semibold text-brand-yellow no-underline transition-colors duration-fast ease-standard hover:text-fg-inverse"
        : "flex min-h-12 w-full items-center gap-3 text-left text-body font-semibold text-fg no-underline";
  return (
    <Link href={`${BASE}/quickorder`} className={cls}>
      <Icon name="list" size={variant === "drawer" ? 16 : 18} />
      Quickorder
    </Link>
  );
}
