# Typography

## Faces

| Face | Role | Weights | Loading |
|---|---|---|---|
| **Manrope** | Everything functional: navigation, headings, product cards, forms, buttons, body, prices | 400, 500, 600, 700, 800 | `next/font/google`, self-hosted at build, `display: swap`, latin + latin-ext (å ä ö æ ø) |
| **Instrument Serif** | Optional editorial statement: one hero or brand-story heading per page, at most | 400 (and italic) | Same |

**Why Manrope.** It's a geometric-grotesque hybrid with open apertures and clear numerals, and it reads well at 13–16px in dense commerce UI. It gets more confident at bold display sizes, which suits a premium tone without decoration. Its tabular figures keep prices and quantities aligned.

**Why the serif is rationed.** An editorial serif signals story, not structure. Used on every heading, it flattens the hierarchy and starts to look generic; once per page, it marks the brand moment. Never use it for UI, prices, navigation, forms or product names.

The route that uses the system loads the faces (see `src/app/design-system/layout.tsx`) and puts the `.ds` class on its root. `.ds` sets Manrope, the base size and the colour.

## Scale

Sizes are fluid between a phone minimum and a desktop maximum. Desktop values are at 1440px and above.

| Token | Phone → desktop | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `text-stat` | 48 → 80px | 0.9 | 800 | −0.04em | One headline number, e.g. a lead time (with `ds-numeric`) |
| `text-serif-display` | 44 → 64px | 1.04 | 400 | −0.01em | One editorial statement |
| `text-display` | 36 → 56px | 1.1 | 800 | −0.025em | Hero headline |
| `text-h1` | 32 → 44px | 1.15 | 800 | −0.025em | Page title (category, product, article) and the homepage hero headline |
| `text-h2` | 28 → 36px | 1.2 | 800 | −0.025em | Section title (extra bold, so it carries the page) |
| `text-h3` | 22 → 26px | 1.25 | 700 | −0.012em | Sub-section, featured card |
| `text-h4` | 20px | 1.3 | 700 | −0.01em | Panel and dialog titles |
| `text-h5` | 18px | 1.35 | 700 | −0.005em | Group titles, summary titles |
| `text-h6` | 16px | 1.4 | 700 | 0 | List and accordion titles |
| `text-card-title` | 16 → 20px | 1.3 | 700 | −0.01em | Product and category names |
| `text-lead` | 17 → 20px | 1.5 | 400 | 0 | Intro under a heading |
| `text-body-lg` | 18px | 1.6 | 400 | 0 | Long-form articles |
| `text-body` | 16px | 1.6 | 400 | 0 | Running text |
| `text-body-sm` | 14px | 1.5 | 400 | 0 | Secondary copy, tables, help text |
| `text-label` | 13px | 1.35 | 600 | +0.01em | Form labels, column headings |
| `text-caption` | 12px | 1.4 | 400 | +0.01em | Metadata, image captions, credits |
| `text-nav` | 15px | 1.4 | 600 | 0 | Header, tabs, menus |
| `text-button` / `text-button-sm` | 15 / 13px | 1.2 | 700 | +0.005em | Button labels |
| `text-price` | 18px | 1.2 | 800 | −0.01em | Card prices |
| `text-price-lg` | 24 → 30px | 1.15 | 800 | −0.015em | Product-detail price |

The scale was reduced from both concepts on purpose:
- Section titles are now 36px, down from 60–68px.
- The hero is now 56px, down from 80–88px.
- Hierarchy comes from weight, spacing and position, not raw size.

## Rules

- **One H1 per page.** Section titles are H2. Card titles are H3 inside a section.
- **Heading widths.** Use `max-w-heading` (22ch) for H1 and H2, and `max-w-heading-wide` (32ch) for hero headlines that need it. Headings wrap with `text-wrap: balance` (set on `.ds`). Never force a narrow column that breaks a heading word by word; if a heading wraps to more than three lines on desktop, shorten the copy.
- **Measures.** Body text is capped at 68ch (`max-w-body`) and leads at 58ch. Article pages use `max-w-reading` (720px).
- **Paragraphs** use `text-wrap: pretty` to avoid orphans.
- **Case.** Use sentence case everywhere, with one exception: the section eyebrow (below).
- **Heading weight.** `display`, `h1` and `h2` are all extra bold (800), so the hero headline is never lighter than the section titles under it. `h3` and below stay 700.
- **Eyebrow (homepage section label).** One short label above a homepage section's H2, rendered by the `Eyebrow` component: `text-label` (13px), bold, uppercase, 0.12em tracking, `fg-link` on light surfaces and `brand-yellow` on navy, 12px above the heading. Maximum three words. Use it only above section H2s on the homepage; never above the hero H1, a page title, a card title or a dialog title, and never more than one per section.
- **Links.** In running text, links use `text-fg-link`, a 1px underline at a 0.2em offset, and a darker underline on hover. Standalone navigation links have no underline at rest and gain one on hover. External links get an arrow icon and a screen-reader note.
- **Numbers.** Use `ds-numeric` (tabular, lining figures) for prices, quantities, article numbers, dates and table columns. Money is always formatted by `formatMoney` from data, never typed into components.
- **Prices.** Show the price, then optionally "From" in `text-body-sm` before it. A sale price is red with the previous price struck through, and the screen reader reads "Was …". Show the VAT note once per section rather than per card where possible.
- **Promotional text** uses `PromoBanner` (H4 plus body-sm). Never shout with size or capitals.
- **Responsiveness.** All heading tokens are fluid; don't add breakpoint-specific font sizes in components.
- **Language.** Swedish, Norwegian and Finnish award terms (BIS, BIR, Certifikat) appear as written. The `latin-ext` subset covers å, ä, ö, æ and ø. Test German and Finnish strings for length: they run 20–35% longer than English.
