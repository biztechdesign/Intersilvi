import { designSection } from "@/content/homepage";
import { eyebrows } from "@/content/concept-b";
import type { RibbonColour } from "@/lib/commerce/types";
import { ButtonLink } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { RosetteBuilder } from "../components/RosetteBuilder";
import { BASE } from "../base";

/**
 * Design your own: the introduction on the left and a five-step rosette builder with a live preview on the right.
 * The intro is top-aligned (fixed offset) so it never shifts when the builder changes height between steps.
 * The builder is a preview of the designer: it never prices, saves or adds to a cart, and its last step hands the
 * choices to the designer as query parameters.
 */
export function DesignSection({ colours }: { colours: RibbonColour[] }) {
  return (
    <section id="design" aria-labelledby="design-title" className="scroll-mt-24 bg-surface py-section">
      <div className="ds-container grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,17fr)] lg:gap-12">
        <div data-stagger="" className="grid content-start justify-items-center gap-6 text-center lg:justify-items-start lg:pt-12 lg:text-left">
          <div>
            <Eyebrow>{eyebrows.design}</Eyebrow>
            <h2 id="design-title" className="text-h2 mx-auto max-w-[24ch] lg:mx-0 lg:max-w-[14ch]">
              Create your own award rosette
            </h2>
          </div>
          <p className="max-w-[56ch] text-lead text-fg-secondary lg:max-w-[36ch]">{designSection.intro}</p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <ButtonLink href={`${BASE}/design-your-own`} variant="shop" className="w-full sm:w-auto">
              {designSection.action.label}
            </ButtonLink>
            <ButtonLink href={`${BASE}/colour-chart`} variant="outline" className="w-full sm:w-auto">
              Explore the colour chart
            </ButtonLink>
          </div>
        </div>

        <div data-reveal="" className="min-w-0">
          <RosetteBuilder colours={colours} />
        </div>
      </div>
    </section>
  );
}
