"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../utils";
import { Button, IconButton } from "./Button";
import { Icon } from "./Icon";
import { motionClass } from "../motion-classes";

/* ---------- Tabs ---------- */

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/** WAI-ARIA tabs: arrow keys move between tabs, Home/End jump, only the active tab is in the tab order. */
export function Tabs({ items, label, defaultId }: { items: TabItem[]; label: string; defaultId?: string }) {
  const base = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKey(e: KeyboardEvent, i: number) {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: items.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = items[(map[e.key]! + items.length) % items.length];
    if (next) {
      setActive(next.id);
      refs.current[next.id]?.focus();
    }
  }

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-line">
        {items.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-controls={`${base}-panel-${t.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cx(
                "relative -mb-px min-h-11 whitespace-nowrap px-4 text-nav transition-colors duration-fast after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:bg-selected after:transition-transform after:duration-base after:ease-emphasized motion-reduce:after:transition-none",
                selected ? "text-fg after:scale-x-100" : "text-fg-muted after:scale-x-0 hover:text-fg",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div key={t.id} role="tabpanel" id={`${base}-panel-${t.id}`} aria-labelledby={`${base}-tab-${t.id}`} hidden={t.id !== active} tabIndex={0} className={`pt-5 ${motionClass.panelIn} focus-visible:outline-offset-4`}>
          {t.content}
        </div>
      ))}
    </div>
  );
}

/* ---------- Dialog / drawer ---------- */

export interface DialogProps {
  title: string;
  description?: string;
  /** The element that opens the dialog. Receives an `open` callback. */
  trigger: (open: () => void) => ReactNode;
  children: ReactNode;
  footer?: (close: () => void) => ReactNode;
  /** "modal": centred. "drawer": slides from the right (filters, mini-cart). On phones both are full-width sheets. */
  variant?: "modal" | "drawer";
  /** Open as soon as it mounts (for a dialog the flow opens itself, not a trigger). */
  openOnMount?: boolean;
  /** false: no close button, Escape and outside click do nothing (a step the customer must complete). Default true. */
  dismissible?: boolean;
  onClose?: () => void;
}

/**
 * Dialog built on native <dialog>: focus is trapped, Escape closes, focus returns to the trigger.
 * Use for tasks that need focus (Quickorder, filters on mobile); never for content that could sit inline.
 */
export function Dialog({ title, description, trigger, children, footer, variant = "modal", openOnMount, dismissible = true, onClose }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();
  const open = useCallback(() => ref.current?.showModal(), []);
  const close = useCallback(() => ref.current?.close(), []);
  const drawer = variant === "drawer";
  useEffect(() => {
    if (openOnMount && ref.current && !ref.current.open) ref.current.showModal();
    if (!openOnMount) return;
    /* A dialog the flow opens itself also locks page scroll while it is up. */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openOnMount]);
  return (
    <>
      {trigger(open)}
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onClose={() => {
          /* Escape pressed twice can still close a native dialog: a mandatory step opens again. */
          if (!dismissible) ref.current?.showModal();
          else onClose?.();
        }}
        onCancel={dismissible ? undefined : (e) => e.preventDefault()}
        onClick={(e) => {
          if (dismissible && e.target === ref.current) close();
        }}
        className={cx(
          "max-h-[100dvh] w-full max-w-[100vw] border-0 bg-surface p-0 text-fg shadow-lg",
          drawer
            ? "m-0 ml-auto h-[100dvh] sm:w-[26rem] motion-safe:open:animate-drawer-in"
            : "mx-auto mb-0 mt-auto rounded-t-lg sm:my-auto sm:w-[min(36rem,calc(100vw-2rem))] sm:rounded-lg open:animate-modal-in",
        )}
      >
        <div className="flex h-full max-h-[inherit] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
            <div>
              <h2 id={titleId} className="text-h4">
                {title}
              </h2>
              {description ? (
                <p id={descId} className="mt-1 text-body-sm text-fg-muted">
                  {description}
                </p>
              ) : null}
            </div>
            {dismissible ? <IconButton icon="close" label="Close" onClick={close} className="-mr-2 -mt-1" /> : null}
          </header>
          <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          {footer ? <footer className="flex flex-wrap justify-end gap-3 border-t border-line px-6 py-4">{footer(close)}</footer> : null}
        </div>
      </dialog>
    </>
  );
}

/* ---------- Dropdown menu ---------- */

export interface DropdownOption {
  value: string;
  label: string;
  hint?: string;
}

/**
 * Disclosure-style selector for small option sets (market/language, sort). Escape and outside click close it.
 * For form submission use <Select>; this is for immediate-effect choices.
 */
export function Dropdown({ label, options, value, onChange, icon, align = "end", tone = "light" }: {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange?: (value: string) => void;
  icon?: "globe" | "list" | "filter";
  align?: "start" | "end";
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useEffect(() => {
    if (!open) return;
    const key = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const click = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", click);
    };
  }, [open]);
  const current = options.find((o) => o.value === selected);
  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "group inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-nav transition-colors duration-fast",
          tone === "dark" ? "text-fg-inverse hover:bg-surface-inverse-raised" : "text-fg hover:bg-surface-soft",
        )}
      >
        {icon ? <Icon name={icon} size={18} /> : null}
        <span className="sr-only">{label}: </span>
        {current?.label}
        <Icon name="chevron-down" size={16} className={`${motionClass.chevron} group-aria-expanded:rotate-180`} />
      </button>
      <ul
        id={panelId}
        hidden={!open}
        aria-label={label}
        className={cx(`absolute top-[calc(100%+4px)] z-dropdown min-w-[14rem] rounded-md border border-line bg-surface p-1.5 shadow-md ${motionClass.menuIn}`, align === "end" ? "right-0" : "left-0")}
      >
        {options.map((o) => (
          <li key={o.value}>
            <button
              type="button"
              aria-pressed={o.value === selected}
              onClick={() => {
                setSelected(o.value);
                onChange?.(o.value);
                setOpen(false);
              }}
              className="flex min-h-11 w-full items-center gap-3 rounded-sm px-3 text-left text-body-sm text-fg hover:bg-surface-alt aria-pressed:bg-selected-surface aria-pressed:font-bold"
            >
              <span className="flex-1">{o.label}</span>
              {o.hint ? <span className="text-caption text-fg-muted">{o.hint}</span> : null}
              {o.value === selected ? <Icon name="check" size={16} /> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Toast ---------- */

/** Transient confirmation (e.g. "Added to cart"). Announced politely; auto-dismisses after 5s; never the only record of an error. */
export function useToast() {
  const [toast, setToast] = useState<{ title: string; body?: string } | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);
  const node = (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-toast flex justify-center sm:inset-x-auto sm:right-6">
      {toast ? (
        <div className="ds-inverse pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md bg-surface-inverse p-4 text-fg-inverse shadow-lg motion-safe:animate-modal-in">
          <Icon name="check-circle" size={20} className="mt-px flex-none text-brand-yellow" />
          <div className="min-w-0 flex-1">
            <p className="text-body-sm font-bold">{toast.title}</p>
            {toast.body ? <p className="text-body-sm text-fg-inverse-muted">{toast.body}</p> : null}
          </div>
          <IconButton icon="close" label="Dismiss" size="sm" inverse onClick={() => setToast(null)} />
        </div>
      ) : null}
    </div>
  );
  return { show: setToast, node };
}

/* ---------- Wishlist button ---------- */

/** Save toggle. aria-pressed carries the state; the parent persists it through the account/wishlist feature. */
export function WishlistButton({ productName, defaultSaved = false, onToggle }: { productName: string; defaultSaved?: boolean; onToggle?: (saved: boolean) => void }) {
  const [saved, setSaved] = useState(defaultSaved);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${productName} to wishlist`}
      onClick={() => {
        setSaved(!saved);
        onToggle?.(!saved);
      }}
      className="grid h-11 w-11 place-items-center rounded-full bg-surface/90 text-fg shadow-xs transition-colors duration-fast hover:bg-surface aria-pressed:text-status-error"
    >
      <Icon name="heart" size={20} />
    </button>
  );
}

