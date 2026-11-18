"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Concept B sticky header: wraps the main header row (logo, search, actions) and the category nav so they stick to the
 * top of the viewport together, as frosted glass once stuck.
 *
 * Behaviour (client brief): the header stays visible while scrolling down and slides away when scrolling back up. It
 * always shows when it is back in its resting position at the top of the page, and while anything inside it has keyboard
 * focus or the pointer is over it (so an open mega menu never slides away).
 *
 *   data-stuck   true once a 1px sentinel above the header leaves the viewport (IntersectionObserver).
 *   data-hidden  true while stuck and the last scroll movement was upwards (passive scroll listener, rAF-throttled,
 *                8px dead zone so trackpad jitter doesn't toggle it).
 * Without JavaScript it is a plain sticky header that never hides.
 */
export function StickyHeader({ children }: { children: ReactNode }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!!entry && !entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (Math.abs(y - last) < 8) return;
        setScrollingUp(y < last);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const hidden = stuck && scrollingUp && !engaged;

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none -mb-px h-px" />
      <div
        ref={bar}
        data-stuck={stuck}
        data-hidden={hidden}
        onFocus={() => setEngaged(true)}
        onBlur={(e) => !bar.current?.contains(e.relatedTarget as Node | null) && setEngaged(false)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setEngaged(false)}
        className="group/sticky sticky top-0 z-sticky bg-surface transition-[transform,background-color,box-shadow] duration-300 ease-standard data-[hidden=true]:-translate-y-full data-[stuck=true]:bg-surface/80 data-[stuck=true]:shadow-md data-[stuck=true]:backdrop-blur-xl data-[stuck=true]:backdrop-saturate-150 motion-reduce:transition-none"
      >
        {children}
      </div>
    </>
  );
}
