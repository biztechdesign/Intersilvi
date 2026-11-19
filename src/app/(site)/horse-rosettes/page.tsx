import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs, ButtonLink, Icon, Panel, Skeleton, type IconName } from "@/design-system";
import { HorseListing } from "@/concepts/concept-b/listing/HorseListing";
import { BASE, HOME } from "@/concepts/concept-b/base";

export const metadata: Metadata = { title: "Horse rosettes" };

/**
 * Benefits strip. Wording is provisional: delivery and quality claims need client confirmation before launch.
 * "Add your logo in the cart" describes the real cart workflow (Choose logo / motif on each cart line).
 */
const benefits: { icon: IconName; title: string; body: string }[] = [
  { icon: "truck", title: "Fast delivery", body: "Delivery times shown at checkout" },
  { icon: "heart", title: "Popular designs", body: "Placings, clear round and more" },
  { icon: "image", title: "Add your logo in the cart", body: "Choose a logo or motif per item" },
  { icon: "trophy", title: "Trusted quality", body: "Made in Osby, Sweden" },
];

export default function HorseRosettesPage() {
  return (
    <div className="ds-container py-6 lg:py-8">
      <Breadcrumbs items={[{ label: "Home", href: HOME }, { label: "Horse rosettes" }]} />

      <header className="mt-4 max-w-reading">
        <h1 className="text-h1">Horse rosettes</h1>
        <p className="mt-3 text-lead text-fg-secondary">Rosettes for placings, clear round, show jumping, dressage and eventing, in the colours of each country&apos;s competitions.</p>
      </header>

      <ul aria-label="Why order from Intersilvi" className="mt-6 grid gap-3 rounded-lg bg-surface-soft p-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:p-5">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-center gap-3">
            <span aria-hidden="true" className="grid h-10 w-10 flex-none place-items-center rounded-full bg-surface text-fg shadow-xs">
              <Icon name={b.icon} size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-body-sm font-bold text-fg">{b.title}</p>
              <p className="text-body-sm text-fg-secondary">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg" />}>
          <HorseListing />
        </Suspense>
      </div>

      <div className="mt-14">
        <Panel variant="filled" padding="lg" className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 className="text-h3">Looking for something unique?</h2>
            <p className="mt-2 max-w-body text-body text-fg-secondary">Create a rosette that matches your event, club or competition.</p>
          </div>
          <ButtonLink href={`${BASE}/design-your-own`} variant="primary" iconEnd="arrow-right">
            Design your own rosette
          </ButtonLink>
        </Panel>
      </div>
    </div>
  );
}
