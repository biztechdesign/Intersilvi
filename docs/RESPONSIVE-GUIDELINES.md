# Responsive guidelines

The design direction is reviewed on desktop first. Every component and pattern below is specified and built for every width. The widths we validate are 1920, 1440, 1024, 768, 390 and 320px.

## Breakpoints

| Name | Min width | Typical device |
|---|---|---|
| base | 0 | Phones (320–639) |
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), laptops: the desktop layout starts here |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Wide desktops (content stays at 1320px) |

## Container and grid

- **Container:** `.ds-container` is centred with a 1320px maximum width and 16 → 40px gutters. Every section aligns to it, so left edges line up down the page.
- **Columns:** 4 on phones, 6 on tablets, 12 from `lg`. Gaps are 16px on phones and 20–24px from `lg`.
- **Full-bleed:** only hero imagery and the single dark editorial band span the viewport. Their content still aligns to the container.
- **At 1920px:** content stays at 1320px. Don't stretch grids; let the margins grow.

## Patterns

| Pattern | Phone | Tablet | Desktop (≥ 1024) |
|---|---|---|---|
| Product grid | 2 columns | 3 columns | 4 columns (5 on wide listings from `2xl`) |
| Category mosaic | 1 column | 2 columns | Featured card plus a 2×2 grid |
| Image + text split | Stacked, image first | Stacked | 50/50 or 7/5 |
| Section heading + action | Stacked, action below | Same | Heading left, action right |
| Header | Menu, logo, actions; search on its own row | Same | Logo, search, actions; category row below |
| Mega menu | Drawer with expandable groups | Drawer | Panel under the header |
| Filters | Drawer | Drawer | Drawer, or sidebar from `xl` |
| Product detail | Gallery, then info, then tabs as an accordion | Same | Gallery 7 / info 5 |
| Cart | Items, then summary | Same | Items 8 / summary 4, summary sticky |
| Trophy customizer | Preview on top, options below, sticky add-to-cart bar | Same | Preview 7 (sticky) / options 5 |
| Footer | 1 column | 2 columns | 5 columns |
| Dialog | Bottom sheet, full width | Centred | Centred, max 576px |

## Rules

- **Headings** scale fluidly through tokens. Don't add breakpoint font sizes in components. If a heading wraps to more than three lines on a phone, shorten the copy.
- **Touch targets** are at least 44×44px for buttons, links in lists, steppers, swatches, chips and icon buttons. Dense secondary controls (`sm` buttons, pagination ellipses) are never the only way to do something.
- **Never truncate critical information:** prices, availability, award terms, quantities, errors. Product names may clamp to two lines; the full name is on the detail page.
- **No horizontal page overflow.**
  - Tables and tab lists scroll inside their own container (`overflow-x-auto`) with a minimum width.
  - Grid tracks use `minmax(0, 1fr)`, and flex children that can shrink use `min-w-0`.
- **Images** declare responsive `sizes` and keep their aspect ratio boxes, so nothing jumps while loading.
- **Thumb reach:** on phones, the primary action of a flow (add to cart, show results, continue) sits in a sticky bottom bar or directly after the content it acts on.
- **Hover** never hides essential content: everything shown on hover is also available on focus and tap.
- **Orientation and zoom:** layouts reflow at 200% browser zoom (equivalent to 640px), and there is no fixed-height text container.

## Validation (2026-11-17, `/design-system`)

Measured with headless Edge at device scale 1 by comparing scrollWidth with clientWidth:

| Width | Result |
|---|---|
| 1920 / 1440 / 1024 | No overflow |
| 768 / 390 / 320 | No overflow, after a fix: the section navigation now scrolls inside its own track (`grid-cols-[minmax(0,1fr)]`, `min-w-0`) |

Two more fixes from this review:
- Long button labels wrap below 640px instead of overflowing.
- The model-selection panel uses 24px padding on phones.

**Not yet validated:**
- Real devices.
- iOS Safari's dynamic toolbar with bottom sheets.
- Landscape phones.
