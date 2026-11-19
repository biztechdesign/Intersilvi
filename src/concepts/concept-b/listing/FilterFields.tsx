"use client";

import { Checkbox, Field, Radio, TextInput } from "@/design-system";
import { Flag, type FlagId } from "../components/BrandMark";
import type { CountryCollection, CountryId, HorseCategory, HorseCategoryId, ListingFacets, ListingQuery } from "@/lib/listing/types";

export const flagOf = (id: CountryId): FlagId => (id === "en" ? "com" : id);

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Group({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 border-b border-line p-0 pb-5">
      <legend className="mb-3 p-0 text-label font-bold text-fg">{legend}</legend>
      <div className="grid gap-1">{children}</div>
    </fieldset>
  );
}

/**
 * The filter groups, shared by the desktop sidebar and the mobile drawer. They hold no state of their own: every value
 * comes from the URL query, so both places always agree and nothing is lost when the drawer opens or closes.
 */
export function FilterFields({
  q,
  facets,
  categories,
  countries,
  onChange,
  idPrefix,
}: {
  q: ListingQuery;
  facets: ListingFacets;
  categories: HorseCategory[];
  countries: CountryCollection[];
  onChange: (patch: Partial<ListingQuery>) => void;
  idPrefix: string;
}) {
  return (
    <div className="grid gap-5">
      <Group legend="Product category">
        <Checkbox id={`${idPrefix}-cat-all`} label="All horse rosettes" name={`${idPrefix}-cat`} checked={q.categories.length === 0} onChange={() => onChange({ categories: [] })} />
        {categories.map((c) => (
          <Checkbox key={c.id} id={`${idPrefix}-cat-${c.id}`} label={c.label} name={`${idPrefix}-cat`} checked={q.categories.includes(c.id as HorseCategoryId)} onChange={() => onChange({ categories: toggle(q.categories, c.id) })} />
        ))}
      </Group>
      <Group legend="Country collection">
        <Radio id={`${idPrefix}-country-all`} label="All countries" name={`${idPrefix}-country`} checked={!q.country} onChange={() => onChange({ country: undefined })} />
        {countries.map((c) => (
          <Radio
            key={c.id}
            id={`${idPrefix}-country-${c.id}`}
            label={
              <span className="inline-flex items-center gap-2">
                <Flag id={flagOf(c.id)} />
                {c.code} <span className="text-fg-muted">{c.name}</span>
              </span>
            }
            name={`${idPrefix}-country`}
            checked={q.country === c.id}
            onChange={() => onChange({ country: c.id })}
          />
        ))}
      </Group>
      {facets.diameters.length > 0 ? (
        <Group legend="Diameter">
          {facets.diameters.map((d) => (
            <Checkbox key={d} id={`${idPrefix}-dia-${d}`} label={`${d} cm`} name={`${idPrefix}-dia`} checked={q.diameters.includes(d)} onChange={() => onChange({ diameters: toggle(q.diameters, d).sort((a, b) => a - b) })} />
          ))}
        </Group>
      ) : null}
      {facets.lengths.length > 0 ? (
        <Group legend="Total length">
          {facets.lengths.map((l) => (
            <Checkbox key={l} id={`${idPrefix}-len-${l}`} label={`${l} cm`} name={`${idPrefix}-len`} checked={q.lengths.includes(l)} onChange={() => onChange({ lengths: toggle(q.lengths, l).sort((a, b) => a - b) })} />
          ))}
        </Group>
      ) : null}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-3 p-0 text-label font-bold text-fg">Price (SEK, excl. VAT)</legend>
        <div className="grid grid-cols-2 gap-3">
          <Field id={`${idPrefix}-pmin`} label="From">
            <TextInput
              id={`${idPrefix}-pmin`}
              type="number"
              inputMode="numeric"
              min={facets.price.min}
              max={facets.price.max}
              placeholder={String(facets.price.min)}
              value={q.priceMin ?? ""}
              onChange={(e) => onChange({ priceMin: e.target.value === "" ? undefined : Number(e.target.value) })}
              className="ds-numeric"
            />
          </Field>
          <Field id={`${idPrefix}-pmax`} label="To">
            <TextInput
              id={`${idPrefix}-pmax`}
              type="number"
              inputMode="numeric"
              min={facets.price.min}
              max={facets.price.max}
              placeholder={String(facets.price.max)}
              value={q.priceMax ?? ""}
              onChange={(e) => onChange({ priceMax: e.target.value === "" ? undefined : Number(e.target.value) })}
              className="ds-numeric"
            />
          </Field>
        </div>
      </fieldset>
    </div>
  );
}
