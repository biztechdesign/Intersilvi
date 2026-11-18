import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * Concept B buttons: pills at one shared size, so two journey actions side by side carry equal weight.
 * - design: brand gold. The "Design your own" journey owns gold.
 * - shop: navy on light grounds. shop-light: white on photographs and navy.
 * - outline / outline-light: secondary actions.
 * - text / text-light: inline link actions.
 */
export type ButtonVariant = "design" | "shop" | "shop-light" | "outline" | "outline-light" | "text" | "text-light";

const base =
  "group inline-flex min-h-[3.25rem] items-center justify-between gap-4 rounded-b-pill text-b-small font-semibold no-underline transition-[background-color,color,box-shadow] duration-200 ease-b-out";

const variants: Record<ButtonVariant, string> = {
  design: "px-7 bg-b-yellow text-b-navy-deep shadow-b-card hover:bg-b-yellow-deep",
  shop: "px-7 bg-b-navy text-b-on-navy shadow-b-card hover:bg-b-navy-soft",
  "shop-light": "px-7 bg-b-paper text-b-navy-deep shadow-b-card hover:bg-b-linen",
  outline: "px-7 bg-transparent text-b-ink shadow-[inset_0_0_0_1.5px_theme(colors.b.navy)] hover:bg-b-navy hover:text-b-on-navy",
  "outline-light":
    "px-7 bg-transparent text-b-on-navy shadow-[inset_0_0_0_1.5px_theme(colors.b.on-navy)] hover:bg-b-on-navy hover:text-b-navy-deep",
  text: "min-h-[2.75rem] justify-start gap-2 rounded-b px-0 text-b-navy underline decoration-b-rule-strong decoration-1 underline-offset-[0.35em] hover:decoration-b-navy",
  "text-light":
    "min-h-[2.75rem] justify-start gap-2 rounded-b px-0 text-b-on-navy underline decoration-b-rule-navy decoration-1 underline-offset-[0.35em] hover:decoration-b-on-navy",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  arrow?: boolean;
}

export function ButtonLink({ href, children, variant = "shop", external, className = "", arrow = true }: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span className="min-w-0">{children}</span>
      {arrow ? (
        <Icon
          name={external ? "arrow-up-right" : "arrow-right"}
          size={18}
          className="flex-none transition-transform duration-300 ease-b-out group-hover:translate-x-1"
        />
      ) : null}
    </>
  );
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}
