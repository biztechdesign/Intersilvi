import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "../utils";
import { Icon } from "./Icon";

/**
 * Form controls. Native elements throughout (they work without JavaScript and keep platform behaviour),
 * styled from tokens. Every control sits inside <Field>, which wires label, help text and error message.
 */

/* ---------- Field ---------- */

export interface FieldProps {
  id: string;
  label: string;
  /** Hide the label visually (still announced). Only for controls whose purpose is obvious, e.g. search. */
  hideLabel?: boolean;
  help?: ReactNode;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

/** Label + control + help/error. The control must use `id`, and `describedBy(id, …)` for aria-describedby. */
export function Field({ id, label, hideLabel, help, error, optional, children, className }: FieldProps) {
  return (
    <div className={cx("grid gap-1.5", className)}>
      <label htmlFor={id} className={cx("text-label text-fg", hideLabel && "sr-only")}>
        {label}
        {optional ? <span className="font-normal text-fg-muted"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-body-sm text-status-error">
          <Icon name="x-circle" size={16} className="mt-0.5 flex-none" />
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className="text-body-sm text-fg-muted">
          {help}
        </p>
      ) : null}
    </div>
  );
}

/** aria-describedby for a control inside <Field>. */
export const describedBy = (id: string, { error, help }: { error?: string; help?: ReactNode }) =>
  error ? `${id}-error` : help ? `${id}-help` : undefined;

const control =
  "w-full rounded-input border border-line-input bg-surface px-[var(--ds-pad-input)] text-body text-fg transition-[border-color,box-shadow] duration-fast ease-standard placeholder:text-fg-muted hover:border-fg-secondary focus-visible:border-focus focus-visible:shadow-[0_0_0_1px_rgb(var(--ds-color-focus))] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-alt disabled:text-fg-disabled aria-[invalid=true]:border-status-error aria-[invalid=true]:shadow-[0_0_0_1px_rgb(var(--ds-color-status-error))]";

/* ---------- Text input, textarea, select ---------- */

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(control, "min-h-11", className)} {...props} />;
}

export function Textarea({ className, rows = 4, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={rows} className={cx(control, "min-h-24 !rounded-[var(--ds-radius-textarea)] py-2.5 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select className={cx(control, "min-h-11 cursor-pointer appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <Icon name="chevron-down" size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-secondary" />
    </span>
  );
}

/* ---------- Search input ---------- */

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  label?: string;
  size?: "md" | "lg";
}

/** Search field with a visible submit button. Wrap in <form role="search">. */
export function SearchInput({ id, label = "Search products", size = "md", className, ...props }: SearchInputProps) {
  return (
    <div className={cx("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        autoComplete="off"
        className={cx(
          control,
          "bg-surface-alt pr-12 [&::-webkit-search-cancel-button]:hidden",
          /* Pill surface (.ds-pill): borderless on the soft surface; the border returns on hover and focus. */
          "[.ds-pill_&]:border-transparent [.ds-pill_&]:pr-14 [.ds-pill_&]:hover:border-line-input [.ds-pill_&]:focus-visible:bg-surface",
          size === "lg" ? "min-h-12 text-body-lg" : "min-h-11",
        )}
        {...props}
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-input text-fg-secondary transition-colors duration-fast ease-standard hover:bg-surface-soft hover:text-fg [.ds-pill_&]:right-1.5 [.ds-pill_&]:h-10 [.ds-pill_&]:w-10 [.ds-pill_&]:bg-action-primary [.ds-pill_&]:text-fg-inverse [.ds-pill_&]:hover:bg-action-primary-hover [.ds-pill_&]:hover:text-fg-inverse [.ds-pill_&]:active:bg-action-primary-active"
      >
        <Icon name="search" size={18} />
      </button>
    </div>
  );
}

/* ---------- Checkbox, radio, toggle ---------- */

interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
}

const choiceBox =
  "peer relative mt-0.5 h-5 w-5 flex-none cursor-pointer appearance-none border-[1.5px] border-line-input bg-surface transition-colors duration-fast ease-standard checked:border-selected checked:bg-selected hover:border-fg-secondary disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-alt";

function ChoiceLabel({ id, label, description, disabled }: { id?: string; label: ReactNode; description?: ReactNode; disabled?: boolean }) {
  return (
    <label htmlFor={id} className={cx("cursor-pointer", disabled && "cursor-not-allowed text-fg-disabled")}>
      <span className="block text-body">{label}</span>
      {description ? <span className="block text-body-sm text-fg-muted">{description}</span> : null}
    </label>
  );
}

export function Checkbox({ label, description, className, ...props }: ChoiceProps) {
  return (
    <div className={cx("relative flex items-start gap-3", className)}>
      <input type="checkbox" className={cx(choiceBox, "rounded-sm")} {...props} />
      <Icon name="check" size={14} className="pointer-events-none absolute left-[3px] top-[5px] text-fg-inverse opacity-0 peer-checked:opacity-100" />
      <ChoiceLabel id={props.id} label={label} description={description} disabled={props.disabled} />
    </div>
  );
}

export function Radio({ label, description, className, ...props }: ChoiceProps) {
  return (
    <div className={cx("relative flex items-start gap-3", className)}>
      <input type="radio" className={cx(choiceBox, "rounded-full checked:shadow-[inset_0_0_0_3.5px_rgb(var(--ds-color-surface))]")} {...props} />
      <ChoiceLabel id={props.id} label={label} description={description} disabled={props.disabled} />
    </div>
  );
}

/** On/off setting that takes effect immediately. Native checkbox with role="switch". */
export function Toggle({ label, description, className, ...props }: ChoiceProps) {
  return (
    <div className={cx("flex items-start justify-between gap-4", className)}>
      <ChoiceLabel id={props.id} label={label} description={description} disabled={props.disabled} />
      <input
        type="checkbox"
        role="switch"
        className="relative mt-0.5 h-6 w-11 flex-none cursor-pointer appearance-none rounded-full bg-line-strong transition-colors duration-base ease-standard before:absolute before:left-0.5 before:top-0.5 before:h-5 before:w-5 before:rounded-full before:bg-surface before:shadow-xs before:transition-transform before:duration-base before:ease-standard checked:bg-selected checked:before:translate-x-5 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
}

/* ---------- Slider ---------- */

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Formats the current value for display, e.g. (v) => `${v} mm`. Display is static; pair with state for live values. */
  valueText?: string;
}

/** Range slider. Pair with a visible value; never use alone for precise values (offer a number input too). */
export function Slider({ className, valueText, ...props }: SliderProps) {
  return (
    <div className={cx("flex items-center gap-4", className)}>
      <input
        type="range"
        aria-valuetext={valueText}
        className="h-11 w-full cursor-pointer appearance-none bg-transparent accent-[rgb(var(--ds-color-selected))] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:bg-selected [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-surface-soft [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-surface-soft [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-selected [&::-webkit-slider-thumb]:shadow-sm"
        {...props}
      />
      {valueText ? <output className="ds-numeric min-w-[4.5rem] text-right text-body-sm font-semibold text-fg">{valueText}</output> : null}
    </div>
  );
}

/* ---------- Fieldset ---------- */

/** Groups related choices (radio sets, checkbox lists, swatches) under one legend. */
export function Fieldset({ legend, help, children, className }: { legend: string; help?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <fieldset className={cx("m-0 grid min-w-0 gap-3 border-0 p-0", className)}>
      <legend className="mb-1 p-0 text-label text-fg">{legend}</legend>
      {help ? <p className="-mt-2 text-body-sm text-fg-muted">{help}</p> : null}
      {children}
    </fieldset>
  );
}
