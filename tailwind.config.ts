import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import * as ds from "./src/design-system/tokens";

/* ---------- Shared design system ---------- */

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

/** Semantic colours as `rgb(var(--ds-color-x) / <alpha-value>)`, so opacity utilities (bg-overlay/60) work. */
function dsColors(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      const name = k === "DEFAULT" ? prefix : prefix ? `${prefix}-${k}` : k;
      return [k, typeof v === "string" ? `rgb(var(--ds-color-${name}) / <alpha-value>)` : dsColors(v as Record<string, unknown>, name)];
    }),
  );
}

/** Emits every design-system token as a CSS custom property on :root (single source: src/design-system/tokens.ts). */
const dsVariables = plugin(({ addBase }) => {
  const vars: Record<string, string> = {};
  for (const [name, hex] of Object.entries(ds.flattenColors())) vars[`--ds-color-${name}`] = hexToRgb(hex);
  for (const [k, v] of Object.entries(ds.spacing)) vars[`--ds-space-${k}`] = v;
  for (const [k, v] of Object.entries(ds.borderRadius)) vars[`--ds-radius-${k}`] = v;
  for (const [k, v] of Object.entries(ds.motion.duration)) vars[`--ds-duration-${k}`] = v;
  for (const [k, v] of Object.entries(ds.motion.easing)) vars[`--ds-ease-${k}`] = v;
  for (const [k, v] of Object.entries(ds.motion.distance)) vars[`--ds-distance-${k}`] = v;
  vars["--ds-scale-media"] = ds.motion.scale.media;
  vars["--ds-stagger"] = ds.motion.stagger;
  vars["--ds-stagger-reveal"] = ds.motion.staggerReveal;
  vars["--ds-max-content"] = ds.maxWidth.content;
  addBase({ ":root": vars });
});

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  /* hover: styles apply only on devices with a real hover pointer, so taps on touch screens never leave a stuck hover state. */
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: dsColors(ds.color as unknown as Record<string, unknown>) as Record<string, string>,
      fontFamily: {
        sans: ds.fontFamily.sans,
        serif: ds.fontFamily.serif,
      },
      fontSize: ds.fontSize as unknown as Record<string, [string, { lineHeight: string; letterSpacing?: string }]>,
      spacing: ds.spacing,
      maxWidth: ds.maxWidth,
      /* rounded-button and rounded-input read --ds-radius-button / --ds-radius-input (globals.css), so a surface can opt into fully rounded controls. */
      borderRadius: { ...ds.borderRadius, button: "var(--ds-radius-button)", input: "var(--ds-radius-input)" },
      boxShadow: ds.boxShadow,
      transitionDuration: { DEFAULT: ds.motion.duration.base, ...ds.motion.duration },
      transitionTimingFunction: { DEFAULT: ds.motion.easing.standard, ...ds.motion.easing },
      translate: ds.motion.distance,
      scale: ds.motion.scale,
      /* Motion keyframes (the hero entrance keyframe lives in globals.css next to .ds-enter). Entrances start from an already-legible state (small offset, never from scale or rotation). */
      keyframes: {
        "ds-fade-in": { from: { opacity: "0" } },
        "ds-menu-in": { from: { opacity: "0", transform: "translateY(-4px)" } },
        "ds-modal-in": { from: { opacity: "0", transform: "translateY(8px)" } },
        "ds-drawer-in": { from: { opacity: "0.6", transform: "translateX(24px)" } },
        "ds-drawer-in-left": { from: { opacity: "0.6", transform: "translateX(-24px)" } },
      },
      animation: {
        "fade-in": `ds-fade-in ${ds.motion.duration.base} ${ds.motion.easing.standard}`,
        "menu-in": `ds-menu-in ${ds.motion.duration.base} ${ds.motion.easing.emphasized}`,
        "modal-in": `ds-modal-in ${ds.motion.duration.base} ${ds.motion.easing.emphasized}`,
        "drawer-in": `ds-drawer-in ${ds.motion.duration.slow} ${ds.motion.easing.emphasized}`,
        "drawer-in-left": `ds-drawer-in-left ${ds.motion.duration.slow} ${ds.motion.easing.emphasized}`,
      },
      zIndex: ds.zIndex,
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [dsVariables],
};

export default config;
