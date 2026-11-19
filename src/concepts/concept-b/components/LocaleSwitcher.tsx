"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { Market, MarketCode } from "@/lib/commerce/types";
import { Icon } from "./Icon";
import { Flag } from "./BrandMark";
import { useDismiss } from "./useDismiss";
import { motionClass } from "@/design-system/motion-classes";

/** Locale codes as on the current site. */
const CODE: Record<MarketCode, string> = { se: "SV", com: "ENG", no: "NO", dk: "DK", fi: "FI", de: "DE" };

/**
 * Language/market switcher for the utility bar: the current flag and a chevron, opening a list of flag + locale code
 * (SV, ENG, NO, DK, FI, DE). SIMULATED: choosing a locale only changes the flag in this prototype.
 * The panel sits above the sticky header (z-[45]) so it never slips underneath it.
 */
export function LocaleSwitcher({ markets, current = "com" }: { markets: Market[]; current?: MarketCode }) {
  const [selected, setSelected] = useState<MarketCode>(current);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const active = markets.find((m) => m.code === selected);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex min-h-12 items-center gap-2 px-3 text-fg-inverse transition-colors duration-fast hover:bg-surface-inverse-raised"
      >
        <Flag id={selected} />
        <span className="sr-only">Language and market: {active?.label}</span>
        <Icon name="chevron-down" size={16} className={`${motionClass.chevron} group-aria-expanded:rotate-180`} />
      </button>
      <ul
        id={panelId}
        hidden={!open}
        aria-label="Language and market"
        className={`${motionClass.menuIn} absolute right-0 top-[calc(100%+0.25rem)] z-[45] w-44 rounded-lg border border-line bg-surface p-1.5 text-fg shadow-lg`}
      >
        {markets.map((m) => (
          <li key={m.code}>
            <button
              type="button"
              aria-pressed={m.code === selected}
              aria-label={`${m.label} (${m.domain})`}
              onClick={() => {
                setSelected(m.code);
                setOpen(false);
              }}
              className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-body-sm text-fg hover:bg-surface-alt aria-pressed:bg-selected-surface aria-pressed:font-bold"
            >
              <Flag id={m.code} />
              {CODE[m.code]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
