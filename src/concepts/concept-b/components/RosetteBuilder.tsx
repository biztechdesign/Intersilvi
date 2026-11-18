"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { RosetteArt } from "@/components/art/RosetteArt";
import { designSteps } from "@/content/homepage";
import { ribbonName } from "@/lib/commerce/mock/ribbons";
import type { RibbonColour, RibbonColourId, RosetteArtSpec, RosetteShape } from "@/lib/commerce/types";
import { Icon, cx } from "@/design-system";
import { ButtonLink as ConceptButtonLink } from "./Button";
import { BASE } from "../base";

/* ---------- Options (presentation only; the real catalogue lives in the designer) ---------- */

const STEP_HEADINGS: Record<string, string> = {
  type: "Pick a style",
  centre: "Choose the centre",
  tails: "Shape the tails",
  text: "Add your text",
  extras: "Finishing touches",
};

/** Colourways to start from (Concept B). Colour pairings only: no sales data, so nothing is called "popular". */
const COMBOS: { name: string; a: RibbonColourId; b: RibbonColourId }[] = [
  { name: "Navy and gold", a: "navy", b: "gold" },
  { name: "Royal blue and white", a: "royal-blue", b: "white" },
  { name: "Red and gold", a: "red", b: "gold" },
  { name: "Green and white", a: "green", b: "white" },
  { name: "Purple and silver", a: "purple", b: "silver" },
  { name: "Black and gold", a: "black", b: "gold" },
  { name: "Pink and white", a: "pink", b: "white" },
];

/** Step intros that differ from the shared designSteps copy because this preview offers fewer choices. */
const STEP_INTROS: Record<string, string> = {
  type: "Start from a colourway, then pick your main ribbon colour.",
};

const CENTRES = ["1st", "2nd", "3rd", "Logo"] as const;
type Centre = (typeof CENTRES)[number];

const TAIL_COUNTS = [1, 2, 3, 4] as const;
const INKS: RibbonColourId[] = ["gold", "white", "silver", "black"];

const EXTRAS = [
  { id: "tassels", label: "Tassels" },
  { id: "fastener", label: "Fastener" },
  { id: "cut", label: "Tail cut" },
] as const;

interface Config {
  combo: number | null;
  shape: RosetteShape;
  ringA: RibbonColourId;
  ringB: RibbonColourId;
  centre: RibbonColourId;
  centreLabel: Centre;
  tailCount: number;
  tail: RibbonColourId;
  text: string;
  ink: RibbonColourId;
  extras: string[];
}

const START: Config = {
  combo: 0,
  shape: "luxury",
  ringA: "navy",
  ringB: "gold",
  centre: "navy",
  centreLabel: "1st",
  tailCount: 2,
  tail: "navy",
  text: "",
  ink: "gold",
  extras: [],
};

function toSpec(c: Config, overrides: Partial<RosetteArtSpec> = {}): RosetteArtSpec {
  return {
    shape: c.shape,
    rings: c.shape === "luxury" ? [c.ringA, c.ringB, c.ringA] : [c.ringA, c.ringB],
    tails: Array.from({ length: c.tailCount }, (_, i) => (i % 2 === 0 ? c.tail : c.ringB)),
    centre: c.centre,
    centreLabel: c.centreLabel === "Logo" ? "LOGO" : c.centreLabel,
    tailText: c.text.trim() || undefined,
    tailInk: c.ink,
    ...overrides,
  };
}

/* ---------- Small building blocks ---------- */

function Group({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <p id={id} className="text-label text-fg">
          {label}
        </p>
        {value ? <p className="text-label font-semibold text-fg-link">{value}</p> : null}
      </div>
      {children}
    </div>
  );
}

const optionCard =
  "grid w-full place-items-center gap-1.5 rounded-md border bg-surface p-2.5 text-center transition-[border-color,background-color,box-shadow] duration-fast ease-standard hover:border-line-strong";
const optionSelected = "border-brand-yellow bg-badge-custom-surface shadow-[0_0_0_1px_rgb(var(--ds-color-brand-yellow))] hover:border-brand-yellow";

function OptionButton({ selected, onClick, children, label }: { selected: boolean; onClick: () => void; children: ReactNode; label: string }) {
  return (
    <button type="button" aria-pressed={selected} aria-label={label} onClick={onClick} className={cx(optionCard, selected ? optionSelected : "border-line")}>
      {children}
    </button>
  );
}

