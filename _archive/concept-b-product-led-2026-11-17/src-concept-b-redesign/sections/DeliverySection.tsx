import { delivery } from "@/content/homepage";
import { rebase } from "@/lib/content/paths";
import { ButtonLink } from "../components/Button";
import { ConfirmMark } from "../components/ConfirmMark";
import { BASE } from "../base";

/**
 * Stock compared with custom production, as a two-up comparison at display size.
 * The figures are unconfirmed (PRODUCT.md), so each carries an asterisk explained by the footnote under the comparison.
 * Static baseline only: the event-date planner (OPT-2) and order-by board (OPT-3) are not approved.
 */
export function DeliverySection() {
  return (
    <section aria-labelledby="delivery-title" className="bg-b-paper py-b-section">
      <div className="b-container">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2 id="delivery-title" className="b-h2">
            {delivery.title}
          </h2>
          <p className="max-w-[44ch] text-b-ink-2">{delivery.intro}</p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-b-card bg-b-rule md:grid-cols-2">
          {delivery.leadTimes.map((lt) => {
            const custom = lt.id === "custom";
            const [range, ...unit] = lt.workdays.value.split(" ");
            return (
              <div key={lt.id} className={`grid content-between gap-8 p-6 sm:p-10 ${custom ? "bg-b-yellow text-b-navy-deep" : "bg-b-navy text-b-on-navy"}`}>
                <div>
                  <h3 className="text-b-lead font-semibold">{lt.title}</h3>
                  <p className={`mt-1 ${custom ? "text-b-navy" : "text-b-on-navy-2"}`}>{lt.body}</p>
                </div>
                <p className="tabular flex flex-wrap items-baseline gap-x-3">
                  <span className="b-display text-[clamp(3.75rem,2.5rem+5vw,6.5rem)] font-semibold leading-none tracking-[-0.03em]">
                    <ConfirmMark fact={{ ...lt.workdays, value: range ?? "" }} />
                  </span>
                  <span className="text-b-lead font-semibold">{unit.join(" ")}</span>
                </p>
                <ButtonLink href={rebase(lt.action.href, BASE)} variant={custom ? "shop" : "shop-light"} className="justify-self-start">
                  {lt.action.label}
                </ButtonLink>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-1 text-b-small text-b-ink-2">
          <p>
            <span className="font-bold text-b-pending">*</span> Production times are being confirmed with Intersilvi: the live terms of purchase and the client reference differ.
          </p>
          <p>{delivery.shippingNote}</p>
        </div>
      </div>
    </section>
  );
}
