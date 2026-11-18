# Design tokens

Single source of truth: [`src/design-system/tokens.ts`](../src/design-system/tokens.ts).

- `tailwind.config.ts` turns every token into Tailwind utilities, using Tailwind v3 conventions (`theme.extend` and a plugin).
- The same plugin emits every colour, spacing, radius and motion token as a CSS custom property on `:root` (`--ds-*`). Plain CSS, embeds and the rosette designer can read the same values.
- Colours are written as `rgb(var(--ds-color-x) / <alpha-value>)`, so opacity modifiers work: `bg-overlay/60`, `text-fg/80`.

Concept A (`a-*`) and Concept B (`b-*`) keep their own namespaced tokens until they are migrated (see the appendix in [DESIGN.md](DESIGN.md)).

## Icons
Material Symbols Rounded, weight 300, fill 0, grade 0, optical size 24 (`.ds-icon` in `globals.css`). Fill is driven by `--ds-icon-fill`.

## Colour

### Primitives (do not use directly)

| Token | Hex | Note |
|---|---|---|
| navy.950 | #0B1D40 | Provisional brand navy |
| navy.800 | #14295A | Hover on navy |
| navy.700 | #1E3A78 | Links, focus, active |
| navy.600 | #2D4C8F | |
| navy.100 | #E9EEF5 | Provisional soft blue surface |
| navy.50 | #F3F6FA | Product stage |
| yellow.500 | #F4BE24 | Provisional brand yellow |
| yellow.600 | #E0A800 | Hover on yellow |
| yellow.100 | #FDF3D7 | Custom-design badge |
| neutral.0 / 25 | #FFFFFF / #F7F8FA | White / off-white |
| neutral.200 / 300 | #D6DDE7 / #A7B1C2 | Dividers |
| neutral.400 / 500 | #8B95A8 / #76829A | Disabled / input border |
| neutral.600 / 700 | #56627A / #34425A | Muted / secondary text |
| green.700 / 50 | #1F7A4D / #E6F4EC | Success |
| amber.800 / 50 | #8A5A00 / #FDF3D7 | Warning |
| red.700 / 800 / 50 | #B42318 / #912018 / #FDECEA | Error, destructive |
| blue.700 / 50 | #1D5FA8 / #E8F1FB | Information |

The brand values are provisional, taken from the brief. Replace them with values from the official logo or brand guide; the semantic roles below don't change.

### Semantic roles (use these)

