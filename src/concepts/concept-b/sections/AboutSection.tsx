import { aboutCopy as about, eyebrows } from "@/content/concept-b";
import { Eyebrow } from "../components/Eyebrow";
import { rebase } from "@/lib/content/paths";
import { media } from "@/content/media";
import { ButtonLink } from "../components/Button";
import { Photo } from "../components/Photo";
import { BASE } from "../base";
import { motionClass } from "@/design-system/motion-classes";

/**
 * About us: an editorial two-column section. The workshop photograph sits on the left, and the label, title, short story
 * and action on the right, so it reads differently from the centred craftsmanship section above. Stacks below 1024px (text first, then photo).
 * Copy comes from `aboutCopy` in src/content/concept-b.ts (supplied by the client, including "since 1992").
 * The photo is a provisional stock image of ribbon spools; replace it with a photo of the Osby workshop.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-surface py-section">
      <div className="ds-container">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,5fr)] lg:gap-12">
          <div data-stagger="" className="text-center md:order-2 md:text-left">
            <Eyebrow className="!mb-2">{eyebrows.about}</Eyebrow>
            {/* Heritage signature: Swedish flag, place, a hairline, then the founding year in bold. */}
            <p className="mb-4 inline-flex items-center gap-3 rounded-full border border-line bg-surface-alt py-1.5 pl-3 pr-4 text-body-sm text-fg-secondary">
              <svg aria-hidden="true" width="24" height="16" viewBox="0 0 24 16" className="flex-none rounded-[3px]">
                <rect width="24" height="16" fill="#006AA7" />
                <rect x="7" width="3.5" height="16" fill="#FECC02" />
                <rect y="6.25" width="24" height="3.5" fill="#FECC02" />
              </svg>
              <span className="font-medium">Osby, Sweden</span>
              <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
              <span className="sr-only">,</span>
              <span className="ds-numeric font-bold text-fg">Since 1992</span>
            </p>
            <h2 id="about-title" className="mx-auto max-w-[16ch] text-h2 md:mx-0">
              {about.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-lead text-fg-secondary md:mx-0">{about.body}</p>
            <div className="mt-7 flex justify-center md:justify-start">
              <ButtonLink href={rebase(about.action.href, BASE)} variant="shop">
                {about.action.label}
              </ButtonLink>
            </div>
          </div>
          <div data-reveal="fade" className="group relative aspect-[4/3] overflow-hidden rounded-lg md:order-1 md:aspect-[4/5] lg:aspect-[4/3]">
            <Photo asset={media.workshopRosette} sizes="(min-width: 64rem) 55vw, 100vw" position="62% 70%" className={motionClass.mediaZoom} />
          </div>
        </div>
      </div>
    </section>
  );
}
