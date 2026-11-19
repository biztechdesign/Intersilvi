import type { RosetteArtSpec } from "@/lib/commerce/types";
import type { CountryCollection, CountryId, HorseCategory, HorseCategoryId, ListingProduct, ProductDesign } from "./types";

/**
 * PROTOTYPE data. Names, sizes, prices and collections are invented to exercise the listing (filters, sort, designs,
 * pagination). Replace with the commerce backend's catalogue; nothing here is a real article number or price.
 */

export const countryCollections: CountryCollection[] = [
  { id: "se", code: "SV", name: "Sweden" },
  { id: "en", code: "ENG", name: "England" },
  { id: "no", code: "NO", name: "Norway" },
  { id: "dk", code: "DK", name: "Denmark" },
  { id: "fi", code: "FI", name: "Finland" },
  { id: "de", code: "DE", name: "Germany" },
];

export const horseCategories: HorseCategory[] = [
  { id: "dressage", label: "Dressage" },
  { id: "show-jumping", label: "Show jumping" },
  { id: "clear-round", label: "Clear round" },
  { id: "eventing", label: "Eventing" },
  { id: "special", label: "Special rosettes" },
];

type Combo = { name: string; rings: [string, string]; centre: string };
const COMBOS: Combo[] = [
  { name: "Blue / Yellow", rings: ["royal-blue", "yellow"], centre: "yellow" },
  { name: "Red / White", rings: ["red", "white"], centre: "white" },
  { name: "Navy / Gold", rings: ["navy", "gold"], centre: "gold" },
  { name: "Green / White", rings: ["green", "white"], centre: "white" },
  { name: "Purple / Silver", rings: ["purple", "silver"], centre: "silver" },
  { name: "Pink / White", rings: ["pink", "white"], centre: "white" },
  { name: "Orange / Black", rings: ["orange", "black"], centre: "black" },
];

function designs(seed: number, count: number, label: string): ProductDesign[] {
  return Array.from({ length: count }, (_, i) => {
    const c = COMBOS[(seed + i) % COMBOS.length]!;
    const art: RosetteArtSpec = { shape: "classic", rings: [...c.rings] as never, tails: [c.rings[0], c.rings[1], c.rings[0]] as never, centre: c.centre as never, centreLabel: label };
    return { id: `d${i + 1}`, name: c.name, art };
  });
}

interface Seed {
  name: string;
  category: HorseCategoryId;
  label: string;
  countries: CountryId[];
}

const ALL: CountryId[] = ["se", "en", "no", "dk", "fi", "de"];
const SEEDS: Seed[] = [
  { name: "Dressage 1st", category: "dressage", label: "1st", countries: ALL },
  { name: "Dressage 2nd", category: "dressage", label: "2nd", countries: ALL },
  { name: "Dressage 3rd", category: "dressage", label: "3rd", countries: ["se", "en", "no", "fi"] },
  { name: "Dressage 4th", category: "dressage", label: "4th", countries: ["se", "dk", "de"] },
  { name: "Show jumping 1st", category: "show-jumping", label: "1st", countries: ALL },
  { name: "Show jumping 2nd", category: "show-jumping", label: "2nd", countries: ALL },
  { name: "Show jumping 3rd", category: "show-jumping", label: "3rd", countries: ["se", "en", "dk", "de"] },
  { name: "Show jumping 4th", category: "show-jumping", label: "4th", countries: ["no", "fi"] },
  { name: "Eventing 1st", category: "eventing", label: "1st", countries: ["se", "en", "de"] },
  { name: "Eventing 2nd", category: "eventing", label: "2nd", countries: ["se", "en", "de"] },
  { name: "Eventing 3rd", category: "eventing", label: "3rd", countries: ["en", "de"] },
  { name: "Clear round", category: "clear-round", label: "CR", countries: ALL },
  { name: "Clear round, large", category: "clear-round", label: "CR", countries: ["se", "en", "no"] },
  { name: "Clear round, mini", category: "clear-round", label: "CR", countries: ["se", "dk", "fi"] },
  { name: "Champion", category: "special", label: "CH", countries: ALL },
  { name: "Reserve champion", category: "special", label: "RCH", countries: ["se", "en", "no", "dk"] },
  { name: "Best turned out", category: "special", label: "BTO", countries: ["en", "de"] },
  { name: "Rider's award", category: "special", label: "RA", countries: ["se", "no", "fi"] },
  { name: "Junior award", category: "special", label: "JA", countries: ["se", "en"] },
];

const DIAMETERS = [14, 16, 18, 20];
const LENGTHS = [32, 38, 42, 50];

export const horseProducts: ListingProduct[] = SEEDS.map((s, i) => {
  const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: `hr-${slug}`,
    name: s.name,
    slug,
    href: `/horse-rosettes/${slug}`,
    categoryId: s.category,
    countries: s.countries,
    diameterCm: DIAMETERS[i % DIAMETERS.length]!,
    lengthCm: LENGTHS[(i * 3) % LENGTHS.length]!,
    price: { amount: 38 + ((i * 7) % 11) * 6, currency: "SEK" },
    designs: designs(i, 3 + (i % 4), s.label),
    requiresOptions: true,
    source: "synthetic",
  };
});
