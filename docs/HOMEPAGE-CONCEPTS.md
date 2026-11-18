# Intersilvi homepage: two concept directions

Status: **for review, revision 3**. Concept A is implemented at `/concept-a`; Concept B is not yet built. Written 2026-11-17 with Impeccable `shape`.
Sources: [PRODUCT.md](../PRODUCT.md), the client's homepage reference image (used for content, section order and features only, not its visual styling) and the live intersilvi.com site.

**Changes in revision 3 (Concept B redirected):**
- Concept B is now **Refined contemporary commerce**: a polished evolution of the client's reference homepage. The earlier "Interactive product commerce" direction is retired. Concept A's text is unchanged.
- The rosette journey is now stated as **Homepage → Model listing → Product detail → Separate designer tool**. No concept puts a configurator, or a live recolouring preview, on the homepage.
- Concept B's homepage design section is a non-interactive teaser whose items all link into the model listing.
- Shared sections 0.1, 0.3, 0.5, 7 and 8 were updated to match.

**Known drift in Concept A's text (not edited, by instruction):** sections 2-3 describe a split two-panel still-life hero and a "configurator page" link, but the built Concept A has a full-bleed photographic hero and its design action goes to the model listing (see `docs/CONCEPT-A-REFINEMENT.md`). That file is the record of what A actually is.

**Changes in revision 2:**
- Both concepts now give two primary journeys equal prominence.
- The full configurator stays on its own page.
- The features I proposed are now optional enhancements, not requirements.
- The live site's functions are listed explicitly.
- The visual differences between the concepts are set out side by side.
- A typed mock-data model is defined.

---

## 0. What both concepts share

### 0.1 Who arrives and the two primary journeys

