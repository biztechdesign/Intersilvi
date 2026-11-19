"use client";

import { useId, useRef, useState, type ChangeEvent } from "react";
import { cx } from "../utils";
import { Icon } from "./Icon";

/* ---------- Quantity stepper ---------- */

export interface QuantityStepperProps {
  id?: string;
  label: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md";
  onChange?: (value: number) => void;
  hideLabel?: boolean;
}

/** Number input with − and + buttons. The input stays typeable; buttons are 44px targets at md. */
export function QuantityStepper({ id, label, value, defaultValue = 1, min = 1, max = 9999, step = 1, size = "md", onChange, hideLabel }: QuantityStepperProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const set = (n: number) => {
    const next = Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
    setInner(next);
    onChange?.(next);
  };
  const btn = cx("grid flex-none place-items-center text-fg transition-colors duration-fast hover:bg-surface-soft disabled:cursor-not-allowed disabled:text-fg-disabled", size === "sm" ? "h-9 w-9" : "h-11 w-11");
  return (
    <div className="grid gap-1.5">
      <label htmlFor={inputId} className={cx("text-label text-fg", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className="inline-flex w-fit items-stretch overflow-hidden rounded-input border border-line-input bg-surface focus-within:border-focus focus-within:shadow-[0_0_0_1px_rgb(var(--ds-color-focus))]">
        <button type="button" className={btn} aria-label={`Decrease ${label.toLowerCase()}`} disabled={current <= min} onClick={() => set(current - step)}>
          <Icon name="minus" size={16} />
        </button>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={(e: ChangeEvent<HTMLInputElement>) => set(Number(e.target.value))}
          className={cx("ds-numeric w-14 border-x border-line bg-transparent text-center text-body font-semibold text-fg focus-visible:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", size === "sm" ? "h-9" : "h-11")}
        />
        <button type="button" className={btn} aria-label={`Increase ${label.toLowerCase()}`} disabled={current >= max} onClick={() => set(current + step)}>
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------- File upload ---------- */

export interface FileUploadProps {
  id?: string;
  label: string;
  /** e.g. ".png,.jpg,.svg,.pdf" */
  accept?: string;
  help?: string;
  /** Maximum size in MB, checked client-side for feedback only (the server must validate too). */
  maxSizeMb?: number;
  onFile?: (file: File | null) => void;
}

/**
 * File picker with a drop zone look. Used for trophy logos and artwork. It only selects a file;
 * uploading and processing belong to the feature module that uses it.
 */
export function FileUpload({ id, label, accept, help, maxSizeMb = 10, onFile }: FileUploadProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function pick(f: File | null) {
    const allowed = accept?.split(",").map((s) => s.trim().toLowerCase()).filter((s) => s.startsWith("."));
    if (f && allowed?.length && !allowed.some((ext) => f.name.toLowerCase().endsWith(ext))) {
      setError(`${f.name} isn't a supported file type. Use ${allowed.join(", ")}.`);
      setFile(null);
      onFile?.(null);
      return;
    }
    if (f && f.size > maxSizeMb * 1024 * 1024) {
      setError(`${f.name} is larger than ${maxSizeMb} MB. Choose a smaller file.`);
      setFile(null);
      onFile?.(null);
      return;
    }
    setError("");
    setFile(f);
    onFile?.(f);
  }

  return (
    <div className="group/upload grid gap-1.5">
      <span id={`${inputId}-label`} className="text-label text-fg">
        {label}
      </span>
      {file ? (
        <div className="flex items-center gap-3 rounded-md border border-line bg-surface-alt p-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-sm bg-surface-soft text-fg">
            <Icon name="image" size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-body-sm font-semibold text-fg">{file.name}</span>
            <span className="ds-numeric block text-caption text-fg-muted">{(file.size / 1024).toFixed(0)} KB</span>
          </span>
          <label htmlFor={inputId} className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-sm px-2 text-body-sm font-semibold text-fg-link hover:bg-surface-soft group-has-[input:focus-visible]/upload:outline group-has-[input:focus-visible]/upload:outline-2 group-has-[input:focus-visible]/upload:outline-focus">
            <Icon name="rotate" size={16} />
            Replace
          </label>
          <button
            type="button"
            onClick={() => {
              pick(null);
              if (ref.current) ref.current.value = "";
            }}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-sm px-2 text-body-sm font-semibold text-status-error hover:bg-status-error-surface"
          >
            <Icon name="trash" size={16} />
            Remove
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            pick(e.dataTransfer.files?.[0] ?? null);
          }}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-[1.5px] border-dashed border-line-input bg-surface-alt px-6 py-8 text-center transition-colors duration-fast hover:border-fg-secondary hover:bg-surface-soft group-has-[input:focus-visible]/upload:border-focus group-has-[input:focus-visible]/upload:outline group-has-[input:focus-visible]/upload:outline-2 group-has-[input:focus-visible]/upload:outline-offset-2 group-has-[input:focus-visible]/upload:outline-focus"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-fg shadow-xs">
            <Icon name="upload" size={20} />
          </span>
          <span className="text-body-sm font-semibold text-fg">
            <span className="text-fg-link underline underline-offset-[0.2em]">Choose a file</span> or drop it here
          </span>
          {help ? <span id={`${inputId}-help`} className="text-caption text-fg-muted">{help}</span> : null}
        </label>
      )}
      <input
            ref={ref}
            id={inputId}
            type="file"
            accept={accept}
            aria-labelledby={`${inputId}-label`}
            aria-describedby={help ? `${inputId}-help` : undefined}
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
      <p role="status" aria-live="polite" className="text-body-sm text-status-error empty:hidden">
        {error}
      </p>
    </div>
  );
}

/* ---------- Text input with character count ---------- */

export interface CountedInputProps {
  id: string;
  label: string;
  maxLength: number;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

/** Single-line text with a live character count (engraving lines, ribbon text). */
export function CountedInput({ id, label, maxLength, defaultValue = "", placeholder, onChange }: CountedInputProps) {
  const [value, setValue] = useState(defaultValue);
  const left = maxLength - value.length;
  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-label text-fg">
          {label}
        </label>
        <span id={`${id}-count`} aria-live="polite" className={cx("ds-numeric text-caption", left <= 5 ? "font-semibold text-status-warning" : "text-fg-muted")}>
          {left} characters left
        </span>
      </div>
      <input
        id={id}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-describedby={`${id}-count`}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        className="min-h-11 w-full rounded-input border border-line-input bg-surface px-[var(--ds-pad-input)] text-body text-fg placeholder:text-fg-muted hover:border-fg-secondary focus-visible:border-focus focus-visible:shadow-[0_0_0_1px_rgb(var(--ds-color-focus))] focus-visible:outline-none"
      />
    </div>
  );
}
