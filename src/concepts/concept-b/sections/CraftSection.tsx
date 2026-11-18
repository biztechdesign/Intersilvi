import Image from "next/image";
import { craftCopy as craft } from "@/content/concept-b";
import { media } from "@/content/media";
import { rebase } from "@/lib/content/paths";
import { ButtonLink } from "../components/Button";
import { BASE } from "../base";
import { eyebrows } from "@/content/concept-b";
import { Eyebrow } from "../components/Eyebrow";

/**
 * Craftsmanship: a wide, short statement above a client-supplied line-up of dogs wearing rosettes.
 * The photo's own background (#F4F6FA) matches surface-sunken, so it reads as the section's background: the text sits
 * on the empty top of the image and the dogs line the bottom edge. On wide screens the photo slides up behind the text; as you scroll the photo drifts down slightly while the text rises (parallax);
 * on phones it crops to the middle dogs at a fixed minimum height. Claims are limited to confirmed facts.
 */
export function CraftSection() {
  const photo = media.dogsRosettesLineup;
  return (
    <section id="craft" aria-labelledby="craft-title" className="relative isolate scroll-mt-24 overflow-clip bg-surface-sunken text-fg">
      <div className="ds-container relative z-[1] pt-10 sm:pt-12 lg:pt-14">
        <div data-stagger="" className="mx-auto max-w-[60rem] text-center">
          <Eyebrow>{eyebrows.craft}</Eyebrow>
          <h2 id="craft-title" className="text-h2">
            {craft.titleLines[0]} {craft.titleLines[1]}
          </h2>
          <p className="mx-auto mt-5 max-w-[52rem] text-lead text-fg-secondary">{craft.body}</p>
          <div className="mt-7 flex justify-center">
            <ButtonLink href={rebase(craft.action.href, BASE)} variant="shop">
              {craft.action.label}
            </ButtonLink>
          </div>
        </div>
      </div>
      {/* The photo frame takes the image's own 1920:582 shape, so the whole line-up (heads, rosettes and tails) is always
          visible and sits on the bottom edge. It is 92% of the viewport wide from 640px; its background matches the section,
          so the narrower frame never shows an edge. Below 640px it widens to 30rem and the line-up crops evenly at both sides. */}
      <div className="relative mx-auto mt-0 aspect-[1920/582] w-[max(100%,30rem)] overflow-clip sm:-mt-[calc(4.8vw-2rem)] sm:w-[92%]">
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover object-bottom" />
      </div>
    </section>
  );
}
