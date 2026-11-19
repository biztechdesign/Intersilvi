/** Prototype motif artwork: a filled Material Symbols glyph. Replace with the client's motif SVGs when supplied. */
export function MotifGlyph({ glyph, size = 48, colour }: { glyph: string; size?: number; colour?: string }) {
  return (
    <span
      aria-hidden="true"
      className="ds-icon"
      style={{ width: size, height: size, fontSize: size, color: colour, ["--ds-icon-fill" as string]: 1 }}
    >
      {glyph}
    </span>
  );
}
