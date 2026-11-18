import Link from "next/link";
import type { Category } from "@/lib/commerce/types";
import { Icon } from "../components/Icon";
import { QuickOrder } from "../components/QuickOrder";

const SHOWN = ["swedish", "norwegian", "finnish", "horse", "sport"];

/** The expert route: the ranges as quick rows, plus Quickorder for buyers who know their article numbers. */
export function RangesSection({ ranges }: { ranges: Category[] }) {
  const rows = SHOWN.map((id) => ranges.find((r) => r.id === id)).filter((r): r is Category => Boolean(r));
  return (
    <section id="ranges" aria-labelledby="ranges-title" className="scroll-mt-24 py-b-section">
      <div className="b-container grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="grid content-start gap-5">
          <div>
            <h2 id="ranges-title" className="b-h2">
              Know what you need?
            </h2>
          </div>
          <p className="max-w-[40ch] text-b-ink-2">Go straight to the range for your market and discipline, or reorder by article number.</p>
          <div>
            <QuickOrder variant="pill" />
          </div>
        </div>
        <ul className="divide-y divide-b-rule border-y border-b-rule">
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={r.href.replace("/concept-a", "/concept-b")} className="group flex min-h-[4.5rem] items-center justify-between gap-6 py-4 no-underline">
                <span className="grid gap-0.5">
                  <span className="b-display text-b-display-3 leading-tight group-hover:underline group-hover:decoration-b-yellow group-hover:decoration-2">{r.label}</span>
                  {r.description ? <span className="text-b-small text-b-ink-2">{r.description}</span> : null}
                </span>
                <span aria-hidden="true" className="grid h-11 w-11 flex-none place-items-center rounded-full bg-b-navy text-b-on-navy transition-colors group-hover:bg-b-yellow group-hover:text-b-navy-deep">
                  <Icon name="arrow-right" size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
