import type { Category, Market, Product } from "../types";

/** Market storefronts observed on the live site. */
export const markets: Market[] = [
  { code: "se", label: "Svenska", language: "sv", domain: "intersilvi.se" },
  { code: "com", label: "English", language: "en", domain: "intersilvi.com" },
  { code: "no", label: "Norsk", language: "nb", domain: "intersilvi.no" },
  { code: "dk", label: "Dansk", language: "da", domain: "intersilvi.dk" },
  { code: "fi", label: "Suomi", language: "fi", domain: "intersilvi.fi" },
  { code: "de", label: "Deutsch", language: "de", domain: "intersilvi.de" },
];

/** Top-level ranges in live-site order. Hrefs point at prototype routes. */
export const categories: Category[] = [
  { id: "design", label: "Design your own rosettes", href: "/concept-a/design-your-own", description: "Base models in your own colours, text and centre." },
  { id: "horse", label: "Horse rosettes", href: "/concept-a/horse-rosettes", description: "Placings, clear round and show jumping." },
  { id: "swedish", label: "Swedish stock rosettes", href: "/concept-a/swedish-stock-rosettes", description: "BIS, BIR, certifikat, agility, rallylydnad." },
  { id: "norwegian", label: "Norwegian stock rosettes", href: "/concept-a/norwegian-stock-rosettes", description: "Award terms for Norwegian shows and trials." },
  { id: "finnish", label: "Finnish stock rosettes", href: "/concept-a/finnish-stock-rosettes", description: "Award terms for Finnish shows and trials." },
  { id: "sport", label: "Sport awards", href: "/concept-a/sport-awards", description: "Trophy cups, medals, medal ribbons and plaques." },
  { id: "accessories", label: "Accessories", href: "/concept-a/accessories" },
  { id: "sale", label: "Sale", href: "/concept-a/sale" },
];

const productImage = (path: string) => `https://designer.intersilvi.se/media/catalog/product/${path}`;

/**
 * Featured products, taken from intersilvi.com (ENG store, SEK incl. tax) on 2026-11-17:
 * names, prices, "As low as" pricing, quantity tiers and images are as listed there.
 * Article numbers are shown only where the live product page states them.
 */
export const featuredProducts: Product[] = [
  {
    id: "p-106330",
    articleNumber: "106330",
    name: "Luxury Rosette",
    categoryId: "design",
    price: { amount: 128, currency: "SEK" },
    tiers: [{ minQuantity: 25, unitPrice: { amount: 97, currency: "SEK" } }],
    // The live product page showed "In Stock" for this article.
    stock: "in_stock",
    href: "/concept-a/design-your-own/luxury-rosette",
    image: { src: productImage("1/0/106330-2.png"), alt: "Luxury Rosette in navy and pink with long tails" },
    art: { shape: "luxury", rings: ["navy", "gold", "white"], tails: ["navy", "gold", "navy"], centre: "navy", centreLabel: "1" },
    source: "live-site",
  },
  {
    id: "p-best-in-show",
    name: "Best in Show",
    awardTerm: "BIS",
    categoryId: "swedish",
    price: { amount: 128, currency: "SEK" },
    priceFrom: true,
    tiers: [],
    href: "/concept-a/swedish-stock-rosettes/bis",
    image: { src: productImage("1/6/161911_1.png"), alt: "Red Best in Show rosette with printed tail" },
    art: { shape: "classic", rings: ["red", "gold", "white"], tails: ["red", "white", "red"], centre: "red", centreLabel: "BIS" },
    source: "live-site",
  },
  {
    id: "p-horse-167421",
    name: "Horse rosette",
    categoryId: "horse",
    price: { amount: 52, currency: "SEK" },
    priceFrom: true,
    tiers: [],
    href: "/concept-a/horse-rosettes/placings",
    image: { src: productImage("1/6/167421.png"), alt: "Blue and yellow horse rosette" },
    art: { shape: "classic", rings: ["royal-blue", "yellow"], tails: ["royal-blue", "yellow"], centre: "yellow" },
    source: "live-site",
  },
  {
    id: "p-cup-4104",
    name: "Metal cup gold",
    categoryId: "sport",
    price: { amount: 360, currency: "SEK" },
    priceFrom: true,
    tiers: [],
    href: "/concept-a/sport-awards/large-cups",
    image: { src: productImage("4/1/4104_2.png"), alt: "Gold metal trophy cup on a black base" },
    art: { shape: "classic", rings: ["gold", "gold"], tails: ["gold"], centre: "gold" },
    source: "live-site",
  },
];
