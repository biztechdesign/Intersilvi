import type { Metadata } from "next";
import type { ReactNode } from "react";
import { dsFontVariables } from "@/design-system/fonts";
import { RevealObserver } from "@/design-system/components/Motion";
import { commerce } from "@/lib/commerce/adapter";
import { HelpLauncher } from "@/design-system/components/HelpLauncher";
import { SiteFooter } from "@/concepts/concept-a/components/SiteFooter";
import { SiteHeader } from "@/concepts/concept-a/components/SiteHeader";

export const metadata: Metadata = {
  title: "Concept A: Premium Scandinavian commerce",
};

export default async function ConceptALayout({ children }: { children: ReactNode }) {
  const markets = await commerce.getMarkets();
  return (
    <div className={`ds relative ${dsFontVariables} lg:[--a-chrome:10.8125rem]`}>
      {/* --a-chrome (above): height of the top row plus the header card on desktop; the hero tucks itself under it. */}
      <a
        href="#main"
        className="absolute left-gutter top-[-100px] z-[100] rounded-md bg-action-primary px-4 py-3 font-semibold text-fg-inverse no-underline focus:top-3"
      >
        Skip to content
      </a>
      {/* Navy band behind the floating header, for pages without a hero; the homepage hero covers it. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[11.75rem] bg-surface-inverse md:h-32 lg:h-28" />
      <SiteHeader markets={markets} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <HelpLauncher />
      <RevealObserver />
    </div>
  );
}
