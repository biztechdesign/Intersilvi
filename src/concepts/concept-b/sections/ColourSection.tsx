import Image from "next/image";
import { colourCopy, eyebrows } from "@/content/concept-b";
import { rebase } from "@/lib/content/paths";
import { ButtonLink } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { BASE } from "../base";

/**
 * Colour inspiration: heading on the left, intro and the colour-chart action on the right, then a light ribbon gallery.
 * The gallery is an inspirational showcase, not a colour picker: real satin-ribbon photographs in one consistent square
 * frame, centred so the fold reads naturally, with the colour name on a strip joined to the photo in one rounded frame. All seven cards share one baseline. One row of seven on desktop, exactly the page container width (same edges as the event cards); below 1024px the row scrolls sideways (about 2–3 visible on phones).
 * "Explore colour chart" is the section's only action.
 */
export function ColourSection() {
  return (
    <section aria-labelledby="colour-title" className="overflow-hidden bg-surface-alt py-section">
      <div className="ds-container">
        <SectionHeader
          eyebrow={eyebrows.colour}
          titleId="colour-title"
          title={colourCopy.title}
          body={colourCopy.body}
          action={
            <ButtonLink href={rebase(colourCopy.action.href, BASE)} variant="shop">
              {colourCopy.action.label}
            </ButtonLink>
          }
        />
      </div>

      <ul
        aria-label="Ribbon colours"
        className="mt-8 flex snap-x scroll-px-gutter gap-4 overflow-x-auto px-gutter pb-2 [mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] lg:mx-auto lg:mt-8 lg:grid lg:max-w-content lg:grid-cols-7 lg:items-start lg:gap-4 lg:overflow-visible lg:px-gutter lg:pb-5 lg:[mask-image:none]"
      >
        {colourCopy.ribbons.map((r) => (
          <li key={r.id} className={`w-[40vw] max-w-[11rem] flex-none snap-start sm:w-44 lg:w-auto lg:max-w-none`}>
            <figure className="overflow-hidden rounded-lg bg-surface">
              <div className="relative aspect-[6/5]">
                <Image src={r.src} alt={`${r.name} satin ribbon`} fill sizes="(min-width: 64rem) 14vw, 11rem" className="object-cover object-[50%_58%]" />
              </div>
              <figcaption className="border-t border-line px-3 py-2 text-center text-body-sm font-semibold text-fg">{r.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
