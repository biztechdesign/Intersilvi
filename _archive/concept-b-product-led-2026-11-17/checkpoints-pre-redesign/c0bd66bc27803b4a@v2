import type { MediaKey } from "@/content/media";
import { eventCutouts, type ShowcaseImage } from "@/lib/commerce/mock/showcase";
import { BASE } from "./base";

/**
 * Concept B discovery content. The four categories are the reference's "shop by event" groups, mapped to the live
 * store's ranges. Visuals use the client's own product cutouts on flat colour fields; the dog-show tile uses a
 * client banner photograph.
 */
export type FieldTone = "navy" | "gold" | "sun" | "sky";

export interface CutoutPlacement {
  image: ShowcaseImage;
  /** Height as a percentage of the tile height. */
  height: number;
  /** Distance from the tile's right edge, as a percentage of its width. */
  right: number;
  /** Negative values let a cutout overlap the tile's bottom edge. */
  bottom: number;
}

interface CategoryBase {
  id: string;
  title: string;
  body: string;
  href: string;
  actionLabel: string;
}

export interface FeatureCategory extends CategoryBase {
  photo: MediaKey;
  photoPosition: string;
}

export interface TileCategory extends CategoryBase {
  tone: FieldTone;
  cutouts: CutoutPlacement[];
}

export const featureCategory: FeatureCategory = {
  id: "dog-shows",
  title: "Dog shows and trials",
  body: "BIS, BIR, certifikat, agility and more, in Swedish, Norwegian and Finnish award terms.",
  href: `${BASE}/swedish-stock-rosettes`,
  actionLabel: "Shop dog show rosettes",
  photo: "dogsWithRosette",
  photoPosition: "50% 55%",
};

export const tileCategories: TileCategory[] = [
  {
    id: "equestrian",
    title: "Equestrian events",
    body: "Placings, clear round and show jumping.",
    href: `${BASE}/horse-rosettes`,
    actionLabel: "Shop horse rosettes",
    tone: "navy",
    cutouts: [
      { image: eventCutouts.horseRosetteB, height: 92, right: 36, bottom: 0 },
      { image: eventCutouts.horseRosetteA, height: 104, right: 18, bottom: -4 },
      { image: eventCutouts.horseHead, height: 62, right: 2, bottom: 0 },
    ],
  },
  {
    id: "trophies",
    title: "Trophies",
    body: "Trophy cups in three sizes.",
    href: `${BASE}/sport-awards`,
    actionLabel: "Shop trophies",
    tone: "gold",
    cutouts: [
      { image: eventCutouts.cupGold, height: 70, right: 34, bottom: 0 },
      { image: eventCutouts.cupLarge, height: 104, right: 14, bottom: -2 },
      { image: eventCutouts.cupBlue, height: 56, right: 1, bottom: 0 },
    ],
  },
  {
    id: "plaques",
    title: "Plaques and medals",
    body: "Cast stable plaques, medals and medal ribbons.",
    href: `${BASE}/sport-awards/plaques`,
    actionLabel: "Shop plaques and medals",
    tone: "sky",
    cutouts: [
      { image: eventCutouts.plaque, height: 78, right: 30, bottom: 0 },
      { image: eventCutouts.medalRibbon, height: 54, right: 14, bottom: 22 },
      { image: eventCutouts.medal, height: 46, right: 3, bottom: 4 },
    ],
  },
];

/** Four real design-rosette models shown as colourways to start from. Names describe what is visible. */
export const colourways: { id: string; name: string; sku: string; image: ShowcaseImage }[] = [
  {
    id: "pink-red",
    name: "Pink and red",
    sku: "106300",
    image: { src: "https://designer.intersilvi.se/media/catalog/product/1/0/106300.png", alt: "Pink and red design rosette", width: 269, height: 900 },
  },
  {
    id: "lilac-aqua",
    name: "Lilac and aqua",
    sku: "106280",
    image: { src: "https://designer.intersilvi.se/media/catalog/product/1/0/106280.png", alt: "Lilac and aqua design rosette", width: 322, height: 900 },
  },
  {
    id: "aqua-purple",
    name: "Aqua and purple",
    sku: "106310",
    image: { src: "https://designer.intersilvi.se/media/catalog/product/1/0/106310_1.png", alt: "Aqua and purple design rosette", width: 355, height: 900 },
  },
  {
    id: "peach-black",
    name: "Peach and black",
    sku: "106220",
    image: { src: "https://designer.intersilvi.se/media/catalog/product/1/0/106220.png", alt: "Peach and black design rosette", width: 259, height: 900 },
  },
];
