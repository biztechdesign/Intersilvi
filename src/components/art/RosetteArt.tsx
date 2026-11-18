import { useId } from "react";
import type { RosetteArtSpec } from "@/lib/commerce/types";
import { ribbonHex, ribbonName } from "@/lib/commerce/mock/ribbons";
import { inkOn, shade } from "./color";

/**
 * Parametric rosette illustration (a temporary stand-in for product photography).
 * This is an art primitive with no concept styling, so a future Concept B preview can reuse it.
 */

interface RosetteArtProps {
  spec: RosetteArtSpec;
  /** Accessible description. Omit when decorative (the art is then hidden from assistive tech). */
  label?: string;
  className?: string;
}

const CX = 100;
const CY = 96;
const LIGHT = (-3 * Math.PI) / 4; // light from upper left

type Ring = { outer: number; inner: number; pleats: number; depth: number };

const SHAPES: Record<RosetteArtSpec["shape"], { rings: Ring[]; centre: number; tail: { w: number; len: number; spread: number } }> = {
  classic: {
    rings: [
      { outer: 74, inner: 44, pleats: 30, depth: 7 },
      { outer: 56, inner: 30, pleats: 26, depth: 5 },
    ],
    centre: 33,
    tail: { w: 30, len: 186, spread: 13 },
  },
  luxury: {
    rings: [
      { outer: 86, inner: 52, pleats: 36, depth: 8 },
      { outer: 68, inner: 40, pleats: 32, depth: 6 },
      { outer: 52, inner: 30, pleats: 28, depth: 4 },
    ],
    centre: 34,
    tail: { w: 32, len: 196, spread: 11 },
  },
  flat: {
    rings: [
      { outer: 72, inner: 40, pleats: 18, depth: 10 },
      { outer: 52, inner: 30, pleats: 16, depth: 7 },
    ],
    centre: 32,
    tail: { w: 30, len: 180, spread: 15 },
  },
};

function polar(r: number, a: number): string {
  return `${(CX + r * Math.cos(a)).toFixed(2)},${(CY + r * Math.sin(a)).toFixed(2)}`;
}

function ringPaths(ring: Ring, hex: string) {
  const step = (Math.PI * 2) / ring.pleats;
  const paths: { d: string; fill: string }[] = [];
  for (let i = 0; i < ring.pleats; i++) {
    const a0 = i * step - Math.PI / 2;
    const a1 = a0 + step / 2;
    const a2 = a0 + step;
    const light = Math.cos(a1 - LIGHT); // 1 facing the light, -1 away
    const front = `M${polar(ring.inner, a0)} L${polar(ring.outer, a0)} L${polar(ring.outer + ring.depth * 0.45, a1)} L${polar(ring.inner, a1)} Z`;
    const back = `M${polar(ring.inner, a1)} L${polar(ring.outer + ring.depth * 0.45, a1)} L${polar(ring.outer, a2)} L${polar(ring.inner, a2)} Z`;
    paths.push({ d: front, fill: shade(hex, 0.16 * light + 0.04) });
    paths.push({ d: back, fill: shade(hex, 0.16 * light - 0.2) });
  }
  return paths;
}

function tailPoints(w: number, len: number): string {
  const x0 = CX - w / 2;
  const x1 = CX + w / 2;
  const top = CY;
  const bottom = CY + len;
  const notch = w * 0.55;
  return `${x0},${top} ${x1},${top} ${x1},${bottom} ${CX},${bottom - notch} ${x0},${bottom}`;
}

export function RosetteArt({ spec, label, className }: RosetteArtProps) {
  const uid = useId().replace(/:/g, "");
  const shape = SHAPES[spec.shape];
  const tailCount = spec.tails.length;
  const centreHex = ribbonHex(spec.centre);
  const decorative = !label;

  const describe =
    label ??
    `Rosette in ${spec.rings.map(ribbonName).join(", ").toLowerCase()}`;

  return (
    <svg
      className={className}
      viewBox="0 0 200 300"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : describe}
      focusable="false"
    >
      <defs>
        <linearGradient id={`tailShade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.32" />
          <stop offset="0.28" stopColor="#000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`badge-${uid}`} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor={shade(centreHex, 0.22)} />
          <stop offset="0.7" stopColor={centreHex} />
          <stop offset="1" stopColor={shade(centreHex, -0.25)} />
        </radialGradient>
        <filter id={`lift-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0b1530" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Tails, fanned behind the rings */}
      <g>
        {spec.tails.map((id, i) => {
          const offset = i - (tailCount - 1) / 2;
          const angle = offset * shape.tail.spread;
          const len = shape.tail.len - Math.abs(offset) * 10;
          const hex = ribbonHex(id);
          return (
            <g key={`${id}-${i}`} transform={`rotate(${angle} ${CX} ${CY})`}>
              <polygon points={tailPoints(shape.tail.w, len)} fill={hex} />
              <polygon points={tailPoints(shape.tail.w, len)} fill={`url(#tailShade-${uid})`} />
              <line
                x1={CX - shape.tail.w / 2 + 2.5}
                y1={CY}
                x2={CX - shape.tail.w / 2 + 2.5}
                y2={CY + len - 2}
                stroke={shade(hex, 0.3)}
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              {spec.tailText && i === Math.floor((tailCount - 1) / 2) ? (
                <text
                  x={CX}
                  y={CY + shape.rings[0]!.outer + 14}
                  transform={`rotate(90 ${CX} ${CY + shape.rings[0]!.outer + 14})`}
                  dominantBaseline="central"
                  fill={spec.tailInk ? ribbonHex(spec.tailInk) : inkOn(hex)}
                  fontFamily="inherit"
                  fontWeight="600"
                  fontSize="10"
                  letterSpacing="1.2"
                >
                  {spec.tailText}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>

      {/* Pleated rings, outer to inner */}
      <g filter={`url(#lift-${uid})`}>
        {shape.rings.map((ring, r) => {
          const id = spec.rings[r] ?? spec.rings[spec.rings.length - 1] ?? spec.centre;
          return (
            <g key={r}>
              {ringPaths(ring, ribbonHex(id)).map((p, i) => (
                <path key={i} d={p.d} fill={p.fill} />
              ))}
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={shape.centre} fill={`url(#badge-${uid})`} />
        <circle cx={CX} cy={CY} r={shape.centre - 3.5} fill="none" stroke={inkOn(centreHex)} strokeOpacity="0.45" strokeWidth="1" />
        {spec.centreLabel ? (
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="central"
            fill={inkOn(centreHex)}
            fontFamily="inherit"
            fontWeight="700"
            fontSize={spec.centreLabel.length > 2 ? 17 : 26}
            letterSpacing={spec.centreLabel.length > 2 ? 0.5 : 0}
          >
            {spec.centreLabel}
          </text>
        ) : null}
      </g>
    </svg>
  );
}
