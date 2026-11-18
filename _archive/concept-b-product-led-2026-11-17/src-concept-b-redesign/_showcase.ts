import type { Product } from "../types";

/**
 * Showcase data for Concept B: real product cutouts and values read from the client's own public store catalogue
 * (designer.intersilvi.com, ENG store, SEK) on 2026-11-17, used with the client's permission (see src/content/media.ts).
 * Names, prices, "from" pricing, diameters and lengths are as the store lists them. Images are hot-linked: copy them into the
 * CMS or DAM before handover.
 *
 * Open point: for the Luxury Rosette the store's tier price reads SEK 77.60 at 25 pcs while the live product page showed
 * SEK 97.00 at 25 pcs (the two differ by the 25% VAT factor). The tier below keeps the page value; confirm the price basis.
 */
const img = (path: string) => `https://designer.intersilvi.se/media/catalog/product/${path}`;

export interface ShowcaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const showcaseImage = (path: string, alt: string, width: number, height: number): ShowcaseImage => ({
  src: img(path),
  alt,
  width,
  height,
});

/** Product cutouts composed into the hero still life, tallest first by design. */
export const heroStillLife = {
  rosetteBlue: showcaseImage("1/6/167691_1.png", "Blue and gold horse rosette with long tails", 289, 900),
  rosetteRed: showcaseImage("1/6/161911_1.png", "Red Best in Show rosette with printed tail", 333, 900),
  rosetteTeal: showcaseImage("1/0/106310_1.png", "Teal and purple rosette with long tails", 355, 900),
  cup: showcaseImage("9/0/9058.png", "Gold and blue metal trophy cup on a stone base", 268, 590),
  medal: showcaseImage("m/m/mmc3232_g.png", "Gold medal with an empty centre for an emblem", 450, 500),
};

/** Cutouts used on the shop-by-event tiles. */
export const eventCutouts = {
  horseRosetteA: showcaseImage("1/6/167691_1.png", "Blue and gold horse rosette", 289, 900),
  horseRosetteB: showcaseImage("1/6/167641_1_1.png", "Pink and orange horse rosette", 297, 900),
  horseHead: showcaseImage("h/o/horsehead.png", "Gold horse head trophy figure on a black base", 363, 500),
  cupLarge: showcaseImage("4/1/4104_2.png", "Large gold metal trophy cup on a black base", 450, 953),
  cupGold: showcaseImage("w/1/w1403.png", "Gold trophy cup on a stone base", 343, 800),
  cupBlue: showcaseImage("9/0/9058.png", "Gold and blue metal trophy cup on a stone base", 268, 590),
  plaque: showcaseImage("h/t/htp40_80x55x6mm.png", "Wooden plaque with a brass plate", 810, 1200),
  medal: showcaseImage("m/m/mmc3232_g.png", "Gold medal", 450, 500),
  medalRibbon: showcaseImage("v/2/v2-ybl_2.png", "Blue and yellow medal ribbon", 380, 420),
};

/** Real medal-ribbon photographs. Names describe what is visible; the rosette colour chart is a separate document. */
export const ribbonSamples: { id: string; name: string; image: ShowcaseImage }[] = [
  { id: "blue", name: "Blue", image: showcaseImage("v/2/v2-bl_2.png", "Blue medal ribbon", 380, 420) },
  { id: "blue-yellow", name: "Blue and yellow", image: showcaseImage("v/2/v2-ybl_2.png", "Blue and yellow medal ribbon", 380, 420) },
  { id: "red", name: "Red", image: showcaseImage("v/2/v2-r_2.png", "Red medal ribbon", 380, 420) },
  { id: "red-white", name: "Red and white", image: showcaseImage("v/2/v2-wr_2.png", "Red and white medal ribbon", 380, 420) },
  { id: "red-yellow", name: "Red and yellow", image: showcaseImage("v/2/v2-yr_2.png", "Red and yellow medal ribbon", 380, 420) },
  { id: "green", name: "Green", image: showcaseImage("v/2/v2-gn_2.png", "Green medal ribbon", 380, 420) },
  { id: "purple", name: "Purple", image: showcaseImage("v/2/v2-pur_2.png", "Purple medal ribbon", 380, 420) },
  { id: "pink", name: "Pink", image: showcaseImage("v/2/v2-pk_2.png", "Pink medal ribbon", 380, 420) },
  { id: "black-yellow", name: "Black and yellow", image: showcaseImage("v/2/v2-ybk_2.png", "Black and yellow medal ribbon", 380, 420) },
  { id: "black", name: "Black", image: showcaseImage("v/2/v2-bk_2.png", "Black medal ribbon", 380, 420) },
];

