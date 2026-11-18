"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavGroup } from "@/lib/content/types";
import { Icon } from "./Icon";
import { useDismiss } from "./useDismiss";

/**
 * Desktop primary navigation with mega-menu panels.
 * Panels open on click, or on hover after a short intent delay for fine pointers. Escape or an outside press closes them.
 */
export function PrimaryNav({ groups }: { groups: NavGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  useDismiss(navRef, openId !== null, close);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function hoverOpen(id: string | null) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenId(id), id ? 140 : 220);
  }

  /* Underline that grows on hover and while a panel is open; the design journey's underline is yellow. */
  const link =
    "relative inline-flex min-h-12 items-center gap-1 whitespace-nowrap text-b-small font-medium text-b-ink no-underline after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-b-ink after:transition-transform after:duration-500 after:ease-b-out hover:after:scale-x-100 aria-expanded:after:scale-x-100";

  return (
    <nav ref={navRef} aria-label="Main" onMouseLeave={() => hoverOpen(null)} className="hidden lg:block">
      <ul className="flex flex-wrap gap-x-[clamp(1rem,0.2rem+1.4vw,2rem)]">
        {groups.map((g) => {
          const hasPanel = g.columns.length > 0;
          const open = openId === g.id;
          const panelId = `mega-${g.id}`;
          return (
            <li key={g.id} onMouseEnter={() => hoverOpen(hasPanel ? g.id : null)}>
              {hasPanel ? (
                <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenId(open ? null : g.id)} className={`group ${link}`}>
                  {g.label}
                  <Icon name="chevron-down" size={14} className="text-b-ink-3 transition-transform group-aria-expanded:rotate-180" />
                </button>
              ) : (
                <Link href={g.href} className={`${link} ${g.id === "design" ? "font-semibold after:h-[3px] after:bg-b-yellow" : ""}`}>
                  {g.label}
                </Link>
              )}
              {hasPanel ? (
                <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full z-b-menu border-t border-b-rule bg-b-paper shadow-b-menu">
                  <div className="b-container grid grid-cols-[minmax(0,1fr)_17rem] gap-12 pb-12 pt-8">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-8">
                      {g.columns.map((col) => (
                        <div key={col.heading}>
                          <h3 className="mb-3 text-b-label font-semibold text-b-ink-3">{col.heading}</h3>
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} onClick={close} className="block py-1.5 text-b-body no-underline hover:underline hover:decoration-b-rule-strong">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="border-l border-b-rule pl-8">
                      <p className="mb-2 text-b-display-3 font-semibold">{g.fullLabel ?? g.label}</p>
                      <Link
                        href={g.href}
                        onClick={close}
                        className="inline-flex min-h-11 items-center gap-2 text-b-small font-semibold underline decoration-b-navy decoration-2 underline-offset-[0.4em]"
                      >
                        View the full range
                        <Icon name="arrow-right" size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
