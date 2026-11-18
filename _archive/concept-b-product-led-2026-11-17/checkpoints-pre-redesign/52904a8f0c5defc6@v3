import { craft } from "@/content/homepage";
import { media } from "@/content/media";
import { rebase } from "@/lib/content/paths";
import { ButtonLink } from "../components/Button";
import { Photo } from "../components/Photo";
import { BASE } from "../base";

/**
 * Craftsmanship: an editorial spread. The photograph bleeds to the viewport edge and its provisional credit sits in a
 * caption beneath it, so the image is never covered. No workshop photography exists yet; claims stay limited to confirmed facts.
 */
export function CraftSection() {
  const photo = media.ribbonPile;
  return (
    <section id="craft" aria-labelledby="craft-title" className="scroll-mt-24 bg-b-paper py-b-section">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-0">
        <figure className="lg:pr-12">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4] lg:rounded-r-b-card">
            <Photo asset={photo} sizes="(min-width: 64rem) 52vw, 100vw" hideCredit />
          </div>
          <figcaption className="b-container mt-3 text-b-label text-b-ink-3 [text-wrap:pretty] lg:px-0 lg:pl-b-gutter">
            Provisional photo (Unsplash, {photo.credit}). To be replaced with photography from the Osby workshop.
          </figcaption>
        </figure>
        <div className="b-container lg:max-w-none lg:pl-0 lg:pr-[max(theme(spacing.b-gutter),calc((100vw-theme(maxWidth.b-page))/2+theme(spacing.b-gutter)))]">
          <h2 id="craft-title" className="b-display text-b-display-2">
            {craft.titleLines[0]}
            <span className="block text-b-navy">{craft.titleLines[1]}</span>
          </h2>
          <div className="mt-6 grid max-w-[46ch] gap-4 text-b-lead text-b-ink-2">
            {craft.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ButtonLink href={rebase(craft.action.href, BASE)} variant="shop" className="mt-8">
            Discover our craftsmanship
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