const sek = (amount: number) => ({ amount, currency: "SEK" as const });

/** Six featured products across the buying journeys. Only attributes the store states are shown as specs. */
export const showcaseProducts: Product[] = [
  {
    id: "p-106330",
    articleNumber: "106330",
    name: "Luxury Rosette",
    categoryId: "design",
    price: sek(128),
    tiers: [{ minQuantity: 25, unitPrice: sek(97) }],
    stock: "in_stock",
    href: "/concept-a/design-your-own/luxury-rosette",
    image: showcaseImage("1/0/106330-2.png", "Luxury Rosette in navy and pink with long tails", 362, 900),
    art: { shape: "luxury", rings: ["navy", "gold", "white"], tails: ["navy", "gold", "navy"], centre: "navy" },
    specs: ["Ø 20 cm", "60 cm long", "Custom design"],
    source: "live-site",
  },
  {
    id: "p-161911",
    articleNumber: "161911",
    name: "Best in Show",
    awardTerm: "BIS",
    categoryId: "swedish",
    price: sek(128),
    tiers: [],
    stock: "in_stock",
    href: "/concept-a/swedish-stock-rosettes/bis",
    image: showcaseImage("1/6/161911_1.png", "Red Best in Show rosette with printed tail", 333, 900),
    art: { shape: "classic", rings: ["red", "gold"], tails: ["red", "white"], centre: "red" },
    specs: ["Ø 21.5 cm", "66 cm long", "Swedish stock rosette"],
    source: "live-site",
  },
  {
    id: "p-167691",
    articleNumber: "167691",
    name: "Horse rosette",
    categoryId: "horse",
    price: sek(101),
    priceFrom: true,
    tiers: [],
    stock: "in_stock",
    href: "/concept-a/horse-rosettes/placings",
    image: showcaseImage("1/6/167691_1.png", "Blue and gold horse rosette with long tails", 289, 900),
    art: { shape: "classic", rings: ["royal-blue", "yellow"], tails: ["royal-blue", "yellow"], centre: "yellow" },
    specs: ["Ø 21 cm", "73 cm long"],
    source: "live-site",
  },
  {
    id: "p-9058",
    articleNumber: "9058",
    name: "Gold and blue metal cup",
    categoryId: "sport",
    price: sek(96),
    priceFrom: true,
    tiers: [],
    stock: "in_stock",
    href: "/concept-a/sport-awards/large-cups",
    image: showcaseImage("9/0/9058.png", "Gold and blue metal trophy cup on a stone base", 268, 590),
    art: { shape: "classic", rings: ["gold", "royal-blue"], tails: ["gold"], centre: "gold" },
    specs: ["16 cm", "Trophy cup"],
    source: "live-site",
  },
  {
    id: "p-3232",
    articleNumber: "3232",
    name: "Medal 32 mm",
    categoryId: "sport",
    price: sek(12),
    tiers: [],
    stock: "in_stock",
    href: "/concept-a/sport-awards/medals",
    image: showcaseImage("m/m/mmc3232_g.png", "Gold medal with an empty centre for an emblem", 450, 500),
    art: { shape: "classic", rings: ["gold", "gold"], tails: ["gold"], centre: "gold" },
    specs: ["Ø 3.2 cm", "Space for an emblem"],
    source: "live-site",
  },
  {
    id: "p-htp40",
    articleNumber: "HTP40",
    name: "Wooden plaque",
    categoryId: "sport",
    price: sek(18),
    tiers: [],
    stock: "in_stock",
    href: "/concept-a/sport-awards/wooden-plaques",
    image: showcaseImage("h/t/htp40_80x55x6mm.png", "Wooden plaque with a brass plate", 810, 1200),
    art: { shape: "flat", rings: ["gold"], tails: [], centre: "gold" },
    specs: ["80 × 55 × 6 mm"],
    source: "live-site",
  },
];
