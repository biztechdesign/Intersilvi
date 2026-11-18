"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Market } from "@/lib/commerce/types";
import type { Link as NavLink, NavGroup } from "@/lib/content/types";
import { IconButton } from "@/design-system";
import { Icon } from "./Icon";
import { MarketSwitcher } from "./MarketSwitcher";
import { QuickOrder } from "./QuickOrder";
import { motionClass } from "@/design-system/motion-classes";

interface MobileMenuProps {
  groups: NavGroup[];
  utility: NavLink[];
  markets: Market[];
}

/**
 * Mobile and tablet drawer. A native modal <dialog> gives focus containment and Escape to close.
 * Groups expand with <details>, so they work before hydration.
 */
export function MobileMenu({ groups, utility, markets }: MobileMenuProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();
  /* Matches the shared Button (lg): 48px, rounded-md, 24px padding, bold, 3px lift on hover. */
  const drawerButton =
    "flex min-h-12 items-center justify-between gap-2 rounded-button px-6 text-button font-bold no-underline transition-[color,background-color,transform] duration-base ease-standard motion-safe:hover:-translate-y-lift motion-safe:active:translate-y-0";
  const row = "flex min-h-[3.25rem] items-center justify-between text-lead font-medium no-underline";

  return (
    <>
      <IconButton icon="menu" label="Open menu" onClick={() => ref.current?.showModal()} className="-ml-2 lg:hidden" />
      <dialog
        ref={ref}
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="m-0 h-dvh max-h-dvh w-[min(26rem,100vw)] max-w-[100vw] border-0 bg-surface p-0 motion-safe:open:animate-drawer-in-left"
      >
        <div className="grid gap-6 px-gutter pb-12 pt-3">
          <div className="flex min-h-14 items-center justify-between border-b border-line">
            <span className="font-semibold">Menu</span>
            <IconButton icon="close" label="Close menu" onClick={close} className="-mr-2" />
          </div>

          <div className="grid gap-2">
            <Link href="#shop" onClick={close} className={`${drawerButton} bg-action-primary text-fg-inverse hover:bg-action-primary-hover active:bg-action-primary-active`}>
              Explore products
              <Icon name="arrow-right" size={18} />
            </Link>
            <Link href="/concept-b/design-your-own" onClick={close} className={`${drawerButton} bg-action-accent text-fg-on-accent hover:bg-action-accent-hover`}>
              Design your own rosette
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>

          <nav aria-label="Main">
            <ul className="border-t border-line">
              {groups
                .filter((g) => g.id !== "design")
                .map((g) => (
                  <li key={g.id} className="border-b border-line">
                    {g.columns.length ? (
                      <details className="group">
                        <summary className={`${row} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
                          {g.fullLabel ?? g.label}
                          <Icon name="chevron-down" size={18} className={`text-fg-muted ${motionClass.chevron} group-open:rotate-180`} />
                        </summary>
                        <div className="grid gap-5 pb-5 pl-4 pt-1">
                          {g.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="mb-1 text-label font-semibold text-fg-muted">{col.heading}</p>
                              <ul>
                                {col.links.map((l) => (
                                  <li key={l.href}>
                                    <Link href={l.href} onClick={close} className="flex min-h-11 items-center no-underline">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link href={g.href} onClick={close} className="inline-flex min-h-11 items-center font-semibold underline decoration-brand-navy decoration-2 underline-offset-[0.4em]">
                            View the full range
                          </Link>
                        </div>
                      </details>
                    ) : (
                      <Link href={g.href} onClick={close} className={row}>
                        {g.fullLabel ?? g.label}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </nav>

          <div className="grid">
            <QuickOrder variant="drawer" />
            <Link href="/concept-b/account/login" onClick={close} className="flex min-h-12 items-center gap-3 no-underline">
              <Icon name="user" size={18} />
              Log in or create account
            </Link>
            {utility.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} className="flex min-h-12 items-center no-underline">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-line pt-5">
            <MarketSwitcher markets={markets} layout="list" />
          </div>
        </div>
      </dialog>
    </>
  );
}
