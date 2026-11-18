"use client";

import { useState, type FormEvent } from "react";
import { Alert, Button, Dialog, Icon, TextInput } from "@/design-system";

/**
 * Quickorder: add several items by article number, on the shared Dialog and form controls.
 * SIMULATED: nothing is added to a real cart. How Quickorder behaves is an open decision (PRODUCT.md).
 */
export function QuickOrder({ variant = "bar" }: { variant?: "bar" | "drawer" | "chip" }) {
  const [rows, setRows] = useState<number[]>([1, 2, 3]);
  const [status, setStatus] = useState<{ tone: "error" | "info"; text: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const items = rows.map((k) => data.get(`article-${k}`)?.toString().trim() ?? "").filter(Boolean);
    if (items.length === 0) return setStatus({ tone: "error", text: "Enter at least one article number." });
    const invalid = items.find((a) => !/^\d{4,8}$/.test(a));
    if (invalid) return setStatus({ tone: "error", text: `"${invalid}" doesn't look like an article number. Article numbers are digits only, for example 106330.` });
    setStatus({ tone: "info", text: `Prototype: ${items.length} ${items.length === 1 ? "line" : "lines"} checked. Quickorder isn't connected to a cart yet.` });
  }

  return (
    <Dialog
      title="Quickorder"
      description="Know your article numbers? Add several items at once."
      trigger={(open) => (
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            open();
          }}
          className={
            variant === "chip"
              ? "inline-flex min-h-9 items-center gap-1.5 rounded-sm border border-line bg-surface px-3 text-label text-fg transition-colors duration-fast ease-standard hover:border-line-strong hover:bg-surface-alt"
              : variant === "bar"
              ? "inline-flex min-h-11 items-center gap-1.5 px-1 text-label text-fg-inverse underline decoration-brand-yellow decoration-2 underline-offset-[0.45em]"
              : "flex min-h-12 w-full items-center gap-3 text-left text-body font-semibold text-fg"
          }
        >
          <Icon name="list" size={16} />
          Quickorder
        </button>
      )}
    >
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        <div role="group" aria-label="Order lines" className="grid gap-2">
          <div aria-hidden="true" className="grid grid-cols-[minmax(0,1fr)_6rem] gap-2 text-label text-fg-muted">
            <span>Article number</span>
            <span>Quantity</span>
          </div>
          {rows.map((k, i) => (
            <div key={k} className="grid grid-cols-[minmax(0,1fr)_6rem] gap-2">
              <label className="sr-only" htmlFor={`qo-article-${variant}-${k}`}>
                Article number, line {i + 1}
              </label>
              <TextInput id={`qo-article-${variant}-${k}`} name={`article-${k}`} inputMode="numeric" autoComplete="off" placeholder={i === 0 ? "106330" : ""} className="ds-numeric" />
              <label className="sr-only" htmlFor={`qo-qty-${variant}-${k}`}>
                Quantity, line {i + 1}
              </label>
              <TextInput id={`qo-qty-${variant}-${k}`} name={`qty-${k}`} type="number" min={1} defaultValue={1} className="ds-numeric text-right" />
            </div>
          ))}
        </div>
        <Button variant="text" size="sm" iconStart="plus" className="justify-self-start" onClick={() => setRows((prev) => [...prev, (prev.at(-1) ?? 0) + 1])}>
          Add another line
        </Button>
        {status ? <Alert tone={status.tone}>{status.text}</Alert> : null}
        <div className="flex justify-end">
          <Button type="submit" variant="accent" iconEnd="arrow-right">
            Add to cart
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
