import type { Cart } from "./types";

/**
 * PROTOTYPE cart contents, modelled on the client's cart reference (article numbers and sizes from that screenshot,
 * prices from the reference). Replace with the real cart from the commerce backend.
 */
export const mockCart: Cart = {
  requestedDelivery: undefined,
  lines: [
    {
      id: "line-1",
      quantity: 1,
      unitPrice: { amount: 68, currency: "SEK" },
      product: {
        articleNumber: "106310",
        name: "Horse Rosette",
        kind: "rosette",
        href: "/horse-rosettes",
        specs: ["Ø 18 cm", "Length 42 cm"],
        variant: "Blue / Yellow",
        art: { shape: "classic", rings: ["royal-blue", "yellow"], tails: ["royal-blue", "yellow", "royal-blue"], centre: "yellow", centreLabel: "1st" },
        acceptsLogo: true,
        logoColourCompatible: true,
        minQuantity: 1,
        maxQuantity: 999,
      },
    },
    {
      id: "line-2",
      quantity: 1,
      unitPrice: { amount: 62, currency: "SEK" },
      logo: { source: "motif", assetId: "sport-1", label: "Sport 1", colour: "black" },
      product: {
        articleNumber: "102450",
        name: "Stock Rosette",
        kind: "rosette",
        href: "/swedish-stock-rosettes",
        specs: ["Ø 16 cm", "Length 38 cm"],
        variant: "Red / White",
        art: { shape: "classic", rings: ["red", "white"], tails: ["red", "white", "red"], centre: "white", centreLabel: "2nd" },
        acceptsLogo: true,
        logoColourCompatible: true,
        minQuantity: 1,
        maxQuantity: 999,
      },
    },
    {
      id: "line-3",
      quantity: 1,
      unitPrice: { amount: 48, currency: "SEK" },
      logo: { source: "motif", assetId: "other-3", label: "Other 3", colour: "gold" },
      product: {
        articleNumber: "104220",
        name: "Rosette",
        kind: "rosette",
        href: "/swedish-stock-rosettes",
        specs: ["Ø 14 cm", "Length 32 cm"],
        variant: "Pink / White",
        art: { shape: "classic", rings: ["pink", "white"], tails: ["pink", "white", "pink"], centre: "white", centreLabel: "3rd" },
        acceptsLogo: true,
        logoColourCompatible: true,
        minQuantity: 1,
        maxQuantity: 999,
      },
    },
    {
      id: "line-4",
      quantity: 2,
      unitPrice: { amount: 189, currency: "SEK" },
      product: {
        articleNumber: "201118",
        name: "Trophy cup, gold",
        kind: "trophy",
        href: "/trophies-medals",
        specs: ["Height 24 cm"],
        /* Prototype example of a product with no logo controls: a trophy is engraved, not printed. */
        acceptsLogo: false,
        logoColourCompatible: false,
        minQuantity: 1,
        maxQuantity: 99,
      },
    },
  ],
};
