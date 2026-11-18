import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { RosetteArt } from "@/components/art/RosetteArt";
import { formatMoney } from "@/lib/format";
import { Icon } from "./Icon";
import { WishlistButton } from "./WishlistButton";

/**
 * Product tile, not a boxed card: the product stands large on a tinted stage, and the name, verified specifications and
 * price sit directly on the page below it. The whole tile is one link. Only data the live store states is shown.
 * Rows align across a grid through subgrid (the parent list gives each item 4 rows).
 */
export function ProductCard({ product, rangeLabel, ctaLabel }: { product: Product; rangeLabel?: string; ctaLabel: string }) {
  const tier = product.tiers[0];
  const img = product.image;
  return (
    <article className="group relative row-span-4 grid grid-rows-subgrid gap-0 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-[6px] has-[a:focus-visible]:outline-b-navy">
      <div className="relative aspect-[4/5] overflow-hidden rounded-b-card bg-b-stone transition-colors duration-300 ease-b-out group-hover:bg-b-yellow-soft">
        <div className="absolute inset-x-[10%] bottom-[5%] top-[7%] transition-transform duration-500 ease-b-out group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
          {img ? (
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width ?? 600}
              height={img.height ?? 750}
              sizes="(min-width: 64rem) 28vw, 48vw"
              className="h-full w-full object-contain object-bottom drop-shadow-[0_14px_14px_rgba(11,26,61,0.22)]"
            />
          ) : (
            <RosetteArt spec={product.art} className="mx-auto h-full w-auto" />
          )}
        </div>
        {product.stock === "in_stock" ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-b-pill bg-b-paper px-2.5 py-1 text-b-label font-semibold text-b-ink-2">
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-b-success" />
            In stock
          </span>
        ) : null}
        <WishlistButton productName={product.name} />
      </div>

      <div className="pt-4">
        {rangeLabel ? <p className="text-b-label font-semibold text-b-ink-3">{rangeLabel}</p> : null}
        <h3 className="b-display mt-1 text-[1.375rem] leading-tight sm:text-[1.625rem]">
          <Link href={product.href} className="no-underline after:absolute after:inset-0 after:z-[1] focus-visible:shadow-none focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
      </div>

      <p className="tabular pt-2 text-b-small text-b-ink-2">
        {product.awardTerm ? <span className="mr-2 font-bold tracking-[0.04em] text-b-ink">{product.awardTerm}</span> : null}
        {product.specs?.join(" · ")}
        {product.articleNumber ? <span className="mt-0.5 block text-b-label text-b-ink-3">Art. no. {product.articleNumber}</span> : null}
      </p>

      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 pt-3">
        <p className="grid">
          <span className="flex items-baseline gap-1.5 font-bold">
            {product.priceFrom ? <span className="text-b-small font-normal text-b-ink-2">From</span> : null}
            <span className="tabular text-[1.375rem] tracking-[-0.01em] sm:text-[1.625rem]">{formatMoney(product.price)}</span>
          </span>
          {tier ? (
            <span className="tabular text-b-small text-b-ink-2">
              {formatMoney(tier.unitPrice)} each from {tier.minQuantity} pcs
            </span>
          ) : null}
        </p>
        <span aria-hidden="true" className="inline-flex items-center gap-2 text-b-small font-semibold text-b-navy underline decoration-b-yellow decoration-2 underline-offset-[0.4em]">
          {ctaLabel}
          <Icon name="arrow-right" size={16} className="transition-transform duration-300 ease-b-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
