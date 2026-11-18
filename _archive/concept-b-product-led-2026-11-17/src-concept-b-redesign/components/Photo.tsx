import Image from "next/image";
import type { MediaAsset } from "@/content/media";

interface PhotoProps {
  asset: MediaAsset;
  /** Responsive sizes hint for next/image. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** object-position, e.g. "60% 40%" */
  position?: string;
  /** Where the provisional credit sits. */
  creditPosition?: "bottom-left" | "bottom-right" | "top-left";
  /** Hide the on-image credit when the caller shows it as a caption instead. */
  hideCredit?: boolean;
}

/**
 * A photo that fills its (positioned) parent. Provisional stock photos carry a visible credit;
 * client images from intersilvi.com do not.
 */
export function Photo({ asset, sizes, priority, className = "", position, creditPosition = "bottom-left", hideCredit }: PhotoProps) {
  const creditPlace = {
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "top-left": "top-2 left-2",
  }[creditPosition];
  return (
    <>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={position ? { objectPosition: position } : undefined}
      />
      {asset.origin === "unsplash" && !hideCredit ? (
      <span
        className={`pointer-events-none absolute ${creditPlace} z-[1] max-w-[calc(100%-1rem)] truncate rounded-b bg-b-paper/90 px-1.5 py-0.5 text-[0.75rem] leading-snug text-b-ink-2`}
      >
        Provisional photo · {asset.credit} / Unsplash
      </span>
      ) : null}
    </>
  );
}
