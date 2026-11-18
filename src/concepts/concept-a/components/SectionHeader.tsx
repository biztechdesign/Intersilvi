import type { ReactNode } from "react";

interface SectionHeaderProps {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional action aligned to the end of the header (desktop) or below the intro (mobile). */
  action?: ReactNode;
  /** Extra line under the title, e.g. a "To confirm" fact. */
  meta?: ReactNode;
  tone?: "light" | "dark";
  /** h2 by default; sections nested in a larger section can pass "h3". */
  as?: "h2" | "h3";
  className?: string;
}

/**
 * The one heading pattern every Concept A section uses, so heading widths, sizes and spacing stay consistent:
 * title (display-2, max 16ch) left, intro (lead, max 44ch) right on desktop, bottom-aligned, one shared bottom margin.
 */
export function SectionHeader({ id, title, intro, action, meta, tone = "light", as: Tag = "h2", className = "" }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div data-stagger="" className={`mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12 ${className}`}>
      <div className="grid gap-3">
        <Tag id={id} className="text-h2 max-w-heading">
          {title}
        </Tag>
        {meta ? <div className={`text-body-sm ${dark ? "text-fg-inverse-muted" : "text-fg-secondary"}`}>{meta}</div> : null}
      </div>
      {intro || action ? (
        <div className="grid justify-items-start gap-5">
          {intro ? <p className={`text-lead max-w-lead ${dark ? "text-fg-inverse-muted" : "text-fg-secondary"}`}>{intro}</p> : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}