| Utility (bg-/text-/border-) | CSS variable | Value | Use |
|---|---|---|---|
| `brand-navy` | `--ds-color-brand-navy` | #0B1D40 | Logo-level brand moments |
| `brand-yellow` | `--ds-color-brand-yellow` | #F4BE24 | Small markers, selection highlight |
| `surface` | `--ds-color-surface` | #FFFFFF | Page, cards |
| `surface-alt` | `--ds-color-surface-alt` | #F7F8FA | Alternate sections, summaries |
| `surface-soft` | `--ds-color-surface-soft` | #E9EEF5 | Quiet bands, filled panels |
| `surface-sunken` | `--ds-color-surface-sunken` | #F3F6FA | Product-photo stage, image placeholders |
| `surface-inverse` | `--ds-color-surface-inverse` | #0B1D40 | Footer, one editorial band |
| `surface-inverse-raised` | `--ds-color-surface-inverse-raised` | #14295A | Cards and hover on navy |
| `fg` | `--ds-color-fg` | #0B1D40 | Headings, body |
| `fg-secondary` | `--ds-color-fg-secondary` | #34425A | Supporting copy, leads |
| `fg-muted` | `--ds-color-fg-muted` | #56627A | Metadata, captions, help text |
| `fg-disabled` | `--ds-color-fg-disabled` | #8B95A8 | Disabled labels only |
| `fg-link` | `--ds-color-fg-link` | #1E3A78 | Inline links |
| `fg-inverse` | `--ds-color-fg-inverse` | #FFFFFF | Text on navy or photo scrims |
| `fg-inverse-muted` | `--ds-color-fg-inverse-muted` | #B7C2D8 | Secondary text on navy |
| `fg-on-accent` | `--ds-color-fg-on-accent` | #0B1D40 | Text on yellow |
| `line` | `--ds-color-line` | #D6DDE7 | Dividers, card borders (decorative) |
| `line-strong` | `--ds-color-line-strong` | #A7B1C2 | Emphasised dividers (decorative) |
| `line-input` | `--ds-color-line-input` | #76829A | Form-control borders (≥ 3:1) |
| `line-inverse` | `--ds-color-line-inverse` | #2E4170 | Dividers on navy |
| `action-primary` (+`-hover`, `-active`) | `--ds-color-action-primary` | #0B1D40 / #14295A / #1E3A78 | Default action |
| `action-accent` (+`-hover`) | `--ds-color-action-accent` | #F4BE24 / #E0A800 | One key commercial action per view |
| `action-secondary` (+`-hover`) | `--ds-color-action-secondary` | #E9EEF5 / #DCE3EE | Supporting action |
| `action-destructive` (+`-hover`) | `--ds-color-action-destructive` | #B42318 / #912018 | Remove, delete |
| `focus` / `focus-inverse` | `--ds-color-focus` | #1E3A78 / #F4BE24 | Focus outline (light / navy grounds) |
| `selected` / `selected-surface` | `--ds-color-selected` | #0B1D40 / #E9EEF5 | Checked controls, active chips and rows |
| `status-success` / `-surface` | | #1F7A4D / #E6F4EC | Confirmations, in stock |
| `status-warning` / `-surface` | | #8A5A00 / #FDF3D7 | Attention, deadlines |
| `status-error` / `-surface` | | #B42318 / #FDECEA | Errors, validation |
| `status-info` / `-surface` | | #1D5FA8 / #E8F1FB | Neutral information |
| `badge-new-surface` / `badge-sale-surface` / `badge-custom-surface` | | #E9EEF5 / #FDECEA / #FDF3D7 | Product badges |
| `overlay` | `--ds-color-overlay` | #0B1D40 | Scrims and backdrops, always with opacity (`/35`, `/55`, `/80`) |

### Contrast (measured, WCAG 2.2)

