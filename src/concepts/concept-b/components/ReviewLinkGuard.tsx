"use client";

import { useEffect } from "react";
import { REVIEW_MODE, isBuiltPath } from "@/lib/reviewMode";

/**
 * Review mode: clicks on internal links to pages that are not built yet are swallowed, so a reviewer can't land on a
 * placeholder page. Real pages, #anchors, mailto:, tel: and external links are left alone. Renders nothing.
 */
export function ReviewLinkGuard() {
  useEffect(() => {
    if (!REVIEW_MODE) return;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const raw = a.getAttribute("href") ?? "";
      if (raw.startsWith("#") || /^(mailto:|tel:)/i.test(raw)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      if (isBuiltPath(url.pathname, base)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
