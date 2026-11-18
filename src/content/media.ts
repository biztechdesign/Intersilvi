/**
 * Photography register.
 *
 * origin "client": images from intersilvi.com (served from the live store's media host), used with the
 *   client's permission (confirmed in the project conversation on 2026-11-17). Hot-linked, not copied.
 * origin "unsplash": provisional stock under the Unsplash License, used only where the live site has no
 *   suitable image. None of them shows Intersilvi products, people or premises; each shows a visible
 *   "Provisional photo" credit and must be replaced before launch.
 */
export interface MediaAsset {
  src: string;
  alt: string;
  origin: "client" | "unsplash";
  /** Photographer, for Unsplash assets. */
  credit?: string;
  /** Where the image comes from (page or file URL). */
  sourceUrl: string;
  /** What the production photo should show, when this one is provisional. */
  replaceWith?: string;
}

const site = (path: string) => `https://designer.intersilvi.se/media/${path}`;
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const media = {
  /* Supplied by the client */
  dogsRosettesLineup: {
    src: "/images/concept-b/dogs-rosettes-lineup-3.webp",
    alt: "Eight dogs of different breeds sitting in a row, each wearing an award rosette",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  workshopRosette: {
    src: "/images/concept-b/workshop-rosette-2.webp",
    alt: "A craftsman in a leather apron shaping a blue and yellow rosette by hand, surrounded by ribbon spools",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  eventDogShows: {
    src: "/images/concept-b/event-dog-shows.webp",
    alt: "A golden retriever and a border collie sitting on grass at a dog show, each wearing an award rosette, with a trophy and marquee behind",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  eventEquestrian: {
    src: "/images/concept-b/event-equestrian.webp",
    alt: "A rider on a chestnut horse jumping a striped fence at an equestrian show, the horse wearing a rosette on its bridle",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  eventTrophiesMedals: {
    src: "/images/concept-b/event-trophies-medals.webp",
    alt: "Gold trophy cups and medals with red, white and blue ribbons on red velvet",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  eventAwardCeremonies: {
    src: "/images/concept-b/event-award-ceremonies.webp",
    alt: "A wooden horse-head plaque, a medal and a burgundy and cream rosette on a rustic wooden table",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  /* From intersilvi.com */
  heroHorseRosette: {
    src: "/images/concept-b/hero-horse-rosette.webp",
    alt: "A chestnut horse in a sunlit riding arena wearing a blue rosette on its bridle",
    origin: "client",
    sourceUrl: "Supplied by the client for Concept B (2026-11-18)",
  },
  dogsWithRosette: {
    src: site("wysiwyg/intersivil-banner2.jpg"),
    alt: "A row of dogs behind a large pink and blue rosette",
    origin: "client",
    sourceUrl: "https://intersilvi.com/ (homepage banner)",
  },
  goldTrophies: {
    src: site("wysiwyg/intersivil-banner3.jpg"),
    alt: "Gold trophy cups in warm light",
    origin: "client",
    sourceUrl: "https://intersilvi.com/ (homepage banner)",
  },
  stablePlaques: {
    src: site("wysiwyg/intersivil-banner4.jpg"),
    alt: "Cast stable plaques with horse motifs on weathered wood",
    origin: "client",
    sourceUrl: "https://intersilvi.com/ (homepage banner)",
  },
  dogWearingRosette: {
    src: site(".renditions/wysiwyg/03_LO.jpg"),
    alt: "A Bernese mountain dog wearing a three-tier red rosette",
    origin: "client",
    sourceUrl: "https://intersilvi.com/ (homepage)",
  },

  /* Provisional stock: no equivalent exists on the live site */
  equestrian: {
    src: unsplash("photo-1559295928-6964f905e9c7"),
    alt: "Horse and rider jumping a white fence on a grass arena",
    origin: "unsplash",
    credit: "K. Mitch Hodge",
    sourceUrl: "https://unsplash.com/photos/tA9xkdbukdc",
    replaceWith: "Equestrian event photo with Intersilvi placing rosettes.",
  },
  pleatedRibbons: {
    src: unsplash("photo-1723588130505-2d8f812596e3"),
    alt: "Pleated two-tone ribbons in orange, pink, yellow and teal",
    origin: "unsplash",
    credit: "dkgreenlee",
    sourceUrl: "https://unsplash.com/photos/5x9Ru9F4klc",
    replaceWith: "Macro of Intersilvi rosette pleats in satin, grosgrain and metallic ribbon.",
  },
  ribbonPile: {
    src: unsplash("photo-1706734851968-2368da4fe102"),
    alt: "Pleated ribbon in red, grey and gold",
    origin: "unsplash",
    credit: "Nazar Hrabovyi",
    sourceUrl: "https://unsplash.com/photos/4kEQPQwd75E",
    replaceWith: "Close-up of ribbon being pleated in the Osby workshop.",
  },
  ribbonShelves: {
    src: unsplash("photo-1606695793797-2b2bd6a1a018"),
    alt: "Shelves stacked with spools of coloured ribbon",
    origin: "unsplash",
    credit: "Rachel Handley",
    sourceUrl: "https://unsplash.com/photos/pjrEp_HqeMU",
    replaceWith: "Documentary photo of the Osby workshop: ribbon stock, presses and people at work.",
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

/** Official logo from intersilvi.com. Only a 189×81 raster exists on the live site; request the vector original. */
export const brandLogo = {
  src: "https://designer.intersilvi.com/media/logo/default/intersilvi.png",
  width: 189,
  height: 81,
  alt: "Inter Silvi AB, Sweden",
};
