/** Small colour helpers for the art components (no dependencies). */

function parse(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
}

/** Mix toward white (amount > 0) or black (amount < 0). amount is in [-1, 1]. */
export function shade(hex: string, amount: number): string {
  const [r, g, b] = parse(hex);
  const t = amount > 0 ? 255 : 0;
  const p = Math.abs(amount);
  return toHex([r + (t - r) * p, g + (t - g) * p, b + (t - b) * p]);
}

/** Relative luminance, used to pick legible badge text. */
export function luminance(hex: string): number {
  const lin = parse(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!;
}

export function inkOn(hex: string): string {
  return luminance(hex) > 0.4 ? "#16244f" : "#ffffff";
}
