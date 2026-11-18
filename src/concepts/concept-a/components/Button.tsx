import type { ReactNode } from "react";
import { ButtonLink as DsButtonLink, type ButtonVariant as DsVariant } from "@/design-system";

/**
 * Concept A's button API, now a thin adapter over the shared design-system ButtonLink.
 * Journey colours are kept: "design" → accent (yellow), "shop" → primary (navy).
 */
export type ButtonVariant = "design" | "shop" | "outline" | "outline-light" | "text" | "text-light";

const map: Record<ButtonVariant, { variant: DsVariant; inverse?: boolean }> = {
  design: { variant: "accent" },
  shop: { variant: "primary" },
  outline: { variant: "outline" },
  "outline-light": { variant: "outline", inverse: true },
  text: { variant: "text" },
  "text-light": { variant: "text", inverse: true },
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  arrow?: boolean;
}

export function ButtonLink({ href, children, variant = "shop", external, className, arrow = true }: ButtonLinkProps) {
  const m = map[variant];
  return (
    <DsButtonLink href={href} external={external} variant={m.variant} inverse={m.inverse} size="lg" iconEnd={arrow ? "arrow-right" : undefined} className={className}>
      {children}
    </DsButtonLink>
  );
}
