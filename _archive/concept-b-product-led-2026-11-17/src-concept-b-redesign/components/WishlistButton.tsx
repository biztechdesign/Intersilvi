"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** Wishlist toggle. SIMULATED: state lives only in this page view. */
export function WishlistButton({ productName }: { productName: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${productName} to wishlist (prototype)`}
      onClick={() => setSaved((v) => !v)}
      className="absolute right-2 top-2 z-[2] grid h-11 w-11 place-items-center rounded-full text-b-ink-2 transition-colors hover:bg-b-paper hover:text-b-ink aria-pressed:text-b-navy aria-pressed:[&_svg]:fill-b-yellow"
    >
      <Icon name="heart" size={20} />
    </button>
  );
}
