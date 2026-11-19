import type { Money } from "@/lib/commerce/types";
import type { Cart, CartTotals, DiscountState } from "./types";

const money = (amount: number, currency: Money["currency"]): Money => ({ amount: Math.round(amount * 100) / 100, currency });

export const lineTotal = (unit: Money, quantity: number): Money => money(unit.amount * quantity, unit.currency);

/**
 * Mock pricing: subtotal, optional percentage discount, total excluding VAT.
 * Shipping and tax are NOT computed here: they stay "calculated at checkout" until the commerce backend supplies them.
 */
export function calculateTotals(cart: Cart, discount?: DiscountState | null): CartTotals {
  const currency = cart.lines[0]?.unitPrice.currency ?? "SEK";
  const subtotal = cart.lines.reduce((sum, l) => sum + l.unitPrice.amount * l.quantity, 0);
  const off = discount ? subtotal * (discount.percent / 100) : 0;
  return {
    status: "ready",
    subtotal: money(subtotal, currency),
    discount: discount ? money(off, currency) : undefined,
    totalExclVat: money(subtotal - off, currency),
  };
}
