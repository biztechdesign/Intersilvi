import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Two-column section header shared by the shop-by-event and colour-inspiration sections.
 * Left: eyebrow and heading. Right: supporting description with the section CTA directly beneath it.
 * Two columns from 768px (narrower left column) and stacked (eyebrow, heading, description, CTA) below that. Heights follow the content; nothing is fixed.
 */
export function SectionHeader({ eyebrow, titleId, title, body, action }: { eyebrow: string; titleId: string; title: string; body: string; action: ReactNode }) {
  return (
    <div data-stagger="" className="grid gap-5 text-center md:text-left md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-start md:gap-8 lg:grid-cols-2 lg:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={titleId} className="mx-auto max-w-[20ch] text-h2 md:mx-0">
          {title}
        </h2>
      </div>
      <div className="grid justify-items-center gap-6 md:justify-items-start">
        <p className="max-w-[60ch] text-lead text-fg-secondary">{body}</p>
        {action}
      </div>
    </div>
  );
}