/* ---------- Product gallery ---------- */

export interface GalleryImage {
  src: string;
  alt: string;
}

/** Product image gallery: main image on a soft stage plus thumbnails (a radio-like list, arrow keys supported by focus order). */
export function ProductGallery({ images, productName }: { images: GalleryImage[]; productName: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index];
  return (
    <div className="grid gap-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-sunken">
        {current ? <Image src={current.src} alt={current.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain p-[8%]" /> : null}
      </div>
      {images.length > 1 ? (
        <ul aria-label={`${productName} images`} className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <li key={img.src} className="flex-none">
              <button
                type="button"
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index || undefined}
                onClick={() => setIndex(i)}
                className="relative block h-16 w-16 overflow-hidden rounded-sm border border-line bg-surface-sunken aria-[current=true]:border-selected aria-[current=true]:shadow-[0_0_0_1px_rgb(var(--ds-color-selected))]"
              >
                <Image src={img.src} alt="" fill sizes="64px" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ---------- Active filter chips ---------- */

export interface ActiveFilter {
  id: string;
  label: string;
}

/** Removable chips for applied filters, plus "Clear all". The listing feature owns the filter state. */
export function ActiveFilters({ filters, onRemove, onClear }: { filters: ActiveFilter[]; onRemove: (id: string) => void; onClear: () => void }) {
  if (!filters.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters" role="group">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onRemove(f.id)}
          aria-label={`Remove filter: ${f.label}`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-selected-surface px-3 text-body-sm font-semibold text-fg transition-colors duration-fast hover:bg-action-secondary-hover"
        >
          {f.label}
          <Icon name="close" size={14} />
        </button>
      ))}
      <Button variant="text" size="sm" onClick={onClear} className="ml-1 text-body-sm">
        Clear all
      </Button>
    </div>
  );
}

/* ---------- Newsletter ---------- */

/** Newsletter sign-up form. `onSubmit` belongs to the marketing integration; without it the form only validates. */
export function NewsletterForm({ onSubmit, inverse }: { onSubmit?: (email: string) => Promise<void> | void; inverse?: boolean }) {
  const id = useId();
  const [state, setState] = useState<{ kind: "idle" | "error" | "busy" | "done"; text: string }>({ kind: "idle", text: "" });
  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState({ kind: "error", text: "Enter an email address like name@club.se." });
        setState({ kind: "busy", text: "" });
        await onSubmit?.(email);
        setState({ kind: "done", text: onSubmit ? "Thanks. Please confirm the sign-up in the email we sent." : "Showcase: no sign-up service is connected." });
      }}
      className="grid max-w-md gap-2"
    >
      <label htmlFor={`${id}-email`} className={cx("text-label", inverse ? "text-fg-inverse" : "text-fg")}>
        Email address
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={state.kind === "error"}
          aria-describedby={`${id}-msg`}
          className="min-h-11 min-w-0 flex-[1_1_14rem] rounded-input border border-line-input bg-surface px-[var(--ds-pad-input)] text-body text-fg focus-visible:border-focus focus-visible:shadow-[0_0_0_1px_rgb(var(--ds-color-focus))] focus-visible:outline-none aria-[invalid=true]:border-status-error"
        />
        <Button type="submit" variant={inverse ? "accent" : "primary"} loading={state.kind === "busy"}>
          Subscribe
        </Button>
      </div>
      <p id={`${id}-msg`} role="status" aria-live="polite" className={cx("min-h-[1.5em] text-body-sm", state.kind === "error" ? (inverse ? "text-brand-yellow" : "text-status-error") : inverse ? "text-fg-inverse-muted" : "text-fg-muted")}>
        {state.text}
      </p>
    </form>
  );
}
