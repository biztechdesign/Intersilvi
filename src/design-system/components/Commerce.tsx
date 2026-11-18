import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Money } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { cx } from "../utils";
import { Icon } from "./Icon";
import { motionClass } from "../motion-classes";

/**
 * Commerce presentation components. They render data passed in as props and never fetch, price,
 * or decide availability themselves: prices, stock and lead times come from the commerce adapter.
 */

/* ---------- Badge ---------- */

export type BadgeVariant = "neutral" | "new" | "sale" | "custom" | "success" | "warning" | "error" | "info";

const badgeStyle: Record<BadgeVariant, string> = {
  neutral: "bg-surface-alt text-fg-secondary ring-1 ring-inset ring-line",
  new: "bg-badge-new-surface text-fg",
  sale: "bg-badge-sale-surface text-status-error",
  custom: "bg-badge-custom-surface text-status-warning",
  success: "bg-status-success-surface text-status-success",
  warning: "bg-status-warning-surface text-status-warning",
  error: "bg-status-error-surface text-status-error",
  info: "bg-status-info-surface text-status-info",
};

/** Short status label on products and rows. Text always states the meaning; colour only reinforces it. */
export function Badge({ variant = "neutral", children, className }: { variant?: BadgeVariant; children: ReactNode; className?: string }) {
  return <span className={cx("inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-caption font-bold", badgeStyle[variant], className)}>{children}</span>;
}

/* ---------- Availability ---------- */

export type Availability = "in_stock" | "made_to_order" | "low_stock" | "out_of_stock";

const availability: Record<Availability, { label: string; dot: string }> = {
  in_stock: { label: "In stock", dot: "bg-status-success" },
  made_to_order: { label: "Made to order", dot: "bg-brand-yellow ring-1 ring-inset ring-status-warning/40" },
  low_stock: { label: "Few left", dot: "bg-status-warning" },
  out_of_stock: { label: "Out of stock", dot: "bg-fg-disabled" },
};

/** Availability with an optional detail line (e.g. a production time from the commerce adapter). */
export function StockStatus({ status, detail, className }: { status: Availability; detail?: ReactNode; className?: string }) {
  const a = availability[status];
  return (
    <p className={cx("flex flex-wrap items-center gap-x-2 gap-y-0.5 text-body-sm", className)}>
      <span aria-hidden="true" className={cx("h-2 w-2 flex-none rounded-full", a.dot)} />
      <span className="font-semibold text-fg">{a.label}</span>
      {detail ? <span className="text-fg-muted">{detail}</span> : null}
    </p>
  );
}

/* ---------- Price ---------- */

