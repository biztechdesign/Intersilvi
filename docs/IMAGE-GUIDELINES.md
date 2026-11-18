# Image and art direction guidelines

Product photography is the visual focus of every commerce component. Chrome stays quiet so the rosettes, trophies and medals carry the colour.

## Sources and rights

| Source | Status | Where it's registered |
|---|---|---|
| intersilvi.com media (product cutouts, homepage banners, logo) | Used with the client's permission. Currently hot-linked: **copy into the CMS or DAM before launch** | `src/content/media.ts`, `src/lib/commerce/mock/showcase.ts` |
| Unsplash (Unsplash License) | **Provisional**: equestrian event, ribbon macro, ribbon shelves. Each shows a visible credit and has a `replaceWith` brief | `src/content/media.ts` |
| SVG illustrations (concept prototypes) | Concept art only; not part of the design system | `src/components/art/` |

**Rules**
- Never use an image whose rights aren't recorded in the register.
- Never present stock imagery as Intersilvi's workshop, staff or customers.
- Every provisional image carries a "Provisional photo" credit until it's replaced.

## Categories

| Category | Treatment | Ratio | Background | Notes |
|---|---|---|---|---|
| **Award rosettes** (catalogue) | Transparent cutout, full rosette including tails, front view, shot square-on | Square card stage (1:1); 4:5 allowed on detail pages | `surface-sunken` (#F3F6FA), never pure white on white | Tails always fully visible; consistent top margin so rings line up across a grid |
| **Trophies and medals** | Cutout, front view, slight top light, base included | 1:1 stage | `surface-sunken` | Medals with their ribbon when sold together |
| **Product catalogue (general)** | One product per image; no props; no text in the image | 1:1 (cards), 4:5 (detail) | Same stage | Additional angles in the gallery: back, detail of print or engraving, scale reference |
| **Event and lifestyle** | Real competitions with Intersilvi awards in use: horse wearing a rosette, presentation moment, dog show podium | 4:3 standard, 16:10 or 21:9 hero | Natural | Subject in the top or middle two-thirds, leaving room for the scrim and title at the bottom |
| **Craftsmanship** | Documentary: hands pleating ribbon, printing, the Osby workshop. Real people, real light | 4:5 or 3:2 | Natural | Never staged with stock; caption who and where |
| **Ribbon textures and colour charts** | Macro of real ribbon showing finish (satin sheen, grosgrain rib, metallic) | 3:2 (macro), 1:1 (swatch photos) | Neutral | On screen, swatches are flat colour with a name; the colour chart PDF is the reference for true colour |
| **Editorial hero** | One strong subject, generous negative space, real brand moment | 16:10 desktop, 4:3 phone | Natural | Text sits beside the image or on a solid panel, not on a busy area |

## Cropping and positioning

- **Cutouts:** `object-contain` with 8–10% padding inside the stage, so every product sits at the same visual scale. Never crop a product cutout.
- **Photos:** `object-cover`, with a per-image `position` (`objectPosition`) stored in the content model next to the asset, e.g. `"50% 60%"`, so crops stay deliberate at every ratio.
- **Same component, same ratio.** Don't mix ratios within one grid row.
- **No geometric masks:** no circles, blobs or polygons around subjects.

## Overlays and captions

- **Scrim for text on photos:** a bottom gradient of `overlay` (navy) from 80% through 35% to 0%, covering the bottom 50–75% of the image. White text on it measures at least 7:1. Never place text over the subject's face or the product.
- **No full-image tints, no colour washes, no gradient text.**
- **Captions:**
  - `text-caption` in `fg-muted`, placed directly below the image.
  - Provisional credits are a white chip at top-left ("Provisional photo · Name / Unsplash").

## Quality and resolution

| Use | Delivered width (minimum) | Format |
|---|---|---|
| Hero and full-bleed | 2400px | AVIF or WebP with JPEG fallback (through the image CDN) |
| Category card | 1600px | Same |
| Product cutout | 1600px on the long edge, transparent | PNG source → WebP or AVIF with alpha |
| Thumbnails | Generated | |

- Every `next/image` declares `sizes` matching the layout (see the components).
- Use `priority` only for the first viewport's largest image (LCP).
- Lazy-load everything else.
- **Logo:** supply SVG. The current 189×81 raster is soft on high-density screens.

## Placeholder and missing images

- **Missing product image:** `ImagePlaceholder`, a `surface-sunken` well with an image icon and an accessible label ("<name>: image not available"). Never show a broken image.
- **Loading:** a `Skeleton` with the image's ratio.
- **Provisional imagery:** a visible credit, plus an entry in the register with `replaceWith`.

## Alt text

- **Products:** describe the product as a buyer would ("Red Best in Show rosette with printed tail").
- **Category cards:** the photo is decorative (`alt=""`) because the card title names the link.
- **Editorial photos:** describe what is shown; don't repeat the caption.
- **Text:** never put essential text inside an image.

## Missing assets (to request)

1. Vector logo and confirmed brand colour values.
2. Studio cutouts at 1600px or more for the full range. Some current cutouts are 900px.
3. Event photography with Intersilvi awards in use: equestrian, dog show and ceremony.
4. Documentary photography of the Osby workshop.
5. Ribbon macro photography per finish.
