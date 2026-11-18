import { commerce } from "@/lib/commerce/adapter";
import { rebaseCategories, rebaseProducts } from "@/lib/content/paths";
import { BASE } from "@/concepts/concept-b/base";
import { ColourSection } from "@/concepts/concept-b/sections/ColourSection";
import { CraftSection } from "@/concepts/concept-b/sections/CraftSection";
import { DeliverySection } from "@/concepts/concept-b/sections/DeliverySection";
import { DesignSection } from "@/concepts/concept-b/sections/DesignSection";
import { EventsSection } from "@/concepts/concept-b/sections/EventsSection";
import { HelpSection } from "@/concepts/concept-b/sections/HelpSection";
import { HeroSection } from "@/concepts/concept-b/sections/HeroSection";
import { ProductsSection } from "@/concepts/concept-b/sections/ProductsSection";
import { RangesSection } from "@/concepts/concept-b/sections/RangesSection";
import { StorySection } from "@/concepts/concept-b/sections/StorySection";

/** Concept B homepage. A server component: data comes from the commerce adapter (mock for now). */
export default async function ConceptBHome() {
  const [categories, products, colours] = await Promise.all([
    commerce.getCategories(),
    commerce.getShowcaseProducts(),
    commerce.getRibbonColours(),
  ]);

  return (
    <>
      <HeroSection />
      <DeliverySection />
      <EventsSection />
      <ProductsSection products={rebaseProducts(products, BASE)} ranges={categories} />
      <DesignSection colours={colours} />
      <CraftSection />
      <ColourSection />
      <RangesSection ranges={rebaseCategories(categories, BASE)} />
      <StorySection />
      <HelpSection />
    </>
  );
}
