import type { DesignStep, EventTileContent, LeadTimeContent, Link, ProofPoint, Unconfirmed } from "@/lib/content/types";
import type { RibbonMaterial, RosetteArtSpec } from "@/lib/commerce/types";

/**
 * Homepage copy. Facts come from the live site or the client reference.
 * Nothing here claims what PRODUCT.md marks unconfirmed; those values are typed Unconfirmed<T>.
 */

export const hero = {
  titleLines: ["Award rosettes, trophies and medals", "for competitions and events"] as const,
  intro:
    "Choose from our stock ranges, or design your own rosettes in your colours, with text on the ribbons and your logo on the centre badge.",
  design: { label: "Design your own rosette", href: "/concept-a/design-your-own" } satisfies Link,
  shop: { label: "Explore products", href: "#shop" } satisfies Link,
};

export const delivery = {
  title: "Delivery times",
  intro: "Stock rosettes leave us sooner than rosettes made to your design. Plan your order around your event date.",
  leadTimes: [
    {
      id: "stock",
      title: "Stock rosettes",
      body: "Ready-made awards from our ranges.",
      workdays: {
        status: "confirmed",
        value: "7 workdays",
        note: "Confirmed by the client (2026-11-18): 7 working days. The live terms of purchase still say 4–7 workdays.",
      },
      action: { label: "View stock rosettes", href: "/concept-a/swedish-stock-rosettes" },
    },
    {
      id: "custom",
      title: "Custom design rosettes",
      body: "Designed by you, produced by us in Osby.",
      workdays: {
        status: "confirmed",
        value: "10 workdays",
        note: "Confirmed by the client (2026-11-18): 10 working days. The live terms of purchase still say 14–20 workdays.",
      },
      action: { label: "Design your own rosette", href: "/concept-a/design-your-own" },
    },
  ] satisfies LeadTimeContent[],
  /** From the live site's terms of purchase. A current business rule, not a new promise. */
  shippingNote:
    "Production days are Monday to Friday. Free shipping when you order at least 30 days before your event and your order is over SEK 3,750, under our current terms of purchase.",
};

export const events: EventTileContent[] = [
  {
    id: "dog-shows",
    title: "Dog shows and trials",
    body: "BIS, BIR, certifikat, agility and more, in Swedish, Norwegian and Finnish terms.",
    href: "/concept-a/swedish-stock-rosettes",
    media: "dogsWithRosette",
    actionLabel: "Shop dog show rosettes",
    position: "50% 60%",
  },
  {
    id: "equestrian",
    title: "Equestrian events",
    body: "Placings, clear round and show-jumping rosettes.",
    href: "/concept-a/horse-rosettes",
    media: "equestrian",
    actionLabel: "Shop horse rosettes",
    position: "50% 40%",
  },
  {
    id: "trophies",
    title: "Trophies",
    body: "Trophy cups in three sizes.",
    href: "/concept-a/sport-awards",
    media: "goldTrophies",
    actionLabel: "Shop trophies",
    position: "40% 50%",
  },
  {
    id: "plaques",
    title: "Plaques and medals",
    body: "Cast stable plaques, medals and medal ribbons.",
    href: "/concept-a/sport-awards/plaques",
    media: "stablePlaques",
    actionLabel: "Shop plaques and medals",
    position: "35% 50%",
  },
];

/**
 * Quote prompt in the "Find the right award" grid. There is no quote-request flow on the live site or in the
 * prototype, so the button goes to the verified on-page contact section (phone and email).
 * PENDING INTEGRATION: point `action.href` at the quote form once one exists.
 */
export const quotePrompt = {
  title: "Not sure what fits your event?",
  body: "Call or email us and we'll help you choose the right awards.",
  action: { label: "Request a quote", href: "#help" } satisfies Link,
  pendingIntegration: true,
};

export const designSection = {
  title: "Design your own rosette",
  intro:
    "Start from one of our rosette models, then make it yours in five steps. Colours from our chart, text on the ribbons and your logo on the centre badge.",
  action: { label: "Choose a rosette model", href: "/concept-a/design-your-own" } satisfies Link,
};

export const designSteps: DesignStep[] = [
  { id: "type", title: "Type", body: "Choose the model, size, rings and number of tails." },
  { id: "centre", title: "Centre", body: "A standard motif, or your logo printed in four colours." },
  { id: "tails", title: "Tails", body: "Pick ribbon colours from the colour chart." },
  { id: "text", title: "Text", body: "Print placement, year or organiser on the ribbons." },
  { id: "extras", title: "Extras", body: "Tassels, fastener and cut type." },
];

/** Colourways to start a design from. Not "popular": no sales data exists. */
export const starterCombinations: { name: string; note: string; art: RosetteArtSpec }[] = [
  { name: "Navy and gold", note: "Satin with metallic gold", art: { shape: "classic", rings: ["navy", "gold"], tails: ["navy", "gold"], centre: "navy" } },
  { name: "Red and white", note: "Satin", art: { shape: "classic", rings: ["red", "white"], tails: ["red", "white"], centre: "red" } },
  { name: "Green and white", note: "Grosgrain and satin", art: { shape: "classic", rings: ["green", "white"], tails: ["green", "white"], centre: "green" } },
  { name: "Purple and silver", note: "Satin with metallic silver", art: { shape: "classic", rings: ["purple", "silver"], tails: ["purple", "silver"], centre: "purple" } },
];

export const craft = {
  titleLines: ["Designed by you.", "Made in Osby."] as const,
  paragraphs: [
    "It began with rosettes sewn for our own puppy buyers. Dog clubs asked for them next, and soon the rosettes outgrew the kennel.",
    "Today our production and showroom are in Osby, in northern Skåne. We keep developing how we make every rosette, so each one is ready when your event needs it.",
  ],
  action: { label: "About Intersilvi", href: "/concept-a/about-us" } satisfies Link,
};

export const colourSection = {
  title: "More than just a colour",
  intro: "Ribbons in satin and grosgrain, metallic finishes and patterns. Combine them freely on custom rosettes.",
  materials: [
    { id: "satin", name: "Satin", body: "Smooth, with a soft sheen." },
    { id: "grosgrain", name: "Grosgrain", body: "Fine ribbed texture, matte." },
    { id: "metallic", name: "Metallic", body: "Reflective gold and silver." },
    { id: "patterned", name: "Patterned", body: "Printed and woven patterns." },
  ] satisfies { id: RibbonMaterial; name: string; body: string }[],
  action: { label: "Open the colour chart", href: "/concept-a/colour-chart" } satisfies Link,
};

export const story = {
  title: "Award rosettes from Osby",
  founded: {
    status: "unconfirmed",
    value: "Founded 1982 · Inter Silvi AB since 1992",
    note: "From the live About page. The client reference says 'since 1992' and 'over 30 years'.",
  } satisfies Unconfirmed<string>,
  body: "We make rosettes and prizes for clubs, associations, event organisers and companies.",
  proofPoints: [
    { title: "Our own production", body: "Rosettes are made at our workshop in Osby, where our showroom is too." },
    { title: "The right award terms", body: "Stock ranges follow Swedish, Norwegian and Finnish show and trial awards." },
    { title: "Design help", body: "Not sure how to set up your rosette? Call or email us and we will help." },
  ] satisfies ProofPoint[],
};

export const help = {
  title: "We are here to help",
  body: "Questions about an order, a design or delivery times? Get in touch.",
};

export const newsletter = {
  title: "News and offers",
  body: "News, offers and colour inspiration, sent occasionally.",
};
