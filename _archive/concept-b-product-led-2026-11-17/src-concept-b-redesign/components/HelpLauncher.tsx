"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/**
 * "Need help?" launcher from the client reference.
 * Live chat is UNCONFIRMED (PRODUCT.md), so it links to the contact section.
 * It stays hidden while the hero is on screen so it never covers the two journey actions.
 */
export function HelpLauncher({ watchId = "hero" }: { watchId?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(!entry?.isIntersecting), { threshold: 0 });
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <a
      href="#help"
      data-visible={visible}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-b-launcher inline-flex h-12 min-w-12 translate-y-4 items-center justify-center gap-2 rounded-b-pill bg-b-navy px-0 text-b-small font-semibold text-b-on-navy no-underline opacity-0 shadow-b-lift transition-[opacity,transform,background-color] duration-300 ease-b-out hover:bg-b-navy-soft data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 data-[visible=false]:pointer-events-none lg:px-4"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      <Icon name="chat" size={20} />
      <span className="sr-only lg:not-sr-only">Need help?</span>
    </a>
  );
}
