# Concept A refinement: Modern Scandinavian Premium Commerce

Route: `/concept-a`. Refined 2026-11-17 with Impeccable (critique, then layout, typeset, colorize and polish passes).

## 1. Critique findings that drove the refinement

Sources: your brief, plus Impeccable's independent finish review of the first build (disposition **fix**).

| # | Issue in the first build | Severity | Fixed by |
|---|---|---|---|
| 1 | Hero had no emotional pull: a headline over two grey illustration panels; doors' actions fell below the fold at 1440, 1024 and 768 | P1 | Full-bleed photo of a horse wearing a rosette (from intersilvi.com) with a solid navy panel, a two-tier headline and two distinct actions |
| 2 | Grey on grey: six sections on near-identical cool greys | P1 | Colour now owns whole regions: navy utility bar, navy hero panel, a white delivery band, linen discovery, a full-yellow design section, navy story and footer |
| 3 | Rows of identical boxed tiles (events, combinations, products) | P1 | Events became an asymmetric photo mosaic; combinations sit on a navy shelf with no boxes; product cards are the only card grid |
| 4 | No photography; all product imagery was SVG illustration | P1 | Real product cutouts, banners and logo from intersilvi.com; Unsplash stand-ins only where the site has nothing (marked "Provisional") |
| 5 | Weak type scale | P2 | Display sizes up to 6rem with -0.04em tracking, bold weights, yellow second line in the hero |
| 6 | Craft section was a placeholder box | P2 | Editorial spread: large photo, inset detail, confirmed history |
| 7 | Colour section faked one gloss on every finish | P2 | Four finish swatches (satin sheen, ribbed grosgrain, bright metallic, patterned) and a rack of hanging ribbon tails |
| 8 | CTAs undifferentiated | P2 | Design your own owns **yellow**; Explore products owns **navy/outline**, used the same way in the hero, nav, drawer and sections |
| 9 | "Popular combinations" claimed sales data | P2 | Renamed "Combinations to start from" |
| 10 | Help launcher covered content and actions | P3 | Hidden while the hero is on screen; icon-only below 1024px |
| 11 | Permanent gold underline on "Design your own" read as the current page | P3 | Shown on hover only |

The persona and heuristic questions in Impeccable's critique were skipped, because your brief already set the priority and scope.

## 2. Content coverage against the client reference

| Reference element | Status in Concept A | Notes |
|---|---|---|
| Utility bar: quality, fast delivery, produced in Europe | **Partly** | Phone, email, Quickorder, customer service, about, contact and language are present. The three trust claims are held back until the client confirms them. |
| Quickorder | ✅ | Dialog with article-number validation (simulated) |
| Language selector | ✅ | 6 live markets (simulated switch) |
| Customer service, About us, Contact | ✅ | Utility bar, drawer, footer |
| Logo | ✅ | Official logo from intersilvi.com (raster; vector requested) |
| Nav: Design your own, Horse, Swedish, Norwegian, Finnish, Sport, Accessories | ✅ | Plus Sale from the live site; mega menus use real award terms |
| Search, account, cart | ✅ | Search is simulated |
| Hero: award rosettes, trophies and medals | ✅ | Real photo, H1, supporting copy |
| Hero CTAs: Design your own rosette, Explore our products | ✅ | Yellow and outline, clearly different |
| Hero trust row (quality, fast delivery, produced in Europe) | **Withheld** | Unconfirmed claims (PRODUCT.md) |
| Delivery times: stock compared with custom, with CTAs | ✅ | Figures shown with a "To confirm" tag; free-shipping rule quoted from the live terms |
| Design your own: 5 steps | ✅ | Type, Centre, Tails, Text, Extras |
| Popular combinations | ✅ | As "Combinations to start from" |
| Ribbons in many colours | ✅ | Ribbon rack with 14 named colours and their finishes |
| "Choose your rosette" CTA | ✅ | "Choose a rosette model", which leads to model selection |
| Craftsmanship: "Designed by you. Handmade by us." | **Adjusted** | Now "Designed by you. Made in Osby." because "handmade" is unconfirmed |
| Find awards for your event: ceremonies, trophies & medals, equestrian, dog shows | ✅ | Dog shows, equestrian, trophies, plaques and medals |
| Colour inspiration and colour chart CTA | ✅ | Plus printed catalogue link (live site) |
| Our story: since 1992, 30+ years, 3 proof points | ✅ | Founding wording shown with "To confirm"; proof points use confirmed facts only |
| "We're here to help" band | ✅ | Phone, email, hours ("To confirm") |
| Footer: shop, customer service, about, contact, hours | ✅ | Social links omitted because no accounts were confirmed |
| "Need help?" chat button | ✅ | Links to contact; live chat unconfirmed |
| Newsletter (live site) | ✅ | Simulated |
| Product cards with quantity pricing (live site) | ✅ | 4 real products, prices and "from" pricing |

