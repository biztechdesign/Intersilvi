import type { ReactNode } from "react";
import { cx } from "../utils";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";

/**
 * Customization presentation components.
 * - The rosette designer is a separate application: the website only links into it (RosetteModelCta) and
 *   presents options (swatches, combinations, steps). No designer business logic lives here.
 * - The integrated trophy customizer is its own feature module; these are the controls it composes.
 */

/* ---------- Step indicator ---------- */

export interface Step {
  id: string;
  label: string;
}

/** Ordered steps with current/complete states. Numbers carry the sequence; aria-current marks the active step. */
export function StepIndicator({ steps, current, label = "Customization steps" }: { steps: Step[]; current: number; label?: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap gap-x-2 gap-y-3">
        {steps.map((s, i) => {
          const state = i < current ? "done" : i === current ? "current" : "todo";
          return (
            <li key={s.id} aria-current={state === "current" ? "step" : undefined} className="flex items-center gap-2">
              <span
                className={cx(
                  "ds-numeric grid h-8 w-8 flex-none place-items-center rounded-full text-label",
                  state === "done" && "bg-selected text-fg-inverse",
                  state === "current" && "bg-action-accent text-fg-on-accent",
                  state === "todo" && "bg-surface text-fg-muted ring-1 ring-inset ring-line-input",
                )}
              >
                {state === "done" ? <Icon name="check" size={16} /> : i + 1}
                {state === "done" ? <span className="sr-only">Completed: </span> : null}
              </span>
              <span className={cx("text-body-sm", state === "todo" ? "text-fg-muted" : "font-bold text-fg")}>{s.label}</span>
              {i < steps.length - 1 ? <span aria-hidden="true" className="mx-1 hidden h-px w-6 bg-line-strong sm:block" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------- Swatches ---------- */

export interface SwatchOption {
  id: string;
  name: string;
  hex: string;
  /** Finish named in text, e.g. "Satin", "Metallic". */
  finish?: string;
  /** CSS background for finishes that a flat colour can't show (metallic, full colour). Overrides hex. */
  background?: string;
  disabled?: boolean;
}

/**
 * Colour / finish selector as a native radio group. Every swatch has a visible or announced name, so the
 * choice never depends on colour perception. Selected: a 2px navy ring with a white gap.
 */
export function SwatchGroup({ name, legend, options, defaultValue, value, onChange, showNames = true, size = "md" }: {
  name: string;
  legend: string;
  options: SwatchOption[];
  defaultValue?: string;
  /** Controlled value. When set, the group is controlled and `onChange` receives the chosen id. */
  value?: string;
  onChange?: (id: string) => void;
  showNames?: boolean;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 p-0 text-label text-fg">{legend}</legend>
      <div className={cx("flex flex-wrap", showNames ? "gap-x-3 gap-y-4" : "gap-2")}>
        {options.map((o) => (
          <label key={o.id} className={cx("group grid justify-items-center gap-1.5 text-center", o.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", showNames && "w-16")}>
            <input
              type="radio"
              name={name}
              value={o.id}
              {...(value !== undefined ? { checked: o.id === value } : { defaultChecked: o.id === defaultValue })}
              onChange={onChange ? () => onChange(o.id) : undefined}
              disabled={o.disabled}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cx(
                dim,
                "rounded-full shadow-[inset_0_0_0_1px_rgb(11_29_64/0.15)] transition-shadow duration-fast",
                "peer-checked:shadow-[0_0_0_2px_rgb(var(--ds-color-surface)),0_0_0_4px_rgb(var(--ds-color-selected))]",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-focus",
              )}
              style={o.background ? { background: o.background } : { backgroundColor: o.hex }}
            />
            <span className={cx(showNames ? "text-caption leading-tight text-fg-secondary peer-checked:font-bold peer-checked:text-fg" : "sr-only")}>
              {o.name}
              {o.finish ? <span className="block text-fg-muted">{o.finish}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- Option cards (trophy size, finish, model) ---------- */

export interface OptionCard {
  id: string;
  title: string;
  /** Dimensions or other verified detail. */
  detail?: string;
  /** Price difference or price, already formatted by the feature module. */
  priceText?: string;
  disabled?: boolean;
}

/** Radio cards for discrete choices with details (trophy size, base material). */
export function OptionCardGroup({ name, legend, options, defaultValue, columns = 3 }: { name: string; legend: string; options: OptionCard[]; defaultValue?: string; columns?: 2 | 3 | 4 }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 p-0 text-label text-fg">{legend}</legend>
      <div className={cx("grid gap-3", { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns])}>
        {options.map((o) => (
          <label
            key={o.id}
            className={cx(
              "relative flex min-h-[4.5rem] flex-col justify-center rounded-md border border-line-input bg-surface p-4 transition-[border-color,box-shadow,background-color] duration-fast",
              "has-[:checked]:border-selected has-[:checked]:bg-selected-surface has-[:checked]:shadow-[0_0_0_1px_rgb(var(--ds-color-selected))]",
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
              o.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-fg-secondary",
            )}
          >
            <input type="radio" name={name} value={o.id} defaultChecked={o.id === defaultValue} disabled={o.disabled} className="peer sr-only" />
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-h6">{o.title}</span>
              {o.priceText ? <span className="ds-numeric text-body-sm font-semibold text-fg-secondary">{o.priceText}</span> : null}
            </span>
            {o.detail ? <span className="ds-numeric mt-0.5 text-body-sm text-fg-muted">{o.detail}</span> : null}
            <Icon name="check" size={16} className="absolute right-3 top-3 hidden text-fg peer-checked:block" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- Segmented control ---------- */

/** Small set of mutually exclusive views (trophy preview: Front / Side / Back). */
export function SegmentedControl({ name, legend, options, defaultValue }: { name: string; legend: string; options: { id: string; label: string }[]; defaultValue?: string }) {
  return (
    <fieldset className="m-0 inline-flex min-w-0 border-0 p-0">
      <legend className="sr-only">{legend}</legend>
      <div className="inline-flex rounded-md bg-surface-soft p-1">
        {options.map((o) => (
          <label key={o.id} className="cursor-pointer">
            <input type="radio" name={name} value={o.id} defaultChecked={o.id === defaultValue} className="peer sr-only" />
            <span className="inline-flex min-h-9 items-center rounded-sm px-3.5 text-body-sm font-semibold text-fg-secondary transition-colors duration-fast peer-checked:bg-surface peer-checked:text-fg peer-checked:shadow-xs peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- Configuration summary ---------- */

/** Read-back of chosen options before adding to cart, with an edit link per line. */
export function ConfigurationSummary({ title = "Your configuration", items, footer }: { title?: string; items: { label: string; value: ReactNode; editHref?: string }[]; footer?: ReactNode }) {
  return (
    <section aria-label={title} className="rounded-lg border border-line bg-surface p-card">
      <h3 className="text-h5">{title}</h3>
      <dl className="mt-4 divide-y divide-line border-y border-line">
        {items.map((it) => (
          <div key={it.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] items-baseline gap-3 py-3 text-body-sm">
            <dt className="text-fg-muted">{it.label}</dt>
            <dd className="font-semibold text-fg">{it.value}</dd>
            {it.editHref ? (
              <a href={it.editHref} className="text-fg-link underline underline-offset-[0.2em]">
                Edit<span className="sr-only"> {it.label.toLowerCase()}</span>
              </a>
            ) : (
              <span />
            )}
          </div>
        ))}
      </dl>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </section>
  );
}

/* ---------- Rosette model-selection CTA ---------- */

/**
 * Entry point into the rosette designer flow: listing → model detail → designer.
 * The CTA always points at model selection; it never opens the designer without a model.
 */
export function RosetteModelCta({ title, body, href, steps, media }: { title: string; body: string; href: string; steps: string[]; media?: ReactNode }) {
  return (
    <div className="grid overflow-hidden rounded-lg bg-surface-soft lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 p-card sm:p-card-lg lg:p-12">
        <h3 className="max-w-heading text-h2">{title}</h3>
        <p className="mt-3 max-w-lead text-body text-fg-secondary">{body}</p>
        <ol className="mt-6 grid gap-2 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-body-sm font-semibold text-fg">
              <span className="ds-numeric grid h-7 w-7 flex-none place-items-center rounded-full bg-surface text-label text-fg">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <ButtonLink href={href} variant="accent" size="lg" iconEnd="arrow-right" className="mt-8">
          Choose a rosette model
        </ButtonLink>
      </div>
      {media ? <div className="relative min-h-[16rem] bg-surface-sunken">{media}</div> : null}
    </div>
  );
}
