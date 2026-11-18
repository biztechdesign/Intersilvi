import Link from "next/link";
import { media } from "@/content/media";
import type { AwardCategory } from "../awardCategories";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { motionClass } from "@/design-system/motion-classes";

/**
 * A portrait photo card: the photograph fills the card, and a full-width white plate at the bottom carries the title on
 * the left and the arrow on the right, so every card's plate is the same width whatever the title length. The whole card is one link; the link's name is the title.
 * Hover is controlled: the photo scales slightly and the arrow moves, both only when motion is allowed.
 */
export function AwardCategoryCard({ category, priority }: { category: AwardCategory; priority?: boolean }) {
  return (
    <Link
      href={category.href}
      className="group relative isolate block aspect-[4/3] overflow-hidden rounded-lg bg-surface-inverse text-fg-inverse no-underline sm:aspect-[4/5] lg:aspect-[3/4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4"
    >
      <div className={`absolute inset-0 ${motionClass.mediaZoom}`}>
        <Photo
          asset={media[category.media]}
          sizes="(min-width: 64rem) 22vw, (min-width: 40rem) 46vw, 100vw"
          position={category.position}
          priority={priority}
          className={category.imageClassName}
          hideCredit
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="flex w-full items-center justify-between gap-3 rounded-md bg-surface px-4 py-3 text-fg shadow-sm transition-colors duration-base ease-standard group-hover:bg-brand-yellow group-focus-visible:bg-brand-yellow">
          <h3 className="min-w-0 text-h5 font-semibold leading-tight">{category.title}</h3>
          <Icon name="arrow-right" size={18} className={`flex-none ${motionClass.arrowNudge}`} />
        </div>
      </div>
    </Link>
  );
}
