import { Instrument_Serif, Manrope } from "next/font/google";

/**
 * The design system's two faces, defined once. next/font self-hosts them at build time.
 * Apply `dsFontVariables` together with the `ds` class on a route's root element.
 */
export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const dsFontVariables = `${manrope.variable} ${instrumentSerif.variable}`;
