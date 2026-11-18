import { delivery } from "@/content/homepage";
import { rebase } from "@/lib/content/paths";
import { ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import { BASE } from "../base";

/**
 * Stock compared with custom delivery times: one plain white card that straddles the hero's
 * bottom edge and the next section: the band behind it is transparent over the hero and the next section's white below it,
 * so no gap shows between them. It leads with the two lead times (clear figures); the title cell is a quiet label. Each lane is an icon and title, the figure on one line ("7 working days") and a text link. Both lanes use
 * text links, so the page keeps its single accent action per view (header and hero already carry it).
 * Static baseline only: the event-date planner (OPT-2) and order-by board (OPT-3) are not approved.
 */
export function DeliverySection() {
  return (
    <section
      aria-labelledby="delivery-title"
      className="relative z-[2] -mt-[var(--ov)] [--ov:2.5rem] bg-[linear-gradient(to_bottom,transparent_var(--ov),rgb(var(--ds-color-surface))_var(--ov))] lg:[--ov:4rem]"
    >
      <div className="ds-container">
        <div className="overflow-hidden rounded-lg bg-surface shadow-md">
          <div data-stagger="" className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,4.5fr)_minmax(0,4.5fr)]">
            <div className="grid content-center gap-1.5 bg-surface-alt px-5 py-5 sm:px-8 lg:py-7">
              <h2 id="delivery-title" className="text-h5 font-bold">
                {delivery.title}
              </h2>
              <p className="text-body-sm text-fg-secondary">Counted in working days, Monday–Friday.</p>
            </div>
            {delivery.leadTimes.map((lt) => {
              /* "7 workdays" is shown as "7 working days" on one line. */
              const [figure, ...unit] = lt.workdays.value.split(" ");
              const unitText = unit.join(" ").replace("workdays", "working days");
              return (
                <div key={lt.id} className="grid content-center gap-1 border-t border-line px-5 py-5 sm:px-8 lg:border-l lg:border-t-0 lg:py-7">
                  <h3 className="flex items-center gap-2 text-body-sm font-semibold text-fg-secondary">
                    <Icon name={lt.id === "custom" ? "pen" : "box"} size={18} className="flex-none text-brand-navy" />
                    {lt.title}
                  </h3>
                  <p className="tabular text-h3 font-bold leading-tight text-fg">
                    {figure} {unitText}
                  </p>
                  <ButtonLink href={rebase(lt.action.href, BASE)} variant="text" className="mt-1 justify-self-start">
                    {lt.action.label}
                  </ButtonLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
