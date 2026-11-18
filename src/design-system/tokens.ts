/**
 * Intersilvi design system: the single source of truth for design tokens.
 *
 * - `palette` holds the raw colours (primitives). Components never use these directly.
 * - `color` maps semantic roles onto primitives. Tailwind exposes each role as a utility
 *   (`bg-surface-alt`, `text-fg-muted`, `border-line-input`, `bg-action-primary` and so on).
 * - Every colour is also emitted as a CSS custom property (`--ds-color-<role>`) by the Tailwind
 *   plugin in tailwind.config.ts, so plain CSS and third-party embeds can read the same values.
 *
 * Contrast (WCAG 2.2, measured): every text role passes AA on every surface it is documented for.
 * See docs/DESIGN-TOKENS.md for the full matrix. Brand yellow is a fill colour only: it is 1.7:1 on white,
 * so it never carries text on light grounds; navy text on yellow is 9.7:1.
 */

export const palette = {
  navy: {
    950: "#0B1D40", // provisional brand navy
    800: "#14295A",
    700: "#1E3A78",
    600: "#2D4C8F",
    100: "#E9EEF5", // soft blue surface
    50: "#F3F6FA",
  },
  yellow: {
    500: "#F4BE24", // provisional brand yellow
    600: "#E0A800",
    100: "#FDF3D7",
  },
  neutral: {
    0: "#FFFFFF",
    25: "#F7F8FA", // off-white surface
    200: "#D6DDE7",
    300: "#A7B1C2",
    400: "#8B95A8",
    500: "#76829A",
    600: "#56627A",
    700: "#34425A", // secondary text
  },
  green: { 700: "#1F7A4D", 50: "#E6F4EC" },
  amber: { 800: "#8A5A00", 50: "#FDF3D7" },
  red: { 700: "#B42318", 800: "#912018", 50: "#FDECEA" },
  blue: { 700: "#1D5FA8", 50: "#E8F1FB" },
} as const;

/** Semantic colour roles. Keys become Tailwind colour names; nested keys join with "-". */
export const color = {
  brand: {
    navy: palette.navy[950],
    yellow: palette.yellow[500],
  },
  surface: {
    DEFAULT: palette.neutral[0], // page and cards
    alt: palette.neutral[25], // alternate sections, form fields at rest
    soft: palette.navy[100], // quiet emphasis bands, selected rows, product stages
    sunken: palette.navy[50], // wells, image placeholders
    inverse: palette.navy[950], // dark editorial sections, footer
    "inverse-raised": palette.navy[800], // cards on dark sections
  },
  fg: {
    DEFAULT: palette.navy[950], // headings and body text (16.6:1 on white)
    secondary: palette.neutral[700], // supporting copy (10.1:1)
    muted: palette.neutral[600], // metadata, captions (6.1:1 on white, 5.3:1 on soft)
    disabled: palette.neutral[400], // disabled labels only (exempt from contrast rules)
    inverse: palette.neutral[0],
    "inverse-muted": "#B7C2D8", // secondary text on navy (9.3:1)
    link: palette.navy[700], // inline links (10.9:1)
    "on-accent": palette.navy[950], // text on yellow (9.7:1)
  },
  line: {
    DEFAULT: palette.neutral[200], // dividers and card borders (decorative)
    strong: palette.neutral[300], // emphasised dividers (decorative)
    input: palette.neutral[500], // form-control borders: 3.9:1, meets WCAG 1.4.11
    inverse: "#2E4170", // dividers on navy
  },
  action: {
    primary: palette.navy[950],
    "primary-hover": palette.navy[800],
    "primary-active": palette.navy[700],
    accent: palette.yellow[500], // the one high-emphasis commercial action per view
    "accent-hover": palette.yellow[600],
    secondary: palette.navy[100],
    "secondary-hover": "#DCE3EE",
    destructive: palette.red[700],
    "destructive-hover": palette.red[800],
  },
  focus: {
    DEFAULT: palette.navy[700], // focus ring on light grounds
    inverse: palette.yellow[500], // focus ring on navy
  },
  selected: {
    DEFAULT: palette.navy[950], // selected control border / fill
    surface: palette.navy[100], // selected row, active filter chip
  },
  status: {
    success: palette.green[700],
    "success-surface": palette.green[50],
    warning: palette.amber[800],
    "warning-surface": palette.amber[50],
    error: palette.red[700],
    "error-surface": palette.red[50],
    info: palette.blue[700],
    "info-surface": palette.blue[50],
  },
  badge: {
    "new-surface": palette.navy[100],
    "sale-surface": palette.red[50],
    "custom-surface": palette.yellow[100],
  },
  overlay: {
    DEFAULT: palette.navy[950], // used with opacity utilities: bg-overlay/60
  },
} as const;

