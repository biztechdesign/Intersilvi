import type { Cart, CartLine, DiscountState } from "./types";
import { mockCart } from "./mock";

/**
 * Cart adapter: the only thing the cart UI talks to.
 * The implementation below is a PROTOTYPE: it keeps the cart in this browser tab, answers after a short delay and
 * never contacts a server. A real storefront implements the same interface against its cart API; nothing in the UI changes.
 *
 * Backend dependencies (see the cart page notes): cart read/update/remove/clear, motif and saved-logo catalogue,
 * artwork upload and storage, discount validation, shipping estimate, tax, checkout hand-off.
 */
export type Result<T = void> = { ok: true; value: T } | { ok: false; message: string };

export interface CartAdapter {
  getCart(): Promise<Cart>;
  setQuantity(lineId: string, quantity: number): Promise<Result>;
  removeLine(lineId: string): Promise<Result>;
  clear(): Promise<Result>;
  restoreLine(line: CartLine, index: number): Promise<Result>;
  setRequestedDelivery(date: string | undefined): Promise<Result>;
  applyDiscount(code: string): Promise<Result<DiscountState>>;
  /** Shipping estimate needs the commerce backend's rates. Not connected in the prototype. */
  estimateShipping(country: string, postalCode: string): Promise<Result<never>>;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** The first quantity change on the third line fails once, so the failure and retry states can be reviewed. */
let failOnce = true;

export const cartAdapter: CartAdapter = {
  async getCart() {
    await wait(600);
    return structuredClone(mockCart);
  },
  async setQuantity(lineId) {
    await wait(450);
    if (lineId === "line-3" && failOnce) {
      failOnce = false;
      return { ok: false, message: "We couldn't update the quantity. Please try again." };
    }
    return { ok: true, value: undefined };
  },
  async removeLine() {
    await wait(300);
    return { ok: true, value: undefined };
  },
  async clear() {
    await wait(400);
    return { ok: true, value: undefined };
  },
  async restoreLine() {
    await wait(300);
    return { ok: true, value: undefined };
  },
  async setRequestedDelivery() {
    await wait(150);
    return { ok: true, value: undefined };
  },
  async applyDiscount(code) {
    await wait(600);
    /* Prototype code only: real validation belongs to the commerce backend. */
    if (code.trim().toUpperCase() === "PROTOTYPE10") return { ok: true, value: { code: "PROTOTYPE10", percent: 10 } };
    return { ok: false, message: "That discount code isn't valid. Check it and try again." };
  },
  async estimateShipping() {
    await wait(700);
    return { ok: false, message: "Shipping estimates aren't available yet. You'll see shipping at checkout." };
  },
};
