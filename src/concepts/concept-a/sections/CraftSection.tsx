import { craft } from "@/content/homepage";
import { media } from "@/content/media";
import { ButtonLink } from "../components/Button";
import { Photo } from "../components/Photo";

/**
 * Craftsmanship as an editorial spread: a large ribbon-stock photo (PROVISIONAL stock), an inset of a finished
 * rosette in use (client image from intersilvi.com), and the confirmed history only.
 */
export function CraftSection() {
  return (
    <section id="craft" aria-labelledby="craft-title" className="bg-surface py-section">
      <div className="ds-container grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <figure className="lg:col-span-6">
          <div className="relative pb-10 pr-6 sm:pb-12 sm:pr-10">
            <div data-reveal="fade" className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-[5/6]">
              <Photo asset={media.ribbonShelves} sizes="(min-width: 64rem) 46vw, 100vw" />
            </div>
            <div className="absolute bottom-0 right-0 aspect-[4/5] w-[40%] border-[6px] border-surface bg-surface shadow-md">
              <div className="relative h-full w-full overflow-hidden">
                <Photo asset={media.dogWearingRosette} sizes="(min-width: 64rem) 18vw, 40vw" position="50% 30%" />
              </div>
            </div>
          </div>
          <figcaption className="mt-4 max-w-[46ch] text-label text-fg-muted">
            Large photo: provisional stock, not Intersilvi&apos;s workshop, to be replaced with photography from Osby. Inset:
            Intersilvi rosette, from intersilvi.com.
          </figcaption>
        </figure>

        <div data-stagger="" className="grid content-center gap-6 lg:col-span-5 lg:col-start-8">
          <h2 id="craft-title" className="text-h2 max-w-heading">
            {craft.titleLines[0]}
            <span className="block text-brand-navy">{craft.titleLines[1]}</span>
          </h2>
          <p className="text-lead max-w-lead text-fg">{craft.paragraphs[0]}</p>
          <p className="max-w-[44ch] text-fg-secondary">{craft.paragraphs[1]}</p>
          <ButtonLink href={craft.action.href} variant="outline" className="mt-2 justify-self-start">
            {craft.action.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
