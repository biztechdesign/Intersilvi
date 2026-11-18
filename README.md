# Intersilvi redesign: homepage prototypes

A Next.js (App Router), React, TypeScript and Tailwind CSS v3 prototype for the Intersilvi homepage redesign.

| Route | What it is |
|---|---|
| `/` | Index of concept prototypes |
| `/concept-a` | **Concept A: Modern Scandinavian Premium Commerce** (homepage) |
| `/concept-a/*` | Placeholder pages for links outside this phase (categories, model listing and designer, cart, account, legal) |
| `/concept-b` | **Concept B: Refined contemporary commerce** (homepage) |
| `/concept-b/*` | Placeholder pages for the same out-of-phase links, including the model listing (`/concept-b/design-your-own`) |

## Run it

You need Node.js 20.9 or newer (tested on 20.11.1) and npm 10.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000/concept-a or http://localhost:3000/concept-b. Images load from intersilvi.com's media host and from Unsplash, so the browser needs internet access.

Other scripts:

```bash
npm run typecheck
```

```bash
npm run lint
```

```bash
npm run build && npm start
```

Stop `npm run dev` before running `npm run build`; both use `.next/`. To run a second dev server at the same time, give it its own build folder: `NEXT_DIST_DIR=.next-b npx next dev --port 3100`. Both concepts use the design system's Manrope and Instrument Serif fonts, fetched once at build time by `next/font` and then self-hosted.

## Project structure

```
PRODUCT.md                         Product truth (Impeccable init)
docs/HOMEPAGE-CONCEPTS.md          Approved concept directions
docs/CONCEPT-A-REFINEMENT.md       Critique, content coverage checklist, visual system, validation
docs/MOTION.md                     Shared motion system: tokens, hero entrance, reveals, interaction rules
_archive/                          Not built or linted. Holds the product-led Concept B redesign (see its README)
tailwind.config.ts                 Tailwind v3: design-system semantic tokens (`--ds-*`), used by both concepts
src/
  app/
    globals.css                    Tailwind layers, design-system base (.ds)
    layout.tsx, page.tsx           Root layout and prototype index
    concept-a/                     Concept A shell (font, header, footer) and homepage
    concept-b/                     Concept B shell (header, footer) and homepage
  design-system/                   Shared tokens, fonts and components (see docs/DESIGN.md); showcase at /design-system
  concepts/concept-a/
    components/                    Concept-specific pieces composed on the design system (nav, drawer, category cards, photo…)
    sections/                      One file per homepage section
  concepts/concept-b/              base.ts (route prefix), components/, sections/
  components/art/                  Concept-neutral SVG art (rosette, medal, trophy)
  content/
    homepage.ts, site.ts           Typed copy and navigation (CMS-ready)
    media.ts                       Image register: client images and provisional stock
  lib/
    commerce/                      Platform-neutral types, CommerceAdapter, mock catalogue
    content/types.ts               Content types, including Unconfirmed<T>
    images/loader.ts               next/image loader (remote CDNs resize; the Next server never fetches)
    content/paths.ts               rebase(): re-roots shared content and mock hrefs under a concept's route
    flags.ts                       Optional enhancements OPT-1 to OPT-7 (all off)
```

### How the code is separated

- **Styling** is Tailwind only. Concept A runs on the shared design system (`src/design-system/tokens.ts`): semantic classes such as `bg-surface-inverse`, `text-h2`, `py-section` and `rounded-md`, with the shared header, footer, buttons, dialog and form controls. Concept B runs on the same system; it keeps its own layouts and journey treatment ("Design your own" accent button in the header, photo-led hero).
- **Content** is typed data in `src/content`. Components only render it.
- **Commerce.** UI reads products, categories, markets and colours only through `CommerceAdapter`. Replace `mockCommerce` to connect a headless backend.
- **Server and client.** Sections are server components. Client components are used only where there is interaction: nav, drawer, market switcher, search, Quickorder, newsletter, wishlist and help launcher.

## What is real and what is simulated

| Feature | Status |
|---|---|
| Navigation, mega menu, mobile drawer, anchors, phone and email links, catalogue link | **Working** |
| Search, Quickorder, language switch, newsletter, wishlist | **Simulated**: each validates input and says it isn't connected |
| Account, cart, category, model listing and designer, legal | **Placeholder pages** |
| "Need help?" launcher | Links to contact (live chat unconfirmed) |

The optional enhancements OPT-1 to OPT-7 are not implemented.

## Images and data

| Source | Used for | Status |
|---|---|---|
| intersilvi.com (`designer.intersilvi.se` media) | Logo, hero, dog-show, trophy and plaque tiles, four product cutouts | Used with the client's permission. Hot-linked; copy them into the CMS before handover. |
| Unsplash (Unsplash License) | Equestrian tile; colour and craft photos | **Provisional**, shown with a credit in the UI. Replace with Intersilvi photography. |
| SVG illustrations | Design-your-own teaser and starter combinations | Concept art; replace or keep once photography exists |

- **Products.** Product names, prices, "from" prices and the Luxury Rosette's 25-piece tier are taken from the live store on 2026-11-17.
- **Unconfirmed facts** (production times, opening hours, founding wording) render with a visible "To confirm" tag.
- **Assets the client still needs to supply:**
  - the vector logo
  - workshop photography from Osby
  - ribbon and material macro shots
  - an equestrian event photo with Intersilvi rosettes
  - confirmed brand colour values

## Checks

See `docs/CONCEPT-A-REFINEMENT.md` §4 for the full results. In short:
- Typecheck, lint and build pass.
- Impeccable `detect` reports 0 findings.
- There is no overflow at 1440, 1024, 768, 390 or 320 px.
- `npm audit --omit=dev` is clean.

## Concept B notes

- **Journey.** Homepage, then model listing (`/concept-b/design-your-own`), then product detail, then the separate designer. The homepage design section is a teaser: every combination and colour is a link into the model listing, with the choice in the query string (`?combination=` or `?colour=`). Nothing on the homepage holds state, prices or recolours.
- **Shared with Concept A:** the commerce adapter and mock catalogues  typed content, image register, SVG art, feature flags and the image loader. Since the design-system migration, the shell (utility bar, header, footer, market selector, search, Quickorder dialog, newsletter, buttons, icons) comes from `src/design-system`. Concept-specific pieces (mega-menu nav, drawer, award category cards, photo, help launcher) stay in `concept-b/components` on design-system tokens.
- **Withheld claims.** The reference's "high quality", "fast delivery" and "produced in Europe" are not shown. The hero fact row uses only confirmed facts. Production times, founding wording and opening hours show a "To confirm" tag.
- **Imagery.** The hero and event photos come from intersilvi.com (client permission). The craft and colour photos are provisional Unsplash stand-ins with a visible credit.
