"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import type { NavGroup } from "@/lib/content/types";
import { motionClass } from "@/design-system/motion-classes";
import { Icon } from "./Icon";

/** Pointer intent: open after a short pause, switch between open panels a little faster, close after a grace period. */
const OPEN_DELAY = 120;
const SWITCH_DELAY = 90;
const CLOSE_DELAY = 240;

/**
 * Concept A desktop category row with mega-menu panels that drop as a white card under the header card (disclosure pattern: button + aria-expanded + aria-controls).
 * Labels, order, groups and destinations come unchanged from `primaryNav` (src/content/site.ts).
 *
 * Pointer: panels open on hover after a short intent delay (fine pointers only) and on click. The panel is a DOM child of
 * its list item and starts flush under the card (its 8px top gap is padding, part of the panel), so moving from a trigger
 * into its panel never closes it; crossing a
 * neighbouring trigger on the way down is absorbed by the switch delay.
 * Keyboard: Enter/Space toggle, ArrowDown opens and moves into the panel, Escape closes and returns focus to the trigger,
 * and tabbing out of an item closes its panel. A press outside closes everything.
 */
export function PrimaryNav({ groups }: { groups: NavGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openRef = useRef<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    openRef.current = openId;
  }, [openId]);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setOpenId(null);
  }, [clearTimer]);

  const closeAndFocusTrigger = useCallback(() => {
    const id = openRef.current;
    close();
    if (id) triggers.current[id]?.focus();
  }, [close]);

  /* Escape anywhere and presses outside the nav close the open panel. */
  useEffect(() => {
    if (!openId) return;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") closeAndFocusTrigger();
    }
    function onPointer(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openId, close, closeAndFocusTrigger]);

  useEffect(() => clearTimer, [clearTimer]);

  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function pointerEnter(id: string | null) {
    if (!finePointer()) return;
    clearTimer();
    if (id === null) {
      if (openRef.current) timer.current = setTimeout(close, CLOSE_DELAY);
      return;
    }
    if (openRef.current === id) return;
    timer.current = setTimeout(() => setOpenId(id), openRef.current ? SWITCH_DELAY : OPEN_DELAY);
  }

  function pointerLeaveNav() {
    if (!finePointer()) return;
    clearTimer();
    timer.current = setTimeout(close, CLOSE_DELAY);
  }

  function onTriggerKey(e: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    clearTimer();
    setOpenId(id);
    requestAnimationFrame(() => document.getElementById(`mega-${id}`)?.querySelector<HTMLElement>("a")?.focus());
  }

  function onItemBlur(e: FocusEvent<HTMLLIElement>, id: string) {
    if (openRef.current !== id) return;
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
  }

  /* Underline that grows on hover, on focus and while a panel is open; the design journey's underline is yellow. */
  const link = `relative inline-flex min-h-12 items-center gap-1 whitespace-nowrap text-body-sm font-medium text-fg no-underline after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-fg ${motionClass.underlineGrow} focus-visible:after:scale-x-100 aria-expanded:after:scale-x-100`;

  return (
    <nav ref={navRef} aria-label="Main" onMouseLeave={pointerLeaveNav} onMouseEnter={clearTimer}>
      <ul className="flex flex-wrap gap-x-[clamp(1.25rem,0.4rem+1.6vw,2.25rem)]">
        {groups.map((g) => {
          const hasPanel = g.columns.length > 0;
          const open = openId === g.id;
          const panelId = `mega-${g.id}`;
          return (
            <li key={g.id} onMouseEnter={() => pointerEnter(hasPanel ? g.id : null)} onBlur={hasPanel ? (e) => onItemBlur(e, g.id) : undefined}>
              {hasPanel ? (
                <button
                  ref={(el) => {
                    triggers.current[g.id] = el;
                  }}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => {
                    clearTimer();
                    setOpenId(open ? null : g.id);
                  }}
                  onKeyDown={(e) => onTriggerKey(e, g.id)}
                  className={`group ${link} aria-expanded:text-fg`}
                >
                  {g.label}
                  <Icon name="chevron-down" size={14} className={`text-fg-muted ${motionClass.chevron} group-aria-expanded:rotate-180`} />
                </button>
              ) : (
                <Link href={g.href} className={`${link} ${g.id === "design" ? "font-semibold after:h-[3px] after:bg-brand-yellow" : ""}`}>
                  {g.label}
                </Link>
              )}

              {hasPanel ? (
                <div
                  id={panelId}
                  hidden={!open}
                  className={`absolute inset-x-0 top-full z-dropdown pt-2 ${motionClass.panelIn}`}
                >
                  <div className="grid max-h-[min(70vh,34rem)] grid-cols-[minmax(0,1fr)_17rem] gap-12 overflow-y-auto rounded-lg bg-surface px-6 py-7 shadow-lg xl:grid-cols-[minmax(0,1fr)_19rem]">
                    <div className="grid content-start gap-x-12 gap-y-8 [grid-template-columns:repeat(auto-fill,minmax(12.5rem,15rem))]">
                      {g.columns.map((col) => (
                        <div key={col.heading} data-col="" className="min-w-0">
                          <h3 className="mb-2 border-b border-line pb-2.5 text-label text-fg-muted">{col.heading}</h3>
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={close}
                                  className="group/item -mx-2.5 flex min-h-9 items-center justify-between gap-3 rounded-sm px-2.5 text-body-sm text-fg no-underline transition-colors duration-fast ease-standard hover:bg-surface-alt focus-visible:bg-surface-alt"
                                >
                                  <span className="min-w-0">{l.label}</span>
                                  <Icon
                                    name="chevron-right"
                                    size={16}
                                    className="flex-none text-fg-muted opacity-0 transition-[opacity,transform] duration-base ease-emphasized group-hover/item:opacity-100 group-focus-visible/item:opacity-100 motion-safe:group-hover/item:translate-x-0.5"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="self-start rounded-lg bg-surface-alt p-6">
                      <p className="text-h5 text-fg">{g.fullLabel ?? g.label}</p>
                      <Link
                        href={g.href}
                        onClick={close}
                        className="group mt-4 inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-fg underline decoration-brand-yellow decoration-2 underline-offset-[0.4em] hover:decoration-fg"
                      >
                        View the full range
                        <Icon name="arrow-right" size={18} className={motionClass.arrowNudge} />
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
