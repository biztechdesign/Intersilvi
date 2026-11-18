import type { Category, Market, Product, RibbonColour } from "./types";
import { categories, featuredProducts, markets } from "./mock/catalog";
import { ribbonColours } from "./mock/ribbons";
import { showcaseProducts } from "./mock/showcase";

/**
 * The only way UI code reads commerce data.
 * Swap the mock implementation for a real headless backend later; components stay unchanged.
 */
export interface CommerceAdapter {
  getMarkets(): Promise<Market[]>;
  getCategories(): Promise<Category[]>;
  getFeaturedProducts(): Promise<Product[]>;
  /** A wider, spec-carrying selection across rosettes, trophies, medals and plaques (used by Concept B). */
  getShowcaseProducts(): Promise<Product[]>;
  getRibbonColours(): Promise<RibbonColour[]>;
}

export const mockCommerce: CommerceAdapter = {
  async getMarkets() {
    return markets;
  },
  async getCategories() {
    return categories;
  },
  async getFeaturedProducts() {
    return featuredProducts;
  },
  async getShowcaseProducts() {
    return showcaseProducts;
  },
  async getRibbonColours() {
    return ribbonColours;
  },
};

export const commerce: CommerceAdapter = mockCommerce;