/** Font families. The CSS variables are set by next/font in the route layout that loads the fonts. */
export const fontFamily = {
  sans: ["var(--font-manrope)", "Manrope", "Helvetica Neue", "Arial", "sans-serif"],
  serif: ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
};

type FontSize = [string, { lineHeight: string; letterSpacing?: string; fontWeight?: string }];

/**
 * Type scale, the single source for font sizes. Fluid sizes clamp(min, intercept + slope vw, max) and reach their
 * minimum at 320px and maximum at 1440px, so there are no breakpoint-specific sizes anywhere.
 *   display 36→56, h1 32→44, h2 28→36, h3 22→26, lead 17→20, card title 16→20, price-lg 24→30, stat 48→80.
 * Fixed: h4 20, h5 18, h6 16, body 16, small 14, label 13, caption 12, nav 15, button 15, button-sm 13.
 * Line heights: display 1.1, h1 1.15, h2 1.2, h3 1.25, lead 1.5, body 1.55, small 1.45.
 */
export const fontSize: Record<string, FontSize> = {
  display: ["clamp(2.25rem, 1.893rem + 1.786vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" }],
  /** One headline number, such as a lead time. Tabular, extra bold, tight. */
  stat: ["clamp(3rem, 2.429rem + 2.857vw, 5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em", fontWeight: "800" }],
  "serif-display": ["clamp(2.75rem, 2rem + 2.2vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.01em", fontWeight: "400" }],
  h1: ["clamp(2rem, 1.786rem + 1.071vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "800" }],
  h2: ["clamp(1.75rem, 1.607rem + 0.714vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "800" }],
  h3: ["clamp(1.375rem, 1.304rem + 0.357vw, 1.625rem)", { lineHeight: "1.25", letterSpacing: "-0.012em", fontWeight: "700" }],
  h4: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
  h5: ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em", fontWeight: "700" }],
  h6: ["1rem", { lineHeight: "1.4", fontWeight: "700" }],
  "card-title": ["clamp(1rem, 0.929rem + 0.357vw, 1.25rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
  lead: ["clamp(1.0625rem, 1.009rem + 0.268vw, 1.25rem)", { lineHeight: "1.5" }],
  "body-lg": ["1.125rem", { lineHeight: "1.6" }],
  body: ["1rem", { lineHeight: "1.55" }],
  "body-sm": ["0.875rem", { lineHeight: "1.45" }],
  label: ["0.8125rem", { lineHeight: "1.35", letterSpacing: "0.01em", fontWeight: "600" }],
  caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
  nav: ["0.9375rem", { lineHeight: "1.4", fontWeight: "600" }],
  button: ["0.9375rem", { lineHeight: "1.2", letterSpacing: "0.005em", fontWeight: "700" }],
  "button-sm": ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.01em", fontWeight: "700" }],
  price: ["1.125rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }],
  "price-lg": ["clamp(1.5rem, 1.393rem + 0.536vw, 1.875rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "800" }],
};

/** Readable measures for text blocks. */
export const measure = {
  heading: "22ch",
  "heading-wide": "32ch",
  body: "68ch",
  lead: "58ch",
  narrow: "44ch",
};

/**
 * Spacing. Tailwind's default scale is already 4px-based (1 = 4px); these add the missing steps and the
 * semantic rhythm tokens. Required raw steps: 4 8 12 16 20 24 32 40 48 64 80 96 120 → 1 2 3 4 5 6 8 10 12 16 20 24 30.
 */
export const spacing = {
  "30": "7.5rem", // 120px
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)", // page side padding: 16 → 40
  "section-sm": "clamp(3rem, 2.4rem + 2vw, 4rem)", // dense bands: 48 → 64
  section: "clamp(4rem, 3rem + 3vw, 6rem)", // standard sections: 64 → 96
  "section-lg": "clamp(5rem, 3.8rem + 4vw, 7.5rem)", // editorial and hero sections: 80 → 120
  "card-sm": "1rem", // 16
  card: "1.5rem", // 24
  "card-lg": "2rem", // 32
};

export const maxWidth = {
  content: "82.5rem", // 1320px: the page container
  reading: "45rem", // 720px: articles and legal text
  ...measure,
};

export const borderRadius = {
  sm: "4px", // chips, badges, inputs
  md: "6px", // buttons, product and category cards
  lg: "10px", // panels, dialogs, featured media
  /** Fully rounded: buttons and single-line inputs on surfaces that use the pill control shape (see .ds-pill). */
  pill: "9999px",
};

export const boxShadow = {
  xs: "0 1px 2px rgb(11 29 64 / 0.06)",
  sm: "0 1px 2px rgb(11 29 64 / 0.06), 0 4px 12px -4px rgb(11 29 64 / 0.10)",
  md: "0 2px 4px rgb(11 29 64 / 0.06), 0 12px 28px -10px rgb(11 29 64 / 0.18)",
  lg: "0 4px 8px rgb(11 29 64 / 0.06), 0 28px 56px -18px rgb(11 29 64 / 0.30)",
};

/**
 * Motion. One system for both concepts: the hero arrives in a staggered sequence, sections reveal as they scroll into
 * view, and interactions confirm themselves. Nothing bounces, rotates for show or loops.
 * See docs/MOTION.md for usage.
 */
export const motion = {
  duration: {
    /** Hover colour, pressed state, small toggles. */
    fast: "160ms",
    /** Routine state changes: buttons, tabs, menus, swatches. */
    base: "220ms",
    /** Larger surfaces: drawers, image zoom, nav underlines. */
    slow: "400ms",
    /** Hero arrival: each item takes this long to land. */
    entrance: "700ms",
    /** Scroll reveals: each item takes this long to land. */
    reveal: "650ms",
  },
  easing: {
    /** Interactions: quick start, soft landing. */
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    /** Entrances and anything that arrives: exponential ease-out. */
    emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
    /** Hero arrival and scroll reveals: a soft ease-out (cubic) that spreads the travel across the duration, so the rise reads as movement rather than a flicker. */
    enter: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    /** Exits: leave faster than you arrive. */
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
  distance: {
    /** Button hover lift. */
    lift: "3px",
    /** Arrow nudge on hover. */
    nudge: "4px",
    /** Hero entrance offset. */
    enter: "22px",
    /** Scroll reveal offset. */
    rise: "24px",
  },
  scale: {
    /** Card and editorial image zoom on hover. */
    media: "1.04",
  },
  /** Delay between hero items. Five steps cap the sequence at 480ms. */
  stagger: "120ms",
  /** Delay between items revealed together on scroll (cards, a heading and its paragraph and action). Capped at 8 steps. */
  staggerReveal: "100ms",
};

export const zIndex = {
  dropdown: "30",
  sticky: "40",
  overlay: "50",
  modal: "60",
  toast: "70",
};

/** Breakpoints (Tailwind defaults, documented here for reference). */
export const breakpoints = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" };

/** Flattens the semantic colour map to `{ "surface-alt": "#F7F8FA", ... }`. */
export function flattenColors(obj: Record<string, unknown> = color, prefix = ""): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [k, v]) => {
    const name = k === "DEFAULT" ? prefix : prefix ? `${prefix}-${k}` : k;
    if (typeof v === "string") acc[name] = v;
    else Object.assign(acc, flattenColors(v as Record<string, unknown>, name));
    return acc;
  }, {});
}
