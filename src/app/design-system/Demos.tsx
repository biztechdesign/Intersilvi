"use client";

import { useRef, useState } from "react";
import {
  ActiveFilters,
  Button,
  Checkbox,
  Dialog,
  Field,
  Fieldset,
  IconButton,
  QuantityStepper,
  Select,
  Slider,
  TierPricing,
  type ActiveFilter,
  type Tier,
  useToast,
} from "@/design-system";

/** Client-side demos for the showcase. They wire shared components to local state only (no commerce logic). */

const FILTER_OPTIONS = [
  { id: "horse", label: "Horse rosettes" },
  { id: "dog", label: "Dog show rosettes" },
  { id: "sport", label: "Sport awards" },
  { id: "in-stock", label: "In stock" },
];

export function FilterDemo() {
  const [active, setActive] = useState<ActiveFilter[]>([
    { id: "horse", label: "Horse rosettes" },
    { id: "in-stock", label: "In stock" },
  ]);
  const isOn = (id: string) => active.some((f) => f.id === id);
  const toggle = (id: string, label: string) => setActive((prev) => (isOn(id) ? prev.filter((f) => f.id !== id) : [...prev, { id, label }]));

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Dialog
          variant="drawer"
          title="Filter"
          description="Narrow the range. Results update when you close the panel."
          trigger={(open) => (
            <Button variant="outline" iconStart="filter" onClick={open}>
              Filter
              {active.length ? <span className="ds-numeric ml-1 rounded-full bg-selected px-2 text-caption text-fg-inverse">{active.length}</span> : null}
            </Button>
          )}
          footer={(close) => (
            <>
              <Button variant="text" onClick={() => setActive([])}>
                Clear all
              </Button>
              <Button onClick={close}>Show results</Button>
            </>
          )}
        >
          <Fieldset legend="Category and availability">
            {FILTER_OPTIONS.map((o) => (
              <Checkbox key={o.id} id={`flt-${o.id}`} label={o.label} checked={isOn(o.id)} onChange={() => toggle(o.id, o.label)} />
            ))}
          </Fieldset>
        </Dialog>
        <div className="w-full sm:w-64">
          <Field id="sort" label="Sort by">
            <Select id="sort" defaultValue="relevance">
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </Select>
          </Field>
        </div>
      </div>
      <ActiveFilters filters={active} onRemove={(id) => setActive((p) => p.filter((f) => f.id !== id))} onClear={() => setActive([])} />
    </div>
  );
}

export function DialogDemo() {
  return (
    <Dialog
      title="Quickorder"
      description="Add several items by article number."
      trigger={(open) => (
        <Button variant="secondary" iconStart="list" onClick={open}>
          Open Quickorder dialog
        </Button>
      )}
      footer={(close) => (
        <>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Add to cart</Button>
        </>
      )}
    >
      <p className="text-body-sm text-fg-secondary">Example content. Quickorder&apos;s behaviour is an open decision in PRODUCT.md.</p>
    </Dialog>
  );
}

export function DrawerMenuDemo() {
  return (
    <Dialog
      variant="drawer"
      title="Menu"
      trigger={(open) => <IconButton icon="menu" label="Open menu" variant="outline" onClick={open} />}
    >
      <ul className="grid">
        {["Design your own", "Horse rosettes", "Swedish stock rosettes", "Sport awards", "Accessories"].map((l) => (
          <li key={l} className="border-b border-line">
            <a href="#nav" className="flex min-h-12 items-center text-body-lg font-semibold no-underline">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}

export function ToastDemo() {
  const toast = useToast();
  return (
    <>
      <Button variant="accent" iconStart="bag" onClick={() => toast.show({ title: "Added to cart", body: "Luxury Rosette × 25" })}>
        Show cart feedback
      </Button>
      {toast.node}
    </>
  );
}

export function SliderDemo() {
  const [v, setV] = useState(60);
  return (
    <Field id="font-size" label="Engraving text size" help="Example control. Real limits come from the trophy feature module.">
      <Slider id="font-size" min={30} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} valueText={`${v}%`} />
    </Field>
  );
}

export function TierDemo({ tiers }: { tiers: Tier[] }) {
  const [qty, setQty] = useState(25);
  return (
    <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
      <QuantityStepper label="Quantity" value={qty} onChange={setQty} />
      <TierPricing tiers={tiers} activeQuantity={qty} />
    </div>
  );
}

/** Replays the hero entrance by remounting it. The animation itself is plain CSS (.ds-enter). */
export function EntranceDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="grid gap-4">
      <div key={run} className="ds-inverse rounded-lg bg-surface-inverse p-6 text-fg-inverse sm:p-8">
        <p className="ds-enter text-h3">Award rosettes, trophies and medals</p>
        <p className="ds-enter ds-enter-2 mt-3 max-w-[40ch] text-body text-fg-inverse-muted">Supporting text follows 80ms later, then the actions.</p>
        <div className="ds-enter ds-enter-3 mt-5 flex flex-wrap gap-3">
          <Button variant="accent" iconEnd="arrow-right">Design your own</Button>
          <Button variant="outline" inverse>Explore products</Button>
        </div>
      </div>
      <Button variant="secondary" size="sm" iconStart="rotate" className="justify-self-start" onClick={() => setRun((r) => r + 1)}>
        Replay entrance
      </Button>
    </div>
  );
}

/** Replays a section reveal. On the site, RevealObserver marks below-the-fold elements pending and reveals each once, as it scrolls into view. */
export function RevealDemo() {
  const ref = useRef<HTMLDivElement>(null);
  function replay() {
    const el = ref.current;
    if (!el) return;
    el.removeAttribute("data-revealed");
    el.setAttribute("data-reveal-pending", "");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.removeAttribute("data-reveal-pending");
        el.setAttribute("data-revealed", "");
      }),
    );
  }
  return (
    <div className="grid gap-4">
      <div className="rounded-lg border border-line bg-surface-alt p-6 sm:p-8">
        <div ref={ref} data-stagger="" className="grid gap-3">
          <p className="text-h3 text-fg">Find the right award for your event</p>
          <p className="max-w-[40ch] text-body text-fg-secondary">The heading, this paragraph and the action fade in and rise 24px, 100ms apart, once, as the group enters the viewport.</p>
          <span className="justify-self-start text-button font-bold text-fg-link underline decoration-line-strong underline-offset-[0.3em]">View all awards</span>
        </div>
      </div>
      <Button variant="secondary" size="sm" iconStart="rotate" className="justify-self-start" onClick={replay}>
        Replay reveal
      </Button>
    </div>
  );
}
