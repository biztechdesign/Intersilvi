import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Two-column section header shared by the shop-by-event and colour-inspiration sections.
 * Left: eyebrow and heading. Right: supporting description with the section CTA directly beneath it.
 * Stacks (eyebrow, heading, description, CTA) below 1024px. Heights follow the content; nothing is fixed.
 */
export function SectionHeader({ eyebrow, titleId, title, body, action }: { eyebrow: string; titleId: string; title: string; body: string; action: ReactNode }) {
  return (
    <div data-stagger="" className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={titleId} className="max-w-[20ch] text-[clamp(1.75rem,1.5rem+0.8vw,2.25rem)] font-extrabold leading-[1.14] tracking-[-0.025em]">
          {title}
        </h2>
      </div>
      <div className="grid justify-items-start gap-6">
        <p className="max-w-[60ch] text-lead text-fg-secondary">{body}</p>
        {action}
      </div>
    </div>
  );
}
