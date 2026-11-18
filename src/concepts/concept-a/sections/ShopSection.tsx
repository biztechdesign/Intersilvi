import Link from "next/link";
import type { Category } from "@/lib/commerce/types";
import { events } from "@/content/homepage";
import { media } from "@/content/media";
import { CategoryCard } from "../components/CategoryCard";
import { Icon } from "../components/Icon";
import { QuotePromptCard } from "../components/QuotePromptCard";
import { motionClass } from "@/design-system/motion-classes";

/**
 * Journey 1, Shop products: a tall featured category (dog shows, the deepest range), three standard categories and a
 * quote prompt, then a typographic index of every range. Data comes from the shared `events` content.
 */
export function ShopSection({ ranges }: { ranges: Category[] }) {
  const [featured, ...standard] = events;
  return (
    <section id="shop" aria-labelledby="shop-title" className="bg-surface-alt py-section">
      <div className="ds-container">
        <div data-stagger="" className="mx-auto mb-10 grid max-w-[44rem] justify-items-center gap-4 text-center lg:mb-14">
          <h2 id="shop-title" className="text-h2 max-w-heading max-w-[20ch]">
            Find the right award for your event
          </h2>
          <p className="text-lead max-w-lead text-fg-secondary">Start from the kind of event you are organising, or go straight to a range below.</p>
        </div>

        {/* Desktop: tall featured card left, 2×2 grid right (three categories + quote prompt).
            Tablet: featured card full width above a 2×2 grid. Mobile: one column. */}
        <ul data-stagger="" className="grid gap-4 sm:grid-cols-2 lg:h-[clamp(30rem,44vw,38rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-5">
          {featured ? (
            <li className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <CategoryCard
                variant="featured"
                title={featured.title}
                body={featured.body}
                href={featured.href}
                image={media[featured.media]}
                imagePosition={featured.position}
              />
            </li>
          ) : null}
          {standard.map((e) => (
            <li key={e.id}>
              <CategoryCard title={e.title} body={e.body} href={e.href} image={media[e.media]} imagePosition={e.position} />
            </li>
          ))}
          <li>
            <QuotePromptCard />
          </li>
        </ul>

        <div data-stagger="" className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-12">
          <h3 className="text-h3 font-bold">All ranges</h3>
          <ul className="grid border-t-2 border-fg md:grid-cols-2 md:gap-x-10">
            {ranges.map((r) => (
              <li key={r.id} className="border-b border-line">
                <Link
                  href={r.href}
                  className="group grid min-h-[4.5rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-3 no-underline [grid-template-areas:'label_arrow''desc_arrow']"
                >
                  <span className="font-semibold [grid-area:label] group-hover:underline group-hover:decoration-brand-yellow group-hover:decoration-2 group-hover:underline-offset-[0.3em]">
                    {r.label}
                  </span>
                  {r.description ? <span className="text-body-sm text-fg-muted [grid-area:desc]">{r.description}</span> : null}
                  <Icon name="arrow-right" size={18} className={`text-fg-muted [grid-area:arrow] ${motionClass.arrowNudge} group-hover:text-fg`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
