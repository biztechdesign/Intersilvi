/**
 * Third-party brand marks (social networks and country flags). These are logos and artwork, not UI icons, so they are
 * exempt from the Material Symbols-only rule (see DESIGN.md, Iconography).
 */
export type SocialId = "instagram" | "tiktok" | "facebook";

export function SocialMark({ id, size = 18 }: { id: SocialId; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;
  if (id === "instagram")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (id === "tiktok")
    return (
      <svg {...common} fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  return (
    <svg {...common} fill="currentColor">
      <path d="M13.6 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7H17V3.9C16.7 3.8 15.7 3.7 14.6 3.7c-2.5 0-4.1 1.5-4.1 4.2v2.6H7.7v3.3h2.8V22h3.1z" />
    </svg>
  );
}

export type FlagId = "se" | "com" | "no" | "dk" | "fi" | "de";

/** Small rectangular flags, 24x16. "com" (English) is the England cross, as on the current site. */
export function Flag({ id, className }: { id: FlagId; className?: string }) {
  const p = { width: 24, height: 16, viewBox: "0 0 24 16", "aria-hidden": true, focusable: false, className: `flex-none rounded-[3px] ${className ?? ""}` } as const;
  switch (id) {
    case "se":
      return (
        <svg {...p}>
          <rect width="24" height="16" fill="#006AA7" />
          <rect x="7" width="3.5" height="16" fill="#FECC02" />
          <rect y="6.25" width="24" height="3.5" fill="#FECC02" />
        </svg>
      );
    case "no":
      return (
        <svg {...p}>
          <rect width="24" height="16" fill="#BA0C2F" />
          <rect x="6.5" width="5" height="16" fill="#fff" />
          <rect y="5.5" width="24" height="5" fill="#fff" />
          <rect x="7.75" width="2.5" height="16" fill="#00205B" />
          <rect y="6.75" width="24" height="2.5" fill="#00205B" />
        </svg>
      );
    case "dk":
      return (
        <svg {...p}>
          <rect width="24" height="16" fill="#C8102E" />
          <rect x="7" width="3" height="16" fill="#fff" />
          <rect y="6.5" width="24" height="3" fill="#fff" />
        </svg>
      );
    case "fi":
      return (
        <svg {...p}>
          <rect width="24" height="16" fill="#fff" />
          <rect x="6.5" width="4" height="16" fill="#003580" />
          <rect y="6" width="24" height="4" fill="#003580" />
        </svg>
      );
    case "de":
      return (
        <svg {...p}>
          <rect width="24" height="5.34" fill="#000" />
          <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
          <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <rect width="24" height="16" fill="#fff" />
          <rect x="10" width="4" height="16" fill="#CE1124" />
          <rect y="6" width="24" height="4" fill="#CE1124" />
        </svg>
      );
  }
}
