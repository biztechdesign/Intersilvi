import { hero } from "@/content/homepage";
import { media } from "@/content/media";
import { ButtonLink } from "../components/Button";
import { Photo } from "../components/Photo";
import { BASE } from "../base";

/**
 * Hero: a full-bleed photograph (a horse wearing a rosette, from intersilvi.com) with a navy card floating at the left.
 * There is no colour overlay on the photo. On desktop it fills the right ~72% of the hero with its left edge fading into navy, and the card is a translucent
 * navy panel over the seam, so the horse's head and the whole rosette sit to the right of the card. The card holds the heading, the line
 * beneath it, a short intro and the two journey actions. On desktop the hero's height follows the viewport (screen height
 * minus the header, the overlapping delivery card and its spacing), so the whole delivery card sits on the first screen.
 * Below 1024px the photo sits on top (cropped to keep the whole blue rosette, its tails and the horse's face in frame) and the card runs edge to edge directly beneath it, so photo and card read as one block.
 */
export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface lg:bg-surface-inverse lg:pb-24">
      {/* Desktop: the photo fills the whole banner so the whole rosette (head to tails) stays clear of the card, which sits low on the left so the sunlit trees stay visible above it. */}
      <div className="relative aspect-[5/4] w-full sm:aspect-[3/2] lg:absolute lg:inset-y-0 lg:left-0 lg:right-0 lg:aspect-auto">
        <Photo asset={media.heroHorseRosette} sizes="100vw" priority className="object-[100%_50%] lg:object-[70%_30%]" />
      </div>

      <div className="ds-container relative z-[1] max-lg:!px-0 lg:flex lg:min-h-[max(26rem,calc(100svh-389px))] lg:items-end lg:py-8">
        <div className="w-full max-w-none bg-surface-inverse px-gutter pb-8 pt-6 text-fg-inverse sm:pt-8 lg:max-w-[35rem] lg:rounded-lg lg:bg-surface-inverse/90 lg:p-9 lg:shadow-lg">
          {/* The page's one authored entrance: heading, intro, actions, 120ms apart (CSS only, see docs/MOTION.md). */}
          <h1 id="hero-title" className="ds-enter text-h1">
            {hero.titleLines[0]}
            <span className="mt-2 block text-h5 font-semibold text-fg-inverse-muted">{hero.titleLines[1]}</span>
          </h1>
          <p className="ds-enter ds-enter-2 mt-4 max-w-none text-body text-fg-inverse-muted lg:max-w-[46ch]">{hero.intro}</p>
          <div className="ds-enter ds-enter-3 mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`${BASE}/design-your-own`} variant="design" className="w-full sm:w-auto">
              {hero.design.label}
            </ButtonLink>
            <ButtonLink href={hero.shop.href} variant="shop-light" className="w-full sm:w-auto">
              {hero.shop.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
