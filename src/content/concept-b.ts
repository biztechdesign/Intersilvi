import type { IconName } from "@/design-system";
import type { Link } from "@/lib/content/types";

/**
 * Concept B–only copy, supplied by the client on 2026-11-18. Concept A keeps its own wording in homepage.ts.
 * The client's copy includes "handmade", "more than 30 years", "since 1992", "high quality" and "produced in Europe", which were previously listed as
 * unconfirmed in PRODUCT.md; this is the client's own wording for Concept B.
 */

export const colourCopy = {
  title: "Explore colours that bring awards to life",
  body: "Explore satin and grosgrain ribbons in vibrant colours, metallic finishes and patterns for every occasion.",
  action: { label: "Explore colour chart", href: "/concept-a/colour-chart" } satisfies Link,
  /** Satin ribbon photos supplied by the client. Names describe the photos; align them with the colour chart's names. */
  ribbons: [
    { id: "mint", name: "Mint", src: "/images/concept-b/ribbons/mint.jpg" },
    { id: "orange", name: "Orange", src: "/images/concept-b/ribbons/orange.jpg" },
    { id: "red", name: "Red", src: "/images/concept-b/ribbons/red.jpg" },
    { id: "cerise", name: "Cerise", src: "/images/concept-b/ribbons/cerise.jpg" },
    { id: "blue", name: "Blue", src: "/images/concept-b/ribbons/blue.jpg" },
    { id: "rose", name: "Rose", src: "/images/concept-b/ribbons/pink.jpg" },
    { id: "gold", name: "Gold", src: "/images/concept-b/ribbons/gold.jpg" },
  ],
};

export const craftCopy = {
  titleLines: ["Designed by you.", "Handmade by us."] as const,
  body: "Every rosette is carefully made by hand in our workshop in Osby, Sweden. With more than 30 years of experience, we combine traditional craftsmanship with modern tools to create unique award rosettes.",
  action: { label: "Discover our craftsmanship", href: "/concept-a/about-us" } satisfies Link,
};

export const aboutCopy = {
  title: "Award rosettes from Osby since 1992.",
  body: "Inter Silvi has been working with award rosettes and prizes since 1992. From Osby, Sweden, we help clubs, associations, event organisers and businesses create awards for competitions and events.",
  action: { label: "Our story", href: "/concept-a/about-us" } satisfies Link,
};

export const trustBadges: { icon: IconName; title: string; body: string }[] = [
  { icon: "trophy", title: "High quality rosettes", body: "Premium satin & metallic ribbons" },
  { icon: "truck", title: "Fast delivery", body: "Stock 7, custom 10 working days" },
  { icon: "globe", title: "Produced in Europe", body: "Made in our workshop in Osby" },
  { icon: "hand", title: "Handmade since 1992", body: "Over 30 years of experience" },
];

/** Section eyebrows: one short label above each section heading, all styled by <Eyebrow>. */
export const eyebrows = {
  hero: "Made in Osby, Sweden",
  delivery: "Delivery times",
  design: "Design your own",
  craft: "Our craftsmanship",
  events: "For every event",
  colour: "Colour inspiration",
  about: "Our story",
};

/**
 * Footer copy, from the client's footer reference (2026-11-18). Destinations are Concept B routes; pages outside the
 * homepage prototype resolve to its placeholder page. Social account URLs are not known yet, so they point to placeholders.
 */
export const footerCopy = {
  newsletter: { title: "Colour ideas and event tips, once a month.", body: "Sign up for our newsletter. No spam, unsubscribe anytime." },
  brandName: "Inter Silvi",
  description: "High quality rosettes for competitions, events and special occasions. Designed by you – handmade by us in Sweden since 1992.",
  social: [
    { icon: "facebook", label: "Facebook", href: "/concept-b/social/facebook" },
    { icon: "instagram", label: "Instagram", href: "/concept-b/social/instagram" },
    { icon: "youtube", label: "YouTube", href: "/concept-b/social/youtube" },
  ] satisfies { icon: IconName; label: string; href: string }[],
  columns: [
    {
      heading: "Shop",
      links: [
        { label: "Design your own", href: "/concept-b/design-your-own" },
        { label: "Horse rosettes", href: "/concept-b/horse-rosettes" },
        { label: "Dog show rosettes", href: "/concept-b/swedish-stock-rosettes" },
        { label: "Sports rosettes", href: "/concept-b/sport-awards/rosettes" },
        { label: "Trophies & medals", href: "/concept-b/sport-awards" },
        { label: "Accessories", href: "/concept-b/accessories" },
        { label: "Colour chart", href: "/concept-b/colour-chart" },
      ],
    },
    {
      heading: "Customer service",
      links: [
        { label: "Contact us", href: "#help" },
        { label: "Delivery information", href: "/concept-b/delivery-information" },
        { label: "Payment methods", href: "/concept-b/payment-methods" },
        { label: "Frequently asked questions", href: "/concept-b/faq" },
        { label: "Returns", href: "/concept-b/returns" },
        { label: "Terms & Conditions", href: "/concept-b/terms-of-purchase" },
      ],
    },
    {
      heading: "About us",
      links: [
        { label: "Our story", href: "/concept-b/about-us" },
        { label: "Our craftsmanship", href: "#craft" },
        { label: "Sustainability", href: "/concept-b/sustainability" },
        { label: "News", href: "/concept-b/news" },
        { label: "Inspiration", href: "/concept-b/inspiration" },
        { label: "Blog", href: "/concept-b/blog" },
      ],
    },
  ] satisfies { heading: string; links: Link[] }[],
  help: { title: "Need help with an order?", address: "Inter Silvi AB, Osby, Sweden", hours: "Mon–Fri 08:00–16:00", action: "Contact us" },
  copyright: "Inter Silvi. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "/concept-b/privacy-policy" },
    { label: "Cookies", href: "/concept-b/cookies" },
    { label: "Sitemap", href: "/concept-b/sitemap" },
  ] satisfies Link[],
};
