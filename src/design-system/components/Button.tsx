import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../utils";
import { Icon, type IconName } from "./Icon";
import { Spinner } from "./Feedback";
import { motionClass } from "../motion-classes";

/**
 * Buttons. One component family for every action on the site.
 * - primary: navy. The default action.
 * - accent: brand yellow with navy text. The single highest-emphasis commercial action in a view
 *   (e.g. "Add to cart", "Design your own rosette"). Use at most one per view.
 * - secondary: soft blue fill. Supporting actions next to a primary.
 * - outline: bordered. Tertiary actions, actions on photographs.
 * - text: inline link-style action.
 * - destructive: red. Removing things (cart item, uploaded logo).
 * `inverse` adapts primary/outline/text for dark (navy) surfaces.
 */
export type ButtonVariant = "primary" | "accent" | "secondary" | "outline" | "text" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2 text-center rounded-button sm:whitespace-nowrap font-sans font-bold no-underline transition-[color,background-color,box-shadow,transform,text-decoration-color,text-decoration-thickness] duration-base ease-standard active:duration-fast disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-button-sm",
  md: "min-h-11 px-5 text-button",
  lg: "min-h-12 px-6 text-button",
};

const variants: Record<ButtonVariant, { light: string; inverse: string }> = {
  primary: {
    light: "bg-action-primary text-fg-inverse hover:bg-action-primary-hover active:bg-action-primary-active disabled:bg-surface-soft disabled:text-fg-disabled",
    inverse: "bg-surface text-fg hover:bg-surface-soft active:bg-surface-soft disabled:bg-surface-inverse-raised disabled:text-fg-inverse-muted",
  },
  accent: {
    light: "bg-action-accent text-fg-on-accent hover:bg-action-accent-hover disabled:bg-surface-soft disabled:text-fg-disabled",
    inverse: "bg-action-accent text-fg-on-accent hover:bg-action-accent-hover disabled:bg-surface-inverse-raised disabled:text-fg-inverse-muted",
  },
  secondary: {
    light: "bg-action-secondary text-fg hover:bg-action-secondary-hover disabled:text-fg-disabled",
    inverse: "bg-surface-inverse-raised text-fg-inverse hover:bg-action-primary-active disabled:text-fg-inverse-muted",
  },
  outline: {
    light: "bg-transparent text-fg shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-action-primary))] hover:bg-surface-soft disabled:text-fg-disabled disabled:shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-line))]",
    inverse: "bg-transparent text-fg-inverse shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-fg-inverse))] hover:bg-surface-inverse-raised disabled:text-fg-inverse-muted",
  },
  text: {
    light: "min-h-0 px-0 text-fg-link underline decoration-line-strong decoration-1 underline-offset-[0.3em] hover:decoration-fg-link hover:decoration-2 disabled:text-fg-disabled",
    inverse: "min-h-0 px-0 text-fg-inverse underline decoration-line-inverse decoration-1 underline-offset-[0.3em] hover:decoration-fg-inverse hover:decoration-2",
  },
  destructive: {
    light: "bg-action-destructive text-fg-inverse hover:bg-action-destructive-hover disabled:bg-surface-soft disabled:text-fg-disabled",
    inverse: "bg-action-destructive text-fg-inverse hover:bg-action-destructive-hover",
  },
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** On a dark (navy) surface. */
  inverse?: boolean;
  iconStart?: IconName;
  iconEnd?: IconName;
  /** Stretch to the container width. */
  block?: boolean;
  className?: string;
  children: ReactNode;
}

/** Filled and outlined buttons lift 3px on hover (pointer devices, motion allowed) and settle back when pressed. Text buttons and inert buttons never move. */
const lift = "motion-safe:hover:-translate-y-lift motion-safe:active:translate-y-0";

function classes({ variant = "primary", size = "md", inverse, block, className, inert }: CommonProps & { inert?: boolean }) {
  return cx(
    base,
    sizes[size],
    variants[variant][inverse ? "inverse" : "light"],
    block && "w-full",
    variant === "text" && "!min-h-0 !px-0",
    variant !== "text" && !inert && lift,
    className,
  );
}

function Content({ iconStart, iconEnd, children, loading }: Pick<CommonProps, "iconStart" | "iconEnd" | "children"> & { loading?: boolean }) {
  return (
    <>
      {loading ? <Spinner size="sm" label="" /> : iconStart ? <Icon name={iconStart} size={18} /> : null}
      <span>{children}</span>
      {iconEnd ? (
        <Icon name={iconEnd} size={18} className={`${motionClass.buttonArrowNudge}`} />
      ) : null}
    </>
  );
}

export interface ButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  /** Shows a spinner, keeps the width and sets aria-busy. The button stays focusable but inert. */
  loading?: boolean;
}

export function Button({ variant, size, inverse, iconStart, iconEnd, block, className, children, loading, disabled, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      className={classes({ variant, size, inverse, block, inert: disabled || loading, className: cx(loading && "pointer-events-none", className), children })}
      {...rest}
    >
      <Content iconStart={iconStart} iconEnd={iconEnd} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

export interface ButtonLinkProps extends CommonProps {
  href: string;
  external?: boolean;
}

/** A link that looks like a button. Use for navigation; use <Button> for in-page actions. */
export function ButtonLink({ href, external, variant, size, inverse, iconStart, iconEnd, block, className, children }: ButtonLinkProps) {
  const cls = classes({ variant, size, inverse, block, className, children });
  const content = (
    <Content iconStart={iconStart} iconEnd={external ? "arrow-up-right" : iconEnd}>
      {children}
    </Content>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: IconName;
  /** Required: the accessible name. */
  label: string;
  variant?: "ghost" | "outline" | "primary";
  size?: ButtonSize;
  inverse?: boolean;
}

/** Icon-only button. Always 44px touch target at md/lg; the label is announced and shown as a native tooltip. */
export function IconButton({ icon, label, variant = "ghost", size = "md", inverse, className, type = "button", ...rest }: IconButtonProps) {
  const dims = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-12 w-12" }[size];
  const look = {
    ghost: inverse ? "text-fg-inverse hover:bg-surface-inverse-raised" : "text-fg hover:bg-surface-soft",
    outline: inverse
      ? "text-fg-inverse shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-fg-inverse))] hover:bg-surface-inverse-raised"
      : "text-fg shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-line-input))] hover:bg-surface-soft",
    primary: "bg-action-primary text-fg-inverse hover:bg-action-primary-hover",
  }[variant];
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx("inline-grid flex-none place-items-center rounded-button transition-colors duration-fast ease-standard disabled:cursor-not-allowed disabled:text-fg-disabled", dims, look, className)}
      {...rest}
    >
      <Icon name={icon} size={size === "sm" ? 18 : 20} />
    </button>
  );
}
