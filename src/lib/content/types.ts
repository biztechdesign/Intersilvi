import type { MediaKey } from "@/content/media";

/**
 * Content types, kept separate from commerce data so a CMS can supply them later.
 */

/**
 * A fact that the client has not confirmed yet (see PRODUCT.md, "Unconfirmed").
 * Components must render these through <PendingFact>, never as plain text.
 */
export interface Unconfirmed<T> {
  status: "unconfirmed" | "confirmed";
  value: T;
  /** Where the candidate value came from, and what conflicts with it. */
  note: string;
}

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  /** Longer label where space allows (mobile drawer, panel links). */
  fullLabel?: string;
  href: string;
  /** Mega-menu columns. Empty means a plain link. */
  columns: { heading: string; links: Link[] }[];
}

export interface JourneyContent {
  id: "shop" | "design";
  title: string;
  body: string;
  action: Link;
  points: string[];
}

export interface LeadTimeContent {
  id: "stock" | "custom";
  title: string;
  body: string;
  workdays: Unconfirmed<string>;
  action: Link;
}

export interface EventTileContent {
  id: string;
  title: string;
  body: string;
  href: string;
  /** Key into the image register (src/content/media.ts). */
  media: MediaKey;
  /** Visible action text on the card. */
  actionLabel: string;
  /** object-position for the photo crop. */
  position?: string;
}

export interface DesignStep {
  id: "type" | "centre" | "tails" | "text" | "extras";
  title: string;
  body: string;
}

export interface ProofPoint {
  title: string;
  body: string;
}

export interface FooterColumn {
  heading: string;
  links: Link[];
}
