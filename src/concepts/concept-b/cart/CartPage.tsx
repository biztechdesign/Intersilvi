"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, ButtonLink, Dialog, Field, Icon, Skeleton, StateMessage, TextInput } from "@/design-system";
import { cartAdapter } from "@/lib/cart/adapter";
import { calculateTotals } from "@/lib/cart/totals";
import type { AppliedLogo, Cart, CartLine, DiscountState, PrintColourId } from "@/lib/cart/types";
import { BASE, HOME } from "../base";
import { CartLineCard } from "./CartLineCard";
import { CartSidebar } from "./CartSidebar";

const today = () => new Date().toISOString().slice(0, 10);

/** Requested delivery date: a request, never a promise. Past dates are rejected; no lead time is calculated (no confirmed rules). */
function DeliveryDate({ value, onChange }: { value?: string; onChange: (v: string | undefined) => void }) {
  const [touched, setTouched] = useState(false);
  const error = value && value < today() ? "Choose today or a later date." : undefined;
  return (
    <section aria-labelledby="delivery-date-title" className="rounded-lg bg-surface-soft p-4 sm:p-5">
      <div className="grid gap-x-4 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)]">
        <span aria-hidden="true" className="hidden h-12 w-12 place-items-center self-start rounded-full bg-surface text-fg sm:grid">
          <Icon name="calendar" size={24} />
        </span>
        <div className="grid min-w-0 gap-3">
          <h2 id="delivery-date-title" className="text-h6">
            Requested delivery date
          </h2>
          <div className="w-full max-w-[16rem]">
            <Field id="delivery-date" label="Requested delivery date" hideLabel error={touched ? error : undefined}>
              <TextInput
                id="delivery-date"
                type="date"
                min={today()}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value || undefined)}
                onBlur={() => setTouched(true)}
                aria-invalid={touched && error ? true : undefined}
                aria-describedby={touched && error ? "delivery-date-error" : "delivery-date-help"}
              />
            </Field>
          </div>
          <p id="delivery-date-help" className="max-w-[60ch] text-body-sm text-fg-secondary">
            The date you would like your order by. It is a request, not a confirmed delivery date. We confirm delivery with your order.
          </p>
        </div>
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div role="status" aria-label="Loading your cart" className="grid gap-4">
      <Skeleton className="h-24 w-full rounded-lg" />
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-44 w-full rounded-lg" />
      ))}
    </div>
  );
}

/**
 * The cart. Prototype state lives in this component (mock adapter, nothing is saved or sent anywhere), and the
 * notice at the top says so. Quantity changes are applied at once and rolled back with a retry if the adapter reports a failure.
 */
