import type { RibbonColour, RibbonColourId } from "../types";

/**
 * Indicative ribbon colours (synthetic). The real names and values come from the Intersilvi colour chart.
 * The hex values are screen approximations of ribbon dyes, not print references.
 */
export const ribbonColours: RibbonColour[] = [
  { id: "royal-blue", name: "Royal blue", hex: "#1f4fb4", material: "satin" },
  { id: "navy", name: "Navy", hex: "#16244f", material: "satin" },
  { id: "yellow", name: "Yellow", hex: "#f2c230", material: "satin" },
  { id: "gold", name: "Gold", hex: "#c9a14a", material: "metallic" },
  { id: "red", name: "Red", hex: "#c8262f", material: "satin" },
  { id: "bordeaux", name: "Bordeaux", hex: "#6e1a2c", material: "grosgrain" },
  { id: "white", name: "White", hex: "#f7f6f2", material: "satin" },
  { id: "silver", name: "Silver", hex: "#b9bcc2", material: "metallic" },
  { id: "green", name: "Green", hex: "#1f6b45", material: "grosgrain" },
  { id: "light-blue", name: "Light blue", hex: "#8fb8e3", material: "satin" },
  { id: "purple", name: "Purple", hex: "#5b2d86", material: "satin" },
  { id: "pink", name: "Pink", hex: "#e597b5", material: "satin" },
  { id: "orange", name: "Orange", hex: "#e2702a", material: "grosgrain" },
  { id: "black", name: "Black", hex: "#1b1b1d", material: "grosgrain" },
];

const byId = new Map(ribbonColours.map((c) => [c.id, c]));

export function ribbonHex(id: RibbonColourId): string {
  return byId.get(id)?.hex ?? "#999999";
}

export function ribbonName(id: RibbonColourId): string {
  return byId.get(id)?.name ?? id;
}
