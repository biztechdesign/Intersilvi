# Motion

One motion system for both homepage concepts and every shared component. It's clearly visible, but controlled: the hero arrives in a staggered sequence, each section reveals once as it scrolls into view, and interactions confirm themselves.

The source of truth is `src/design-system/tokens.ts` → `motion`. `tailwind.config.ts` turns it into utilities and `--ds-*` CSS variables. `src/app/globals.css` holds the hero entrance, the reveal styles and the parallax. `src/design-system/components/Motion.tsx` holds `RevealObserver`, and `Reveal.tsx` holds the `RevealOnScroll` and `StaggerContainer` primitives. You can see it live at `/design-system#motion`.

## What was wrong before (audit, 2026-11-18)

| Finding | Evidence | Fix |
|---|---|---|
| Only section headings (and two editorial groups) were covered by a reveal. Paragraphs, buttons, cards and list items never animated | Per-section count on both routes: for example Delivery 0 of 6 paragraphs and 0 of 2 buttons, Design 1 of 9 paragraphs | Groups reveal together with a stagger: heading, paragraph, action; card rows; list items |
| The motion was too small to see | 10px rise, 2px blur, 80ms steps. The hero was done by about 300ms | 22px (hero) and 24px (sections), 700ms and 650ms, 120ms and 100ms steps |
| The easing front-loaded the movement | Exponential ease-out had spent 83% of the opacity and 83% of the travel by a quarter of the way in, so the rise read as a flicker | A soft cubic ease-out (`ease-enter`): the heading is at 54% at 150ms and 95% at 450ms |
| Reveals depended on `transition` | A reveal transition on the element's own `transition` property would fight any `transition-*` utility on the same element | Reveals are one-shot keyframe animations (with no end state), so they never depend on, or override, an element's own transitions or hover transforms |
| A section scrolled past in one jump could stay hidden | The observer only fired on `isIntersecting` | A target that reports a rect above the viewport is also revealed |
| The hero entrance, parallax and reveals could have competed for `transform` | The craft parallax sits on its own layer, separate from the reveal wrapper | Kept separate. Reveals are on the text group only |

