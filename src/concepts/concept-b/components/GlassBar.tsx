"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * A bar that sticks to the top of the viewport and turns into frosted glass once it is stuck.
 *
 * A 1px sentinel sits just above the bar. When it scrolls out of the top of the viewport the bar is stuck, so
 * `data-stuck="true"` is set (one IntersectionObserver, no scroll listener, no layout work while scrolling). Styles key off
 * that attribute: pass `className` for the resting look and put the glass look on `data-[stuck=true]:` variants.
 * Without JavaScript the bar simply keeps its resting (opaque) look.
 */
export function GlassBar({ as: Tag = "div", className, children }: { as?: ElementType; className: string; children: ReactNode }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!!entry && !entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none -mb-px h-px" />
      <Tag data-stuck={stuck} className={className}>
        {children}
      </Tag>
    </>
  );
}
