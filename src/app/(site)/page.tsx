import type { Metadata } from "next";
import { commerce } from "@/lib/commerce/adapter";
import { AboutSection } from "@/concepts/concept-b/sections/AboutSection";
import { ColourSection } from "@/concepts/concept-b/sections/ColourSection";
import { CraftSection } from "@/concepts/concept-b/sections/CraftSection";
import { DeliverySection } from "@/concepts/concept-b/sections/DeliverySection";
import { DesignSection } from "@/concepts/concept-b/sections/DesignSection";
import { EventsSection } from "@/concepts/concept-b/sections/EventsSection";
import { HeroSection } from "@/concepts/concept-b/sections/HeroSection";
import { TrustSection } from "@/concepts/concept-b/sections/TrustSection";

export const metadata: Metadata = { title: { absolute: "Intersilvi" } };

/** Concept B homepage. A server component: data comes from the commerce adapter (mock for now). */
export default async function ConceptBHome() {
  const colours = await commerce.getRibbonColours();

  return (
    <>
      <HeroSection />
      <DeliverySection />
      <DesignSection colours={colours} />
      <CraftSection />
      <EventsSection />
      <ColourSection />
      <AboutSection />
      <TrustSection />
    </>
  );
}
