/**
 * Shared motion class strings: the one place each recurring interaction is spelled out, so both concepts
 * and the shared components animate identically. Values come from the motion tokens (tokens.ts → motion).
 * A plain module (not "use client"), so server components can import the strings directly.
 * Guide: docs/MOTION.md.
 */
/** Hero entrance class for step 1 to 5 in reading order (eyebrow or heading first, then intro, actions, facts, artwork). */
export const heroEnter = (step: 1 | 2 | 3 | 4 | 5): string => (step === 1 ? "ds-enter" : `ds-enter ds-enter-${step}`);

export const motionClass = {
  /** Photo layer inside an overflow-hidden card: zooms to 1.03 on hover or keyboard focus of the parent `group`. */
  mediaZoom: "transition-transform duration-slow ease-emphasized motion-safe:group-hover:scale-media motion-safe:group-focus-visible:scale-media",
  /** Trailing arrow inside a `group` link or card: nudges 4px. */
  arrowNudge: "transition-transform duration-base ease-emphasized motion-safe:group-hover:translate-x-nudge",
  /** Trailing arrow inside a `group/button`. */
  buttonArrowNudge: "transition-transform duration-base ease-emphasized motion-safe:group-hover/button:translate-x-nudge",
  /** Growing underline on an `after:` pseudo-element. Position, height and colour stay at the call site. */
  underlineGrow:
    "after:origin-left after:scale-x-0 after:transition-transform after:duration-slow after:ease-emphasized motion-reduce:after:transition-none hover:after:scale-x-100",
  /** Dropdown or popover list: fades in with a 4px settle (fade only under reduced motion). */
  menuIn: "animate-fade-in motion-safe:animate-menu-in",
  /** Large panel (mega menu, tab panel): fades in without moving. */
  panelIn: "animate-fade-in",
  /** Disclosure chevron; pair with the variant that flips it (group-aria-expanded:rotate-180, group-open:rotate-180). */
  chevron: "transition-transform duration-base ease-standard",
} as const;
