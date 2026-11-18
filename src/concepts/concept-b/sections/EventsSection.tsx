import { allAwardsHref, awardCategories } from "../awardCategories";
import { AwardCategoryCard } from "../components/AwardCategoryCard";
import { ButtonLink } from "../components/Button";
import { eyebrows } from "@/content/concept-b";
import { SectionHeader } from "../components/SectionHeader";

/**
 * Shop by event: a shared two-column header (heading left, description and "View all awards" right), then four equal portrait cards in one row on desktop,
 * two columns on tablet and one on mobile. Data comes from `awardCategories`.
 */
export function EventsSection() {
  return (
    <section id="shop" aria-labelledby="events-title" className="scroll-mt-24 py-section">
      <div className="ds-container">
        <SectionHeader
          eyebrow={eyebrows.events}
          titleId="events-title"
          title="Find the right awards for your event"
          body="Discover rosettes, trophies and medals for competitions, shows and special events."
          action={
            <ButtonLink href={allAwardsHref} variant="shop">
              View all awards
            </ButtonLink>
          }
        />
        <ul data-stagger="" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {awardCategories.map((c) => (
            <li key={c.id}>
              <AwardCategoryCard category={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
