# Concept B refinement: product-led contemporary commerce

Route: `/concept-b`. Refined 2026-11-17 with Impeccable (critique, then layout, typeset, colorize, polish and adapt passes).
Screenshots of the rendered page: [desktop 1440](screenshots/concept-b-desktop-1440.png), [tablet 768](screenshots/concept-b-tablet-768.png), [mobile 390](screenshots/concept-b-mobile-390.png).

## 1. Critique that drove the work

An isolated design review of the rendered page (no knowledge of detector output) found:

| # | Finding | Fix |
|---|---|---|
| 1 | The hero was still a horse photograph, too close to Concept A, and the rosette was about 80px inside it | Product-led still life from the client's own cutouts: three rosettes, a cup and a medal in front of a gold disc |
| 2 | Seven of nine sections used the same pattern: serif H2, pale-blue ground, rounded cards, pill buttons | Alternating grounds (navy, white, sky, navy, white, gold tint, white, navy, sky) and different compositions per section |
| 3 | Product imagery was small inside timid cards; event tiles used four unrelated stock photos | Large product tiles (4:5), and event tiles built from product cutouts on flat colour fields |
| 4 | Delivery times were underweighted and "To confirm" chips read like bugs | Two-up comparison with the figures at display size; an asterisk marks each unconfirmed figure and a visible footnote explains it |
| 5 | The design teaser undersold the main conversion path | Full navy section with real colourway rosettes, ribbon colour dots with names, and the five steps as a numbered rail |
| 6 | The header took three bars (about 165px) | Single row at 1280px and wider: logo, ranges, search, Design your own, account, cart |

Two suggestions from the review were **not** taken: a soft yellow glow (a decorative gradient, excluded by the brief) and hiding "To confirm" markers (PRODUCT.md requires unconfirmed facts to stay visible). The detector reports 0 findings on the final page.

## 2. Section-by-section content coverage against the client reference

| Reference element | Concept B | Notes |
|---|---|---|
| Utility bar | ✅ phone, email, Quickorder, customer service, about, contact, language | The three trust claims stay withheld (unconfirmed) |
| Header and navigation | ✅ Horse, Swedish, Norwegian, Finnish, Sport awards, Accessories, Sale; Design your own as a gold button; search, account, cart | Search is simulated |
| Hero with both CTAs | ✅ headline, intro, **Design your own rosette** and **Explore products** at equal size | One line of confirmed facts replaces the trust row |
| Delivery times, stock versus custom | ✅ both lanes, each with its own CTA | Figures marked `*` until confirmed (4–7 and 14–20 workdays, from the live terms; the reference says 7 and 10) |
| Design your own | ✅ five steps, combinations, ribbon colours, "Choose a rosette model" | Teaser only. Every item links to the model listing |
| Craftsmanship | ✅ "Designed by you. Made in Osby." | "Handmade" stays out (unconfirmed). Photo is provisional |
| Shop by event (4 groups) | ✅ dog shows (featured), equestrian, trophies, plaques and medals | "Award ceremonies" has no matching live range, so trophies carry it |
| Colour inspiration and colour chart | ✅ real ribbon photographs, four material finishes, chart and catalogue links | |
| Our story and proof points | ✅ | Founding wording marked `*` (1982 and 1992 conflict) |
| "We're here to help" band | ✅ phone, email, hours | Hours marked "To confirm" |
| Footer | ✅ shop, customer service, about, contact, hours, legal | Social links omitted (no confirmed accounts) |
| "Need help?" launcher | ✅ | Links to contact. Live chat is unconfirmed |
| Live-site extras | ✅ selected products with verified specs, ranges and Quickorder, newsletter, wishlist | Reviews are absent because none exist |

## 3. What changed

- **Hero.** A staged composition of authorized product cutouts replaces the photograph. On phones the still life leads and both actions follow the headline, still inside the first screen.
- **Discovery.** `CategoryFeature` (photograph over a solid text plate) and `CategoryTile` (flat colour field with cutouts) are reusable and driven by `src/concepts/concept-b/content.ts`.
- **Products.** Six items across the journeys, with verified diameter, length and price from the store: Luxury Rosette, Best in Show, Horse rosette, a gold and blue cup, a 32 mm medal and a wooden plaque. The tile is the product and the page ground, not a box inside a box.
- **Type.** Newsreader for display (headline, section titles, numerals, product names) and Hanken Grotesk for interface text. Display sizes cap at 5.5rem, with balanced headings and 44–46ch measures.
- **Colour.** Navy leads, yellow marks the design journey and primary actions, and the product colours (royal blue, red, teal, gold) carry the rest.
- **Header.** One row from 1280px up, with search kept visible.
- **States.** Product tiles lift and warm to yellow on hover, category cutouts rise, colour dots enlarge, focus rings are themed, and motion is reduced under `prefers-reduced-motion`.

## 4. Assets and provenance

| Asset | Source | Status |
|---|---|---|
| Rosette, cup, medal, plaque and ribbon cutouts | The client's public store catalogue (`designer.intersilvi.se` and `.com` media), read through its public GraphQL endpoint on 2026-11-17 | Authorized by the client in the project conversation. Hot-linked; copy into the CMS or DAM before handover |
| Dog-show photograph | The client's homepage banner | Same terms |
| Craft photograph (pleated ribbon) | Unsplash, Nazar Hrabovyi | **Provisional**, captioned as such. No Osby workshop photography exists yet |

Missing, and needed from the client: workshop and production photography from Osby, the rosette colour chart as data (names and values), the vector logo, confirmed brand colours, and an equestrian event photograph if a photographic tile is wanted.

## 5. Checks

- `npm run typecheck`, `npm run lint` and `next build` pass.
- Impeccable `detect` on the rendered page: 0 findings.
- No horizontal overflow at 1920, 1440, 1024, 768, 390 and 320px (the gold hero disc is clipped by its section by design).

## 6. Remaining limitations

- **Tier price basis.** The store's tier price for the Luxury Rosette reads SEK 77.60 at 25 pieces. The live product page showed SEK 97.00. They differ by a 25% VAT factor, and the mock keeps the page value. Confirm the basis.
- **No lightweight preview.** A hover or recolour preview would need layered rosette assets that do not exist. It was left out to protect the Homepage → Model listing → Product detail → Designer flow.
- **Ribbon colour photographs** show the store's *medal* ribbons, named by visible colour. The rosette colour chart is a separate document.
- **Unconfirmed facts** (production times, founding wording, opening hours) still carry visible markers.
- **Audit.** `npm audit` reports a PostCSS advisory bundled in Next; the fix is a Next major upgrade and was not applied.
