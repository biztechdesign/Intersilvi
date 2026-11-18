# Component guidelines

**Where things live**
- Every component is in [`src/design-system/components/`](../src/design-system/components/) and is exported from `@/design-system`.
- Every component renders live in **`/design-system`**.
- Server components are the default. Files marked `"use client"` (`FormInteractive.tsx`, `Interactive.tsx`) hold only what needs browser state.

**Shared rules for every component**
- **Data in, presentation out.** Components never fetch, price, check stock or promise delivery. Map commerce or CMS data into props at the page edge (see `toCard()` in `src/app/design-system/page.tsx`).
- **Tokens only.** Use semantic utilities (`bg-surface-alt`, `text-fg-muted`, `rounded-md`). No raw hex, no Tailwind palette colours, and no arbitrary values unless they reference a token variable.
- **One component per job.** Extend variants; don't fork lookalikes.
- **Accessibility baseline:**
  - 44px minimum touch targets (`md` size and up).
  - Visible focus: a 2px `focus` outline with a 2px offset (yellow on navy).
  - Labels on every control.
  - Status is never shown by colour alone.
  - Under `prefers-reduced-motion`, movement is off and colour feedback stays.
- **Interaction timing:**
  - Hover changes colour or border over 160–220ms (`duration-fast` / `duration-base`, `ease-standard`). Filled and outlined buttons also lift 2px; text, disabled and loading buttons don't.
  - Arrows nudge 4px (`translate-x-nudge`). Images zoom to 1.03 (`scale-media`) over 400ms with `ease-emphasized`.
  - Dialogs fade and rise 8px over 220ms. Drawers slide 24px over 400ms. Dropdowns and accordion content settle 4px. The mega menu and tab panels fade.
  - Every transform is `motion-safe:`, and hover applies only to fine pointers. The full system is in `docs/MOTION.md`.

---

## Icons
All icons are Material Symbols Rounded, light (weight 300, outlined), rendered by `Icon`. See Iconography in [DESIGN.md](DESIGN.md). Components accept an icon by Material Symbols name through the typed `IconName`; do not pass SVG or another icon set.

## 1. Actions

### Button · `Button`, `ButtonLink`
- **Purpose:** trigger an action (`Button`) or navigate (`ButtonLink`, rendered as `<a>`).
- **Anatomy:** optional start icon (or spinner when loading), label, optional end icon. The end arrow nudges 2px on hover.
- **Variants:**

  | Variant | Look | When to use |
  |---|---|---|
  | `primary` | Navy | The default action |
  | `accent` | Yellow with navy text | At most one per view: the key commercial action ("Add to cart", "Design your own rosette", "Go to checkout") |
  | `secondary` | Soft blue | Supporting action |
  | `outline` | 1.5px navy inset border | Tertiary actions; actions on photographs |
  | `text` | Underlined link style | Inline actions |
  | `destructive` | Red | Removal |

  `inverse` adapts each variant for navy surfaces.
- **Sizes:**

  | Size | Height | Padding | Type |
  |---|---|---|---|
  | `sm` | 36px | 14px | `text-button-sm` |
  | `md` (default, the standard) | 44px | 20px | `text-button` |
  | `lg` | 48px | 24px | `text-button` (header search field only) |

- **Radius:** fully rounded, `rounded-button` (the pill value, 9999px, inside `.ds-pill`; 6px outside it). Applies to `Button`, `ButtonLink` and `IconButton`.
- **States:**
  - Hover: one step darker.
  - Active (primary): navy-700.
  - Focus: the standard ring.
  - Disabled: soft fill with `fg-disabled` text and `cursor-not-allowed`.
  - Loading: spinner replaces the start icon; `aria-busy`, `aria-disabled` and pointer events are blocked; width is kept.
- **Responsive:** labels wrap below 640px and stay on one line from 640px up. `block` makes the button full width (e.g. checkout on mobile).
- **Accessibility:** native `<button type="button">` by default. Link-buttons are real links. External links get an arrow icon and the screen-reader note "(opens in a new tab)".
- **Props:** `variant`, `size`, `inverse`, `iconStart`, `iconEnd`, `block`, `loading`, plus native button attributes. `ButtonLink` takes `href` and `external`.
- **Reuse:** every page.

### IconButton
- **Purpose:** icon-only action (close, zoom, menu, search submit).
- **Variants:**
  - `ghost`: no fill until hover.
  - `outline`: inset `line-input` border.
  - `primary`: navy fill.
