import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "../utils";
import { Icon } from "./Icon";
import { motionClass } from "../motion-classes";

/**
 * Global navigation building blocks. All content (links, markets, contact details) arrives as props from
 * the content layer; these components only lay it out.
 */

export interface NavLink {
  label: string;
  href: string;
}

/* ---------- Utility bar ---------- */

/** Slim navy bar: contact on the left, utility links + Quickorder + market selector on the right. */
export function UtilityBar({ start, links, end }: { start?: ReactNode; links: NavLink[]; end?: ReactNode }) {
  return (
    <div className="ds-inverse bg-surface-inverse text-label text-fg-inverse-muted">
      <div className="ds-container flex min-h-11 items-center justify-between gap-4">
        <div className="flex items-center gap-5">{start}</div>
        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center font-medium text-fg-inverse-muted no-underline hover:text-fg-inverse hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {end}
        </div>
      </div>
    </div>
  );
}

/* ---------- Header ---------- */

export interface HeaderProps {
  logo: { src: string; alt: string; width: number; height: number; href: string };
  search: ReactNode;
  /** Account, wishlist, cart: icon links with visible labels from xl. */
  actions: { icon: "user" | "heart" | "bag"; label: string; href: string; count?: number }[];
  nav: ReactNode;
  /** Mobile menu trigger (a Dialog drawer). */
  menu?: ReactNode;
  /** Stick to the top while scrolling. Also makes the header the positioning context for mega-menu panels. */
  sticky?: boolean;
  /** Optional journey action shown before the icon actions from lg (e.g. a "Design your own" accent button). */
  cta?: ReactNode;
}

/** Main header: logo, search (full width on mobile, second row), actions, then the category navigation row. */
export function SiteHeader({ logo, search, actions, nav, menu, sticky, cta }: HeaderProps) {
  return (
    <header className={cx("border-b border-line bg-surface", sticky ? "sticky top-0 z-sticky" : "relative")}>
      <div className="ds-container grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-3 py-3 lg:grid-cols-[auto_minmax(18rem,40rem)_auto] lg:justify-between lg:gap-x-8 lg:py-4">
        <div className="flex items-center gap-1">
          {menu ? <div className="lg:hidden">{menu}</div> : null}
          <Link href={logo.href} aria-label={`${logo.alt}, home`} className="inline-flex min-h-11 items-center">
            <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="h-10 w-auto" />
          </Link>
        </div>
        <div className="col-span-3 row-start-2 lg:col-span-1 lg:row-start-auto">{search}</div>
        <ul className="col-start-3 row-start-1 flex items-center justify-end gap-1 lg:gap-3">
          {cta ? <li className="hidden lg:block">{cta}</li> : null}
          {actions.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="group relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-1 text-nav text-fg no-underline hover:bg-surface-alt">
                <span className="relative inline-grid">
                  <Icon name={a.icon} size={22} />
                  {a.count !== undefined ? (
                    <span className="ds-numeric absolute -right-2 -top-1.5 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-action-accent px-1 text-caption font-extrabold text-fg-on-accent">
                      {a.count}
                    </span>
                  ) : null}
                </span>
                <span className="hidden xl:inline">{a.label}</span>
                {a.count !== undefined ? <span className="sr-only">, {a.count} items</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="ds-container hidden lg:block">{nav}</div>
    </header>
  );
}

/* ---------- Primary nav row (desktop) ---------- */

/** Category links with an underline indicator for hover, open and current page. Panels attach via `panelFor`. */
export function PrimaryNavRow({ items, current }: { items: NavLink[]; current?: string }) {
  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap gap-x-7">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              aria-current={it.href === current ? "page" : undefined}
              className={`relative inline-flex min-h-12 items-center text-nav text-fg no-underline after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-selected ${motionClass.underlineGrow} aria-[current=page]:after:scale-x-100`}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Mega menu panel ---------- */

/** Mega-menu content: up to four link columns plus a feature slot. The open/close behaviour belongs to the header. */
export function MegaMenuPanel({ columns, feature }: { columns: { heading: string; links: NavLink[] }[]; feature?: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-card-lg shadow-md">
      <div className={cx("grid gap-8", feature ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]" : "")}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-8">
          {columns.map((c) => (
            <div key={c.heading}>
              <p className="mb-2 text-label text-fg-muted">{c.heading}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-10 items-center text-body text-fg no-underline hover:underline hover:decoration-line-strong">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {feature ? <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">{feature}</div> : null}
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */

export interface FooterProps {
  brand: ReactNode;
  columns: { heading: string; links: (NavLink & { external?: boolean })[] }[];
  contact: ReactNode;
  legal: ReactNode;
  newsletter?: ReactNode;
}

/** Site footer on navy: brand + address, link columns, contact, optional newsletter, legal line. */
export function SiteFooter({ brand, columns, contact, legal, newsletter }: FooterProps) {
  return (
    <footer className="ds-inverse bg-surface-inverse text-body-sm text-fg-inverse-muted">
      <div className="ds-container grid gap-x-8 gap-y-10 py-section-sm sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))_1.3fr]">
        <div className="grid content-start gap-4 sm:col-span-2 lg:col-span-1">{brand}</div>
        {columns.map((c) => (
          <nav key={c.heading} aria-label={c.heading}>
            <h2 className="mb-3 text-label text-fg-inverse">{c.heading}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-9 items-center text-fg-inverse-muted no-underline hover:text-fg-inverse hover:underline"
                  >
                    {l.label}
                    {l.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="grid content-start gap-4">
          {contact}
          {newsletter}
        </div>
      </div>
      <div className="ds-container border-t border-line-inverse py-5 text-caption">{legal}</div>
    </footer>
  );
}
