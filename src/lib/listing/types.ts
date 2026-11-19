import type { Money, RosetteArtSpec } from "@/lib/commerce/types";

/**
 * Stock-product listing types. Platform-neutral: a headless commerce backend maps into these shapes through the
 * ListingRepository (repository.ts). Nothing in the UI depends on a vendor's API.
 */

/** Country collections from the client's reference. Whether they filter or link to separate pages is unconfirmed. */
export type CountryId = "se" | "en" | "no" | "dk" | "fi" | "de";

export interface CountryCollection {
  id: CountryId;
  /** Short code shown on the control, as in the client reference. */
  code: string;
  name: string;
}

export type HorseCategoryId = "dressage" | "show-jumping" | "clear-round" | "eventing" | "special";

export interface HorseCategory {
  id: HorseCategoryId;
  label: string;
}

/** A design (colour combination) of the same stock product. Choosing one previews it; it never changes the SKU or price. */
export interface ProductDesign {
  id: string;
  /** The colours named in text, e.g. "Blue / Yellow". */
  name: string;
  art: RosetteArtSpec;
}

export interface ListingProduct {
  id: string;
  name: string;
  slug: string;
  /** Detail page. Stock products are configured there (design, centre disc), not on the listing. */
  href: string;
  categoryId: HorseCategoryId;
  countries: CountryId[];
  /** Diameter and total length in cm. */
  diameterCm: number;
  lengthCm: number;
  /** Price excluding VAT. Same for every design of the product. */
  price: Money;
  designs: ProductDesign[];
  /** True when the product needs a choice (design, centre disc) before it can be bought. The listing never adds these directly. */
  requiresOptions: boolean;
  /** Only products explicitly marked eligible may offer a quick add. None are in the prototype data. */
  quickAdd?: boolean;
  source: "synthetic" | "live-site";
}

export type SortId = "recommended" | "price-asc" | "price-desc" | "name-asc";

export interface ListingQuery {
  country?: CountryId;
  categories: HorseCategoryId[];
  diameters: number[];
  lengths: number[];
  priceMin?: number;
  priceMax?: number;
  sort: SortId;
  page: number;
}

export interface ListingFacets {
  diameters: number[];
  lengths: number[];
  price: { min: number; max: number };
}
