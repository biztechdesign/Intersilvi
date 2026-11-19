import type { PrintColour, PrintColourId } from "./types";

/**
 * Logo, motif and print-colour data.
 * PROTOTYPE: the motif artwork below is placeholder glyphs (Material Symbols names), not the client's silhouettes.
 * Replace `glyph` with the real motif library (SVG ids or image URLs) when it is supplied.
 */

export const printColours: PrintColour[] = [
  { id: "gold", name: "Gold", finish: "metallic", swatch: "linear-gradient(135deg,#f6dd8b,#c9a14a 55%,#9a7421)", supported: true },
  { id: "silver", name: "Silver", finish: "metallic", swatch: "linear-gradient(135deg,#f1f2f4,#b9bcc2 55%,#8a8e96)", supported: true },
  { id: "black", name: "Black", swatch: "#1b1b1d", supported: true },
  { id: "bronze", name: "Bronze", finish: "metallic", swatch: "linear-gradient(135deg,#e2a77a,#b06b3c 55%,#7a4423)", supported: true },
  { id: "white", name: "White", swatch: "#ffffff", supported: true },
  { id: "full-colour", name: "Full colour", swatch: "conic-gradient(#e2322b,#f2c230,#3fae49,#2aa7e0,#7b47b8,#e2322b)", supported: true },
  /* "Another colour" appears in the client's reference. Whether it is orderable is unconfirmed, so it is shown but disabled. */
  { id: "other", name: "Another colour", swatch: "#e9eef5", supported: false },
];

export const printColourName = (id: PrintColourId) => {
  const c = printColours.find((x) => x.id === id);
  return c ? `${c.name}${c.finish ? ` ${c.finish}` : ""}` : id;
};

export type MotifCategory = "dogs" | "cats" | "horses" | "small-animals" | "birds" | "agility" | "sport" | "other";

export const motifCategories: { id: MotifCategory; label: string }[] = [
  { id: "dogs", label: "Dogs" },
  { id: "cats", label: "Cats" },
  { id: "horses", label: "Horses" },
  { id: "small-animals", label: "Small animals" },
  { id: "birds", label: "Birds" },
  { id: "agility", label: "Agility" },
  { id: "sport", label: "Sport" },
  { id: "other", label: "Other" },
];

export interface Motif {
  id: string;
  name: string;
  category: MotifCategory;
  /** Material Symbols glyph standing in for the motif artwork (prototype). */
  glyph: string;
}

const make = (category: MotifCategory, label: string, glyphs: string[]): Motif[] =>
  glyphs.map((glyph, i) => ({ id: `${category}-${i + 1}`, name: `${label} ${i + 1}`, category, glyph }));

export const motifs: Motif[] = [
  ...make("dogs", "Dog", ["sound_detection_dog_barking", "pets", "cruelty_free", "favorite", "bone", "star", "workspace_premium", "emoji_nature"]),
  ...make("cats", "Cat", ["pets", "favorite", "star"]),
  ...make("horses", "Horse", ["emoji_nature", "workspace_premium", "star"]),
  ...make("small-animals", "Small animal", ["cruelty_free", "pets"]),
  ...make("birds", "Bird", ["flutter_dash", "emoji_nature"]),
  ...make("agility", "Agility", ["sports_score", "bolt", "flag"]),
  ...make("sport", "Sport", ["emoji_events", "sports_soccer", "sports_handball", "trophy"]),
  ...make("other", "Other", ["favorite", "star", "crown", "workspace_premium"]),
];

export interface SavedLogo {
  id: string;
  name: string;
  glyph: string;
  /** The print colour last used with this logo. */
  colour: PrintColourId;
  addedAt: string;
}

/** PROTOTYPE saved logos. Real ones belong to the signed-in customer account. */
export const savedLogos: SavedLogo[] = [
  { id: "l1", name: "Freyja of Sweden", glyph: "emoji_nature", colour: "gold", addedAt: "2026-11-02" },
  { id: "l2", name: "Trollhättans Sportryttare", glyph: "sports_score", colour: "gold", addedAt: "2026-10-21" },
  { id: "l3", name: "Norrbottens Kennelklubb", glyph: "pets", colour: "black", addedAt: "2026-10-08" },
  { id: "l4", name: "Oskarshamns BK", glyph: "sound_detection_dog_barking", colour: "gold", addedAt: "2026-09-30" },
  { id: "l5", name: "Stall Lindgården", glyph: "workspace_premium", colour: "black", addedAt: "2026-09-12" },
  { id: "l6", name: "Kennel Björktorp", glyph: "pets", colour: "black", addedAt: "2026-08-19" },
];

/** Upload rules. PROTOTYPE values for client-side feedback only: confirm the real limits with production. */
export const uploadRules = {
  accept: ".png,.jpg,.jpeg,.svg,.pdf",
  extensions: ["png", "jpg", "jpeg", "svg", "pdf"],
  maxSizeMb: 10,
};
