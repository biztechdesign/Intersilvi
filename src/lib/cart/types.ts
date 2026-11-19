import type { Money, RosetteArtSpec } from "@/lib/commerce/types";

/**
 * Cart domain types. Platform-neutral: a real commerce backend maps into these through a CartAdapter (adapter.ts).
 * Configuration is stored against the CART LINE id, never the product id, so two lines of the same product can differ.
 */

export type PrintColourId = "gold" | "silver" | "black" | "bronze" | "white" | "full-colour" | "other";

export interface PrintColour {
  id: PrintColourId;
  name: string;
  finish?: string;
  /** CSS background used for the swatch. */
  swatch: string;
  /** False when the shop has not confirmed the option (shown disabled). */
  supported: boolean;
}

export type LogoSource = "motif" | "saved-logo" | "upload";

/** The artwork applied to a cart line. */
export interface AppliedLogo {
  source: LogoSource;
  /** Motif or saved-logo id. Uploads have no id until a backend stores them. */
  assetId?: string;
  label: string;
  /** Object URL for an unsent upload preview (valid for this browser session only). */
  previewUrl?: string;
  colour: PrintColourId;
}

export type ProductKind = "rosette" | "trophy" | "medal" | "other";

export interface CartLineProduct {
  articleNumber: string;
  name: string;
  kind: ProductKind;
  href: string;
  /** Specification lines, e.g. "Ø 18 cm", "Length 42 cm". */
  specs: string[];
  /** The ribbon colour combination, named in text. */
  variant?: string;
  art?: RosetteArtSpec;
  /** Only products that take a printed logo/motif show the logo controls. */
  acceptsLogo: boolean;
  /** Whether "apply this colour to all rows" may change this product's logo colour. */
  logoColourCompatible: boolean;
  minQuantity: number;
  maxQuantity: number;
}

export interface CartLine {
  id: string;
  product: CartLineProduct;
  quantity: number;
  /** Unit price excluding VAT. */
  unitPrice: Money;
  logo?: AppliedLogo;
}

export interface Cart {
  lines: CartLine[];
  /** Requested delivery date as YYYY-MM-DD. A request, not a promise. */
  requestedDelivery?: string;
}

export interface DiscountState {
  code: string;
  /** Percentage off the subtotal. Set only by the adapter once a code is accepted. */
  percent: number;
}

export type TotalsStatus = "ready" | "unavailable";

export interface CartTotals {
  status: TotalsStatus;
  subtotal: Money;
  discount?: Money;
  /** Shipping, tax and the final payable total are calculated at checkout until the backend provides them. */
  totalExclVat: Money;
}
