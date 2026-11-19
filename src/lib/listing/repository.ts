import { countryCollections, horseCategories, horseProducts } from "./mock";
import type { CountryCollection, HorseCategory, ListingProduct } from "./types";

/**
 * Listing repository: the only thing the listing UI loads data through. This PROTOTYPE version returns mock data after
 * a short delay. A real storefront implements the same interface against its catalogue API.
 *
 * Open decision: should a country collection filter this list (as here) or open its own collection page? The UI keeps the
 * choice in one `country` value, so either can be wired without changing the components.
 */
export interface Catalogue {
  products: ListingProduct[];
  countries: CountryCollection[];
  categories: HorseCategory[];
}

export interface ListingRepository {
  getHorseRosettes(): Promise<Catalogue>;
}

export const listingRepository: ListingRepository = {
  async getHorseRosettes() {
    await new Promise((r) => setTimeout(r, 500));
    return { products: horseProducts, countries: countryCollections, categories: horseCategories };
  },
};
