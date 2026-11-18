"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavGroup } from "@/lib/content/types";
import { Icon } from "./Icon";
import { useDismiss } from "./useDismiss";
import { motionClass } from "@/design-system/motion-classes";

/**
 * Desktop primary navigation with mega-menu panels.
 * Panels open on click, or on hover after a short intent delay for fine pointers. Escape or an outside press closes them.
 * Labels are the short names (the full range name heads each panel).
 * The group for the current page keeps its underline (restrained active state).
 */
export function PrimaryNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  function hoverOpen(id: string | null) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenId(id), id ? 140 : 220);
  }

  /* One line at every desktop width: the type scales with the viewport (13px at 1024px up to 16px) and the items spread across the row. Underline that grows on hover and while a panel is open; the design journey's underline is yellow. */
  const link =
    `relative inline-flex min-h-14 items-center gap-1 whitespace-nowrap text-nav font-medium xl:gap-1.5 text-fg no-underline transition-colors duration-fast ease-standard after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-fg data-[active=true]:after:h-[3px] ${motionClass.underlineGrow} aria-expanded:after:scale-x-100 data-[active=true]:after:scale-x-100`;

  return (
    <nav ref={navRef} aria-label="Main" onMouseLeave={() => hoverOpen(null)} className="hidden lg:block">
      <ul className="-mx-4 flex flex-nowrap xl:mx-0 justify-between gap-x-1 xl:gap-x-4 [&>li]:shrink-0">
        {groups.map((g) => {
          const hasPanel = g.columns.length > 0;
          const open = openId === g.id;
          const panelId = `mega-${g.id}`;
          return (
            <li key={g.id} onMouseEnter={() => hoverOpen(hasPanel ? g.id : null)}>
              {hasPanel ? (
                <button type="button" aria-expanded={open} aria-controls={panelId} data-active={isActive(g.href)} onClick={() => setOpenId(open ? null : g.id)} className={`group ${link}`}>
                  {g.label}
                  <Icon name="chevron-down" size={14} className={`text-fg-muted ${motionClass.chevron} group-aria-expanded:rotate-180`} />
                </button>
              ) : (
                <Link href={g.href} data-active={isActive(g.href)} aria-current={isActive(g.href) ? "page" : undefined} className={`${link} ${g.id === "sale" ? "!font-bold" : ""}`}>
                  {g.label}
                </Link>
              )}
              {hasPanel ? (
                <div id={panelId} hidden={!open} className={`absolute inset-x-0 top-full ${motionClass.panelIn} z-dropdown border-t border-line bg-surface shadow-lg`}>
                  <div className="ds-container grid grid-cols-[minmax(0,1fr)_17rem] gap-12 pb-12 pt-8">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-8">
                      {g.columns.map((col) => (
                        <div key={col.heading}>
                          <h3 className="mb-3 text-label font-semibold text-fg-muted">{col.heading}</h3>
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} onClick={close} className="block py-1.5 text-body no-underline hover:underline hover:decoration-line-strong">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="border-l border-line pl-8">
                      <p className="mb-2 text-h3 font-semibold">{g.fullLabel ?? g.label}</p>
                      <Link
                        href={g.href}
                        onClick={close}
                        className="inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold underline decoration-brand-navy decoration-2 underline-offset-[0.4em]"
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
