import { delivery } from "@/content/homepage";
import type { LeadTimeContent } from "@/lib/content/types";
import { ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import { PendingFact } from "../components/PendingFact";

/** "7 workdays" → { amount: "7", unit: "workdays" }; anything without a leading number stays whole. */
function splitDays(value: string) {
  const m = value.match(/^(\d+(?:[–-]\d+)?)\s+(.+)$/);
  return m ? { amount: m[1], unit: m[2] } : { amount: value, unit: "" };
}

function LeadTime({ lt }: { lt: LeadTimeContent }) {
  const custom = lt.id === "custom";
  return (
    <div className={`flex flex-col p-7 sm:p-8 lg:p-10 ${custom ? "ds-inverse bg-surface-inverse text-fg-inverse" : "bg-surface-alt text-fg"}`}>
      <h3 className="text-h5">{lt.title}</h3>
      <p className="mt-5">
        <PendingFact
          fact={lt.workdays}
          tone={custom ? "dark" : "light"}
          render={(v) => {
            const { amount, unit } = splitDays(v);
            return (
              <span className="inline-flex items-baseline gap-3.5">
                <span className={`ds-numeric text-stat ${custom ? "text-brand-yellow" : "text-fg"}`}>{amount}</span>
                {unit ? <span className="text-lead font-bold">{unit}</span> : null}
              </span>
            );
          }}
        />
      </p>
      <p className={`mt-5 text-body-sm ${custom ? "text-fg-inverse-muted" : "text-fg-secondary"}`}>{lt.body}</p>
      <div className="mt-6 sm:mt-auto sm:pt-6">
        <ButtonLink href={lt.action.href} variant={custom ? "design" : "outline"} className="w-full sm:justify-start">
          {lt.action.label}
        </ButtonLink>
      </div>
    </div>
  );
}

/**
 * Delivery times: an introduction on the left, and the two lead times side by side in one rounded panel on the right,
 * stock on a soft surface and custom on navy (the design journey keeps its yellow). Values come from the content layer
 * and render through PendingFact, so an unconfirmed value shows its "To confirm" tag.
 * Static baseline only: the event-date planner (OPT-2) and order-by board (OPT-3) are not approved.
 */
export function DeliverySection() {
  return (
    <section aria-labelledby="delivery-title" className="bg-surface">
      <div data-stagger="" className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-20">
        <div className="grid content-start justify-items-start gap-5">
          <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-surface-alt text-fg">
            <Icon name="truck" size={24} />
          </span>
          <h2 id="delivery-title" className="text-h2 max-w-heading">
            {delivery.title}
          </h2>
          <p className="max-w-[44ch] text-body-lg text-fg-secondary">{delivery.intro}</p>
          <p className="max-w-[48ch] border-t border-line pt-4 text-body-sm text-fg-muted">{delivery.shippingNote}</p>
        </div>

        <div className="grid overflow-hidden rounded-lg sm:grid-cols-2">
          {delivery.leadTimes.map((lt) => (
            <LeadTime key={lt.id} lt={lt} />
          ))}
        </div>
      </div>
    </section>
  );
}
