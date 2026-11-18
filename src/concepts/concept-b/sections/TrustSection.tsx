import { trustBadges } from "@/content/concept-b";
import { Icon } from "../components/Icon";

/**
 * Trust badges: a light band of four reassurances. Each has a navy icon in a white circle, a bold title and a short line,
 * with thin dividers between the columns on desktop.
 * Copy is the client's own (trustBadges in src/content/concept-b.ts).
 */
export function TrustSection() {
  return (
    <section aria-label="Why order from Intersilvi" className="bg-surface-soft text-fg">
      <ul data-stagger="" className="ds-container grid gap-y-6 py-9 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:py-10">
        {trustBadges.map((b) => (
          <li key={b.title} className="flex items-start gap-4 lg:gap-3.5 lg:border-l lg:border-line-strong/60 lg:px-5 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0">
            <span aria-hidden="true" className="grid h-12 w-12 flex-none place-items-center rounded-full bg-surface text-fg shadow-xs">
              <Icon name={b.icon} size={22} />
            </span>
            <div className="min-w-0">
              <p className="font-bold">{b.title}</p>
              <p className="mt-0.5 text-body-sm text-fg-secondary xl:whitespace-nowrap">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
