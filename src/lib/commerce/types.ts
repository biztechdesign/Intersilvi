/**
 * Platform-neutral commerce types.
 * Shared by every concept. Real backends map into these shapes through a CommerceAdapter.
 */

export type MarketCode = "se" | "com" | "no" | "dk" | "fi" | "de";

/** Currency per market is an open decision (PRODUCT.md); the live ENG store prices in SEK. */
export type CurrencyCode = "SEK" | "NOK" | "DKK" | "EUR";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface Market {
  code: MarketCode;
  label: string;
  language: string;
  /** Live storefront domain, for reference only. */
  domain: string;
}

/**
 * Where a piece of data comes from.
 * "live-site": observed on intersilvi.com during discovery.
 * "synthetic": invented for the prototype. Must be replaced before launch.
 */
export type DataSource = "live-site" | "reference" | "synthetic";

export interface PriceTier {
  minQuantity: number;
  unitPrice: Money;
}

export type StockStatus = "in_stock" | "made_to_order";

export type RosetteShape = "classic" | "luxury" | "flat";

/** Visual recipe used by the art components until product photography exists. */
export interface RosetteArtSpec {
  shape: RosetteShape;
  /** Pleated rings from outer to inner, as ribbon colour ids. */
  rings: RibbonColourId[];
  /** Tail ribbons, left to right, as ribbon colour ids. */
  tails: RibbonColourId[];
  centre: RibbonColourId;
  /** Short centre-badge text, e.g. a placement or an award term. */
  centreLabel?: string;
  /** Text printed down the middle tail, e.g. an event name or year. */
  tailText?: string;
  /** Print colour for tailText. Defaults to a legible ink on the tail colour. */
  tailInk?: RibbonColourId;
}

export interface Product {
  id: string;
  /** Article number. Only real when source is "live-site". */
  articleNumber?: string;
  name: string;
  /** Native award term, e.g. "BIS", "BIR", "Clear Round". */
  awardTerm?: string;
  categoryId: string;
  price: Money;
  /** True when the live store lists the price as "As low as" (lowest quantity price). */
  priceFrom?: boolean;
  tiers: PriceTier[];
  /** Omitted when the stock status was not observed. */
  stock?: StockStatus;
  href: string;
  /** Product photo (transparent cutout from the live store). Falls back to `art` when absent. */
  image?: { src: string; alt: string; width?: number; height?: number };
  art: RosetteArtSpec;
  /** Verified specification lines (from the live store's product attributes), e.g. "Ø 20 cm · 60 cm long". */
  specs?: string[];
  source: DataSource;
}

export interface Category {
  id: string;
  label: string;
  href: string;
  description?: string;
  children?: Category[];
}

export type RibbonColourId =
  | "royal-blue"
  | "navy"
  | "yellow"
  | "gold"
  | "red"
  | "white"
  | "green"
  | "purple"
  | "pink"
  | "black"
  | "silver"
  | "light-blue"
  | "orange"
  | "bordeaux";

export type RibbonMaterial = "satin" | "grosgrain" | "metallic" | "patterned";

export interface RibbonColour {
  id: RibbonColourId;
  name: string;
  hex: string;
  material: RibbonMaterial;
}