- **Sizes:** `sm` 36px; `md` 44px (default and standard); `lg` 48px (header search only).
- **Accessibility:** `label` is required. It is used as both `aria-label` and `title`.

---

## 2. Form controls

All controls are native elements, inside `Field` (single control) or `Fieldset` (a group of choices).

### Field
- **Anatomy:** label (`text-label`), control, then help text (`text-body-sm` muted) *or* an error (`text-body-sm` in `status-error`, with an icon), 6px apart.
- **Optional fields** show "(optional)" after the label. Required is the default, so it isn't marked.
- **Accessibility:** the label is linked with `htmlFor` and `id`. The control sets `aria-describedby` with `describedBy(id, { error, help })` and `aria-invalid` when it has an error. Error text says what is wrong and how to fix it ("Enter an email address like name@club.se.").
- **Spacing:** fields stack 20px apart (`gap-5`); groups are 32px apart.

### TextInput · Textarea · Select · SearchInput
- **Size:** 44px tall (textarea at least 96px); 20px horizontal padding in the pill shape (14px otherwise); `text-body` (16px, which avoids iOS zoom on focus).
- **Colours:** `surface` background, 1px `line-input` border (3.9:1).
  - Hover: `fg-secondary` border.
  - Focus: `focus` border plus a 1px ring.
  - Error: `status-error` border plus a ring.
  - Disabled: `surface-alt` background, `line` border, `fg-disabled` text.
- **Radius:** fully rounded, `rounded-input` (the pill value inside `.ds-pill`; 4px outside it). Applies to `TextInput`, `Select`, `SearchInput` and the quantity and counted fields. `Textarea` stays at `rounded-lg` (10px) in the pill shape, because a multi-line field can't be a pill.
- **Select:** native, with a custom chevron.
- **SearchInput:** `surface-alt` at rest; 44 or 48px tall; the visible submit button is inside the field; the label is visually hidden. Wrap it in `<form role="search">`.
- **Props:** native attributes. `SearchInput` adds `id`, `label` and `size: "md" | "lg"`.

### Checkbox · Radio · Toggle
- **Box:** 20px with a 1.5px `line-input` border. When checked it fills with `selected` (navy) and shows a white check (checkbox) or a white inner ring (radio). The label is `text-body`; an optional description is `text-body-sm` muted. The whole label is clickable.
- **Toggle:** a `role="switch"` checkbox, 44×24px, for settings that take effect immediately. In forms that are submitted, use a checkbox instead.
- **Disabled:** 50% contrast and `cursor-not-allowed`. Keep the explanation in the description ("Not available for this model").

### Slider
- **Purpose:** approximate values (engraving text size, preview zoom). Always pair it with a visible value (`valueText`, which is also set as `aria-valuetext`).
- **Design:** 6px track in `surface-soft`, 20px navy thumb with a white border, 44px hit area.
- **Rule:** never the only way to enter a precise value.

### QuantityStepper
- **Anatomy:** − button, numeric input (tabular, bold), + button, in a bordered group. Buttons are 44px (`md`) or 36px (`sm`, for cart rows).
- **States:** − is disabled at `min` and + is disabled at `max`. The input stays typeable and clamps to `min`–`max`.
- **Accessibility:** the buttons are labelled "Decrease quantity" and "Increase quantity". The input has its own label (it can be hidden in dense rows).
- **Props:** `label`, `value` or `defaultValue`, `min`, `max`, `step`, `size`, `onChange`, `hideLabel`.

### FileUpload
- **Purpose:** choose a logo or artwork file. Processing and upload belong to the feature module that uses it.
- **Anatomy:**
  - Empty: a dashed drop zone with an upload icon, a "Choose a file" link and help text (accepted types and size).
  - Chosen: a file row with icon, name, size and a "Remove" action.
- **States:** focus shows the ring on the whole zone. A file over the size limit gives an inline error ("…is larger than 10 MB. Choose a smaller file.").
- **Accessibility:** a native `input type=file`, visually hidden and linked to the label and help text. The error is announced politely.

### CountedInput
- Single-line text with a live "N characters left" count, for engraving lines and ribbon text.
- The count turns `status-warning` when 5 or fewer characters are left.
- It is linked with `aria-describedby` and announced politely.

---

## 3. Navigation

### UtilityBar
- **Layout:** navy bar, 44px tall. Left: contact (phone). Right: utility links (from `lg`), Quickorder (underlined with a 2px yellow line) and the market selector.
- **Type and colour:** `text-label`, `fg-inverse-muted`, turning `fg-inverse` on hover.

