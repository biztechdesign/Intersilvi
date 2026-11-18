import Image from "next/image";
import { hero } from "@/content/homepage";
import { heroStillLife, type ShowcaseImage } from "@/lib/commerce/mock/showcase";
import { ButtonLink } from "../components/Button";
import { BASE } from "../base";

/**
 * Still life composed from the client's own product cutouts: three rosettes, a cup and a medal standing in front of a
 * gold disc (an echo of a medal and a rosette centre badge). Positions are percentages of one 5:4 stage, so the
 * composition scales as a unit at every width. Decorative: the headline and links carry the meaning.
 */
interface Placement {
  image: ShowcaseImage;
  left: number;
  height: number;
  top?: number;
  bottom?: number;
  z: number;
}

const stage: Placement[] = [
  { image: heroStillLife.rosetteRed, left: 5, height: 80, top: 12, z: 2 },
  { image: heroStillLife.rosetteBlue, left: 29, height: 96, top: 0, z: 3 },
  { image: heroStillLife.rosetteTeal, left: 53, height: 80, top: 10, z: 2 },
  { image: heroStillLife.cup, left: 74, height: 54, bottom: 3, z: 4 },
  { image: heroStillLife.medal, left: -1, height: 31, bottom: -2, z: 5 },
];

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="overflow-hidden bg-b-navy text-b-on-navy">
      <div className="b-container grid items-center gap-x-10 gap-y-6 pb-12 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-16 xl:py-20">
        <div className="flex max-w-[34rem] flex-col">
          <h1 id="hero-title" className="b-display text-b-display-1 [text-wrap:balance]">
            Award rosettes, trophies and medals
          </h1>
          <p className="b-display mt-3 text-b-display-3 font-medium italic text-b-yellow">{hero.titleLines[1]}</p>
          <p className="order-3 mt-6 max-w-[44ch] text-b-lead text-b-on-navy-2 lg:order-none">{hero.intro}</p>
          <div className="order-2 mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:order-none lg:mt-8">
            <ButtonLink href={`${BASE}/design-your-own`} variant="design">
              {hero.design.label}
            </ButtonLink>
            <ButtonLink href={hero.shop.href} variant="shop-light">
              {hero.shop.label}
            </ButtonLink>
          </div>
          <p className="order-4 mt-6 text-b-small text-b-on-navy-2 lg:order-none">Made in Osby, Sweden · Swedish, Norwegian and Finnish award terms</p>
        </div>

        <div aria-hidden="true" className="relative order-first mx-auto aspect-[5/4] w-full max-w-[22rem] sm:max-w-[34rem] lg:order-none lg:max-w-none">
          <div className="absolute -right-[6%] top-[6%] aspect-square w-[78%] rounded-full bg-b-yellow" />
          {stage.map((p) => (
            <div
              key={p.image.src}
              className="absolute"
              style={{
                left: `${p.left}%`,
                height: `${p.height}%`,
                aspectRatio: `${p.image.width} / ${p.image.height}`,
                zIndex: p.z,
                ...(p.top !== undefined ? { top: `${p.top}%` } : { bottom: `${p.bottom}%` }),
              }}
            >
              <Image
                src={p.image.src}
                alt=""
                width={p.image.width}
                height={p.image.height}
                sizes="(min-width: 64rem) 22vw, 40vw"
                priority
                className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_16px_rgba(11,26,61,0.4)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
