import type { RibbonMaterial } from "@/lib/commerce/types";
import Image from "next/image";
import { colourSection } from "@/content/homepage";
import { catalogueLink } from "@/content/site";
import { ribbonSamples } from "@/lib/commerce/mock/showcase";
import { rebase } from "@/lib/content/paths";
import { ButtonLink } from "../components/Button";
import { BASE } from "../base";

/** Flat swatch dots: a screen cannot show a finish truthfully, so each finish is named in text. */
const MATERIAL_DOT: Record<RibbonMaterial, string> = {
  satin: "#14264f",
  grosgrain: "#6e1a2c",
  metallic: "#c9a14a",
  patterned: "#1f4fb4",
};

/**
 * Colour inspiration on a warm gold-tint ground, led by real ribbon photography (the store's medal ribbons, shown with
 * names that describe what is visible). The rosette colour chart is a separate document, linked below.
 */
export function ColourSection() {
  return (
    <section aria-labelledby="colour-title" className="overflow-hidden bg-b-yellow-soft py-b-section">
      <div className="b-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="grid content-start gap-6">
            <h2 id="colour-title" className="b-h2 text-b-navy-deep">
              {colourSection.title}
            </h2>
            <p className="b-lead text-b-ink-2">{colourSection.intro}</p>
            <ul className="grid gap-3 border-t border-b-navy/20 pt-5">
              {colourSection.materials.map((m) => (
                <li key={m.id} className="grid grid-cols-[1.25rem_1fr] items-baseline gap-3">
                  <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: MATERIAL_DOT[m.id] }} />
                  <p>
                    <span className="font-semibold">{m.name}.</span> <span className="text-b-ink-2">{m.body}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <ButtonLink href={rebase(colourSection.action.href, BASE)} variant="shop">
                Explore the colour chart
              </ButtonLink>
              <ButtonLink href={catalogueLink.href} variant="text" external>
                {catalogueLink.label}
              </ButtonLink>
            </div>
          </div>

          <div>
            <ul aria-label="Ribbon colours in stock as medal ribbons" className="grid grid-cols-5 gap-x-2 gap-y-6 sm:gap-x-4">
              {ribbonSamples.map((r, i) => (
                <li key={r.id} className={`grid content-start justify-items-center gap-2 ${i % 2 ? "sm:translate-y-6" : ""}`}>
                  <Image src={r.image.src} alt={r.image.alt} width={r.image.width} height={r.image.height} sizes="(min-width: 64rem) 9vw, 18vw" className="h-auto w-full max-w-[7.5rem] drop-shadow-[0_10px_8px_rgba(11,26,61,0.28)]" />
                  <span className="text-center text-b-label font-semibold leading-tight">{r.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-b-label text-b-ink-2 sm:mt-14">Medal ribbons from the store. Rosette ribbon colours follow the colour chart.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