### SiteHeader
- **Desktop:** logo, search (up to 640px wide), then actions (account, wishlist, cart with a count). The category row (`PrimaryNavRow`) sits below.
- **Below 1024px:** menu button, logo and actions on the first row; full-width search on the second row. The category row moves into a drawer (`Dialog variant="drawer"`).
- **Actions:**
  - Icons are 22px with 44px targets.
  - Visible labels appear from `xl`.
  - The cart count is a yellow badge with navy text, plus a screen-reader count.
- **`cta` (optional):** one journey action before the icon actions from `lg` (e.g. an accent `ButtonLink size="md"` for "Design your own"). Hidden below `lg`; put the same action in the drawer.
- **Logo:** official file. The current asset is a 189×81 raster; replace it with the vector logo.

### PrimaryNavRow · MegaMenuPanel
- **PrimaryNavRow:** `text-nav` links, 48px tall. A 2px navy underline grows on hover and stays for `aria-current="page"`.
- **MegaMenuPanel:**
  - Up to four link columns (`text-label` muted headings, `text-body` links, 40px rows) plus a feature slot (range title and a "View the full range" link).
  - White, `rounded-lg`, `shadow-md`, 32px padding.
- **Behaviour belongs to the header:**
  - Opens on click, or on hover after a 140ms intent delay for mouse users.
  - Escape and an outside click close it.

### Dropdown (market and language, sort)
- **Purpose:** immediate-effect choice from a small set.
- **Anatomy:** trigger (icon, current value, chevron) opens a list panel (`shadow-md`, `rounded-md`). Options are 44px rows; the selected one is bold with a check and `selected-surface` background.
- **Accessibility:** `aria-expanded` and `aria-controls` on the trigger; options are buttons with `aria-pressed`. Escape and an outside click close it.
- **Rule:** for values submitted with a form, use `Select`.

### Breadcrumbs · Pagination
- **Breadcrumbs:**
  - `text-body-sm`; muted, underlined ancestor links; the current page is bold with `aria-current="page"`; chevron separators.
  - Shown on every page below the homepage.
- **Pagination:**
  - 44px squares, the current page filled navy, previous and next arrows, ellipses for gaps.
  - Pages are real links (crawlable). Wrapped in `<nav aria-label="Pagination">`.

### SiteFooter
- **Layout:** navy. Brand (logo on a white tile, address), three link columns, contact, optional newsletter, then a legal line.
- **Columns:** 5 on desktop, 2 on tablet, 1 on phones. Links are 36px rows.

---

## 4. Commerce

### ProductCard
- **Purpose:** a product in grids, carousels and related products.
- **Anatomy:**
  - Square image stage on `surface-sunken`; the cutout is `object-contain` with 10% padding, so every product sits at a consistent scale.
  - Badges top-left; an action slot top-right (wishlist).
  - Eyebrow (range), name (`text-card-title`, 2 lines max), meta (verified detail), then pinned to the bottom: price, tier line and availability.
- **Container:** 1px `line` border, `rounded-md`, 16px padding.
- **States:**
  - Hover: `shadow-md`, stronger border, 3% image zoom.
  - Focus: a ring around the whole card.
  - Missing image: `ImagePlaceholder`.
- **Accessibility:**
  - The whole card is one link; the name is the link text.
  - The wishlist button sits above the link layer as a separate control.
  - Badges and availability are text.
- **Props:** `product: ProductCardData` (`name`, `href`, `image`, `eyebrow`, `meta`, `price`, `priceFrom`, `compareAt`, `tier`, `badges`, `availability`), `action`, `priority`, `sizes`.
- **Reuse:** listings, search, homepage selections, related products, the account wishlist.

### CategoryCard (standard / featured)
- **Anatomy:**
  - Photo fills the card.
  - A navy scrim covers the bottom three-quarters, fading out (80% → 35% → 0); white text on it measures at least 7:1.
  - Title (`text-h5` standard, `text-h3` featured), a description on the featured card only, and a round arrow that turns yellow on hover or focus.
  - Optional credit chip for provisional images.
- **Sizes:**
  - Standard is 4:3 on phones and fills its grid cell from 640px.
  - Featured is at least 352px tall (448px from `lg`) and spans two rows in the mosaic.
- **Accessibility:** one link; the photo is decorative (`alt=""`) because the title names the destination.

### Price · TierPricing
- **Price:**
  - Sizes: `sm` (body bold), `md` (`text-price`), `lg` (`text-price-lg`).
  - Options: "From" prefix; sale price (red) with the struck-through previous price, read as "Was …" by screen readers; optional VAT note.
