import type { CountryId, HorseCategoryId, ListingFacets, ListingProduct, ListingQuery, SortId } from "./types";

export const PAGE_SIZE = 12;

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name-asc", label: "Name: A to Z" },
];

const SORT_IDS = sortOptions.map((s) => s.id);
const COUNTRY_IDS: CountryId[] = ["se", "en", "no", "dk", "fi", "de"];
const CATEGORY_IDS: HorseCategoryId[] = ["dressage", "show-jumping", "clear-round", "eventing", "special"];

const nums = (v: string | null) =>
  (v ?? "")
    .split(",")
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);

export const emptyQuery: ListingQuery = { categories: [], diameters: [], lengths: [], sort: "recommended", page: 1 };

/** The URL is the single source of truth for the filters, so links are shareable and drawer/sidebar never disagree. */
export function parseQuery(sp: URLSearchParams): ListingQuery {
  const country = sp.get("country") as CountryId | null;
  const sort = sp.get("sort") as SortId | null;
  const pmin = Number(sp.get("pmin"));
  const pmax = Number(sp.get("pmax"));
  return {
    country: country && COUNTRY_IDS.includes(country) ? country : undefined,
    categories: (sp.get("cat") ?? "").split(",").filter((c): c is HorseCategoryId => CATEGORY_IDS.includes(c as HorseCategoryId)),
    diameters: nums(sp.get("dia")),
    lengths: nums(sp.get("len")),
    priceMin: sp.get("pmin") && Number.isFinite(pmin) ? pmin : undefined,
    priceMax: sp.get("pmax") && Number.isFinite(pmax) ? pmax : undefined,
    sort: sort && SORT_IDS.includes(sort) ? sort : "recommended",
    page: Math.max(1, Math.floor(Number(sp.get("page"))) || 1),
  };
}

export function toParams(q: ListingQuery): URLSearchParams {
  const p = new URLSearchParams();
  if (q.country) p.set("country", q.country);
  if (q.categories.length) p.set("cat", q.categories.join(","));
  if (q.diameters.length) p.set("dia", q.diameters.join(","));
  if (q.lengths.length) p.set("len", q.lengths.join(","));
  if (q.priceMin !== undefined) p.set("pmin", String(q.priceMin));
  if (q.priceMax !== undefined) p.set("pmax", String(q.priceMax));
  if (q.sort !== "recommended") p.set("sort", q.sort);
  if (q.page > 1) p.set("page", String(q.page));
  return p;
}

export function applyFilters(products: ListingProduct[], q: ListingQuery): ListingProduct[] {
  return products.filter(
    (p) =>
      (!q.country || p.countries.includes(q.country)) &&
      (q.categories.length === 0 || q.categories.includes(p.categoryId)) &&
      (q.diameters.length === 0 || q.diameters.includes(p.diameterCm)) &&
      (q.lengths.length === 0 || q.lengths.includes(p.lengthCm)) &&
      (q.priceMin === undefined || p.price.amount >= q.priceMin) &&
      (q.priceMax === undefined || p.price.amount <= q.priceMax),
  );
}

export function sortProducts(products: ListingProduct[], sort: SortId): ListingProduct[] {
  const list = [...products];
  if (sort === "price-asc") list.sort((a, b) => a.price.amount - b.price.amount);
  if (sort === "price-desc") list.sort((a, b) => b.price.amount - a.price.amount);
  if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE): { items: T[]; page: number; pages: number } {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(page, pages);
  return { items: items.slice((current - 1) * size, current * size), page: current, pages };
}

/** Filter options come from the product data itself, never from constants. */
export function facetsOf(products: ListingProduct[]): ListingFacets {
  const prices = products.map((p) => p.price.amount);
  return {
    diameters: [...new Set(products.map((p) => p.diameterCm))].sort((a, b) => a - b),
    lengths: [...new Set(products.map((p) => p.lengthCm))].sort((a, b) => a - b),
    price: { min: Math.min(...prices), max: Math.max(...prices) },
  };
}

export const hasActiveFilters = (q: ListingQuery) =>
  !!q.country || q.categories.length > 0 || q.diameters.length > 0 || q.lengths.length > 0 || q.priceMin !== undefined || q.priceMax !== undefined;
