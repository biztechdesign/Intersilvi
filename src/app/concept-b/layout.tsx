import type { Metadata } from "next";
import type { ReactNode } from "react";
import { commerce } from "@/lib/commerce/adapter";
import { primaryNav, utilityLinks } from "@/content/site";
import { rebaseLink, rebaseNav } from "@/lib/content/paths";
import { HelpLauncher } from "@/design-system/components/HelpLauncher";
import { SiteFooter } from "@/concepts/concept-b/components/SiteFooter";
import { SiteHeader } from "@/concepts/concept-b/components/SiteHeader";
import { BASE } from "@/concepts/concept-b/base";
import { dsFontVariables } from "@/design-system/fonts";
import { RevealObserver } from "@/design-system/components/Motion";

export const metadata: Metadata = {
  title: "Concept B: Refined contemporary commerce",
};

export default async function ConceptBLayout({ children }: { children: ReactNode }) {
  const markets = await commerce.getMarkets();
  return (
    <div className={`ds ds-pill ds-motion-bold ${dsFontVariables}`}>
      <a
        href="#main"
        className="absolute left-gutter top-[-100px] z-[100] rounded-md bg-action-primary px-5 py-3 font-semibold text-fg-inverse no-underline focus:top-3"
      >
        Skip to content
      </a>
      <SiteHeader
        markets={markets}
        nav={rebaseNav(primaryNav, BASE)}
        utility={utilityLinks.map((l) => rebaseLink(l, BASE))}
        base={BASE}
      />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <HelpLauncher tone="accent" />
      <RevealObserver />
    </div>
  );
}
