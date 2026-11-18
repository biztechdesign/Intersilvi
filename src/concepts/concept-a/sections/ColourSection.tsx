import type { RibbonColour, RibbonMaterial } from "@/lib/commerce/types";
import { colourSection } from "@/content/homepage";
import { media } from "@/content/media";
import { catalogueLink } from "@/content/site";
import { ButtonLink } from "../components/Button";
import { Photo } from "../components/Photo";

/**
 * Swatches are flat colour: screens can't show a ribbon's finish truthfully, so the finish is named in text instead.
 * Only "patterned" gets a stripe, because it depicts a printed pattern rather than imitating a material.
 */
const FINISH: Partial<Record<RibbonMaterial, string>> = {
  patterned: "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.35)_0_6px,transparent_6px_14px)]",
};

const MATERIAL_BASE: Record<RibbonMaterial, string> = {
  satin: "#16244f",
  grosgrain: "#6e1a2c",
  metallic: "#c9a14a",
  patterned: "#1f4fb4",
};

/** Ribbon colours as physical material: a photo, the four finishes, then a rack of hanging ribbon tails. */
export function ColourSection({ colours }: { colours: RibbonColour[] }) {
  return (
    <section aria-labelledby="colour-title" className="bg-surface-alt">
      <div className="grid lg:grid-cols-2">
        <div data-reveal="fade" className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-full">
          <Photo asset={media.pleatedRibbons} sizes="(min-width: 64rem) 50vw, 100vw" />
        </div>
        <div data-stagger="" className="px-gutter py-section lg:pl-16 lg:pr-[max(var(--ds-space-gutter),calc((100vw-var(--ds-max-content))/2+var(--ds-space-gutter)))]">
          <h2 id="colour-title" className="text-h2 max-w-heading">
            {colourSection.title}
          </h2>
          <p className="text-lead max-w-lead mt-5 text-fg-secondary">{colourSection.intro}</p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-2">
            {colourSection.materials.map((m) => (
              <li key={m.id} className="flex items-center gap-4 bg-surface p-4">
                <span aria-hidden="true" className="relative h-14 w-14 flex-none overflow-hidden rounded-md" style={{ backgroundColor: MATERIAL_BASE[m.id] }}>
                  {FINISH[m.id] ? <span className={`absolute inset-0 ${FINISH[m.id]}`} /> : null}
                </span>
                <span>
                  <span className="block font-semibold">{m.name}</span>
                  <span className="block text-body-sm text-fg-secondary">{m.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <ButtonLink href={colourSection.action.href} variant="shop">
              {colourSection.action.label}
            </ButtonLink>
            <ButtonLink href={catalogueLink.href} variant="text" external>
              {catalogueLink.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="ds-container pb-section pt-16">
        <div data-reveal="" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-h3 font-bold">Ribbon colours</h3>
          <p className="text-body-sm text-fg-muted">Screen colours are indicative. The colour chart shows the actual ribbons.</p>
        </div>
        <ul data-stagger="" aria-label="Indicative ribbon colours" className="-mx-gutter mt-8 flex snap-x gap-2 overflow-x-auto px-gutter pb-4 lg:mx-0 lg:grid lg:grid-cols-14 lg:overflow-visible lg:px-0">
          {colours.map((c) => (
            <li key={c.id} className="w-[4.5rem] flex-none snap-start lg:w-auto">
              <span
                aria-hidden="true"
                className="relative block h-40 shadow-[inset_0_0_0_1px_rgba(12,21,49,0.08)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)] sm:h-52"
                style={{ backgroundColor: c.hex }}
              >
                {FINISH[c.material] ? <span className={`absolute inset-0 ${FINISH[c.material]}`} /> : null}
              </span>
              <span className="mt-3 block text-label font-semibold leading-tight">{c.name}</span>
              <span className="block text-caption capitalize text-fg-muted">{c.material}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
