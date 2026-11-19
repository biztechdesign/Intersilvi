"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink, Price, WishlistButton, cx } from "@/design-system";
import { RosetteArt } from "@/components/art/RosetteArt";
import { ribbonHex } from "@/lib/commerce/mock/ribbons";
import type { ListingProduct } from "@/lib/listing/types";

const MAX_THUMBS = 4;

/**
 * Stock product card for listings. The picture is the selected design; the small swatches preview the other designs
 * of the SAME product (they change the picture only, never the price or what is bought). The whole card opens the
 * product page, where design and centre disc are chosen: stock rosettes are never added to the cart from here
 * unless the data marks a product as quick-add eligible.
 */
export function ListingCard({ product }: { product: ListingProduct }) {
  const [active, setActive] = useState(0);
  const design = product.designs[active] ?? product.designs[0];
  const extra = product.designs.length - MAX_THUMBS;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-[box-shadow,border-color] duration-base ease-standard hover:border-line-strong hover:shadow-md has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus">
      <div className="relative aspect-square bg-surface-sunken">
        {design ? (
          <div className="absolute inset-0 grid place-items-center p-[10%]">
            <RosetteArt spec={design.art} label={`${product.name}, design ${design.name}`} className="h-full w-auto transition-transform duration-slow ease-emphasized motion-safe:group-hover:scale-media" />
          </div>
        ) : null}
        <div className="absolute right-2 top-2 z-[2]">
          <WishlistButton productName={product.name} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-card-title text-fg">
          <Link href={product.href} className="no-underline after:absolute after:inset-0 after:z-[1] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="ds-numeric text-body-sm text-fg-muted">
          Ø {product.diameterCm} cm · Length {product.lengthCm} cm
        </p>
        {product.designs.length > 1 ? (
          <div className="relative z-[2] mt-1 flex flex-wrap items-center gap-1.5" role="group" aria-label={`Designs for ${product.name}`}>
            {product.designs.slice(0, MAX_THUMBS).map((d, i) => (
              <button
                key={d.id}
                type="button"
                aria-label={`Preview design: ${d.name}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={cx(
                  "grid h-7 w-7 place-items-center rounded-full transition-shadow sm:h-8 sm:w-8 duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                  i === active ? "shadow-[0_0_0_2px_rgb(var(--ds-color-surface)),0_0_0_4px_rgb(var(--ds-color-selected))]" : "shadow-[inset_0_0_0_1px_rgb(11_29_64/0.15)]",
                )}
                style={{ background: `linear-gradient(135deg, ${ribbonHex(d.art.rings[0]!)} 50%, ${ribbonHex(d.art.rings[1]!)} 50%)` }}
              />
            ))}
            {extra > 0 ? <span className="ds-numeric text-body-sm text-fg-muted">+{extra}</span> : null}
          </div>
        ) : null}
        <div className="mt-auto pt-3">
          <Price price={product.price} from={false} />
          <p className="text-caption text-fg-muted">Excl. VAT</p>
          <ButtonLink href={product.href} variant="outline" size="md" block className="relative z-[2] mt-3">
            {product.requiresOptions ? "Choose options" : "View product"}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
