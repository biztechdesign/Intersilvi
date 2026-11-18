import type { FooterColumn, Link, NavGroup, Unconfirmed } from "@/lib/content/types";

/**
 * Site-wide content, written as typed data so a CMS can supply it later.
 * Contact details, address and the catalogue link come from the live site.
 */

export const contact = {
  phoneDisplay: "+46 479 100 70",
  phoneHref: "tel:+4647910070",
  email: "info@intersilvi.se",
  company: "Inter Silvi AB",
  street: "Södra Portgatan 37",
  postcode: "283 50",
  town: "Osby",
  country: "Sweden",
};

export const openingHours: Unconfirmed<string[]> = {
  status: "unconfirmed",
  value: ["Mon–Thu 07.00–16.00", "Fri 07.00–14.00"],
  note: "Live site value. The client reference shows Mon–Fri 08:00–16:00.",
};

export const catalogueLink: Link = {
  label: "Browse the printed catalogue",
  href: "https://online.fliphtml5.com/ksisq/cwsb/",
  external: true,
};

export const utilityLinks: Link[] = [
  { label: "Customer service", href: "/concept-a/customer-service" },
  { label: "About us", href: "/concept-a/about-us" },
  { label: "Contact", href: "#help" },
];

/** Primary navigation. Mega-menu columns use real award terms from the live catalogue. */
export const primaryNav: NavGroup[] = [
  {
    id: "design",
    label: "Design your own",
    href: "/concept-a/design-your-own",
    columns: [],
  },
  {
    id: "horse",
    label: "Horse",
    fullLabel: "Horse rosettes",
    href: "/concept-a/horse-rosettes",
    columns: [
      {
        heading: "Horse rosettes",
        links: [
          { label: "Placings 1st–5th", href: "/concept-a/horse-rosettes/placings" },
          { label: "Placings 1st–4th", href: "/concept-a/horse-rosettes/placings-1-4" },
          { label: "Clear round", href: "/concept-a/horse-rosettes/clear-round" },
          { label: "Show jumping", href: "/concept-a/horse-rosettes/show-jumping" },
        ],
      },
      {
        heading: "For the stable",
        links: [
          { label: "Cast stable plaques", href: "/concept-a/sport-awards/plaques" },
          { label: "Campaign rosettes", href: "/concept-a/design-your-own/campaign" },
        ],
      },
    ],
  },
  {
    id: "swedish",
    label: "Swedish",
    fullLabel: "Swedish stock rosettes",
    href: "/concept-a/swedish-stock-rosettes",
    columns: [
      {
        heading: "Dog shows",
        links: [
          { label: "Best in Show (BIS)", href: "/concept-a/swedish-stock-rosettes/bis" },
          { label: "BIR and BIM", href: "/concept-a/swedish-stock-rosettes/bir-bim" },
          { label: "Bästa hane / tik", href: "/concept-a/swedish-stock-rosettes/basta" },
          { label: "Cacib", href: "/concept-a/swedish-stock-rosettes/cacib" },
          { label: "Certifikat", href: "/concept-a/swedish-stock-rosettes/certifikat" },
        ],
      },
      {
        heading: "Trials and sport",
        links: [
          { label: "Agility", href: "/concept-a/swedish-stock-rosettes/agility" },
          { label: "Rallylydnad", href: "/concept-a/swedish-stock-rosettes/rallylydnad" },
          { label: "Lydnad", href: "/concept-a/swedish-stock-rosettes/lydnad" },
          { label: "Nosework", href: "/concept-a/swedish-stock-rosettes/nosework" },
          { label: "Jakt", href: "/concept-a/swedish-stock-rosettes/jakt" },
        ],
      },
      {
        heading: "Placings",
        links: [
          { label: "1:a–5:e pris", href: "/concept-a/swedish-stock-rosettes/1-5-pris" },
          { label: "1:a–4:e placering", href: "/concept-a/swedish-stock-rosettes/1-4-placering" },
          { label: "Championat", href: "/concept-a/swedish-stock-rosettes/championat" },
        ],
      },
    ],
  },
  {
    id: "norwegian",
    label: "Norwegian",
    fullLabel: "Norwegian stock rosettes",
    href: "/concept-a/norwegian-stock-rosettes",
    columns: [],
  },
  {
    id: "finnish",
    label: "Finnish",
    fullLabel: "Finnish stock rosettes",
    href: "/concept-a/finnish-stock-rosettes",
    columns: [],
  },
  {
    id: "sport",
    label: "Sport awards",
    href: "/concept-a/sport-awards",
    columns: [
      {
        heading: "Trophies",
        links: [
          { label: "Large trophy cups", href: "/concept-a/sport-awards/large-cups" },
          { label: "Medium trophy cups", href: "/concept-a/sport-awards/medium-cups" },
          { label: "Small trophy cups", href: "/concept-a/sport-awards/small-cups" },
        ],
      },
      {
        heading: "Medals and plaques",
        links: [
          { label: "Medals", href: "/concept-a/sport-awards/medals" },
          { label: "Medal ribbons", href: "/concept-a/sport-awards/medal-ribbons" },
          { label: "Wooden plaques", href: "/concept-a/sport-awards/wooden-plaques" },
        ],
      },
    ],
  },
  { id: "accessories", label: "Accessories", href: "/concept-a/accessories", columns: [] },
  { id: "sale", label: "Sale", href: "/concept-a/sale", columns: [] },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "Design your own", href: "/concept-a/design-your-own" },
      { label: "Horse rosettes", href: "/concept-a/horse-rosettes" },
      { label: "Swedish stock rosettes", href: "/concept-a/swedish-stock-rosettes" },
      { label: "Norwegian stock rosettes", href: "/concept-a/norwegian-stock-rosettes" },
      { label: "Finnish stock rosettes", href: "/concept-a/finnish-stock-rosettes" },
      { label: "Sport awards", href: "/concept-a/sport-awards" },
      { label: "Accessories", href: "/concept-a/accessories" },
      { label: "Colour chart", href: "/concept-a/colour-chart" },
    ],
  },
  {
    heading: "Customer service",
    links: [
      { label: "Help centre", href: "/concept-a/help" },
      { label: "FAQ", href: "/concept-a/faq" },
      { label: "Terms of purchase", href: "/concept-a/terms-of-purchase" },
      { label: "Privacy policy", href: "/concept-a/privacy-policy" },
      { label: "Contact us", href: "#help" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About us", href: "/concept-a/about-us" },
      { label: "Our craftsmanship", href: "#craft" },
      { label: "Printed catalogue", href: "https://online.fliphtml5.com/ksisq/cwsb/", external: true },
    ],
  },
];
