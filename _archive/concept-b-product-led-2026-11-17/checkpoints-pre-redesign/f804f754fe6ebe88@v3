import { CategoryFeature, CategoryTile } from "../components/CategoryTiles";
import { featureCategory, tileCategories } from "../content";

/** Shop by event: one featured category beside three standard ones. Every tile is a single link. */
export function EventsSection() {
  return (
    <section id="shop" aria-labelledby="events-title" className="scroll-mt-24 bg-b-linen py-b-section">
      <div className="b-container">
        <h2 id="events-title" className="b-h2 max-w-[20ch]">
          Find the right awards for your event
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-5">
          <CategoryFeature category={featureCategory} />
          <ul className="grid gap-4 lg:gap-5">
            {tileCategories.map((c) => (
              <li key={c.id} className="grid">
                <CategoryTile category={c} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
