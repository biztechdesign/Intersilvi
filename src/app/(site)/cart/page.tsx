import type { Metadata } from "next";
import { Breadcrumbs } from "@/design-system";
import { CartPage } from "@/concepts/concept-b/cart/CartPage";
import { HOME } from "@/concepts/concept-b/base";

export const metadata: Metadata = { title: "Shopping cart" };

export default function Cart() {
  return (
    <div className="ds-container py-6 lg:py-8">
      <Breadcrumbs items={[{ label: "Home", href: HOME }, { label: "Shopping cart" }]} />
      <h1 className="mb-6 mt-4 text-h1">Shopping cart</h1>
      <CartPage />
    </div>
  );
}