export interface PriceProps {
  price: Money;
  /** "From" prefix when the store lists the lowest quantity price. */
  from?: boolean;
  /** Previous price, shown struck through, for sale items. */
  compareAt?: Money;
  /** "incl. VAT" suffix. Omit when a section note already states it. */
  vatNote?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Price({ price, from, compareAt, vatNote, size = "md", className }: PriceProps) {
  const sizeCls = { sm: "text-body font-extrabold", md: "text-price", lg: "text-price-lg" }[size];
  return (
    <p className={cx("ds-numeric flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-fg", className)}>
      {from ? <span className="text-body-sm font-medium text-fg-secondary">From</span> : null}
      <span className={cx(sizeCls, compareAt && "text-status-error")}>{formatMoney(price)}</span>
      {compareAt ? (
        <span className="text-body-sm text-fg-muted line-through">
          <span className="sr-only">Was </span>
          {formatMoney(compareAt)}
        </span>
      ) : null}
      {vatNote ? <span className="text-caption text-fg-muted">{vatNote}</span> : null}
    </p>
  );
}

/* ---------- Tier pricing ---------- */

export interface Tier {
  minQuantity: number;
  unitPrice: Money;
}

/** Quantity price table. `activeQuantity` highlights the tier that applies to the chosen quantity. */
export function TierPricing({ tiers, activeQuantity, caption = "Quantity pricing" }: { tiers: Tier[]; activeQuantity?: number; caption?: string }) {
  const active = activeQuantity ? [...tiers].reverse().find((t) => activeQuantity >= t.minQuantity) : undefined;
  return (
    <table className="ds-numeric w-full border-collapse text-body-sm">
      <caption className="mb-2 text-left text-label text-fg">{caption}</caption>
      <thead>
        <tr className="border-b border-line text-left text-caption text-fg-muted">
          <th scope="col" className="py-2 pr-4 font-semibold">
            Quantity
          </th>
          <th scope="col" className="py-2 text-right font-semibold">
            Price each
          </th>
        </tr>
      </thead>
      <tbody>
        {tiers.map((t, i) => {
          const next = tiers[i + 1];
          const isActive = active === t;
          return (
            <tr key={t.minQuantity} aria-current={isActive || undefined} className={cx("border-b border-line", isActive && "bg-selected-surface font-bold")}>
              <td className="py-2 pl-2 pr-4">{next ? `${t.minQuantity}–${next.minQuantity - 1}` : `${t.minQuantity}+`}</td>
              <td className="py-2 pr-2 text-right">{formatMoney(t.unitPrice)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------- Specification list ---------- */

/** Key–value product specifications. Values come from product data; empty values are not rendered. */
export function SpecList({ items, className }: { items: { label: string; value?: ReactNode }[]; className?: string }) {
  return (
    <dl className={cx("grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] border-t border-line text-body-sm", className)}>
      {items
        .filter((i) => i.value !== undefined && i.value !== "")
        .map((i) => (
          <div key={i.label} className="col-span-2 grid grid-cols-subgrid border-b border-line py-2.5">
            <dt className="text-fg-muted">{i.label}</dt>
            <dd className="ds-numeric font-semibold text-fg">{i.value}</dd>
          </div>
        ))}
    </dl>
  );
}

/* ---------- Product card ---------- */

export interface ProductCardData {
  name: string;
  href: string;
  image?: { src: string; alt: string };
  /** Range or category name shown above the title. */
  eyebrow?: string;
  /** One line of verified detail (award term, size, article number). */
  meta?: string;
  price: Money;
  priceFrom?: boolean;
  compareAt?: Money;
  /** Lowest quantity tier, when the store lists one. */
  tier?: Tier;
  badges?: { label: string; variant: BadgeVariant }[];
  availability?: Availability;
}

/**
 * Product card. Image on a soft stage (cutouts sit on a consistent ground at a consistent scale), then
 * name, meta, price and availability. The whole card is one link; `action` adds a slot (e.g. a wishlist
 * toggle) above the link layer.
 */
export function ProductCard({ product, action, priority, sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw" }: { product: ProductCardData; action?: ReactNode; priority?: boolean; sizes?: string }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-[box-shadow,border-color] duration-base ease-standard hover:border-line-strong hover:shadow-md has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus">
      <div className="relative aspect-square bg-surface-sunken">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-contain p-[10%] ${motionClass.mediaZoom}`}
          />
        ) : (
          <ImagePlaceholder label={product.name} />
        )}
        {product.badges?.length ? (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b.label} variant={b.variant}>
                {b.label}
              </Badge>
            ))}
          </div>
        ) : null}
        {action ? <div className="absolute right-2 top-2 z-[2]">{action}</div> : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.eyebrow ? <p className="text-caption font-semibold text-fg-muted">{product.eyebrow}</p> : null}
        <h3 className="line-clamp-2 text-card-title text-fg">
          <Link href={product.href} className="no-underline after:absolute after:inset-0 after:z-[1] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        {product.meta ? <p className="text-body-sm text-fg-muted">{product.meta}</p> : null}
        <div className="mt-auto pt-3">
          <Price price={product.price} from={product.priceFrom} compareAt={product.compareAt} />
          {product.tier ? (
            <p className="ds-numeric mt-0.5 text-body-sm text-fg-secondary">
              {formatMoney(product.tier.unitPrice)} each from {product.tier.minQuantity} pcs
            </p>
          ) : null}
          {product.availability ? <StockStatus status={product.availability} className="mt-2" /> : null}
        </div>
      </div>
    </article>
  );
}

/** Missing-image state: a neutral well with an icon, never a broken image. */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div role="img" aria-label={`${label}: image not available`} className="absolute inset-0 grid place-items-center bg-surface-sunken text-fg-disabled">
      <Icon name="image" size={32} />
    </div>
  );
}

/* ---------- Category card ---------- */

export interface CategoryCardData {
  title: string;
  description?: string;
  href: string;
  image: { src: string; alt: string; position?: string };
  /** Small visible credit for provisional images. */
  credit?: string;
}

/**
 * Category card. Photograph with a 40% navy scrim at the bottom only; text sits on the scrim (white, ≥ 7:1).
 * - standard: title + arrow, 4:3 (stack) or fills its grid cell.
 * - featured: larger title, description and a "Shop now" affordance; spans two rows in a mosaic.
 */
export function CategoryCard({ data, variant = "standard", sizes = "(min-width: 1024px) 30vw, 100vw", priority }: { data: CategoryCardData; variant?: "standard" | "featured"; sizes?: string; priority?: boolean }) {
  const featured = variant === "featured";
  return (
    <Link
      href={data.href}
      className={cx(
        "ds-inverse group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-md bg-surface-inverse text-fg-inverse no-underline focus-visible:outline-offset-2",
        featured ? "min-h-[22rem] lg:min-h-[28rem]" : "aspect-[4/3] sm:aspect-auto sm:min-h-[15rem]",
      )}
    >
      <Image
        src={data.image.src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={`-z-10 object-cover ${motionClass.mediaZoom}`}
        style={data.image.position ? { objectPosition: data.image.position } : undefined}
      />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-overlay/80 via-overlay/35 to-transparent" />
      {data.credit ? <span className="absolute left-2 top-2 rounded-sm bg-surface/90 px-1.5 py-0.5 text-caption text-fg-secondary">{data.credit}</span> : null}
      <div className={cx("flex items-end justify-between gap-4", featured ? "p-6 lg:p-8" : "p-5")}>
        <div className="min-w-0">
          <h3 className={featured ? "text-h3" : "text-h5"}>{data.title}</h3>
          {featured && data.description ? <p className="mt-2 max-w-narrow text-body-sm text-fg-inverse-muted">{data.description}</p> : null}
        </div>
        <span aria-hidden="true" className="grid h-11 w-11 flex-none place-items-center rounded-full bg-surface text-fg transition-colors duration-base ease-standard group-hover:bg-action-accent group-focus-visible:bg-action-accent">
          <Icon name="arrow-right" size={18} className={`${motionClass.arrowNudge}`} />
        </span>
      </div>
    </Link>
  );
}

/* ---------- Cart item and order summary ---------- */

export interface CartItemData {
  name: string;
  href: string;
  image?: { src: string; alt: string };
  /** Configuration lines, e.g. "Ribbon: Navy and gold", "Text: Club Show 2027". */
  details?: string[];
  unitPrice: Money;
  lineTotal: Money;
}

/** Cart line. The quantity control and remove action are passed in as slots (they belong to the cart feature). */
export function CartItem({ item, quantity, remove }: { item: CartItemData; quantity: ReactNode; remove: ReactNode }) {
  return (
    <article className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border-b border-line py-5 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-sunken">
        {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="96px" className="object-contain p-2" /> : <ImagePlaceholder label={item.name} />}
      </div>
      <div className="min-w-0">
        <h3 className="text-h6">
          <Link href={item.href} className="no-underline hover:underline">
            {item.name}
          </Link>
        </h3>
        {item.details?.length ? (
          <ul className="mt-1 text-body-sm text-fg-muted">
            {item.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        ) : null}
        <p className="ds-numeric mt-1 text-body-sm text-fg-secondary">{formatMoney(item.unitPrice)} each</p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          {quantity}
          {remove}
        </div>
      </div>
      <p className="ds-numeric col-start-2 text-price sm:col-start-3 sm:row-start-1 sm:text-right">{formatMoney(item.lineTotal)}</p>
    </article>
  );
}

export interface SummaryLine {
  label: string;
  value: ReactNode;
  /** Muted helper beneath the line, e.g. "Calculated at checkout". */
  note?: string;
}

/** Order summary panel. Lines and totals are supplied by the cart/checkout feature. */
export function OrderSummary({ lines, total, action, footnote }: { lines: SummaryLine[]; total: { label: string; value: ReactNode }; action?: ReactNode; footnote?: ReactNode }) {
  return (
    <section aria-label="Order summary" className="rounded-lg border border-line bg-surface-alt p-card">
      <h2 className="text-h5">Order summary</h2>
      <dl className="ds-numeric mt-4 grid gap-3 text-body-sm">
        {lines.map((l) => (
          <div key={l.label} className="flex justify-between gap-4">
            <dt className="text-fg-secondary">
              {l.label}
              {l.note ? <span className="block text-caption text-fg-muted">{l.note}</span> : null}
            </dt>
            <dd className="font-semibold text-fg">{l.value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 border-t border-line pt-4 text-body-lg">
          <dt className="font-bold">{total.label}</dt>
          <dd className="font-extrabold">{total.value}</dd>
        </div>
      </dl>
      {action ? <div className="mt-6">{action}</div> : null}
      {footnote ? <p className="mt-3 text-caption text-fg-muted">{footnote}</p> : null}
    </section>
  );
}

/* ---------- Pagination ---------- */

/** Page navigation for listings. Links (not buttons) so pages are crawlable and shareable. */
export function Pagination({ current, total, hrefFor }: { current: number; total: number; hrefFor: (page: number) => string }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter((p) => p === 1 || p === total || Math.abs(p - current) <= 1);
  const item = "inline-grid h-11 min-w-11 place-items-center rounded-md px-3 text-body-sm font-semibold no-underline transition-colors duration-fast";
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1">
      {current > 1 ? (
        <Link href={hrefFor(current - 1)} className={cx(item, "text-fg hover:bg-surface-soft")} aria-label="Previous page">
          <Icon name="chevron-left" size={18} />
        </Link>
      ) : null}
      {pages.map((p, i) => (
        <span key={p} className="contents">
          {i > 0 && p - (pages[i - 1] ?? p) > 1 ? <span className="px-1 text-fg-muted">…</span> : null}
          <Link
            href={hrefFor(p)}
            aria-current={p === current ? "page" : undefined}
            className={cx(item, "ds-numeric", p === current ? "bg-selected text-fg-inverse" : "text-fg hover:bg-surface-soft")}
          >
            {p}
          </Link>
        </span>
      ))}
      {current < total ? (
        <Link href={hrefFor(current + 1)} className={cx(item, "text-fg hover:bg-surface-soft")} aria-label="Next page">
          <Icon name="chevron-right" size={18} />
        </Link>
      ) : null}
    </nav>
  );
}

/* ---------- Breadcrumbs ---------- */

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-body-sm">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.label} className="flex items-center gap-1.5">
              {last || !it.href ? (
                <span aria-current={last ? "page" : undefined} className="font-semibold text-fg">
                  {it.label}
                </span>
              ) : (
                <Link href={it.href} className="text-fg-muted underline decoration-line-strong underline-offset-[0.2em] hover:text-fg hover:decoration-fg">
                  {it.label}
                </Link>
              )}
              {!last ? <Icon name="chevron-right" size={14} className="text-fg-disabled" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