## 3. Visual system (tokens in `src/concepts/concept-a/tokens.ts`)

- **Colour.** Navy `#16244f` and navy-deep `#0c1531` with Intersilvi yellow `#f4c20d`, on white and one cool linen. Yellow means *design your own*; navy means *shop*.
- **Type.** Schibsted Grotesk only.
  - Display sizes run from 2.75rem to 6rem. Bold display; regular body at 17px; lead text at 18–22px.
  - Tabular figures for prices and production times.
- **Rhythm.** Dark, white, linen, yellow, white, linen, white, navy, white, navy. No two adjacent sections share a composition.
- **Shape and depth.** 2px corners throughout. One soft lift shadow, used only on hover.
- **Motion.** Hover lifts and slight image zoom only, with the reduced-motion setting respected.

## 4. Validation

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, 0 warnings |
| `npm run build` | Pass. `/concept-a` is 2.28 kB of page JS (114 kB first load) |
| Impeccable `detect` | 0 findings |
| Horizontal overflow at 1440, 1024, 768, 390, 320 | None (scrollWidth = clientWidth at every width) |
| Native-resolution captures | `.impeccable/review/v2/` (13 sections × 5 widths) |
| Interactions | Search, Quickorder, newsletter validation, mega menu open and Escape, mobile drawer, help launcher visibility: all working |
| Broken images, duplicate IDs, H1 count | None, none, 1 |
| `npm audit --omit=dev` | Clean |

**Not tested:**
- Real screen readers.
- Safari and Firefox.
- Real touch devices: mobile widths were emulated in Edge and Chrome.

## 5. Known limitations

- **Logo:** the live site exposes only a 189×81 raster, which is soft on high-density screens. Request the vector logo.
- **Hot-linked images:** client images load from `designer.intersilvi.se`, the live store's media host. If that host changes or blocks hot-linking, the images break. Copy the approved assets into the project, or the production CMS, before handover.
- **Provisional photos:** the equestrian tile and the colour and craft photos are Unsplash stand-ins, marked "Provisional" in the UI. The live site has no workshop or ribbon-material photography. See `src/content/media.ts` for what to shoot.
- **Unconfirmed facts:** production times, opening hours and founding wording remain marked "To confirm".
- **Out of scope:** model listing, product detail, the designer, cart and account are placeholder routes.

## 6. Final visual refinement (targeted pass)

An independent Impeccable finish review (disposition **fix**) was run together with your 10-point list. Every change is targeted; no section, journey or claim was added.

| Area | Change |
|---|---|
| Hero | The photo and the navy panel now sit side by side in a 5/7 grid and never overlap, so the rosette is always whole. The text column is about 680px at 1440 and 540px at 1024. The H1 sets on 2 lines from 1024 up, with a balanced wrap. The primary action is yellow and the secondary is outline. |
| Design your own | Full-strength yellow is confined to a stage panel behind the rosette, flush to the right edge and mirroring the hero. Steps and actions sit on white. The CTA is now the yellow design button. |
| Category discovery | A new reusable `CategoryCard` has `featured` and `standard` variants. Text sits below or beside the image, never on it, so mixed photo styles read as one family. Each card has its own crop and action label. |
| Product cards | Shows the range, a larger title, a bold price with "From" where the store says "As low as", and a full-width "View product" action. Rows align across cards through subgrid. The invented "Lower prices for larger quantities" line is removed; a quantity tier shows only where the store lists one. |
| Craftsmanship | One provisional photo, with the authorised intersilvi.com dog-and-rosette image as the inset. The caption says exactly which image is temporary and no longer overlaps the inset. Columns are 6 and 5. |
| Colour | Swatches are flat colour; the finish is named in text. Only "patterned" keeps a stripe. |
| Consistency | Shared `.a-h2` and `.a-lead` roles and a reusable `SectionHeader`. All section H2s use the same size at max 16ch, and leads are max 44ch. Header-to-content spacing is consistent. The delivery H2 is promoted to section level. |
| Tokens | Linen, stone and plinth are cooled (`#f1f3f5`, `#e3e6ea`, `#d5d9df`), and the plinth is now a token. |

Validation for this pass:
- Typecheck, lint and production build pass; `/concept-a` is 2.28 kB of page JS.
- Impeccable `detect` reports 0 findings.
- No horizontal overflow at 1440, 1024, 768, 390 or 320.
- Captures are in `.impeccable/review/v3/`.