- **TierPricing:**
  - A real `<table>` with a caption.
  - Ranges are derived from the tier minimums ("1–24", "25+").
  - The tier that matches `activeQuantity` is highlighted (`selected-surface`, bold, `aria-current`).
  - Pair it with `QuantityStepper` on the product page.

### Badge · StockStatus
- **Badge:** `text-caption` bold, `rounded-sm`, tinted background. Variants: `neutral`, `new`, `sale`, `custom`, `success`, `warning`, `error`, `info`. Maximum two per card.
- **StockStatus:** an 8px dot plus a word plus optional detail.
  - Statuses: In stock (green), Made to order (yellow), Few left (amber), Out of stock (grey).
  - The detail (e.g. a production time) comes from data and is never hardcoded.

### SpecList
- A definition list of label (muted) and value (bold), on a two-column subgrid with hairline rows. Empty values are skipped.
- Use on product pages and in configuration read-backs.

### ProductGallery
- A square main image on `surface-sunken`, with 64px thumbnail buttons below (`aria-current` marks the active one, plus a navy ring).
- Phones: the thumbnails scroll horizontally.
- Future: swipe and zoom. Zoom must stay keyboard-operable.

### Sorting, filters and active chips
- **Sort:** `Select` labelled "Sort by".
- **Filters:** a `Dialog` drawer at every width, containing `Fieldset`s of checkboxes, with a "Clear all" and "Show results" footer. Desktop listings may also show the same fieldsets in a left sidebar from `xl`.
- **ActiveFilters:** removable chips (`selected-surface`, pill, 36px) named "Remove filter: X", plus "Clear all".
- **Rule:** filter state lives in the URL, owned by the listing feature.

### CartItem · OrderSummary
- **CartItem:** a 96px image tile, name (link), configuration lines (muted), unit price, a quantity slot (`QuantityStepper sm`) and a remove slot, with the line total right-aligned (below the details on phones).
- **OrderSummary:**
  - `surface-alt` panel, `rounded-lg`, 24px padding.
  - Label and value lines, a bold total separated by a rule, an action slot (the accent "Go to checkout") and a footnote.
- **Rule:** totals, shipping and VAT come from the cart service.

---

## 5. Customization

The **rosette designer is a separate application**. The website only:
- presents options (swatches, combinations, steps);
- links into the flow (listing → model → designer) through `RosetteModelCta`.

No designer business logic belongs here. The **integrated trophy customizer** is its own feature module (e.g. `src/features/trophy-customizer/`). It composes the controls below and owns pricing, validation, preview rendering and add-to-cart.

### StepIndicator
- Numbered steps. Done: navy circle with a check. Current: yellow circle. To do: outlined circle.
- `aria-current="step"`; the steps wrap on narrow screens.

### SwatchGroup
- A native radio group of colour discs (44px, or 32px compact).
- Selected: a 2px navy ring with a 2px white gap. The name and finish show below each disc, or are announced only in compact mode. Focus uses an outline ring.
- Disabled swatches are 50% opacity, with a reason in nearby text.
- The colour is never the only identifier.

### OptionCardGroup
- Radio cards (at least 72px tall) for trophy sizes, base materials and model choices: title, verified detail and optional price text.
- Selected: navy border plus a ring, `selected-surface` background and a check.
- Columns: 1 on phones; 2, 3 or 4 from `sm`.

### SegmentedControl
- 2–4 exclusive views (Front / Side / Back): radio inputs styled as a pill track. The selected option is white with `shadow-xs`.

### Trophy text and logo
- `CountedInput` per engraving line, `FileUpload` for the logo, and `Slider` with a visible value for text size where the module allows it.

### Preview controls
- The preview sits on a white stage inside a filled panel, with a `SegmentedControl` for the view and outline `IconButton`s (zoom out, zoom in, reset).
- **Mobile:** the preview stays above the options. Controls stay at least 36px and in thumb reach under the preview.

### ConfigurationSummary
- A read-back of each choice with an "Edit" link per line (the link names the field for screen readers), then the add-to-cart action.

### RosetteModelCta
- Soft-blue panel: H2, body, numbered steps (two columns from `sm`) and the accent "Choose a rosette model" button, which always goes to model selection. An optional media slot holds real product cutouts.

---

## 6. Shared UI

