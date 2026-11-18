"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon } from "@/design-system";

/**
 * Footer link column. Below 768px it is an accordion (a button that expands the list, one open by default);
 * from 768px up it is a plain always-visible column and the heading is not a control.
 */
export function FooterColumn({ heading, defaultOpen = false, children }: { heading: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <nav aria-label={heading} className="border-b border-line-inverse md:border-0 lg:py-14">
      <h2 className="font-bold md:mb-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-12 w-full items-center justify-between gap-3 text-left font-bold md:pointer-events-none md:min-h-0"
        >
          {heading}
          <Icon name="chevron-down" size={20} className={`transition-transform duration-fast md:hidden ${open ? "rotate-180" : ""}`} />
        </button>
      </h2>
      <div id={id} className={`${open ? "block pb-3" : "hidden"} md:block md:pb-0`}>
        {children}
      </div>
    </nav>
  );
}
