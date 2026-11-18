---
name: Intersilvi
description: Premium contemporary commerce for an established Swedish maker of award rosettes, trophies and medals.
colors:
  brand-navy: "#0B1D40"
  brand-yellow: "#F4BE24"
  surface: "#FFFFFF"
  surface-alt: "#F7F8FA"
  surface-soft: "#E9EEF5"
  surface-sunken: "#F3F6FA"
  surface-inverse: "#0B1D40"
  surface-inverse-raised: "#14295A"
  fg: "#0B1D40"
  fg-secondary: "#34425A"
  fg-muted: "#56627A"
  fg-disabled: "#8B95A8"
  fg-inverse: "#FFFFFF"
  fg-inverse-muted: "#B7C2D8"
  fg-link: "#1E3A78"
  line: "#D6DDE7"
  line-strong: "#A7B1C2"
  line-input: "#76829A"
  action-primary: "#0B1D40"
  action-primary-hover: "#14295A"
  action-accent: "#F4BE24"
  action-accent-hover: "#E0A800"
  action-secondary: "#E9EEF5"
  action-destructive: "#B42318"
  focus: "#1E3A78"
  focus-inverse: "#F4BE24"
  status-success: "#1F7A4D"
  status-success-surface: "#E6F4EC"
  status-warning: "#8A5A00"
  status-warning-surface: "#FDF3D7"
  status-error: "#B42318"
  status-error-surface: "#FDECEA"
  status-info: "#1D5FA8"
  status-info-surface: "#E8F1FB"
typography:
  display:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.893rem + 1.786vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  serif-display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 2rem + 2.2vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  h1:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.786rem + 1.071vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.607rem + 0.714vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 1.25rem + 0.4vw, 1.625rem)"
    fontWeight: 700
    lineHeight: 1.25
  card-title:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.25rem)"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.35
  price:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.2
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
  section-sm: "clamp(3rem, 2.4rem + 2vw, 4rem)"
  section: "clamp(4rem, 3rem + 3vw, 6rem)"
  section-lg: "clamp(5rem, 3.8rem + 4vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.action-primary}"
    textColor: "{colors.fg-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.action-primary-hover}"
  button-accent:
    backgroundColor: "{colors.action-accent}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-accent-hover:
    backgroundColor: "{colors.action-accent-hover}"
  button-secondary:
    backgroundColor: "{colors.action-secondary}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    height: "44px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  product-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  product-stage:
    backgroundColor: "{colors.surface-sunken}"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
  dialog:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
---

# Intersilvi design system