function Swatches({ colours, value, onChange, only }: { colours: RibbonColour[]; value: RibbonColourId; onChange: (id: RibbonColourId) => void; only?: RibbonColourId[] }) {
  const list = only ? colours.filter((c) => only.includes(c.id)) : colours;
  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            aria-pressed={value === c.id}
            aria-label={c.name}
            title={c.name}
            onClick={() => onChange(c.id)}
            className={cx(
              "block h-9 w-9 rounded-md shadow-[inset_0_0_0_1px_rgb(11_29_64/0.14)] transition-shadow duration-fast",
              value === c.id && "shadow-[inset_0_0_0_1px_rgb(11_29_64/0.14),0_0_0_2px_rgb(var(--ds-color-surface)),0_0_0_4px_rgb(var(--ds-color-brand-yellow))]",
            )}
            style={{ background: `linear-gradient(135deg, ${c.hex} 0%, ${c.hex} 45%, color-mix(in srgb, ${c.hex} 70%, white) 60%, ${c.hex} 78%)` }}
          />
        </li>
      ))}
    </ul>
  );
}

/** A row that scrolls sideways, with previous/next arrows that disable at either end. */
function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const arrow =
    "grid h-8 w-8 flex-none place-items-center rounded-full border border-line-strong bg-surface text-fg transition-colors duration-fast hover:bg-surface-alt disabled:cursor-default disabled:opacity-35 disabled:hover:bg-surface";
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label={`Previous ${label}`} onClick={() => scroll(-1)} disabled={edge.start} className={arrow}>
        <Icon name="chevron-left" size={16} />
      </button>
      <ul
        ref={ref}
        onScroll={update}
        aria-label={label}
        className="flex min-w-0 flex-1 snap-x gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <button type="button" aria-label={`Next ${label}`} onClick={() => scroll(1)} disabled={edge.end} className={arrow}>
        <Icon name="chevron-right" size={16} />
      </button>
    </div>
  );
}

/** One ribbon swatch: a short ribbon end with a notched tail and a satin sheen. */
function RibbonSwatch({ colour, selected, onSelect }: { colour: RibbonColour; selected: boolean; onSelect: () => void }) {
  return (
    <li className="flex-none snap-start">
      <button
        type="button"
        aria-pressed={selected}
        aria-label={colour.name}
        title={colour.name}
        onClick={onSelect}
        className={cx(
          "grid place-items-center rounded-md border p-1.5 transition-[border-color,background-color] duration-fast",
          selected ? "border-brand-yellow bg-badge-custom-surface" : "border-transparent hover:border-line",
        )}
      >
        <span
          aria-hidden="true"
          className="block h-14 w-8 [clip-path:polygon(0_0,100%_0,100%_100%,50%_84%,0_100%)]"
          style={{ background: `linear-gradient(115deg, ${colour.hex} 0%, ${colour.hex} 38%, color-mix(in srgb, ${colour.hex} 62%, white) 52%, ${colour.hex} 68%, color-mix(in srgb, ${colour.hex} 80%, black) 100%)` }}
        />
      </button>
    </li>
  );
}

/* ---------- The builder ---------- */

/**
 * Homepage rosette builder (Concept B): a five-step preview of the designer with a live illustration.
 * Presentation only: nothing is priced, saved or added to a cart. The last step hands the choices to the designer
 * (`/design-your-own`) as query parameters. Steps and their descriptions come from designSteps (homepage.ts).
 */
