import type { ElementType, ReactNode } from "react";
import { cx } from "../utils";
import { Icon } from "./Icon";
import { motionClass } from "../motion-classes";

/* ---------- Section ---------- */

export type SectionSpacing = "sm" | "md" | "lg";
export type SectionTone = "default" | "alt" | "soft" | "inverse";

const spacingCls: Record<SectionSpacing, string> = { sm: "py-section-sm", md: "py-section", lg: "py-section-lg" };
const toneCls: Record<SectionTone, string> = {
  default: "bg-surface",
  alt: "bg-surface-alt",
  soft: "bg-surface-soft",
  inverse: "ds-inverse bg-surface-inverse text-fg-inverse",
};

/**
 * Page section with the container built in. Three spacing densities (sm 48–64, md 64–96, lg 80–120)
 * and four tones. Use `inverse` (navy) sparingly: at most one dark editorial band per page plus the footer.
 */
export function Section({ id, spacing = "md", tone = "default", children, className, "aria-labelledby": labelledBy }: {
  id?: string;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(spacingCls[spacing], toneCls[tone], className)}>
      <div className="ds-container">{children}</div>
    </section>
  );
}

/* ---------- Section heading ---------- */

export interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Action aligned right on desktop (e.g. "View all"). */
  action?: ReactNode;
  align?: "start" | "center";
  /** h2 by default. */
  as?: "h1" | "h2" | "h3";
  /** Editorial serif. Reserve for a page's single brand-story heading. */
  editorial?: boolean;
  inverse?: boolean;
  className?: string;
}

/** The heading block every section uses: one size (h2), one width rule (max 22ch), one spacing to content. */
export function SectionHeading({ id, title, intro, action, align = "start", as: Tag = "h2", editorial, inverse, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cx("mb-8 flex flex-wrap items-end gap-x-10 gap-y-4 lg:mb-12", center ? "flex-col items-center text-center" : "justify-between", className)}>
      <div className={cx("grid gap-3", center && "justify-items-center")}>
        <Tag id={id} className={cx(editorial ? "font-serif text-serif-display" : Tag === "h1" ? "text-h1" : Tag === "h3" ? "text-h3" : "text-h2", "max-w-heading")}>
          {title}
        </Tag>
        {intro ? <p className={cx("max-w-lead text-lead", inverse ? "text-fg-inverse-muted" : "text-fg-secondary")}>{intro}</p> : null}
      </div>
      {action ? <div className="flex-none">{action}</div> : null}
    </div>
  );
}

/* ---------- Card / panel ---------- */

export interface PanelProps {
  as?: ElementType;
  children: ReactNode;
  /** bordered: white with a 1px border. filled: soft blue. elevated: white with shadow (menus, floating panels). */
  variant?: "bordered" | "filled" | "elevated";
  padding?: "sm" | "md" | "lg";
  className?: string;
}

export function Panel({ as: Tag = "div", children, variant = "bordered", padding = "md", className }: PanelProps) {
  return (
    <Tag
      className={cx(
        "rounded-lg",
        { bordered: "border border-line bg-surface", filled: "bg-surface-soft", elevated: "bg-surface shadow-md" }[variant],
        { sm: "p-card-sm", md: "p-card", lg: "p-card-lg" }[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- Accordion ---------- */

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Accordion on native <details>/<summary>: works without JavaScript, keyboard-operable, announced as expandable.
 * `exclusive` lets only one item stay open (uses the native `name` attribute).
 */
export function Accordion({ items, exclusive, name = "ds-accordion" }: { items: AccordionItem[]; exclusive?: boolean; name?: string }) {
  return (
    <div className="border-t border-line">
      {items.map((it) => (
        <details key={it.id} name={exclusive ? name : undefined} open={it.defaultOpen} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-h6 text-fg [&::-webkit-details-marker]:hidden">
            {it.title}
            <Icon name="chevron-down" size={20} className={`flex-none text-fg-secondary ${motionClass.chevron} group-open:rotate-180`} />
          </summary>
          <div className={`pb-5 pr-8 text-body text-fg-secondary ${motionClass.menuIn}`}>{it.content}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------- Promotional banner ---------- */

/** Single promotional message with one action. Soft blue by default; never stack more than one per view. */
export function PromoBanner({ title, body, action, tone = "soft" }: { title: string; body?: string; action?: ReactNode; tone?: "soft" | "accent" }) {
  return (
    <div className={cx("flex flex-col gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8", tone === "accent" ? "bg-brand-yellow text-fg-on-accent" : "bg-surface-soft text-fg")}>
      <div>
        <p className="text-h4">{title}</p>
        {body ? <p className={cx("mt-1 text-body-sm", tone === "accent" ? "text-fg-on-accent" : "text-fg-secondary")}>{body}</p> : null}
      </div>
      {action ? <div className="flex-none">{action}</div> : null}
    </div>
  );
}

/* ---------- Help panel ---------- */

export interface HelpChannel {
  icon: "phone" | "mail" | "chat";
  label: string;
  href: string;
  /** e.g. opening hours; supplied by content, never hardcoded. */
  detail?: ReactNode;
}

/** Help and contact block: real channels only (data-driven), each a ≥44px link. */
export function HelpPanel({ title, body, channels }: { title: string; body?: string; channels: HelpChannel[] }) {
  return (
    <Panel variant="filled" padding="lg">
      <p className="text-h4">{title}</p>
      {body ? <p className="mt-2 max-w-narrow text-body-sm text-fg-secondary">{body}</p> : null}
      <ul className="mt-5 grid gap-2">
        {channels.map((c) => (
          <li key={c.href}>
            <a href={c.href} className="group flex min-h-11 items-center gap-3 no-underline">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-surface text-fg shadow-xs">
                <Icon name={c.icon} size={18} />
              </span>
              <span>
                <span className="block font-bold text-fg group-hover:underline">{c.label}</span>
                {c.detail ? <span className="block text-caption text-fg-muted">{c.detail}</span> : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
