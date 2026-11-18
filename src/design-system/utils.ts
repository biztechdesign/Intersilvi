/** Joins class names, skipping falsy values. Deliberately tiny: no dependency, no conflict resolution. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
