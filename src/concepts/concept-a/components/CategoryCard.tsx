import Link from "next/link";
import type { MediaAsset } from "@/content/media";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { motionClass } from "@/design-system/motion-classes";

interface CategoryCardProps {
  title: string;
  body: string;
  href: string;
  image: MediaAsset;
  /** featured: white content panel with title, description and a "Shop now" button. standard: white label chip. */
  variant?: "featured" | "standard";
  imagePosition?: string;
  priority?: boolean;
}

/**
 * Category card: the photograph fills the card under a subtle bottom tint, and the whole card is one link.
 * - featured: a white panel bottom-left (title, description, navy "Shop now"). On phones the panel sits below the photo.
 * - standard: a white label chip with an arrow, bottom-left.
 * Hover and focus: the photo zooms slightly (motion-safe) and the action turns yellow.
 */
export function CategoryCard({ title, body, href, image, variant = "standard", imagePosition, priority }: CategoryCardProps) {
  const featured = variant === "featured";
  return (
    <Link
      href={href}
      aria-label={title}
      className={`group relative isolate h-full overflow-hidden rounded-md no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4 ${
        featured
          ? "flex flex-col bg-surface sm:block sm:min-h-[26rem] sm:bg-surface-inverse lg:min-h-0"
          : "block min-h-[13rem] bg-surface-inverse sm:min-h-[15rem] lg:min-h-0"
      }`}
    >
      <div className={`overflow-hidden ${featured ? "relative aspect-[4/3] sm:absolute sm:inset-0 sm:aspect-auto" : "absolute inset-0"}`}>
        <div className={`absolute inset-0 ${motionClass.mediaZoom}`}>
          <Photo
            asset={image}
            sizes={featured ? "(min-width: 64rem) 40vw, 100vw" : "(min-width: 64rem) 27vw, (min-width: 40rem) 46vw, 100vw"}
            position={imagePosition}
            priority={priority}
            creditPosition="top-left"
          />
        </div>
      </div>
      {/* Subtle tint so the lower edge of every photo stays calm under its label. */}
      <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-inverse/35 to-transparent ${featured ? "hidden sm:block" : ""}`} />

      {featured ? (
        <div className="relative flex flex-col gap-4 bg-surface p-5 text-fg sm:absolute sm:inset-x-6 sm:bottom-6 sm:max-w-[34rem] sm:flex-row sm:items-center sm:gap-6 sm:p-7 sm:shadow-md lg:inset-x-5 lg:bottom-5 lg:flex-col lg:items-stretch lg:gap-4 lg:p-6 xl:inset-x-6 xl:bottom-6 xl:flex-row xl:items-center xl:gap-6 xl:p-7">
          <div className="min-w-0 flex-1">
            <h3 className="text-h3 font-bold">{title}</h3>
            <p className="mt-2 text-body-sm text-fg-secondary">{body}</p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex min-h-[3.25rem] flex-none items-center justify-center gap-3 self-start rounded-md bg-action-primary px-6 text-body-sm font-semibold text-fg-inverse transition-colors duration-base ease-emphasized group-hover:bg-brand-yellow group-hover:text-fg group-focus-visible:bg-brand-yellow group-focus-visible:text-fg sm:self-center lg:self-start xl:self-center"
          >
            Shop now
            <Icon name="arrow-right" size={18} className={`${motionClass.arrowNudge}`} />
          </span>
        </div>
      ) : (
        <div className="absolute bottom-4 left-4 right-4 flex sm:bottom-5 sm:left-5">
          <div className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-md bg-surface px-4 text-body-sm font-semibold text-fg shadow-md transition-colors duration-base ease-emphasized group-hover:bg-brand-yellow group-hover:text-fg group-focus-visible:bg-brand-yellow group-focus-visible:text-fg">
            <h3 className="truncate">{title}</h3>
            <Icon name="arrow-right" size={16} className={`flex-none ${motionClass.arrowNudge}`} />
          </div>
        </div>
      )}
    </Link>
  );
}
