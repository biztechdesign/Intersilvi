"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Dialog, Icon, Pagination, Select, Skeleton, StateMessage, cx } from "@/design-system";
import { listingRepository, type Catalogue } from "@/lib/listing/repository";
import { PAGE_SIZE, applyFilters, facetsOf, hasActiveFilters, paginate, parseQuery, sortProducts, sortOptions, toParams } from "@/lib/listing/query";
import type { ListingQuery } from "@/lib/listing/types";
import { Flag } from "../components/BrandMark";
import { FilterFields, flagOf } from "./FilterFields";
import { ListingCard } from "./ListingCard";

/**
 * Horse rosettes listing: country collections, filters, sort, grid and pagination on ONE data source.
 * The URL query holds every choice (country, category, size, price, sort, page), so the sidebar, the mobile drawer, the
 * country buttons and the filter chips cannot disagree, and a result page can be shared.
 * PROTOTYPE rule: choosing a country FILTERS this list. The final behaviour is unconfirmed (see ListingRepository).
 */
export function HorseListing() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const q = useMemo(() => parseQuery(new URLSearchParams(search.toString())), [search]);

  const [data, setData] = useState<Catalogue | null>(null);
  const [failed, setFailed] = useState(false);
  const load = useCallback(() => {
    setFailed(false);
    setData(null);
    listingRepository.getHorseRosettes().then(setData, () => setFailed(true));
  }, []);
  useEffect(load, [load]);

  const update = useCallback(
    (patch: Partial<ListingQuery>) => {
      const next = { ...q, ...patch, page: patch.page ?? 1 };
      const qs = toParams(next).toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [q, router, pathname],
  );

  const facets = useMemo(() => (data ? facetsOf(data.products) : null), [data]);
  const filtered = useMemo(() => (data ? sortProducts(applyFilters(data.products, q), q.sort) : []), [data, q]);
  const view = useMemo(() => paginate(filtered, q.page), [filtered, q.page]);

  if (failed)
    return <StateMessage tone="error" title="We couldn't load the products" body="Check your connection and try again." action={<Button variant="primary" onClick={load}>Try again</Button>} />;
  if (!data || !facets)
    return (
      <div role="status" aria-label="Loading products" className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Skeleton className="hidden h-96 lg:block" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-md" />
          ))}
        </div>
      </div>
    );

  const countryName = (id: string) => data.countries.find((c) => c.id === id)?.name ?? id;
  const catLabel = (id: string) => data.categories.find((c) => c.id === id)?.label ?? id;
  const chips: { key: string; label: string; remove: () => void }[] = [
    ...(q.country ? [{ key: "country", label: countryName(q.country), remove: () => update({ country: undefined }) }] : []),
    ...q.categories.map((c) => ({ key: `cat-${c}`, label: catLabel(c), remove: () => update({ categories: q.categories.filter((x) => x !== c) }) })),
    ...q.diameters.map((d) => ({ key: `dia-${d}`, label: `Ø ${d} cm`, remove: () => update({ diameters: q.diameters.filter((x) => x !== d) }) })),
    ...q.lengths.map((l) => ({ key: `len-${l}`, label: `Length ${l} cm`, remove: () => update({ lengths: q.lengths.filter((x) => x !== l) }) })),
    ...(q.priceMin !== undefined || q.priceMax !== undefined
      ? [{ key: "price", label: `SEK ${q.priceMin ?? facets.price.min}–${q.priceMax ?? facets.price.max}`, remove: () => update({ priceMin: undefined, priceMax: undefined }) }]
      : []),
  ];
  const clearAll = () => update({ country: undefined, categories: [], diameters: [], lengths: [], priceMin: undefined, priceMax: undefined });
  const hrefFor = (page: number) => {
    const qs = toParams({ ...q, page }).toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };
  const countOnly = hasActiveFilters(q) ? chips.length : 0;
  const fields = (prefix: string) => <FilterFields q={q} facets={facets} categories={data.categories} countries={data.countries} onChange={update} idPrefix={prefix} />;

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
      {/* Country collections: the same `country` value as the sidebar group. */}
      <div className="lg:col-span-2">
        <h2 className="mb-3 text-h6">Country collections</h2>
        <div role="group" aria-label="Country collections" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={!q.country}
            onClick={() => update({ country: undefined })}
            className={cx("min-h-11 rounded-full px-4 text-body-sm font-semibold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", !q.country ? "bg-action-primary text-fg-inverse" : "bg-surface-soft text-fg hover:bg-action-secondary-hover")}
          >
            All
          </button>
          {data.countries.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={q.country === c.id}
              aria-label={`${c.name} collection`}
              onClick={() => update({ country: q.country === c.id ? undefined : c.id })}
              className={cx("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-body-sm font-semibold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", q.country === c.id ? "bg-action-primary text-fg-inverse" : "bg-surface-soft text-fg hover:bg-action-secondary-hover")}
            >
              <Flag id={flagOf(c.id)} />
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <aside aria-label="Filters" className="hidden lg:block">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-h5">Filters</h2>
          {hasActiveFilters(q) ? (
            <Button variant="text" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          ) : null}
        </div>
        {fields("side")}
      </aside>

      <section aria-label="Products" className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p role="status" aria-live="polite" className="ds-numeric text-body-sm text-fg-secondary">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-end gap-3">
            <div className="lg:hidden">
              <Dialog
                variant="drawer"
                title="Filters"
                trigger={(open) => (
                  <Button variant="outline" size="md" iconStart="filter" onClick={open}>
                    Filters{countOnly ? ` (${countOnly})` : ""}
                  </Button>
                )}
                footer={(close) => (
                  <>
                    {hasActiveFilters(q) ? (
                      <Button variant="outline" onClick={clearAll}>
                        Clear all
                      </Button>
                    ) : null}
                    <Button variant="primary" onClick={close}>
                      Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
                    </Button>
                  </>
                )}
              >
                {fields("drawer")}
              </Dialog>
            </div>
            <div className="grid gap-1">
              <label htmlFor="listing-sort" className="sr-only">
                Sort by
              </label>
              <Select id="listing-sort" value={q.sort} onChange={(e) => update({ sort: e.target.value as ListingQuery["sort"] })} className="min-w-[12rem]">
                {sortOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    Sort: {s.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {chips.length > 0 ? (
          <ul aria-label="Applied filters" className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={c.remove}
                  aria-label={`Remove filter: ${c.label}`}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-selected-surface px-3 text-body-sm font-semibold text-fg transition-colors duration-fast hover:bg-action-secondary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {c.label}
                  <Icon name="close" size={16} />
                </button>
              </li>
            ))}
            <li>
              <Button variant="text" size="sm" onClick={clearAll}>
                Clear all
              </Button>
            </li>
          </ul>
        ) : null}

        {filtered.length === 0 ? (
          <StateMessage
            className="mt-6"
            icon="search"
            title={q.country && chips.length === 1 ? `No products in the ${countryName(q.country)} collection yet` : "No products match these filters"}
            body="Try removing a filter or choosing another collection."
            action={
              <Button variant="primary" onClick={clearAll}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {view.items.map((p) => (
                <li key={p.id}>
                  <ListingCard product={p} />
                </li>
              ))}
            </ul>
            {view.pages > 1 ? (
              <div className="mt-10">
                <Pagination current={view.page} total={view.pages} hrefFor={hrefFor} />
                <p className="ds-numeric mt-3 text-center text-body-sm text-fg-muted">
                  Showing {(view.page - 1) * PAGE_SIZE + 1}–{Math.min(view.page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
