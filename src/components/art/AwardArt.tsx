import { useId } from "react";

/**
 * Medal and trophy illustrations: temporary stand-ins for product photography.
 * Drawn in the same light direction and shadow as RosetteArt.
 */

interface ArtProps {
  className?: string;
}

export function MedalArt({ className }: ArtProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`gold-${uid}`} cx="0.36" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f3dc93" />
          <stop offset="0.55" stopColor="#c9a14a" />
          <stop offset="1" stopColor="#8a6a26" />
        </radialGradient>
        <linearGradient id={`fold-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <filter id={`lift-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0b1530" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Ribbon: two strips meeting in a V */}
      <polygon points="58,20 98,20 116,170 92,186" fill="#1f4fb4" />
      <polygon points="142,20 102,20 84,170 108,186" fill="#f2c230" />
      <polygon points="58,20 98,20 116,170 92,186" fill={`url(#fold-${uid})`} />
      <polygon points="142,20 102,20 84,170 108,186" fill={`url(#fold-${uid})`} />
      <rect x="86" y="168" width="28" height="14" rx="2" fill="#a5843a" />
      <g filter={`url(#lift-${uid})`}>
        <circle cx="100" cy="222" r="54" fill={`url(#gold-${uid})`} />
        <circle cx="100" cy="222" r="44" fill="none" stroke="#7b5d1e" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="100" cy="222" r="41" fill="none" stroke="#fff3c9" strokeOpacity="0.45" strokeWidth="1" />
        <path
          d="M100 196 l7.6 15.4 17 2.5 -12.3 12 2.9 16.9 -15.2 -8 -15.2 8 2.9 -16.9 -12.3 -12 17 -2.5z"
          fill="#8a6a26"
          fillOpacity="0.55"
        />
      </g>
    </svg>
  );
}

export function TrophyArt({ className }: ArtProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 200 300" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`cup-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6a26" />
          <stop offset="0.28" stopColor="#f3dc93" />
          <stop offset="0.5" stopColor="#d8b45e" />
          <stop offset="1" stopColor="#7a5c1f" />
        </linearGradient>
        <linearGradient id={`base-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141c38" />
          <stop offset="0.35" stopColor="#2c3a6b" />
          <stop offset="1" stopColor="#0f1630" />
        </linearGradient>
        <filter id={`lift-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0b1530" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter={`url(#lift-${uid})`}>
        {/* Handles */}
        <path d="M52 78 C20 78 20 136 64 146" fill="none" stroke={`url(#cup-${uid})`} strokeWidth="9" strokeLinecap="round" />
        <path d="M148 78 C180 78 180 136 136 146" fill="none" stroke={`url(#cup-${uid})`} strokeWidth="9" strokeLinecap="round" />
        {/* Bowl */}
        <path d="M46 62 H154 C154 124 134 160 100 166 C66 160 46 124 46 62 Z" fill={`url(#cup-${uid})`} />
        <ellipse cx="100" cy="62" rx="54" ry="8" fill="#f6e4a8" />
        <ellipse cx="100" cy="63" rx="48" ry="5.5" fill="#9c7a30" fillOpacity="0.55" />
        {/* Stem and knop */}
        <path d="M92 166 H108 L104 200 H96 Z" fill={`url(#cup-${uid})`} />
        <ellipse cx="100" cy="186" rx="13" ry="6" fill="#d8b45e" />
        <path d="M74 214 C80 202 120 202 126 214 Z" fill={`url(#cup-${uid})`} />
        {/* Plinth */}
        <rect x="62" y="214" width="76" height="58" rx="2" fill={`url(#base-${uid})`} />
        <rect x="80" y="232" width="40" height="18" rx="1.5" fill="#d8b45e" fillOpacity="0.85" />
      </g>
    </svg>
  );
}
