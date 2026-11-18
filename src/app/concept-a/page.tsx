import { commerce } from "@/lib/commerce/adapter";
import { ColourSection } from "@/concepts/concept-a/sections/ColourSection";
import { CraftSection } from "@/concepts/concept-a/sections/CraftSection";
import { DeliverySection } from "@/concepts/concept-a/sections/DeliverySection";
import { DesignSection } from "@/concepts/concept-a/sections/DesignSection";
import { HelpSection } from "@/concepts/concept-a/sections/HelpSection";
import { HeroSection } from "@/concepts/concept-a/sections/HeroSection";
import { ShopSection } from "@/concepts/concept-a/sections/ShopSection";
import { StorySection } from "@/concepts/concept-a/sections/StorySection";

/** Concept A homepage. A server component: data comes from the commerce adapter (mock for now). */
export default async function ConceptAHome() {
  const [categories, colours] = await Promise.all([commerce.getCategories(), commerce.getRibbonColours()]);

  return (
    <>
      <HeroSection />
      <DeliverySection />
      <ShopSection ranges={categories} />
      <DesignSection />
      <ColourSection colours={colours} />
      <CraftSection />
      <StorySection />
      <HelpSection />
    </>
  );
}