export function RosetteBuilder({ colours }: { colours: RibbonColour[] }) {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(0);
  const [c, setC] = useState<Config>(START);
  const headingId = useId();

  const set = (patch: Partial<Config>) => setC((prev) => ({ ...prev, ...patch }));
  const go = (i: number) => {
    setStep(i);
    setVisited((v) => Math.max(v, i));
  };

  const spec = useMemo(() => toSpec(c), [c]);
  const colourway = `${ribbonName(c.ringA)} & ${ribbonName(c.ringB)}`;

  const stepValue = [
    c.combo !== null ? COMBOS[c.combo]!.name : colourway,
    c.centreLabel === "Logo" ? "Your logo" : `Centre ${c.centreLabel}`,
    `${c.tailCount} ${c.tailCount === 1 ? "tail" : "tails"}`,
    c.text.trim() ? "Text added" : "No text",
    c.extras.length ? `${c.extras.length} selected` : "No extras",
  ];

  const designerHref = `${BASE}/design-your-own?${new URLSearchParams({
    model: c.shape,
    rings: [c.ringA, c.ringB].join(","),
    centre: c.centre,
    badge: c.centreLabel.toLowerCase(),
    tails: String(c.tailCount),
    tail: c.tail,
    ...(c.text.trim() ? { text: c.text.trim(), ink: c.ink } : {}),
    ...(c.extras.length ? { extras: c.extras.join(",") } : {}),
  }).toString()}`;

  const current = designSteps[step]!;
  const last = step === designSteps.length - 1;

  return (
    <div className="overflow-hidden rounded-lg bg-surface shadow-md">
      {/* Stepper */}
      <nav aria-label="Design steps" className="border-b border-line">
        <ol className="grid grid-cols-5">
          {designSteps.map((s, i) => {
            const done = i !== step && i <= visited;
            const active = i === step;
            return (
              <li key={s.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active ? "step" : undefined}
                  className={cx(
                    "relative flex h-full w-full flex-col items-center gap-1.5 px-1 py-3 text-center transition-colors duration-fast sm:flex-row sm:gap-2.5 sm:px-3 sm:text-left lg:px-4",
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-brand-navy after:transition-transform after:duration-base after:ease-emphasized",
                    active ? "bg-selected-surface after:scale-x-100" : "after:scale-x-0 hover:bg-surface-alt",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "grid h-7 w-7 flex-none place-items-center rounded-full text-caption font-bold",
                      active ? "bg-brand-navy text-fg-inverse" : done ? "bg-brand-yellow text-fg" : "text-fg-muted shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-line-strong))]",
                    )}
                  >
                    {done && !active ? <Icon name="check" size={14} /> : i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={cx("block text-label font-bold sm:text-body-sm md:text-body", active ? "font-extrabold text-fg" : "text-fg-secondary")}>{s.title}</span>
                    <span className={cx("hidden truncate text-label md:block lg:text-body-sm", active ? "font-medium text-fg-secondary" : "text-fg-muted")}>{stepValue[i]}</span>
                  </span>
                  {done && !active ? <span className="sr-only">(done)</span> : null}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Preview and controls */}
      <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-8 lg:p-7">
        <div className="relative mx-auto grid aspect-square w-full max-w-[14rem] place-items-center sm:max-w-[18rem] md:max-w-none">
          <div aria-hidden="true" className="absolute inset-[3%] rounded-full bg-surface-sunken" />
          <div key={JSON.stringify(spec)} className="relative h-full animate-fade-in">
            <RosetteArt
              spec={spec}
              label={`Preview: rosette in ${colourway}, ${c.tailCount} ${c.tailCount === 1 ? "tail" : "tails"}`}
              className="h-full w-auto drop-shadow-[0_18px_22px_rgba(11,26,61,0.22)]"
            />
          </div>
        </div>

        <section aria-labelledby={headingId} className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-6">
          <div>
            <p className="text-label font-semibold text-fg-muted">
              Step {step + 1} of {designSteps.length}
            </p>
            <h3 id={headingId} className="mt-1 text-h4">
              {STEP_HEADINGS[current.id] ?? current.title}
            </h3>
            <p className="mt-1 text-body-sm text-fg-secondary">{STEP_INTROS[current.id] ?? current.body}</p>
          </div>

          {current.id === "type" ? (
            <>
              <Group label="Colourways to start from" value={c.combo !== null ? COMBOS[c.combo]!.name : "Your own mix"}>
                <Carousel label="colourways">
                  {COMBOS.map((combo, i) => (
                    <li key={combo.name} className="w-[4.5rem] flex-none snap-start">
                      <OptionButton
                        label={combo.name}
                        selected={c.combo === i}
                        onClick={() => set({ combo: i, ringA: combo.a, ringB: combo.b, tail: combo.a, centre: combo.a })}
                      >
                        <RosetteArt
                          spec={toSpec({ ...c, ringA: combo.a, ringB: combo.b, tail: combo.a, centre: combo.a }, { centreLabel: undefined, tailText: undefined })}
                          className="h-16 w-auto"
                        />
                      </OptionButton>
                    </li>
                  ))}
                </Carousel>
              </Group>
              <Group label="Ribbons in many colours" value={ribbonName(c.ringA)}>
                <Carousel label="ribbon colours">
                  {colours.map((col) => (
                    <RibbonSwatch key={col.id} colour={col} selected={c.ringA === col.id} onSelect={() => set({ ringA: col.id, tail: col.id, combo: null })} />
                  ))}
                </Carousel>
              </Group>
            </>
          ) : null}

          {current.id === "centre" ? (
            <>
              <Group label="Centre badge" value={c.centreLabel === "Logo" ? "Your logo, printed in four colours" : c.centreLabel}>
                <div className="grid grid-cols-4 gap-2">
                  {CENTRES.map((label) => (
                    <OptionButton key={label} label={label === "Logo" ? "Your logo" : `${label} placing`} selected={c.centreLabel === label} onClick={() => set({ centreLabel: label })}>
                      <RosetteArt spec={toSpec(c, { centreLabel: label === "Logo" ? "LOGO" : label, tailText: undefined })} className="h-14 w-auto" />
                      <span className="text-label font-semibold text-fg">{label === "Logo" ? "Your logo" : label}</span>
                    </OptionButton>
                  ))}
                </div>
              </Group>
              <Group label="Centre colour" value={ribbonName(c.centre)}>
                <Swatches colours={colours} value={c.centre} onChange={(id) => set({ centre: id, combo: null })} />
              </Group>
            </>
          ) : null}

          {current.id === "tails" ? (
            <>
              <Group label="Number of tails" value={`${c.tailCount} ${c.tailCount === 1 ? "tail" : "tails"}`}>
                <div className="grid grid-cols-4 gap-2">
                  {TAIL_COUNTS.map((n) => (
                    <OptionButton key={n} label={`${n} ${n === 1 ? "tail" : "tails"}`} selected={c.tailCount === n} onClick={() => set({ tailCount: n })}>
                      <RosetteArt spec={toSpec(c, { tails: Array.from({ length: n }, (_, i) => (i % 2 === 0 ? c.tail : c.ringB)), tailText: undefined })} className="h-14 w-auto" />
                      <span className="text-label font-semibold text-fg">{n}</span>
                    </OptionButton>
                  ))}
                </div>
              </Group>
              <Group label="Tail colour" value={ribbonName(c.tail)}>
                <Swatches colours={colours} value={c.tail} onChange={(id) => set({ tail: id, combo: null })} />
              </Group>
            </>
          ) : null}

          {current.id === "text" ? (
            <>
              <div className="grid gap-2">
                <label htmlFor={`${headingId}-text`} className="text-label text-fg">
                  Text on the tails
                </label>
                <input
                  id={`${headingId}-text`}
                  type="text"
                  value={c.text}
                  maxLength={24}
                  placeholder="e.g. Spring Show 2026"
                  onChange={(e) => set({ text: e.target.value })}
                  className="min-h-12 w-full rounded-full border border-line-input bg-surface px-5 text-body text-fg transition-[border-color,box-shadow] duration-fast placeholder:text-fg-muted hover:border-fg-secondary focus-visible:border-focus focus-visible:shadow-[0_0_0_1px_rgb(var(--ds-color-focus))] focus-visible:outline-none"
                />
                <p className="text-caption text-fg-muted">{24 - c.text.length} characters left</p>
              </div>
              <Group label="Print colour" value={ribbonName(c.ink)}>
                <Swatches colours={colours} value={c.ink} onChange={(id) => set({ ink: id })} only={INKS} />
              </Group>
            </>
          ) : null}

          {current.id === "extras" ? (
            <Group label="Add to your rosette" value={c.extras.length ? `${c.extras.length} selected` : undefined}>
              <ul className="flex flex-wrap gap-2">
                {EXTRAS.map((x) => {
                  const on = c.extras.includes(x.id);
                  return (
                    <li key={x.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => set({ extras: on ? c.extras.filter((e) => e !== x.id) : [...c.extras, x.id] })}
                        className={cx(
                          "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-body-sm font-semibold transition-colors duration-fast",
                          on ? "border-brand-yellow bg-badge-custom-surface text-fg" : "border-line-strong bg-surface text-fg hover:border-fg-secondary",
                        )}
                      >
                        <Icon name={on ? "check" : "plus"} size={16} />
                        {x.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="text-caption text-fg-muted">You choose the details of each extra in the designer.</p>
            </Group>
          ) : null}
        </section>
      </div>

      {/* Summary and navigation */}
      <div className="flex flex-col gap-4 border-t border-line bg-surface-alt px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
        <p aria-live="polite" className="min-w-0">
          <span className="block text-body-sm font-bold text-fg">{colourway}</span>
          <span className="block text-caption text-fg-secondary">
            {stepValue[1]} · {stepValue[2]}
          </span>
        </p>
        <div className="flex flex-none gap-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-button font-bold text-fg shadow-[inset_0_0_0_1.5px_rgb(var(--ds-color-action-primary))] transition-colors duration-fast hover:bg-surface-soft"
            >
              <Icon name="arrow-right" size={16} className="rotate-180" />
              Back
            </button>
          ) : null}
          {last ? (
            <ConceptButtonLink href={designerHref} variant="design">
              Continue in the designer
            </ConceptButtonLink>
          ) : (
            <button
              type="button"
              onClick={() => go(step + 1)}
              className="group/button inline-flex min-h-11 items-center gap-2 rounded-full bg-action-accent px-6 text-button font-bold text-fg-on-accent transition-[background-color,transform] duration-base hover:bg-action-accent-hover motion-safe:hover:-translate-y-lift"
            >
              Next: {designSteps[step + 1]!.title}
              <Icon name="arrow-right" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
