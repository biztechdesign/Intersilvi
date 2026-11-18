import type { ReactNode } from "react";

/**
 * Concept B section eyebrow: one consistent label above every section heading.
 * Small bold caps with wide tracking, 12px above the heading. Navy-blue on light surfaces, yellow on navy.
 */
export function Eyebrow({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`mb-3 text-label font-bold uppercase tracking-[0.12em] ${tone === "dark" ? "text-brand-yellow" : "text-fg-link"} ${className}`}>
      {children}
    </p>
  );
}
