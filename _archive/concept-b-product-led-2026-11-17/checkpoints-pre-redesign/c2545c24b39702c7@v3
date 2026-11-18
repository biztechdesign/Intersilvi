import Image from "next/image";
import Link from "next/link";
import { designSection, designSteps } from "@/content/homepage";
import type { RibbonColour } from "@/lib/commerce/types";
import { ButtonLink } from "../components/Button";
import { colourways } from "../content";
import { BASE } from "../base";

/**
 * Design your own: a TEASER only. Colourways and ribbon colours are plain links into the model listing (the choice travels
 * in the query string). Nothing here recolours, holds state, prices or adds to cart. The designer is a separate tool, reached
 * through Model listing, then Product detail. The colourways are real design-rosette models from the store.
 */
export function DesignSection({ colours }: { colours: RibbonColour[] }) {
  return (
    <section id="design" aria-labelledby="design-title" className="scroll-mt-24 bg-b-navy py-b-section text-b-on-navy">
      <div className="b-container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="grid content-start gap-6">
            <h2 id="design-title" className="b-h2 max-w-[14ch]">
              Create your own award rosette
            </h2>
            <p className="b-lead text-b-on-navy-2">{designSection.intro}</p>
            <div className="grid max-w-[22rem] gap-3">
              <ButtonLink href={`${BASE}/design-your-own`} variant="design">
                {designSection.action.label}
              </ButtonLink>
              <ButtonLink href={`${BASE}/colour-chart`} variant="outline-light">
                Explore the colour chart
              </ButtonLink>
            </div>
          </div>

          <div>
            <h3 className="text-b-lead font-semibold">Combinations to start from</h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {colourways.map((c) => (
                <li key={c.id}>
                  <Link href={`${BASE}/design-your-own?combination=${c.id}`} className="group block no-underline">
                    <span className="relative block aspect-[3/4] overflow-hidden rounded-b-card bg-b-navy-soft transition-colors duration-300 ease-b-out group-hover:bg-b-yellow">
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        width={c.image.width}
                        height={c.image.height}
                        sizes="(min-width: 64rem) 15vw, 40vw"
                        className="absolute inset-x-[12%] bottom-[4%] top-[4%] h-[92%] w-[76%] object-contain object-bottom drop-shadow-[0_12px_10px_rgba(11,26,61,0.45)] transition-transform duration-500 ease-b-out group-hover:-translate-y-1.5"
                      />
                    </span>
                    <span className="mt-3 block text-b-small font-semibold underline decoration-transparent decoration-2 underline-offset-[0.4em] group-hover:decoration-b-yellow">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-b-lead font-semibold">Ribbons in many colours</h3>
            <ul aria-label="Ribbon colours (indicative)" className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-x-3 gap-y-4">
              {colours.map((c) => (
                <li key={c.id}>
                  <Link href={`${BASE}/design-your-own?colour=${c.id}`} className="group flex items-center gap-2.5 rounded-b-pill py-1 pr-2 text-b-label font-medium text-b-on-navy no-underline hover:text-b-yellow">
                    <span aria-hidden="true" className="h-6 w-6 flex-none rounded-full shadow-[inset_0_0_0_1.5px_rgba(243,246,252,0.55)] transition-transform duration-300 ease-b-out group-hover:scale-110" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-b-label text-b-on-navy-2">Screen colours are indicative. The colour chart shows the actual ribbons.</p>
          </div>
        </div>

        <ol aria-label="The five design steps" className="mt-16 grid gap-8 border-t border-b-rule-navy pt-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {designSteps.map((s, i) => (
            <li key={s.id} className="grid content-start gap-2">
              <span aria-hidden="true" className="b-display tabular text-[2.5rem] font-semibold leading-none text-b-yellow">
                {i + 1}
              </span>
              <h3 className="text-b-lead font-semibold">{s.title}</h3>
              <p className="text-b-small text-b-on-navy-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
