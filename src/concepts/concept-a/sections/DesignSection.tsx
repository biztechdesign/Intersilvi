import { RosetteArt } from "@/components/art/RosetteArt";
import { designSection, designSteps, starterCombinations } from "@/content/homepage";
import { contact } from "@/content/site";
import { ButtonLink } from "../components/Button";

/**
 * Journey 2, Design your own. The steps sit on white; Intersilvi yellow is confined to a stage panel
 * behind the rosette that runs flush to the right edge (mirroring the hero's navy panel), so the section stays
 * distinctive without flooding the page. The CTA goes to model selection; the configurator is not on the homepage.
 */
export function DesignSection() {
  return (
    <section id="design" aria-labelledby="design-title" className="bg-surface text-fg">
      <div className="lg:grid lg:grid-cols-2">
        <div data-stagger="" className="ds-container grid content-start gap-6 py-section lg:mx-0 lg:ml-auto lg:max-w-[calc(var(--ds-max-content)/2)] lg:pr-16">
          <h2 id="design-title" className="text-h2 max-w-heading">
            {designSection.title}
          </h2>
          <p className="text-lead max-w-lead text-fg-secondary">{designSection.intro}</p>
          <ol className="mt-2 grid border-t-2 border-fg">
            {designSteps.map((step, i) => (
              <li key={step.id} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line py-3.5 sm:grid-cols-[2.5rem_7rem_minmax(0,1fr)] sm:items-baseline">
                <span aria-hidden="true" className="tabular row-span-2 text-h3 font-bold leading-none text-brand-navy sm:row-span-1">
                  {i + 1}
                </span>
                <span className="text-lead font-semibold">{step.title}</span>
                <span className="text-body-sm text-fg-secondary">{step.body}</span>
              </li>
            ))}
          </ol>
          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3">
            <ButtonLink href={designSection.action.href} variant="design">
              {designSection.action.label}
            </ButtonLink>
            <ButtonLink href={contact.phoneHref} variant="text" arrow={false}>
              Need design help? Call {contact.phoneDisplay}
            </ButtonLink>
          </div>
        </div>

        <figure data-reveal="fade" className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-brand-yellow sm:aspect-[16/10] lg:aspect-auto">
          <div className="w-[min(46%,17rem)] translate-y-[10%] sm:w-[min(40%,20rem)] lg:w-[min(56%,26rem)]">
            <RosetteArt
              className="h-auto w-full drop-shadow-[0_30px_40px_rgba(12,21,49,0.25)]"
              label="Illustration of a custom rosette: navy, gold and white rings, a printed centre badge and printed text on the middle tail"
              spec={{
                shape: "luxury",
                rings: ["navy", "gold", "white"],
                tails: ["navy", "gold", "navy"],
                centre: "navy",
                centreLabel: "1",
                tailText: "CLUB SHOW",
              }}
            />
          </div>
          <figcaption className="absolute left-3 top-3 rounded-md bg-surface/85 px-2 py-0.5 text-label text-fg-secondary">
            Illustration. Product photography to follow.
          </figcaption>
        </figure>
      </div>

      <div className="border-y border-line bg-surface-soft text-fg">
        <div className="ds-container py-section-sm">
          <h3 data-reveal="" className="text-h5">Combinations to start from</h3>
          <ul data-stagger="" className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {starterCombinations.map((c) => (
              <li key={c.name} className="flex items-center gap-4">
                <div className="h-20 w-14 flex-none overflow-hidden">
                  <RosetteArt spec={c.art} className="h-auto w-full" />
                </div>
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-body-sm text-fg-muted">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
