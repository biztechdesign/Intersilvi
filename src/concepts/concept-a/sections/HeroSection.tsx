import { hero } from "@/content/homepage";
import { media } from "@/content/media";
import { ButtonLink } from "../components/Button";
import { Photo } from "../components/Photo";

/**
 * Hero: a photo column (a horse wearing a rosette, from intersilvi.com) beside a solid navy panel that runs
 * flush to the right edge. The two never overlap, so the rosette is always whole. From 1024px the hero runs up
 * behind the floating header (pulled up by --a-chrome, set in the concept layout); below that it starts under the card.
 * Primary action: yellow "Design your own rosette". Secondary: outlined "Explore products".
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative bg-surface-inverse lg:-mt-[var(--a-chrome)] lg:grid lg:min-h-[min(54rem,100svh)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] 2xl:grid-cols-2"
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-auto">
        <Photo asset={media.heroHorseRosette} sizes="(min-width: 64rem) 42vw, 100vw" priority position="40% 55%" />
        {/* Desktop: the floating header sits over the photo; a navy scrim keeps the white top row legible. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden h-60 bg-gradient-to-b from-surface-inverse/90 via-surface-inverse/45 to-transparent lg:block" />
      </div>
      <div className="flex flex-col justify-center px-gutter pb-12 pt-8 text-fg-inverse sm:px-10 sm:pb-14 sm:pt-12 lg:pb-16 lg:pl-14 lg:pt-[calc(var(--a-chrome)+3rem)] lg:pr-[max(var(--ds-space-gutter),calc((100vw-var(--ds-max-content))/2+var(--ds-space-gutter)))] xl:pl-20">
        {/* The page's one authored entrance: heading, then intro and actions, 80ms apart (CSS only, see docs/MOTION.md). */}
        <h1 id="hero-title" className="ds-enter">
          <span className="block max-w-heading text-display">
            {hero.titleLines[0]}
          </span>
          <span className="mt-3 block text-h3 text-brand-yellow sm:mt-4">
            {hero.titleLines[1]}
          </span>
        </h1>
        <p className="ds-enter ds-enter-2 order-3 mt-6 max-w-[44ch] text-body text-fg-inverse-muted sm:order-none sm:mt-7 sm:text-lead">{hero.intro}</p>
        <div className="ds-enter ds-enter-3 order-2 mt-7 flex flex-col gap-3 sm:order-none sm:mt-9 sm:flex-row sm:flex-wrap">
          <ButtonLink href={hero.design.href} variant="design" className="sm:min-w-[16rem]">
            {hero.design.label}
          </ButtonLink>
          <ButtonLink href={hero.shop.href} variant="outline-light" className="sm:min-w-[13rem]">
            {hero.shop.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
