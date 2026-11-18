"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives scroll reveals for `[data-reveal]` elements and `[data-stagger]` containers. Mount once per layout.
 * Renders nothing. The styles live in globals.css; the attributes are applied with <RevealOnScroll> and
 * <StaggerContainer> (Reveal.tsx), or directly on an existing element.
 *
 * How it works:
 * - Nothing is hidden by default. On each page the observer measures every target and marks only those still below the
 *   trigger line with `data-reveal-pending` (the hidden state). Without JavaScript, before hydration, after a #hash jump
 *   and under prefers-reduced-motion, content simply paints visible.
 * - One IntersectionObserver serves the whole page. A target fires once, when its top edge rises into the lower 18% of the
 *   viewport (rootMargin), so the motion starts as the content arrives, not long before and not after it has been read past.
 * - On fire, `data-reveal-pending` is swapped for `data-revealed`, which plays the one-shot keyframe (CSS). Never again.
 * - A target already on screen at arrival but below the trigger line (the bottom of the first screen) reveals after 450ms.
 * - A target the visitor scrolls past in one jump is still revealed (it reports a rect above the viewport), so nothing is
 *   ever left hidden.
 * - The effect depends on the pathname, so it re-measures after client-side navigation.
 */
const TRIGGER_FROM_BOTTOM = 0.18;

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const reveal = (el: Element) => {
      el.removeAttribute("data-reveal-pending");
      el.setAttribute("data-revealed", "");
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Intersecting, or already scrolled above the viewport (a fast jump): reveal either way.
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: `0px 0px -${TRIGGER_FROM_BOTTOM * 100}% 0px`, threshold: 0 },
    );

    const triggerLine = window.innerHeight * (1 - TRIGGER_FROM_BOTTOM);
    const pending: HTMLElement[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]")) {
      const top = el.getBoundingClientRect().top;
      // Already at or above the trigger line on arrival (first screen, or restored scroll position): leave it as it is.
      if (top < triggerLine) continue;
      el.setAttribute("data-reveal-pending", "");
      pending.push(el);
      if (top < window.innerHeight) {
        // On screen at arrival but below the trigger line (the lower edge of the first screen): the trigger line will not
        // be crossed until the visitor scrolls, so reveal it shortly after the hero begins instead of leaving it blank.
        timers.push(setTimeout(() => reveal(el), 450));
      } else {
        io.observe(el);
      }
    }

    return () => {
      for (const id of timers) clearTimeout(id);
      io.disconnect();
      for (const el of pending) {
        el.removeAttribute("data-reveal-pending");
        el.removeAttribute("data-revealed");
      }
    };
  }, [pathname]);

  return null;
}
