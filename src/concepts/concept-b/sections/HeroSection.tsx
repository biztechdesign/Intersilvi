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
 * Below 1024px the photo sits on top and the card overlaps its lower edge.
 */
export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface pb-14 lg:bg-surface-inverse lg:pb-24">
      {/* Desktop: the photo fills the whole banner so the whole rosette (head to tails) stays clear of the card, which sits low on the left so the sunlit trees stay visible above it. */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:left-0 lg:right-0 lg:aspect-auto">
        <Photo asset={media.heroHorseRosette} sizes="100vw" priority className="object-[62%_40%] lg:object-[70%_30%]" />
      </div>

      <div className="ds-container relative z-[1] -mt-14 sm:-mt-20 lg:mt-0 lg:flex lg:min-h-[max(26rem,calc(100svh-415px))] lg:items-end lg:py-8">
        <div className="max-w-[35rem] rounded-lg bg-surface-inverse p-6 text-fg-inverse shadow-lg sm:p-8 lg:bg-surface-inverse/90 lg:p-9">
          {/* The page's one authored entrance: heading, intro, actions, 120ms apart (CSS only, see docs/MOTION.md). */}
          <h1 id="hero-title" className="ds-enter text-h1">
            {hero.titleLines[0]}
            <span className="mt-2 block text-h5 font-semibold text-fg-inverse-muted">{hero.titleLines[1]}</span>
          </h1>
          <p className="ds-enter ds-enter-2 mt-4 max-w-[46ch] text-body text-fg-inverse-muted">{hero.intro}</p>
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