A club secretary, show or event organiser, or breeder who needs the right award, correctly worded, delivered before a fixed event date, at a quantity price. This is a sales page (Impeccable's "Persuade" mode) with a strong shopping-task layer.

**Both concepts give equal, top-level prominence to two journeys:**

| Journey | Starts from | Ends at |
|---|---|---|
| **1. Shop products** (stock rosettes, sport awards, trophies, medals, plaques, accessories) | The hero's primary action, the main navigation, search, shop-by-event and Quickorder | Category or product page, then cart |
| **2. Design your own rosette** | The hero's primary action, the "Design your own" navigation item, and the design-your-own section | The **model listing**, then product detail, then the **separate designer** (5 steps), then review, then cart |

Rules both concepts follow:
- Both journeys are visible together in the first screen at **equal weight**. Neither is a secondary text link.
- Both stay reachable from the header on every screen size.
- The full five-step configurator **lives only on its dedicated page**. The homepage can introduce or tease it but never contains the full flow or a live preview. The homepage's design action leads to the model listing, not straight into the designer.

### 0.2 Baseline: what must be kept

Only content and functions that exist today on the live site or in the client's reference are treated as approved requirements.

| Area | Baseline content and functions | Source |
|---|---|---|
| Utility bar | Trust claims (only once confirmed), Quickorder, language/market (SV, ENG, NO, DK, FI, DE), customer service, about, contact, phone and email | Reference and live site |
| Header and navigation | Logo; Design your own, Horse, Swedish, Norwegian and Finnish stock rosettes, Sport awards, Accessories, Sale; search, account (login/signup), cart | Reference and live site |
| Hero | Headline about award rosettes, trophies and medals; actions **Design your own rosette** and **Explore products** | Reference |
| Delivery times | Stock compared with custom production, each with its own action. The figures come from the CMS. | Reference and live terms |
| Design your own | The 5 steps (Type, Centre, Tails, Text, Extras), popular combinations, ribbon colours, "Choose your rosette" | Reference |
| Design-rosette catalogue | Base models filtered by price, length, diameter, budget, construction, rings and streamers. Product options: tassels, fastener, cut type. A design action opens the configurator. | Live site |
| Product commerce | Quantity tier price, article number, stock status, wishlist, reviews block (it has no reviews yet, so it shows none), add to cart | Live site |
| Craftsmanship | Workshop story and its action | Reference |
| Shop by event | Award ceremonies, trophies & medals, equestrian, dog shows | Reference |
| Colour | Colour inspiration, colour chart, printed catalogue | Reference and live site |
| Story and help | Our story with proof points, the "We're here to help" band, design help by phone or email, opening hours | Reference and live site |
| Footer | Shop, customer service, about and contact columns; social links; newsletter; terms, privacy, FAQ, help centre | Reference and live site |
| Help launcher | The "Need help?" button. It links to contact, and only becomes live chat if chat is confirmed. | Reference |

### 0.3 Optional enhancements (not approved)

I proposed these features. Each needs client and technical approval and is **not** a requirement. Each one is designed as a removable module behind a feature flag, so the homepage is complete and balanced without it. When a flag is off, the module falls back to the baseline content shown.

| ID | Optional enhancement | Fallback when off |
|---|---|---|
| OPT-1 | **Award finder**: discipline → award → placement picker | Category tiles and search |
| OPT-2 | **Event-date planner**: enter an event date to see which products arrive in time and whether free shipping applies | Static delivery-times module (stock compared with custom) |
| OPT-3 | **Dynamic order-by board**: rows per product type that update when the date changes | Static delivery-times module |
| OPT-4 | **Shareable or saved configurations**: a design held in the URL or the customer's account | The configurator starts fresh |
| OPT-5 | **Pre-filtered hand-off**: a homepage colour or combination link opens the model listing pre-filtered and carries the choice into the designer | The link opens the unfiltered model listing |
| OPT-6 | **Award-synonym search**: "BIS valp" also finds "best in show puppy" | Standard search on product name and article number |
| OPT-7 | **Logo upload inside the configurator** | Pending the logo-upload and proofing decision in PRODUCT.md; until then design help is by phone or email |

### 0.4 Unresolved facts (both concepts)

These are content slots filled from the CMS, never written into a design:
- Founding wording: 1982 or 1992, and "30+ years".
- Production days: 4–7 / 14–20 or 7 / 10.
- Opening hours.
- The "Handmade" and "Produced in Europe" claims.
- Whether live chat exists.

Reviews and testimonials don't exist yet, so there are no stars or quotes. There is no real product photography yet; placeholders are labelled synthetic and a shot list is delivered.

### 0.5 Same journeys, different look

The concepts share the same section content, the same components (as variants) and the same mock data. They differ in hierarchy, layout, colour, type, imagery and interaction:

| | Concept A: Scandinavian | Concept B: Refined contemporary commerce |
|---|---|---|
| Visual idea | A quiet gallery; products supply all the colour | The client's own homepage, executed to a higher standard |
| Background | Cool white-grey (not cream) | White with one tint; navy fields for emphasis |
| Colour strategy | Restrained: neutral, plus one accent reserved for the next step to buy | Brand navy and gold; gold for the primary action and selection |
| Type | One restrained grotesque (Schibsted Grotesk) | A distinctive display face plus a plain UI sans (chosen at build) |
| Hero | Built: full-bleed photo with a navy panel and two distinct actions | Photographic hero, two equal-weight actions, closer to the reference |
| Layout rhythm | Wide editorial, then a dense grid, then wide editorial; lots of space | Alternating dense commerce modules and open image-led moments |
| Imagery | Studio still life, documentary workshop photos | The reference's photography: horse and rosette, workshop, products, events |
| Motion | Minimal: fades and text transitions only | Minimal: rail scrolling and hover states, reduced-motion safe |

---

## Concept A: Premium Scandinavian commerce

### 1. Creative direction and personality

**Main idea: the rosette is the colour, so the page is quiet.** Rosettes are saturated objects. A cool, calm, gallery-like setting presents each one as a crafted object. Its personality is assured, precise and unhurried, like a Nordic design shop that knows every award term. It avoids the default AI "premium" look (cream background, serif, gold accent).

- **Borrowed idea (orienteering map): colour as a strict code.** One accent is reserved for the next step to buy (primary actions, selected state). It is never decoration.
- **Borrowed idea (depot destination blind): rank by inversion.** Only one block per screen gets the dark treatment: the most important block in that viewport.

### 2. Homepage section order

1. Utility bar.
2. Header.
3. **Hero: two journeys.** Two equal panels side by side: **Shop products** and **Design your own rosette**, each with its own studio photo, one-line promise and action.
4. Delivery times: stock compared with custom, as the single dark-inverted block. It is the static baseline; OPT-2 can replace it.
5. Shop by event: award ceremonies, trophies & medals, equestrian, dog shows, as large photographic tiles. OPT-1 can sit above the tiles as a slim finder.
6. Design your own: an editorial split showing the rosette's parts numbered 1–5, popular combinations and ribbon colours. Its action opens the configurator page.
7. Best-sellers: a product grid with quantity prices.
8. Colour inspiration: the swatch grid laid out like a technical legend, linking to the colour chart and the catalogue.
9. Craftsmanship and Osby: one full-bleed workshop photo and short copy. Factual claims are CMS slots.
10. Our story and proof points.
11. Help band: design help, phone and email, hours from the CMS.
12. Newsletter and footer, then the help launcher.

### 3. Header, navigation and hero

- **Header:** slim and white with a hairline divider. Search is a visible field rather than an icon, because the catalogue is deep. There are two clearly labelled journey entries: *Shop* opens the mega menu, and *Design your own* goes straight to the configurator page.
- **Mega menu:** columns per range (discipline, then award, then placement), using the same pattern for the Swedish, Norwegian and Finnish ranges, with one product photo per column.
- **Hero:** a split first screen of equal halves, separated by a thin line.
  - Left, **Shop products**: a stock rosette and trophy still life, with the action *Explore products*.
  - Right, **Design your own rosette**: a custom rosette still life, with the 5 steps listed in small type and the action *Start designing*.
  - The headline spans both halves.
- **First screen in one sentence:** two calm, equally weighted doors, *shop* and *design*, each showing a single beautifully lit rosette.

### 4. Product discovery and customization

- **Discovery:**
  - Category pages keep the live filters (price, length, diameter, budget, construction, rings, streamers) as filter chips.
  - Product cards show one photo, the native award term, quantity price, stock badge, wishlist, and add to cart with quantity.
- **Customization on the homepage:** an editorial teaser only, with no interaction beyond navigating to the configurator.
- **Configurator page** (shared with Concept B, in Concept A's styling):
  - Preview on the left; step, options and running price on the right.
  - Steps: Type → Centre → Tails → Text → Extras.
  - Colours have names as well as swatches.
  - It ends in a review step with explicit approval and a no-return notice for custom products.

### 5. Typography, colour and imagery

- **Type:** one Scandinavian grotesque (Schibsted Grotesk proposed, open-source), with large, tight display sizes and tabular figures for prices.
- **Colour:** restrained. A cool white-grey background, navy ink from the logo, and one accent taken from the brand gold/yellow once logo files are confirmed.
- **Imagery:** studio still life on a neutral seamless background with consistent light, plus documentary workshop photos.
  - **Shot list:** 12–20 products, 2 hero still lifes, 4 event tiles, workshop and ribbon macro shots.

### 6. Desktop and mobile

- **Desktop (1280–1600):** 12-column grid, hero split 6/6, generous margins.
- **Tablet:** the hero halves stack, Shop first. The mega menu becomes a two-level drawer.
- **Mobile:** sticky header with search and two journey buttons below it, then the two hero panels stacked as compact cards, both visible in the first screen. The delivery module stacks stock above custom.

---

## Concept B: Refined contemporary commerce

*Direction replaced in revision 3. The earlier "Interactive product commerce" direction (live recolouring preview in the hero) is retired; see the revision note at the top.*

### 1. Creative direction and personality

**Main idea: the client's own homepage, executed to a higher standard.** Concept B is the recognisable, commerce-first interpretation of the reference: photographic hero, navy and gold identity, delivery strip, design-your-own teaser, craftsmanship, shop by event, colour inspiration, story and help. It keeps that content and section logic. What changes is execution: stronger hierarchy, calmer and more deliberate spacing, better type, real product presence, and no template habits.

Where Concept A is the quiet editorial Scandinavian alternative (cool neutral, restrained colour), Concept B is warmer, more confident and more familiar. It is the safer choice for a client who recognises their own vision.

What B improves on the reference (the brief is "evolve", not "copy"):
- **One clear primary action pair in the hero**, both at full strength, instead of one yellow button and one white one (equal journey weight, section 0.1).
- **Fewer competing effects.** The reference mixes script annotations, drop shadows, icon rows and many card styles. B uses one card language, one icon style and one accent role.
- **Real product presence.** Rosettes are shown large and well lit, not as small decorations on white panels.
- **Rhythm.** The reference stacks full-width bands of similar weight. B alternates dense commerce modules with open image-led moments.
- **Typography with a point of view.** The reference's serif display plus tiny sans body reads generic at small sizes. B sets a clearer scale and stronger contrast between display and UI text.
- **Trust handled honestly.** The reference's trust row and "handmade" copy are unconfirmed (section 0.4) and render as CMS slots.

What B must not do: copy the reference's exact layout, its script annotations or its photography (not licensed), or imitate Concept A's compositions.

**Anti-references:** generic marketplace grids; "premium" cliché of cream, gold foil and drop caps; glass and glow effects; confetti or trophy-clip-art decoration.

### 2. Homepage section order

Follows the reference, with commerce modules added where the live site has them.

1. Utility bar and header.
2. **Hero:** photographic, with headline, short supporting copy, and two equal-weight actions: **Design your own rosette** and **Explore our products**. Trust row only with confirmed claims.
3. **Delivery times:** stock compared with custom, each with its own action. Figures from the CMS, shown "To confirm" until verified.
4. **Shop by event:** award ceremonies, trophies & medals, equestrian, dog shows. Moved up from the reference's fifth position, because product discovery is the commerce-first path.
5. **Best-sellers:** product row with quantity prices (from the live store).
6. **Design your own (teaser):** see section 4. Leads to the model listing.
7. **Craftsmanship and Osby:** workshop story; claims are CMS slots.
8. **Colour inspiration:** ribbons by material, links to the colour chart and printed catalogue.
9. **Stock ranges:** Swedish, Norwegian, Finnish and horse ranges with Quickorder, for expert buyers.
10. **Our story** and proof points (confirmed facts only).
11. **Help band:** design help, phone, email, hours from the CMS.
12. Newsletter, footer, help launcher.

### 3. Header, navigation and hero

- **Header:** same structure and journey entries as Concept A (Shop mega menu, *Design your own* as a distinct action, visible search, account, cart). Visual treatment is B's own.
- **Mega menu:** discipline, then award, then placement, using Nordic award terms unchanged.
- **Hero:** a full-bleed photograph with the two journey actions side by side at equal size and weight, colour-coded consistently (design = gold, shop = navy or white solid). Both visible in the first screen on every breakpoint.
- **First screen in one sentence:** a confident photographic welcome with two equal doors, *shop* and *design*.

### 4. Product discovery and customization

**The rosette journey is: Homepage → Model listing → Product detail → Separate designer tool.** The homepage never contains the configurator.

- **Homepage teaser (the full scope):**
  - One strong rosette image or illustration, the five steps (Type, Centre, Tails, Text, Extras) as a **non-interactive explanatory list**, a row of "combinations to start from" and a ribbon-colour rail.
  - Every item is a **link** into the model listing (optionally pre-filtered by colour or type). Nothing recolours, nothing holds state, no price, no cart.
  - Primary action: **Choose a rosette model**, which goes to the model listing.
  - No live preview, no recolouring and no JavaScript state. This retires the earlier "lightweight live preview"; see conflicts in the revision note.
- **Model listing** (placeholder in this phase): the live site's filters (price, length, diameter, budget, construction, rings, streamers) as filter chips.
- **Product detail** (placeholder): options (tassels, fastener, cut type), quantity tiers, and the **Design it** action that opens the separate designer.
- **Designer** (separate tool, later phase): the five steps, named colours, review and explicit approval, and the no-return notice for custom products.
- **Discovery:** event tiles, best-sellers and colour inspiration are the browsing routes; search, stock ranges and Quickorder are the expert routes.

### 5. Typography, colour and imagery

- **Colour:** the brand's navy and gold (from the logo; values confirmed when logo files arrive) on white and one warm or cool tint. Navy carries large fields and text; gold is reserved for the primary action and selection. Ribbon colours appear in product and colour imagery rather than as page decoration. Text sits only on fills that pass contrast checks.
- **Type:** a distinctive display face for headlines paired with a plain, highly legible sans for UI, body and prices (tabular figures). The exact faces are chosen at build, must be open-source and self-hosted via `next/font`, and must cover Swedish, Norwegian, Danish, Finnish and German diacritics. The earlier Familjen Grotesk proposal is no longer assumed.
- **Imagery:** the reference's hero, workshop and product photography is the intended content. The licensed client images already registered in `src/content/media.ts` are reused; Unsplash stand-ins stay marked "Provisional". **Fewer new assets than the earlier direction needed**, because there are no layered preview parts.

### 6. Desktop and mobile

- **Desktop (1280-1600):** 12-column grid, hero text left over the photograph, horizontal rails for events and products with visible arrows and keyboard support.
- **Tablet:** hero actions side by side below the headline; rails keep snap points.
- **Mobile:** sticky header with search; hero with both actions stacked at equal size in the first screen; rails swipe with snap points; delivery cards stack stock above custom.
- Reduced motion: no sliding or fading; state changes are instant.

---

## 7. Implementation: reusable components and typed mock data

Both concepts are built from **one component library with concept-specific variants**. Styling comes from central design tokens, so each concept is a token set plus variant choices, not separate code.

### 7.1 Shared components (Next.js App Router / React / TypeScript)

- **Server components by default.** Client components are used only where there is interaction: preview, rails, menus, dialogs, configurator.

| Group | Components | Concept differences |
|---|---|---|
| Layout and chrome | `UtilityBar`, `SiteHeader`, `MegaMenu`, `MarketSwitcher`, `SearchField`, `QuickOrderDialog`, `SiteFooter`, `HelpLauncher` | Token and density variants |
| Journeys | `JourneyHero`, `JourneyPanel` | Each concept owns its hero composition |
| Commerce | `ProductCard`, `TierPrice`, `StockBadge`, `WishlistButton`, `ProductGrid`, `FilterChips` | Shared |
| Content | `CategoryTile`/`EventPanel`, `EditorialSplit`, `StoryBlock`, `ProofPoints`, `HelpBand`, `NewsletterForm`, `ColourGrid`/`RibbonSwatch` | Variant per concept |
| Delivery | `DeliveryTimes` (baseline, static) | A = inverted block, B = fixed-column table |
| Rosette | `RosettePreview` (layered render from a `RosetteConfig`), `ConfiguratorShell`, `ConfiguratorStep`, `ConfigReview` | Used only in the separate designer, never on a homepage |
| Optional (flagged) | `AwardFinder` (OPT-1), `EventDatePlanner` (OPT-2), `OrderByBoard` (OPT-3) | Not built until approved |

### 7.2 Typed mock data

- All homepage content and commerce data comes from typed mock fixtures behind a `CommerceAdapter` and a `ContentSource`. Swapping in the real backend or CMS later changes the adapters, not the components.
- Unconfirmed facts are typed as `Unconfirmed<T>`, so a component cannot display them as fact by accident.

```ts
type Market = "se" | "com" | "no" | "dk" | "fi" | "de";
type Money = { amount: number; currency: "SEK" | "NOK" | "DKK" | "EUR" }; // currency per market is unresolved
type Unconfirmed<T> = { value: T; status: "unconfirmed" | "confirmed"; source: string };

interface PriceTier { minQty: number; unitPrice: Money }
interface Product {
  sku: string; name: string; awardTerm?: string; categoryIds: string[];
  images: ImageRef[]; price: Money; tiers: PriceTier[];
  stock: "in_stock" | "made_to_order"; attributes: Partial<Record<
    "diameterCm" | "lengthCm" | "rings" | "streamers" | "construction" | "tassels" | "fastener" | "cutType", string | number>>;
}
interface Category { id: string; label: string; range?: "se" | "no" | "fi" | "horse" | "sport"; children?: Category[] }
interface RibbonColour { id: string; name: string; hex: string; material: "satin" | "grosgrain" | "metallic" | "patterned" }
interface RosetteConfig { typeId: string; centre: { motifId?: string }; tails: RibbonColour["id"][]; text?: string[]; extras?: string[] }
interface LeadTime { productType: "stock" | "custom"; workdays: Unconfirmed<[number, number]> }
interface HomepageContent {
  hero: { headline: string; shop: JourneyPanelContent; design: JourneyPanelContent };
  delivery: LeadTime[]; events: EventTile[]; story: { foundedText: Unconfirmed<string>; proofPoints: ProofPoint[] };
  help: { phone: string; email: string; hours: Unconfirmed<string> };
}
interface FeatureFlags { awardFinder: boolean; eventDatePlanner: boolean; orderByBoard: boolean; shareableConfig: boolean; previewHandoff: boolean; synonymSearch: boolean; logoUpload: boolean }
```

Mock fixtures use real live-site examples where they exist, such as "Luxury Rosette", article 106330, SEK 128 with a 25-piece tier at SEK 97. Anything invented is marked synthetic.

### 7.3 Responsive and accessibility (both concepts)

- Fluid layouts from 360 to 1600 px, using container queries in components so each variant works inside any grid.
- Proposed target: WCAG 2.2 AA.
  - Keyboard-operable menus, rails and preview.
  - Named colours wherever a swatch appears.
  - Reduced-motion fallbacks.
  - Layouts tested against long Finnish and German labels.

---

## 8. Key differences and UX trade-offs

| | Concept A: Scandinavian | Concept B: Refined contemporary commerce |
|---|---|---|
| How the two journeys appear | Two distinct actions over a photographic hero | Two equal-weight actions over a photographic hero |
| Best serves | Buyers who value restraint and fast stock orders | Buyers and a client who expect the familiar reference, done well |
| Homepage interactivity | Navigation only | Navigation only; the design teaser is links |
| Asset dependency | Photography | Photography (the reference's content) |
| Build effort and risk | Lower | Similar; no preview renderer to build |
| Accessibility risk | Low | Low |
| Risk | Can feel too calm | Can drift back to the reference's busy look; the "evolve, not copy" rules guard this |

**Possible hybrid:** B's section order with A's restraint in spacing and colour. Both concepts share the same data model and adapters, so this stays possible.

---

## Decisions needed before mockups are approved for build

1. The client picks Concept A, Concept B or the hybrid.
2. Approve or reject each optional enhancement, OPT-1 to OPT-7.
3. The client confirms the unresolved facts (section 0.4).
4. Configurator engine: build a new React renderer or integrate the existing PrintXpand designer. It affects the separate designer phase only, not either homepage.
5. Brand assets (logo files, brand colours) and a photography plan.
6. Commerce backend and CMS. These don't block design, because components are written against the adapters.