| Component | Spec |
|---|---|
| `Section` | Container plus spacing density (`sm`, `md`, `lg`) plus tone (`default`, `alt`, `soft`, `inverse`). At most one `inverse` band per page. |
| `SectionHeading` | H2 (or H1/H3) at max 22ch, optional lead (58ch) and right-aligned action; 32→48px to the content. `editorial` switches to the serif; use it once per page. |
| `Panel` | `bordered` (default), `filled` (soft blue), `elevated` (`shadow-md`). Padding 16, 24 or 32px; `rounded-lg`. |
| `Accordion` | Native `<details>`. 56px summary rows (`text-h6`), chevron rotates; `exclusive` keeps one item open. Works without JavaScript. |
| `Tabs` | WAI-ARIA tabs: arrow keys, Home and End; only the active tab is in the tab order. 2px navy indicator; scrolls horizontally on phones. |
| `Dialog` | Native `<dialog>`: focus trap, Escape closes, focus returns to the trigger. `modal` is centred (max 576px) and a bottom sheet on phones. `drawer` comes from the right (416px wide) and is full width on phones. Title, optional description, scrollable body, footer actions. |
| `Tooltip` | Short supplementary text on hover or focus, linked with `aria-describedby`. Never essential information. |
| `Alert` | Info, success, warning or error: tinted surface, icon, title, body, optional action. Errors use `role="alert"`; others use `role="status"`. |
| `useToast` | Transient navy toast (cart feedback), announced politely, auto-dismisses after 5s, dismissible. Never the only record of an error. |
| `Spinner` · `Skeleton` | Spinner: 16, 24 or 40px with `role="status"`. Skeleton: a soft pulse in the shape of the real content; the pulse stops under reduced motion. Use skeletons for listings, spinners inside buttons. |
| `StateMessage` | Empty or error state: icon, title, body, one action. It always says what happened and what to do next. |
| `HelpPanel` | Filled panel with data-driven channels (phone, email, chat when confirmed); 44px rows. |
| `NewsletterForm` | Labelled email field, Subscribe button with a loading state, inline validation; `onSubmit` comes from the marketing integration. |
| `PromoBanner` | One message and one action. `soft` (default) or `accent` (yellow). Maximum one per view. |

---

## 7. Page coverage

| Page | Built from |
|---|---|
| Homepage | Section, SectionHeading, CategoryCard mosaic, ProductCard row, RosetteModelCta, PromoBanner, HelpPanel |
| Category and listing | Breadcrumbs, H1, filter Dialog, ActiveFilters, sort Select, ProductCard grid, Pagination, StateMessage (no results), Skeleton |
| Search | SearchInput (lg), result count, the listing components, StateMessage |
| Product detail | Breadcrumbs, ProductGallery, H1, Price (lg), TierPricing + QuantityStepper, StockStatus, SwatchGroup or OptionCardGroup, accent add-to-cart, Tabs or Accordion (description, specs via SpecList, delivery), related ProductCards |
| Rosette model selection | Listing components filtered to design models; each model page → RosetteModelCta → designer |
| Trophy customizer | StepIndicator, OptionCardGroup, CountedInput, FileUpload, preview controls, ConfigurationSummary, Alert |
| Cart and checkout | CartItem, OrderSummary, Field controls, Alert, Dialog (address book), Button loading |
| Account and Quickorder | Tabs, Panel, Field controls, Dialog (Quickorder), ProductCard (wishlist) |
| Editorial and information | SectionHeading (`editorial` once), `max-w-reading` body, Accordion (FAQ), HelpPanel |
| Global | UtilityBar, SiteHeader, PrimaryNavRow, MegaMenuPanel, drawer menu, SiteFooter, toast |

---

## Validation

Run on 2026-11-17 against `/design-system` and the repository.

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, 0 warnings |
| `npm run build` | Pass. `/design-system` is static (10.4 kB page JS); `/concept-a` and `/concept-b` still build |
| Impeccable `detect` on `src/design-system` and `src/app/design-system` | 0 findings (one off-scale badge size fixed) |
| Contrast | Every text role passes AA on its documented surfaces (table in DESIGN-TOKENS.md, recomputed live on `/design-system`) |
| Horizontal overflow at 1920, 1440, 1024, 768, 390, 320 | None (scrollWidth = clientWidth). Three narrow-width fixes applied (see RESPONSIVE-GUIDELINES.md) |
| Concept regression | `/concept-a` and `/concept-b` render with no overflow at 1440 and 390; neither concept's files were edited |

**Not tested yet:**
- Screen readers (NVDA, VoiceOver).
- Safari and Firefox.
- Real touch devices.
- Windows high-contrast mode.
- 200% zoom.
- The trophy customizer and rosette-designer integrations, which don't exist yet.
