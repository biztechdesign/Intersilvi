"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icon";

/**
 * Quickorder: add several items by article number. SIMULATED: nothing is added to a real cart.
 * The client reference lists this feature; how it behaves is an open decision (PRODUCT.md).
 */
export function QuickOrder({ variant = "bar" }: { variant?: "bar" | "drawer" | "pill" }) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [rows, setRows] = useState<number[]>([1, 2, 3]);
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const items = rows
      .map((k) => ({ article: data.get(`article-${k}`)?.toString().trim() ?? "" }))
      .filter((i) => i.article);
    if (items.length === 0) return setStatus("Enter at least one article number.");
    const invalid = items.find((i) => !/^\d{4,8}$/.test(i.article));
    if (invalid) {
      return setStatus(`"${invalid.article}" doesn't look like an article number. Article numbers are digits only, for example 106330.`);
    }
    setStatus(`Prototype: ${items.length} ${items.length === 1 ? "line" : "lines"} checked. Quickorder isn't connected to a cart yet.`);
  }

  const input =
    "min-h-11 w-full rounded-b border-0 bg-b-paper px-3 text-b-body shadow-[inset_0_0_0_1px_theme(colors.b.rule-strong)] placeholder:text-b-ink-3 focus-visible:shadow-[inset_0_0_0_1.5px_theme(colors.b.navy),0_0_0_4px_theme(colors.b.yellow)] focus-visible:outline-none tabular";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus("");
          dialogRef.current?.showModal();
        }}
        className={
          variant === "pill"
            ? "inline-flex min-h-[3.25rem] items-center gap-2 rounded-b-pill px-6 text-b-small font-semibold text-b-navy shadow-[inset_0_0_0_1.5px_theme(colors.b.navy)] transition-colors hover:bg-b-navy hover:text-b-on-navy"
            : variant === "bar"
            ? "inline-flex min-h-11 items-center gap-1.5 px-1 text-b-label font-semibold underline decoration-b-yellow decoration-2 underline-offset-[0.45em]"
            : "flex min-h-12 w-full items-center gap-3 text-left text-b-body font-medium"
        }
      >
        <Icon name="list" size={16} />
        Quickorder
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`${uid}-title`}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] rounded-b border-0 bg-b-paper p-0 shadow-b-menu"
      >
        <form onSubmit={onSubmit} noValidate className="p-6 sm:p-8">
          <header className="flex items-center justify-between gap-4">
            <h2 id={`${uid}-title`} className="text-b-display-3 font-semibold">
              Quickorder
            </h2>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close Quickorder" className="-mr-2.5 grid h-11 w-11 place-items-center">
              <Icon name="close" size={20} />
            </button>
          </header>
          <p className="mt-2 text-b-small text-b-ink-2">Know your article numbers? Add several items at once.</p>
          <div role="group" aria-label="Order lines" className="mt-5 grid gap-2">
            <div aria-hidden="true" className="grid grid-cols-[minmax(0,1fr)_6rem] gap-2 text-b-label font-semibold text-b-ink-3">
              <span>Article number</span>
              <span>Quantity</span>
            </div>
            {rows.map((k, i) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_6rem] gap-2">
                <label className="sr-only" htmlFor={`${uid}-article-${k}`}>
                  Article number, line {i + 1}
                </label>
                <input id={`${uid}-article-${k}`} name={`article-${k}`} inputMode="numeric" autoComplete="off" placeholder={i === 0 ? "106330" : ""} className={input} />
                <label className="sr-only" htmlFor={`${uid}-qty-${k}`}>
                  Quantity, line {i + 1}
                </label>
                <input id={`${uid}-qty-${k}`} name={`qty-${k}`} type="number" min={1} defaultValue={1} className={`${input} text-right`} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setRows((prev) => [...prev, (prev.at(-1) ?? 0) + 1])}
            className="mt-3 min-h-11 text-b-small font-semibold underline decoration-b-rule-strong underline-offset-[0.3em]"
          >
            Add another line
          </button>
          <p role="status" aria-live="polite" className="mt-3 rounded-b bg-b-linen px-4 py-3 text-b-small empty:hidden">
            {status}
          </p>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="inline-flex min-h-[3.25rem] items-center gap-3 rounded-b bg-b-navy px-6 text-b-small font-semibold text-b-on-navy hover:bg-b-navy-soft">
              Add to cart
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
