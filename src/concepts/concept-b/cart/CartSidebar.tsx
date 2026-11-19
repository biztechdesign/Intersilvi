"use client";

import { useState, type FormEvent } from "react";
import { Accordion, Alert, Button, ButtonLink, Field, OrderSummary, Select, TextInput, describedBy } from "@/design-system";
import { cartAdapter } from "@/lib/cart/adapter";
import { formatMoney } from "@/lib/format";
import type { CartTotals, DiscountState } from "@/lib/cart/types";

const COUNTRIES = ["Sweden", "Norway", "Finland", "Denmark", "Germany"];

/**
 * Estimate shipping. The commerce backend's rates are not connected, so the form is real but the answer is always
 * "unavailable" (with a retry). Contract needed: destination country + postal code in, shipping methods with prices out.
 */
function ShippingEstimate() {
  const [country, setCountry] = useState("Sweden");
  const [postal, setPostal] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "busy" | "error"; text?: string }>({ kind: "idle" });
  async function submit(e: FormEvent) {
    e.preventDefault();
    setState({ kind: "busy" });
    const r = await cartAdapter.estimateShipping(country, postal);
    setState(r.ok ? { kind: "idle" } : { kind: "error", text: r.message });
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-3 text-body-sm">
      <p className="text-fg-muted">Enter your destination to see shipping options.</p>
      <Field id="ship-country" label="Country">
        <Select id="ship-country" value={country} onChange={(e) => setCountry(e.target.value)}>
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </Field>
      <Field id="ship-postal" label="Postal code">
        <TextInput id="ship-postal" autoComplete="postal-code" value={postal} onChange={(e) => setPostal(e.target.value)} />
      </Field>
      <Button type="submit" variant="outline" size="md" loading={state.kind === "busy"}>
        Get estimate
      </Button>
      {state.kind === "error" ? <Alert tone="warning">{state.text}</Alert> : null}
    </form>
  );
}

/**
 * Discount code. PROTOTYPE: only the sample code PROTOTYPE10 is accepted, by the mock adapter. Real validation and the
 * discount amount must come from the commerce backend.
 */
function DiscountCode({ discount, onApplied, onRemoved }: { discount: DiscountState | null; onApplied: (d: DiscountState) => void; onRemoved: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return setError("Enter a discount code.");
    setBusy(true);
    setError(undefined);
    const r = await cartAdapter.applyDiscount(code);
    setBusy(false);
    if (r.ok) {
      onApplied(r.value);
      setCode("");
    } else setError(r.message);
  }
  if (discount)
    return (
      <div className="grid gap-3">
        <Alert tone="success" title={`Code ${discount.code} applied`}>
          {discount.percent}% off the subtotal (prototype code).
        </Alert>
        <Button variant="text" size="sm" onClick={onRemoved} className="justify-self-start">
          Remove discount
        </Button>
      </div>
    );
  return (
    <form onSubmit={submit} noValidate className="grid gap-3">
      <Field id="discount-code" label="Discount code" error={error}>
        <TextInput id="discount-code" autoComplete="off" autoCapitalize="characters" value={code} onChange={(e) => setCode(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={describedBy("discount-code", { error })} />
      </Field>
      <Button type="submit" variant="outline" size="md" loading={busy}>
        Apply discount
      </Button>
    </form>
  );
}

export function CartSidebar({ totals, discount, onDiscount, onRetryTotals, checkoutHref, disabled }: { totals: CartTotals; discount: DiscountState | null; onDiscount: (d: DiscountState | null) => void; onRetryTotals: () => void; checkoutHref: string; disabled?: boolean }) {
  const ok = totals.status === "ready";
  return (
    <aside aria-label="Cart summary" className="grid content-start gap-4 lg:sticky lg:top-28">
      <div className="rounded-lg border border-line bg-surface px-5">
        <Accordion
          items={[
            { id: "shipping", title: "Estimate shipping and tax", content: <ShippingEstimate /> },
            { id: "discount", title: "Discount code", content: <DiscountCode discount={discount} onApplied={onDiscount} onRemoved={() => onDiscount(null)} /> },
          ]}
        />
      </div>
      {ok ? (
        <OrderSummary
          lines={[
            { label: "Subtotal", value: formatMoney(totals.subtotal) },
            ...(totals.discount ? [{ label: `Discount (${discount?.code})`, value: `−${formatMoney(totals.discount)}` }] : []),
            { label: "Shipping", value: "Calculated at checkout" },
            { label: "VAT", value: "Calculated at checkout" },
          ]}
          total={{ label: "Total excl. VAT", value: formatMoney(totals.totalExclVat) }}
          action={
            disabled ? (
              <Button variant="primary" size="lg" block disabled>
                Proceed to checkout
              </Button>
            ) : (
              <ButtonLink href={checkoutHref} variant="primary" size="lg" block iconEnd="arrow-right">
                Proceed to checkout
              </ButtonLink>
            )
          }
          footnote="Shipping and VAT are added at checkout. Prices exclude VAT."
        />
      ) : (
        <div className="rounded-lg border border-line bg-surface-alt p-card">
          <h2 className="text-h5">Order summary</h2>
          <Alert tone="warning" className="mt-4" action={<Button variant="outline" size="sm" onClick={onRetryTotals}>Try again</Button>}>
            Prices are temporarily unavailable. Your items are safe.
          </Alert>
        </div>
      )}
    </aside>
  );
}