| Pair | Ratio | Result |
|---|---|---|
| fg on surface / surface-alt / surface-soft | 16.6 / 15.6 / 14.3 | AAA |
| fg-secondary on surface / surface-alt / surface-soft | 10.1 / 9.5 / 8.7 | AAA |
| fg-muted on surface / surface-alt / surface-soft | 6.1 / 5.8 / 5.3 | AA |
| fg-link on surface / surface-alt | 10.9 / 10.2 | AAA |
| fg-inverse on surface-inverse | 16.6 | AAA |
| fg-inverse-muted on surface-inverse | 9.3 | AAA |
| fg-on-accent (navy) on action-accent (yellow) | 9.7 | AAA |
| navy on yellow-hover (#E0A800) | 7.7 | AAA |
| status-success / warning / error / info on their surfaces | 4.7 / 5.4 / 5.8 / 5.7 | AA |
| line-input on surface / surface-alt (non-text) | 3.9 / 3.6 | Meets 1.4.11 (3:1) |
| fg-disabled on surface | 3.0 | Disabled text is exempt; never used for active content |
| **brand-yellow on white** | **1.7** | **Fail: never use yellow as text on light grounds** |
| line / line-strong on white | 1.3 / 2.2 | Decorative only; never the only boundary of a control |

`/design-system` recomputes this table from the live tokens on every render. One adjustment was made to the provisional values: the input-border colour was darkened to #76829A to meet 3:1.

## Typography tokens

See [TYPOGRAPHY.md](TYPOGRAPHY.md). The utilities are `text-display`, `text-stat`, `text-serif-display`, `text-h1` to `text-h6`, `text-card-title`, `text-lead`, `text-body-lg`, `text-body`, `text-body-sm`, `text-label`, `text-caption`, `text-nav`, `text-button`, `text-button-sm`, `text-price` and `text-price-lg`. Each sets size, line height, letter spacing and weight together.

Font families are `font-sans` (Manrope, through `--font-manrope`) and `font-serif` (Instrument Serif, through `--font-instrument-serif`).

Measures are `max-w-heading` (22ch), `max-w-heading-wide` (32ch), `max-w-body` (68ch), `max-w-lead` (58ch), `max-w-narrow` (44ch) and `max-w-reading` (720px).

## Spacing

| Step | px | Tailwind | Typical use |
|---|---|---|---|
| 4 | 4 | `1` | Icon-to-label nudge |
| 8 | 8 | `2` | Gaps inside chips, tight stacks |
| 12 | 12 | `3` | Card text stacks |
| 16 | 16 | `4` | Grid gaps (phone), card padding (sm) |
| 20 | 20 | `5` | Button padding (md), form groups |
| 24 | 24 | `6` | Card padding, grid gaps (desktop) |
| 32 | 32 | `8` | Heading to content, panel padding (lg) |
| 40 | 40 | `10` | Group separation |
| 48 | 48 | `12` | Heading to content (desktop) |
| 64 | 64 | `16` | Minimum section padding |
| 80 | 80 | `20` | |
| 96 | 96 | `24` | Standard section padding (desktop) |
| 120 | 120 | `30` | Editorial and hero sections |

Semantic spacing:

| Token | Value | Use |
|---|---|---|
| `px-gutter` | 16 → 40px | Page side padding (inside `.ds-container`) |
| `py-section-sm` | 48 → 64px | Dense bands: delivery strip, promo, footer |
| `py-section` | 64 → 96px | Most sections |
| `py-section-lg` | 80 → 120px | Hero, editorial story |
| `p-card-sm` / `p-card` / `p-card-lg` | 16 / 24 / 32px | Card and panel padding |

## Layout

| Token | Value |
|---|---|
| `max-w-content` | 1320px (page container) |
| `.ds-container` | `max-w-content` + `px-gutter` + centred |
| Breakpoints | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 (Tailwind defaults) |

## Radius, elevation, motion, layers

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 4px | Chips, badges |
| `rounded-md` | 6px | Product and category cards |
| `rounded-lg` | 10px | Panels, dialogs, featured media, multi-line text areas |
| `rounded-pill` | 9999px | Buttons and single-line inputs (fully rounded) |
| `rounded-button` · `rounded-input` | `--ds-radius-button` · `--ds-radius-input` | What buttons and inputs actually use. Pill inside `.ds-pill`; 6px and 4px outside it |
| `shadow-xs` | 1px soft | Chips and floating buttons on photos |
| `shadow-sm` | Small lift | Rare |
| `shadow-md` | Medium | Card hover, dropdowns, mega menu |
| `shadow-lg` | Large | Dialogs, drawers, toasts |
| `duration-fast` / `-base` / `-slow` | 160 / 220 / 400ms | Hover and colour / state change / drawers, image zoom, underlines |
| `--ds-duration-entrance` · `--ds-stagger` | 560ms · 80ms | Hero entrance and section reveals |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) | Interactions (default) |
| `ease-emphasized` | cubic-bezier(0.16, 1, 0.3, 1) | Entrances, arrows, image zoom |
| `ease-exit` | cubic-bezier(0.4, 0, 1, 1) | Exits |
| `-translate-y-lift` · `translate-x-nudge` · `--ds-distance-rise` | 2px · 4px · 10px | Button lift, arrow nudge, entrance rise |
| `scale-media` | 1.03 | Card and editorial image zoom |
| `z-dropdown` / `z-sticky` / `z-overlay` / `z-modal` / `z-toast` | 30 / 40 / 50 / 60 / 70 | Stacking order |