Status: **foundation v1**, created 2026-11-17 with Impeccable (`document` + `extract`; validation in the report at the end of [COMPONENT-GUIDELINES.md](COMPONENT-GUIDELINES.md#validation)).
Source of truth for tokens: [`src/design-system/tokens.ts`](../src/design-system/tokens.ts). Components: [`src/design-system/`](../src/design-system/). Live reference: **`/design-system`**.

Companion documents: [DESIGN-TOKENS](DESIGN-TOKENS.md) · [TYPOGRAPHY](TYPOGRAPHY.md) · [COMPONENT-GUIDELINES](COMPONENT-GUIDELINES.md) · [RESPONSIVE-GUIDELINES](RESPONSIVE-GUIDELINES.md) · [IMAGE-GUIDELINES](IMAGE-GUIDELINES.md).

> Impeccable normally keeps DESIGN.md at the project root; this project keeps it in `docs/` at the user's request.

## Overview

Premium contemporary commerce for an established Swedish award brand. Calm white and pale-blue surfaces let product photography carry the colour; Intersilvi navy carries text, structure and the default action; Intersilvi yellow is rationed to the single most important commercial action in a view and to small brand moments. One sans-serif family (Manrope) does all functional work; Instrument Serif appears at most once per page for an editorial statement.

The system serves every page type: homepage, category and listing pages, search and filters, product detail, rosette model selection and designer entry points, the integrated trophy customizer, cart and checkout, account and Quickorder, editorial and information pages, and global navigation, footer and help.

Principles:

1. **Product first.** Photography is the visual focus; chrome stays quiet.
2. **One action leads.** At most one yellow action per view; everything else is navy, outline or text.
3. **Exact over expressive.** Award terms, prices and lead times are data from the commerce and content layers; components never invent or hardcode them.
4. **Same thing, same look.** One component per job; variants only when the job differs.
5. **Accessible by construction.** AA contrast in every token pairing, 44px targets, visible focus, reduced-motion support.

## Colors

Semantic roles (all in the frontmatter; each is a Tailwind utility and a `--ds-color-*` CSS variable):

- **Surfaces.** `surface` (white) for pages and cards; `surface-alt` (#F7F8FA) for alternate sections and summaries; `surface-soft` (#E9EEF5) for quiet emphasis bands, selected rows and filled panels; `surface-sunken` (#F3F6FA) as the product-photo stage; `surface-inverse` (navy) for the footer and at most **one** dark editorial band per page.
- **Text.** `fg` (navy, 16.6:1), `fg-secondary` (10.1:1), `fg-muted` (6.1:1 on white; 5.3:1 on soft), `fg-disabled` (disabled labels only), `fg-link`, `fg-inverse` / `fg-inverse-muted` on navy, `fg-on-accent` on yellow (9.7:1).
- **Lines.** `line` for decorative dividers and card borders; `line-strong` for emphasis; `line-input` (3.9:1) for every form-control border, meeting WCAG 1.4.11.
- **Actions.** `action-primary` navy; `action-accent` yellow; `action-secondary` soft blue; `action-destructive` red; each with hover/active.
- **Status.** success / warning / error / info, each with a tinted surface. Status is always paired with an icon and words.
- **Selection.** `selected` (navy) for checked controls, active pagination and the swatch ring; `selected-surface` for selected rows and active filter chips.
- **Focus.** One treatment: 2px `focus` outline, 2px offset; `focus-inverse` (yellow) on navy.

Yellow rules: yellow is 1.7:1 on white, so it is **never text on light grounds**. Use it as a fill behind navy text, as a small marker, or as the focus ring on navy.

## Typography

Manrope (400–800) for navigation, headings, product cards, forms, body, prices. Instrument Serif (400) only for a page's single editorial statement (`text-serif-display`). Fluid sizes clamp between mobile and desktop; desktop targets: display 56, H1 44, H2 40 (extra bold, 800), H3 26, card title 20, body 16, small 14, label 13, caption 12. Headings use `text-wrap: balance` and a 22ch max width; body text 68ch; leads 58ch. Prices and quantities use tabular lining figures (`ds-numeric`). Full scale and rules: [TYPOGRAPHY.md](TYPOGRAPHY.md).

## Iconography

**Material Symbols Rounded only, in the light weight (300).** Every icon on every page comes from the Material Symbols Rounded family: outlined (fill 0), weight 300, grade 0, optical size 24. Never mix in another icon family, hand-drawn SVG icons or emoji.

- One `Icon` component renders them (`src/design-system/components/Icon.tsx`) as a font ligature, so an icon is its Material Symbols name (`shopping_bag`, `arrow_forward`). The font is loaded once in `src/app/layout.tsx`.
- Sizes: 18px inline with text, 20px in buttons (default), 22–24px for header and trust icons. Colour comes from `currentColor`; icons are decorative unless they stand alone and carry a `label`.
- Active or saved states use the fill axis (a pressed parent sets `--ds-icon-fill: 1`), never a second icon.
- Material Symbols has no brand logos, so social links use generic symbols (`group`, `photo_camera`, `play_circle`) with the network named in the accessible label.
- Product art, rosette illustrations and the logo are artwork, not icons, and are exempt.

## Layout

- Container: `ds-container`, max **1320px**, gutters **16 → 40px** (`px-gutter`).
- Grid: 12 columns at ≥1024px, 6 at 640–1023px, 4 on phones; gaps 16px (phone) → 20–24px (desktop).
- Spacing: Tailwind's 4px scale (1 = 4px) plus `30` (120px). Section rhythm in three densities: `py-section-sm` (48→64), `py-section` (64→96), `py-section-lg` (80→120). Choose by content density.
- Section headers: two patterns only. Functional sections (design, shop, colour) use the shared `SectionHeader`: eyebrow and heading on the left, description and the section CTA directly beneath it on the right, stacking on narrow screens. Editorial sections (craft, our story) use a centred eyebrow, heading, paragraph and CTA. Do not mix the two inside one section.
- Section headings: `SectionHeading` everywhere (H2, max 22ch, optional lead and right-aligned action, 32→48px to content).
- Image-to-text splits: 50/50 or 7/5; image first on phones.
- Full-bleed: only hero imagery and the single dark editorial band; everything else sits in the container.

Details: [RESPONSIVE-GUIDELINES.md](RESPONSIVE-GUIDELINES.md).

## Elevation & Depth

Flat by default; depth means "this floats".

- `shadow-xs`: chips and small floating buttons on photos.
- `shadow-sm`: rarely; quiet lift.
- `shadow-md`: product-card hover, dropdowns, mega menu.
- `shadow-lg`: dialogs, drawers, toasts.

**Glass (frosted) surfaces: one exception.** The sticky header bar. Nothing else uses backdrop blur. The homepage hero card is a solid navy card at 90% opacity with no blur and no border, set low on the left so the sunlit part of the photograph stays clear above it.

Cards at rest use a 1px `line` border, not a shadow.

## Shapes

**Controls are fully rounded.** Every call-to-action button (`Button`, `ButtonLink`, `IconButton`) and every single-line input (`TextInput`, `Select`, `SearchInput`, quantity and counted fields) uses `rounded-pill` (9999px). Inputs get 20px of horizontal padding so text clears the curve. A multi-line `Textarea` is the exception: it stays softly rounded (`rounded-lg`, 10px), because a pill shape breaks down once the field is taller than one line.

**Header utility controls are the one exception.** Borderless ghost controls in the header and utility bar (Log in, Cart, language switcher, skip link) use `rounded-md` (6px), because they have no visible fill or outline at rest and the pill shape only shows on focus.

**Button height: 44px is the standard.** Every call-to-action button, submit button and header action is `md` (44px). `sm` (36px) is for dense rows such as cart lines and filter chips. `lg` (48px) is limited to the header search field, which aligns with the 48px header actions; do not use it for buttons elsewhere. Buttons nested inside a field (such as Subscribe) are 44px too, and the field grows around them.

Everything that is not a control keeps small, consistent corners: `rounded-sm` 4px (chips, badges), `rounded-md` 6px (product cards and small tiles), `rounded-lg` 10px (panels, dialogs, featured media, order summary, and the large image cards on the homepage: event categories and the ribbon gallery). Round elements (`rounded-full`): swatches, step numbers, count badges, filter chips. No decorative circles, blobs or gradient shapes.

Implementation: components use `rounded-button` and `rounded-input`, which read `--ds-radius-button` and `--ds-radius-input`. A surface opts into the pill controls with the `ds-pill` class (Concept B does). Without it, the variables fall back to the earlier 6px and 4px corners, which is how Concept A still renders until it adopts the pill shape.

## Components

All components live in `src/design-system/` and render in `/design-system`. Specifications (purpose, anatomy, variants, sizes, states, accessibility, props): [COMPONENT-GUIDELINES.md](COMPONENT-GUIDELINES.md).

- **Actions:** `Button` (primary, accent, secondary, outline, text, destructive · sm 36 / md 44 / lg 48 · loading, disabled, inverse), `ButtonLink`, `IconButton`.
- **Forms:** `Field`, `TextInput`, `Textarea`, `Select`, `SearchInput`, `Checkbox`, `Radio`, `Toggle`, `Slider`, `Fieldset`, `QuantityStepper`, `FileUpload`, `CountedInput`.
- **Navigation:** `UtilityBar`, `SiteHeader`, `PrimaryNavRow`, `MegaMenuPanel`, `Dropdown`, `Breadcrumbs`, `Pagination`, `SiteFooter`.
- **Commerce:** `ProductCard`, `CategoryCard` (standard/featured), `Price`, `TierPricing`, `SpecList`, `Badge`, `StockStatus`, `ProductGallery`, `WishlistButton`, `ActiveFilters`, `CartItem`, `OrderSummary`, `ImagePlaceholder`.
- **Customization:** `StepIndicator`, `SwatchGroup`, `OptionCardGroup`, `SegmentedControl`, `ConfigurationSummary`, `RosetteModelCta`.
- **Shared:** `Section`, `SectionHeading`, `Panel`, `Accordion`, `Tabs`, `Dialog` (modal/drawer), `Tooltip`, `Alert`, `useToast`, `Spinner`, `Skeleton`, `StateMessage`, `HelpPanel`, `NewsletterForm`, `PromoBanner`.

Motion: 160 / 220 / 400ms, plus 560ms for entrances. `ease-standard` is for interactions and `ease-emphasized` (exponential ease-out) for arrivals. Distances are a 2px button lift, a 4px arrow nudge and a 10px entrance rise, and images zoom to 1.03. There's one hero entrance per page, and reveals only on section headings. Under `prefers-reduced-motion`, all movement stops and colour feedback stays. See `docs/MOTION.md`.

## Do's and Don'ts

**Do**
- Use Material Symbols Rounded (light, weight 300) for every icon, and nothing else.
- Use semantic tokens (`bg-surface-alt`, `text-fg-muted`), never raw hex or Tailwind palette colours.
- Keep one yellow action per view; use navy for the rest. On the homepage the yellow actions are: the header "Design your own" (global), the hero "Design your own rosette", the rosette builder's "Next" button and the footer Subscribe button. Quickorder uses a yellow tab as a navigation tab, and the floating "Need help?" button is the page's single persistent helper. Every section call-to-action elsewhere is filled navy, with an outline button as the optional second action.
- Put every control inside `Field`/`Fieldset`; show errors under the control in words.
- Show only data the commerce/content layer provides; mark unconfirmed facts.
- Keep product cutouts on the `surface-sunken` stage at a consistent scale.

**Don't**
- Use serif headings for every section, or headings larger than the scale (no 60–90px section titles).
- Draw custom SVG icons or mix in Lucide, Heroicons or emoji.
- Put yellow text on white or light surfaces.
- Alternate navy sections down the page; one dark band plus the footer is the limit.
- Add eyebrows outside homepage section headings, gradient text, decorative blobs or circles, or glass effects beyond the sticky header (see Elevation & Depth).
- Duplicate a component with a slightly different look; extend its variants instead.
- Hardcode prices, stock, delivery promises or customer data inside components.

---

## Appendix: existing concepts — inconsistencies and migration plan

**Status (2026-11-17): both concepts are migrated** onto this system (steps 2–6 below). The `a-` and `b-` token sets, the `.conceptB` base styles and the concept duplicates are deleted. The inconsistencies below describe the state before migration.

### Inconsistencies found

| Area | Concept A | Concept B | Design system |
|---|---|---|---|
| Typefaces | Schibsted Grotesk | Hanken Grotesk + Newsreader serif on **every** H2 (`b-h2`) | Manrope; Instrument Serif once per page |
| Section titles | `display-2` up to **68px** | `display-2` up to **60px** | H2 max **36px** |
| Hero | 76–80px | `display-1` up to **88px** | display max **56px** |
| Navy | #16244f / #0c1531 | #14264f / #0b1a3d | #0B1D40 |
| Yellow | #f4c20d | #f6c315 | #F4BE24 |
| Radius | 2px everywhere | 10px / 20px / pill buttons | pill buttons and single-line inputs; 4 / 6 / 10px for everything else (Concept A: 6px buttons and 4px inputs until it adopts the pill shape) |
| Container | 90rem (1440) | 88rem (1408) | 82.5rem (1320) |
| Section padding | up to 9rem (144px) | up to 8rem (128px) | 64→96 standard, 120 max |
| Focus ring | navy outline + 6px yellow halo | ring utilities per component | 2px outline, 2px offset |
| Eyebrow labels | none | `b-eyebrow` token exists | allowed only above homepage section H2s, via `Eyebrow` (see TYPOGRAPHY.md); banned elsewhere |
| Gradients | category card scrim | hero, craft, award cards | scrims only, bottom 40–80% navy |
| Duplicated components | 20 files | 18 files, 17 of them same-named | one shared set |

Duplicated in both concepts: `Button`, `Icon`, `Logo`, `Photo`, `SearchForm`, `QuickOrder`, `MarketSwitcher`, `MobileMenu`, `PrimaryNav`, `ProductCard`, `NewsletterForm`, `PendingFact`, `HelpLauncher`, `SiteHeader`, `SiteFooter`, `WishlistButton`, `useDismiss`.

### Migration plan (executed for Concept A and Concept B)

1. **Pick the surviving concept layout** (or hybrid). Migration targets that one; the other stays frozen as a reference.
2. **Shell first (low risk, high consistency):** wrap the concept route in `.ds`, load Manrope, swap `SiteHeader`/`UtilityBar`/`PrimaryNavRow`/`SiteFooter`/`HelpPanel` and `Button` for the shared ones. Keep section layouts untouched.
3. **Commerce surfaces:** replace concept `ProductCard`s and category cards with `ProductCard` / `CategoryCard`; map adapter data at the page edge (see `toCard` in `src/app/design-system/page.tsx`).
4. **Typography pass:** replace `a-display-*` / `b-display-*` with `SectionHeading` (H2 36px) and `text-display` for the hero; keep a single `text-serif-display` statement if the brand story wants it.
5. **Colour pass:** replace `a-*`/`b-*` colour utilities with semantic roles; reduce navy bands to one plus footer.
6. **Delete** the concept component duplicates and the `a-`/`b-` token sets once nothing references them.
7. Re-run `/impeccable audit` and `critique` on the migrated page at 1920/1440/1024/768/390/320.

Recommended order of risk: 2 → 3 → 4 → 5 → 6. Each step is independently shippable.

### Concept A migration notes

- Root: `src/app/concept-a/layout.tsx` uses `.ds` and `dsFontVariables` (Manrope + Instrument Serif).
- Shell: shared `UtilityBar`, `SiteHeader` (new `sticky` prop), `Dropdown` market selector, `Dialog` Quickorder, `SearchInput`, `SiteFooter`, `NewsletterForm`. Concept `Button` is a thin adapter over `ButtonLink`.
- Kept as concept pieces (token-migrated): `PrimaryNav` mega menu, `MobileMenu` drawer, `CategoryCard`, `QuotePromptCard`, `SectionHeader`, `PendingFact`, `Photo`, `HelpLauncher`.
- Deleted: concept `ProductCard`, `WishlistButton`, `Logo`, `ProductsSection` (already removed from the page), `concept-a/tokens.ts`.
- Navy bands reduced: the starter-combinations strip moved to `bg-surface-soft`.
- Validated: typecheck, lint, production build, detector 0, no horizontal overflow at 1920/1440/1024/768/390/320, interactions (mega menu, drawer, Quickorder, market selector, search, newsletter, help) exercised. Checkpoint: `.checkpoints/2026-11-17-pre-concept-a-migration/`.

### Concept B migration notes

- Root: `src/app/concept-b/layout.tsx` uses `.ds` and `dsFontVariables`; Newsreader and Hanken Grotesk are gone, so B's headings are Manrope (no serif H2s, no italic subtitle).
- Shell: shared `UtilityBar`, `SiteHeader`, `Dropdown`, `Dialog` Quickorder (adds a `pill` trigger, rendered as an outline button), `SearchInput`, `SiteFooter`, `NewsletterForm`. B's `Button` is an adapter over `ButtonLink` (`shop-light` → primary inverse).
- Design-system additions made for B: `SiteHeader` gained an optional `cta` slot (B's "Design your own" accent button, shown from lg); the icon set gained `pin`.
- Mapping: pills and cards → `rounded-md` / `rounded-lg`; B shadows → `shadow-sm/md/lg`; hero H1 → `text-h1` (Concept B; `text-display` wrapped the hero card to three lines); `b-display-2/3` → `h2/h3`.
- Deleted: B's `ProductCard`, `WishlistButton`, `Logo`, unused `ProductsSection`, `concept-b/tokens.ts`, the `b-` Tailwind namespace and `.conceptB` CSS.
- Validated: typecheck, lint, production build, detector 0 on both concepts, no horizontal overflow at 1920/1440/1024/768/390/320, interactions exercised. Checkpoint: `.checkpoints/2026-11-17-pre-concept-b-migration/`.
