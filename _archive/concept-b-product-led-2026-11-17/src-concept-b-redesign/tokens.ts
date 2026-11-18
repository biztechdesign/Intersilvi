/**
 * Concept B, Refined contemporary commerce: design tokens.
 * Single source of truth. tailwind.config.ts exposes every token under the `b-` namespace
 * (e.g. `bg-b-navy`, `text-b-display-1`, `rounded-b-card`), so it never collides with Concept A's `a-` tokens.
 * Key names intentionally mirror Concept A's so behavioural components can be shared, but the values are B's own.
 */
export const conceptBTokens = {
  colors: {
    /* Intersilvi identity: navy and gold (values to be confirmed from the logo files) */
    navy: "#14264f",
    "navy-deep": "#0b1a3d",
    "navy-soft": "#27407a",
    yellow: "#f6c315", // gold: primary action and selection
    "yellow-soft": "#fcecb0",
    "yellow-deep": "#dcaa00",
    /* Surfaces: white, a pale sky tint (recalls the reference's bands) and a soft stage for products */
    paper: "#ffffff",
    linen: "#eef4fb", // pale sky tint
    stone: "#e6eef8", // product stage
    plinth: "#d3e0f0",
    ink: "#0f1a38",
    "ink-2": "#37425f",
    "ink-3": "#586180",
    rule: "#d8e1ee",
    "rule-strong": "#a3b0c8",
    "on-navy": "#f3f6fc",
    "on-navy-2": "#bac6e0",
    "rule-navy": "rgba(243,246,252,0.2)",
    pending: "#7a5200",
    "pending-tint": "#fdf0c8",
    success: "#2f7a4f",
    danger: "#a3262b",
  },
  fontSize: {
    "display-1": ["clamp(2.75rem, 1.5rem + 4.4vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
    "display-2": ["clamp(2.125rem, 1.4rem + 2.6vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
    "display-3": ["clamp(1.5rem, 1.2rem + 1.1vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
    lead: ["clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", { lineHeight: "1.55" }],
    body: ["1rem", { lineHeight: "1.6" }],
    small: ["0.9375rem", { lineHeight: "1.5" }],
    label: ["0.8125rem", { lineHeight: "1.35", letterSpacing: "0.01em" }],
    eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
  },
  spacing: {
    section: "clamp(4rem, 2.6rem + 4.6vw, 8rem)",
    gutter: "clamp(1rem, 0.4rem + 3vw, 3.5rem)",
  },
  maxWidth: {
    page: "88rem",
  },
  borderRadius: {
    DEFAULT: "0.625rem",
    card: "1.25rem",
    pill: "999px",
  },
  boxShadow: {
    lift: "0 1px 2px rgba(11,26,61,0.06), 0 20px 44px -20px rgba(11,26,61,0.3)",
    menu: "0 2px 4px rgba(11,26,61,0.06), 0 24px 48px -16px rgba(11,26,61,0.28)",
    card: "0 1px 2px rgba(11,26,61,0.05), 0 10px 30px -14px rgba(11,26,61,0.18)",
  },
  transitionTimingFunction: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  zIndex: {
    header: "40",
    menu: "50",
    launcher: "30",
  },
} as const;
