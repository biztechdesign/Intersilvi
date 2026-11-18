import type { Category, Product } from "@/lib/commerce/types";
import { ButtonLink } from "../components/Button";
import { ProductCard } from "../components/ProductCard";

/** A selection of live-store products with their verified specifications. Not "best-sellers": no sales data exists. */
export function ProductsSection({ products, ranges }: { products: Product[]; ranges: Category[] }) {
  const rangeLabel = (id: string) => ranges.find((r) => r.id === id)?.label;
  return (
    <section aria-labelledby="products-title" className="bg-b-paper py-b-section">
      <div className="b-container">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <h2 id="products-title" className="b-h2">
              Selected awards
            </h2>
            <p className="mt-4 max-w-[46ch] text-b-ink-2">Products, sizes and prices as listed in the current store. Prices include VAT.</p>
          </div>
          <ButtonLink href="#ranges" variant="outline">
            Browse all ranges
          </ButtonLink>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {products.map((p) => (
            <li key={p.id} className="row-span-4 grid grid-rows-subgrid">
              <ProductCard product={p} rangeLabel={rangeLabel(p.categoryId)} ctaLabel={p.categoryId === "design" ? "Choose and customise" : "View product"} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
