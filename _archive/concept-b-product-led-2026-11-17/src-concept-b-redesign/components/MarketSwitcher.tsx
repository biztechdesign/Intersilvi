"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { Market, MarketCode } from "@/lib/commerce/types";
import { Icon } from "./Icon";
import { useDismiss } from "./useDismiss";

interface MarketSwitcherProps {
  markets: Market[];
  current?: MarketCode;
  /** "bar": compact, for the navy utility bar. "list": full grid, for the mobile drawer. */
  layout?: "bar" | "list";
}

const dot = "inline-block h-2 w-2 flex-none rounded-full bg-b-yellow ring-1 ring-b-yellow-deep";

/** Language and market switcher. SIMULATED: selecting a market only changes the label in this prototype. */
export function MarketSwitcher({ markets, current = "com", layout = "bar" }: MarketSwitcherProps) {
  const [selected, setSelected] = useState<MarketCode>(current);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const active = markets.find((m) => m.code === selected);

  if (layout === "list") {
    return (
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 p-0 text-b-label font-semibold text-b-ink-2">Language and market</legend>
        <div className="grid grid-cols-3 gap-2">
          {markets.map((m) => (
            <button
              key={m.code}
              type="button"
              aria-pressed={m.code === selected}
              onClick={() => setSelected(m.code)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-b bg-b-paper text-b-small shadow-[inset_0_0_0_1px_theme(colors.b.rule)] aria-pressed:font-semibold aria-pressed:shadow-[inset_0_0_0_1.5px_theme(colors.b.navy)]"
            >
              {m.label}
              {m.code === selected ? <span className={dot} aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
        <p className="mt-2 text-b-label text-b-ink-3">Prototype: switching language is simulated.</p>
      </fieldset>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex min-h-11 items-center gap-1.5 px-1 text-b-label font-medium"
      >
        <Icon name="globe" size={16} />
        <span>{active?.label}</span>
        <span className="sr-only">, change language and market</span>
        <Icon name="chevron-down" size={14} className="transition-transform group-aria-expanded:rotate-180" />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute right-0 top-[calc(100%+0.25rem)] z-b-menu w-60 rounded-b border border-b-rule bg-b-paper p-2 text-b-ink shadow-b-menu"
      >
        <ul>
          {markets.map((m) => (
            <li key={m.code}>
              <button
                type="button"
                aria-pressed={m.code === selected}
                onClick={() => {
                  setSelected(m.code);
                  setOpen(false);
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-b px-3 text-left text-b-small hover:bg-b-linen aria-pressed:font-semibold"
              >
                {m.code === selected ? <span className={dot} aria-hidden="true" /> : <span className="w-2" />}
                <span>{m.label}</span>
                <span className="ml-auto text-b-label text-b-ink-3">{m.domain}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="px-3 pb-1 pt-2 text-b-label text-b-ink-3">Prototype: switching language is simulated.</p>
      </div>
    </div>
  );
}