export function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, { message: string; retryQty: number }>>({});
  const [discount, setDiscount] = useState<DiscountState | null>(null);
  const [removed, setRemoved] = useState<{ line: CartLine; index: number } | null>(null);
  const [live, setLive] = useState("");
  const [totalsDown, setTotalsDown] = useState(false);

  const load = useCallback(() => {
    setLoadError(false);
    setCart(null);
    cartAdapter.getCart().then(setCart, () => setLoadError(true));
  }, []);
  useEffect(load, [load]);

  const totals = useMemo(() => {
    const t = cart ? calculateTotals(cart, discount) : null;
    return t && totalsDown ? { ...t, status: "unavailable" as const } : t;
  }, [cart, discount, totalsDown]);

  const patchLine = (id: string, fn: (l: CartLine) => CartLine) => setCart((c) => (c ? { ...c, lines: c.lines.map((l) => (l.id === id ? fn(l) : l)) } : c));

  async function setQuantity(id: string, quantity: number) {
    const before = cart?.lines.find((l) => l.id === id)?.quantity ?? quantity;
    patchLine(id, (l) => ({ ...l, quantity }));
    setPending((p) => ({ ...p, [id]: true }));
    setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== id)));
    const r = await cartAdapter.setQuantity(id, quantity);
    setPending((p) => ({ ...p, [id]: false }));
    if (!r.ok) {
      patchLine(id, (l) => ({ ...l, quantity: before }));
      setErrors((e) => ({ ...e, [id]: { message: r.message, retryQty: quantity } }));
    }
  }

  async function removeLine(id: string) {
    if (!cart) return;
    const index = cart.lines.findIndex((l) => l.id === id);
    const line = cart.lines[index];
    if (!line) return;
    setPending((p) => ({ ...p, [id]: true }));
    await cartAdapter.removeLine(id);
    setCart((c) => (c ? { ...c, lines: c.lines.filter((l) => l.id !== id) } : c));
    setPending((p) => ({ ...p, [id]: false }));
    setRemoved({ line, index });
    setLive(`${line.product.name} removed from your cart.`);
  }

  async function undoRemove() {
    if (!removed) return;
    const { line, index } = removed;
    await cartAdapter.restoreLine(line, index);
    setCart((c) => (c ? { ...c, lines: [...c.lines.slice(0, index), line, ...c.lines.slice(index)] } : c));
    setRemoved(null);
    setLive(`${line.product.name} restored.`);
  }

  async function clearCart() {
    await cartAdapter.clear();
    setCart((c) => (c ? { ...c, lines: [] } : c));
    setRemoved(null);
    setLive("Your cart is empty.");
  }

  const setLogo = (id: string, logo: AppliedLogo | null) => patchLine(id, (l) => ({ ...l, logo: logo ?? undefined }));
  const setColour = (id: string, colour: PrintColourId) => patchLine(id, (l) => (l.logo ? { ...l, logo: { ...l.logo, colour } } : l));
  /** Only rows that have a logo AND whose product is marked colour-compatible change. Everything else is left alone. */
  const applyColourToAll = (sourceId: string) => {
    const colour = cart?.lines.find((l) => l.id === sourceId)?.logo?.colour;
    if (!colour) return;
    setCart((c) => (c ? { ...c, lines: c.lines.map((l) => (l.logo && l.product.logoColourCompatible ? { ...l, logo: { ...l.logo, colour } } : l)) } : c));
    setLive("Print colour applied to compatible rows.");
  };

  if (loadError)
    return <StateMessage tone="error" title="We couldn't load your cart" body="Check your connection and try again." action={<Button variant="primary" onClick={load}>Try again</Button>} />;
  if (!cart || !totals) return <LoadingState />;

  const isEmpty = cart.lines.length === 0;

  return (
    <div className="grid gap-6">
      <p role="status" aria-live="polite" className="sr-only">
        {live}
      </p>
      <Alert tone="info">Prototype cart: your changes are kept in this browser tab only. Nothing is saved to an account or sent to a server.</Alert>

      {removed ? (
        <Alert
          tone="success"
          action={
            <Button variant="outline" size="sm" iconStart="undo" onClick={undoRemove}>
              Undo
            </Button>
          }
        >
          {removed.line.product.name} was removed from your cart.
        </Alert>
      ) : null}

      {isEmpty ? (
        <StateMessage
          icon="bag"
          title="Your cart is empty"
          body="Browse our rosettes, trophies and medals, or design your own rosette."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href={HOME} variant="primary">
                Continue shopping
              </ButtonLink>
              <ButtonLink href={`${BASE}/design-your-own`} variant="outline">
                Design your own rosette
              </ButtonLink>
            </div>
          }
        />
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="grid min-w-0 gap-6">
            <DeliveryDate
              value={cart.requestedDelivery}
              onChange={(v) => {
                setCart((c) => (c ? { ...c, requestedDelivery: v } : c));
                cartAdapter.setRequestedDelivery(v);
              }}
            />
            <ul aria-label="Cart items" className="grid gap-4">
              {cart.lines.map((line) => (
                <CartLineCard
                  key={line.id}
                  line={line}
                  pending={!!pending[line.id]}
                  error={errors[line.id]?.message}
                  compatibleOthers={cart.lines.filter((l) => l.id !== line.id && l.logo && l.product.logoColourCompatible).length}
                  editHref={`${BASE}/design-your-own?article=${line.product.articleNumber}`}
                  onQuantity={(q) => setQuantity(line.id, q)}
                  onRetry={() => setQuantity(line.id, errors[line.id]?.retryQty ?? line.quantity)}
                  onRemove={() => removeLine(line.id)}
                  onLogo={(logo) => setLogo(line.id, logo)}
                  onColour={(c) => setColour(line.id, c)}
                  onApplyColourToAll={() => applyColourToAll(line.id)}
                />
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ButtonLink href={HOME} variant="outline" iconStart="chevron-left">
                Continue shopping
              </ButtonLink>
              <Dialog
                title="Clear your cart?"
                description="This removes every item and its logo choices."
                trigger={(open) => (
                  <Button variant="outline" iconStart="trash" onClick={open}>
                    Clear cart
                  </Button>
                )}
                footer={(close) => (
                  <>
                    <Button variant="outline" onClick={close}>
                      Keep my cart
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        clearCart();
                        close();
                      }}
                    >
                      Clear cart
                    </Button>
                  </>
                )}
              >
                <p className="text-body text-fg-secondary">You can&apos;t undo this once the cart is cleared.</p>
              </Dialog>
            </div>
          </div>

          <CartSidebar totals={totals} discount={discount} onDiscount={setDiscount} onRetryTotals={() => setTotalsDown(false)} checkoutHref={`${BASE}/checkout`} />
        </div>
      )}
    </div>
  );
}
