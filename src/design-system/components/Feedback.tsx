import type { ReactNode } from "react";
import { cx } from "../utils";
import { Icon, type IconName } from "./Icon";

/* ---------- Spinner ---------- */

export function Spinner({ size = "md", label = "Loading", className }: { size?: "sm" | "md" | "lg"; label?: string; className?: string }) {
  const dims = { sm: "h-4 w-4 border-2", md: "h-6 w-6 border-2", lg: "h-10 w-10 border-[3px]" }[size];
  return (
    <span role={label ? "status" : undefined} className={cx("inline-flex items-center", className)}>
      <span aria-hidden="true" data-motion="essential" className={cx("inline-block animate-spin rounded-full border-current border-r-transparent", dims)} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

/* ---------- Skeleton ---------- */

/** Placeholder block shown while content loads. Matches the shape of the content it replaces. */
export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cx("block animate-pulse rounded-sm bg-surface-soft motion-reduce:animate-none", className)} />;
}

/* ---------- Alert ---------- */

export type Tone = "info" | "success" | "warning" | "error";

const toneStyle: Record<Tone, { box: string; icon: IconName }> = {
  info: { box: "bg-status-info-surface text-fg [--tone:var(--ds-color-status-info)]", icon: "info" },
  success: { box: "bg-status-success-surface text-fg [--tone:var(--ds-color-status-success)]", icon: "check-circle" },
  warning: { box: "bg-status-warning-surface text-fg [--tone:var(--ds-color-status-warning)]", icon: "alert" },
  error: { box: "bg-status-error-surface text-fg [--tone:var(--ds-color-status-error)]", icon: "x-circle" },
};

export interface AlertProps {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  /** Optional action rendered after the message (a ButtonLink or Button). */
  action?: ReactNode;
  className?: string;
}

/**
 * Inline notification. Tone is carried by icon, title and colour together, never colour alone.
 * Errors use role="alert" (announced immediately); others use role="status".
 */
export function Alert({ tone = "info", title, children, action, className }: AlertProps) {
  const t = toneStyle[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cx("flex gap-3 rounded-md p-4", t.box, className)}>
      <Icon name={t.icon} size={20} className="mt-px flex-none text-[rgb(var(--tone))]" />
      <div className="min-w-0 flex-1">
        {title ? <p className="text-h6 font-bold">{title}</p> : null}
        {children ? <div className={cx("text-body-sm text-fg-secondary", title && "mt-0.5")}>{children}</div> : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </div>
  );
}

/* ---------- Empty and error states ---------- */

export interface StateMessageProps {
  icon?: IconName;
  title: string;
  body?: ReactNode;
  action?: ReactNode;
  tone?: "neutral" | "error";
  className?: string;
}

/** Empty state (no results, empty cart) or error state (failed load). Always says what happened and what to do next. */
export function StateMessage({ icon = "search", title, body, action, tone = "neutral", className }: StateMessageProps) {
  return (
    <div role={tone === "error" ? "alert" : undefined} className={cx("flex flex-col items-center rounded-lg border border-dashed border-line-strong bg-surface-alt px-6 py-12 text-center", className)}>
      <span className={cx("grid h-12 w-12 place-items-center rounded-full", tone === "error" ? "bg-status-error-surface text-status-error" : "bg-surface-soft text-fg")}>
        <Icon name={tone === "error" ? "x-circle" : icon} size={22} />
      </span>
      <p className="mt-4 text-h5 text-fg">{title}</p>
      {body ? <div className="mt-2 max-w-narrow text-body-sm text-fg-secondary">{body}</div> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/* ---------- Tooltip ---------- */

/**
 * Tooltip for short supplementary text on a focusable trigger. Shown on hover and keyboard focus,
 * linked with aria-describedby. Never put essential information only in a tooltip.
 */
export function Tooltip({ id, content, children }: { id: string; content: string; children: ReactNode }) {
  return (
    <span className="group/tip relative inline-flex">
      <span aria-describedby={id} className="inline-flex">
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-dropdown w-max max-w-[16rem] -translate-x-1/2 motion-safe:translate-y-1 rounded-sm bg-surface-inverse px-2.5 py-1.5 text-caption text-fg-inverse opacity-0 shadow-md transition duration-fast ease-standard group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100 motion-safe:group-hover/tip:translate-y-0 group-hover/tip:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