What was already right and is kept: the hero runs from first paint (it starts about 15ms before first contentful paint, so it's seen), content is visible without JavaScript, each element reveals once, and the observer re-measures after client-side navigation.

## Thesis

- **Arrival:** the hero heading lands first, then the intro, the actions and the facts, each 120ms after the one before. Each rises 22px and fades over 700ms.
- **Reveal:** as a group scrolls into view, its heading, paragraph and action (or its cards) rise 24px and fade over 650ms, 100ms apart. Photographs only fade.
- **Feedback:**
  - Buttons lift 3px.
  - Arrows nudge 4px.
  - Card photos zoom to 1.04.
  - Text links thicken their underline.
  - Navigation underlines grow from the left.
- **Continuity:** menus, dropdowns, accordions, tabs, dialogs and drawers ease in from the same tokens.

## Tokens

| Token | Value | Tailwind | Use |
|---|---|---|---|
| fast | 160ms | `duration-fast` | Hover colour, pressed state, toggles, form focus |
| base | 220ms | `duration-base` (also the default `transition`) | Buttons, tabs, menus, swatches, arrows |
| slow | 400ms | `duration-slow` | Drawers, image zoom, nav underlines |
| entrance | 700ms | `--ds-duration-entrance` | Hero arrival, per item |
| reveal | 650ms | `--ds-duration-reveal` | Scroll reveals, per item |
| stagger | 120ms | `--ds-stagger` | Between hero items (five steps, 480ms in total) |
| staggerReveal | 100ms | `--ds-stagger-reveal` | Between items revealed together (capped at eight steps) |
| standard | cubic-bezier(0.2, 0, 0, 1) | `ease-standard` (the default) | Interactions |
| enter | cubic-bezier(0.215, 0.61, 0.355, 1) | `ease-enter` | Hero arrival and scroll reveals |
| emphasized | cubic-bezier(0.16, 1, 0.3, 1) | `ease-emphasized` | Arrows, image zoom, menus |
| exit | cubic-bezier(0.4, 0, 1, 1) | `ease-exit` | Exits (leave faster than you arrive) |
| lift | 3px | `-translate-y-lift` | Button hover |
| nudge | 4px | `translate-x-nudge` | Arrow hover |
| enter (distance) | 22px | `--ds-distance-enter` | Hero offset |
| rise | 24px | `--ds-distance-rise` | Scroll reveal offset |
| media | 1.04 | `scale-media` | Card and editorial image zoom |

## How to use it

**Hero entrance.** Add `ds-enter` to the first item, then `ds-enter ds-enter-2` to `-5` to the next items in reading order (`heroEnter(step)` returns the string). Animate whole elements: never split a headline into words or letters. The hero photo isn't animated: it's the page's largest paint (fading it would delay it), and a full-bleed image can't rise without showing an edge. Neither hero has an eyebrow label.

**Scroll reveals.** Mount `<RevealObserver />` once in the layout (both concepts and `/design-system` already do). Then:

- `data-reveal=""` on one element: it rises and fades. `data-reveal="fade"` for a photograph: opacity only.
- `data-stagger=""` on a container: its direct children reveal one after another. Use it on a heading group (heading, paragraph, action), a card row or a list.
- `<RevealOnScroll as="div" variant="rise|fade" delay={ms}>` and `<StaggerContainer as="ul">` add the same attributes as components.

The attributes work on existing elements, so adopting them adds no DOM and changes no layout.

Don't reveal navigation, or anything that must be usable before it finishes. The reveal is 650ms, plus at most 700ms of stagger for the eighth item, and the content is in the DOM and focusable throughout.

**Buttons.** `Button` and `ButtonLink` handle everything:

- Filled and outlined buttons lift 3px on hover and settle when pressed.
- The trailing arrow nudges 4px.
- Text buttons never move: their underline changes colour and thickens (1px to 2px) over 220ms.
- Disabled and loading buttons never move.
- `IconButton` changes only its background, over 160ms.

**Cards.** Zoom the photo layer with `motionClass.mediaZoom` (1.04) inside an `overflow-hidden` frame. Text, prices and the card's size never move. The CTA arrow nudges 4px.

**Parallax (Concept B craft section only).** A CSS scroll-driven layer (`.ds-parallax`) drifts 32px over the section's pass through the viewport. It sits on its own element, separate from any reveal wrapper, so the two never share a `transform`. It's off on touch devices, under reduced motion and in browsers without `animation-timeline`.

## How the observer decides

- It marks only the targets below the trigger line with `data-reveal-pending` (hidden), and leaves first-screen content alone.
- The trigger line is 18% of the viewport height above the bottom edge: a group starts when its top edge rises into the lower 18% of the screen. Not earlier, so nothing animates unseen.
- On trigger, `data-reveal-pending` becomes `data-revealed`, which plays the keyframe once. It never replays.
- A group the visitor scrolls past in one jump is still revealed.
- Without JavaScript, before hydration, under reduced motion and without `IntersectionObserver`, nothing is ever hidden.

## Rules

1. Animate `opacity` and `transform` only. Never width, height, top, left or margins, so nothing shifts layout.
2. Prefix every hover or focus transform with `motion-safe:`.
3. `hover:` only applies on devices with a real hover pointer (`future.hoverOnlyWhenSupported`), so taps never leave a stuck hover state.
4. Content is visible by default. Reveals use keyframes with no end state, so they never override an element's own transform or transition.
5. One authored sequence in the hero, then one reveal per group as it enters. Nothing replays on scroll up and down.
6. No animation libraries, loops, bounce, spring easing or decorative rotation. The spinner and skeleton are the only continuous motion, and only while something is loading.
7. Exits are instant or faster than entrances.

## Reduced motion

With `prefers-reduced-motion: reduce`:

- The hero entrance, the scroll reveals and the parallax are off, and everything renders in place.
- Hover lifts, arrow nudges, image zoom and drawer slides are off (they're gated with `motion-safe:`).
- Colour, border and opacity feedback stays, because it carries state rather than movement.
- The spinner keeps turning, slower. Skeleton pulses stop.

## Validation (2026-11-18)

Measured in headless Chrome over CDP on `/concept-a` and `/concept-b` (dev build, 1440px unless noted):

- **Hero:** every item is 700ms with delays of 0, 120, 240 (and 360 on B) ms. At 300ms the heading is at 82% opacity, the intro at 61% and the buttons at 24%. Everything is settled by about 1,060ms.
- **Reveals:** 19 targets on A, 15 on B, all hidden at load and all revealed during a slow scroll. Each fires with its top edge at 72–81% of the viewport height. None stays hidden after a full scroll. A second pass replays nothing.
- **Client-side navigation:** arriving at either route from `/` runs the hero entrance and arms every reveal. Back and forward leave nothing hidden.
- **Hover:** buttons move exactly -3px (0 when pressed). Card photos scale to 1.04 and the card height is unchanged (608px on A, 393px on B).
- **Reduced motion:** no hero animation, no hidden reveals, no running `ds-*` keyframes.
- **JavaScript disabled:** every `.ds-enter`, `[data-reveal]` and child of `[data-stagger]` is fully visible.
- **Touch (390px and 320px):** reveals work, there's no horizontal overflow, hover styles don't apply, and the parallax is off.
- **Parallax:** unchanged on B (-15.5px to +15.5px, 31px of travel).
