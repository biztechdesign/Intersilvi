"use client";

import Link from "next/link";
import { Alert, Button, Icon, QuantityStepper, cx } from "@/design-system";
import { RosetteArt } from "@/components/art/RosetteArt";
import { formatMoney } from "@/lib/format";
import { lineTotal } from "@/lib/cart/totals";
import type { AppliedLogo, CartLine, PrintColourId } from "@/lib/cart/types";
import { LogoMotifDialog } from "./LogoMotifDialog";
import { MotifGlyph } from "./MotifGlyph";
import { PrintColourPicker } from "./PrintColourPicker";
import { motifs, printColourName, savedLogos } from "@/lib/cart/motifs";

interface Props {
  line: CartLine;
  pending: boolean;
  error?: string;
  /** How many other lines could take "apply this colour to all rows". */
  compatibleOthers: number;
  editHref: string;
  onQuantity: (q: number) => void;
  onRetry: () => void;
  onRemove: () => void;
  onLogo: (logo: AppliedLogo | null) => void;
  onColour: (colour: PrintColourId) => void;
  onApplyColourToAll: () => void;
}

function LogoThumb({ logo }: { logo: AppliedLogo }) {
  const glyph = logo.source === "motif" ? motifs.find((m) => m.id === logo.assetId)?.glyph : logo.source === "saved-logo" ? savedLogos.find((l) => l.id === logo.assetId)?.glyph : "picture_as_pdf";
  return (
    <span className="grid h-24 w-24 flex-none place-items-center overflow-hidden rounded-md border border-line bg-surface">
      {logo.previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo.previewUrl} alt="" className="max-h-full max-w-full object-contain p-1" />
      ) : (
        <MotifGlyph glyph={glyph ?? "image"} size={56} />
      )}
    </span>
  );
}

/**
 * One cart line. Logo/motif and print-colour controls appear only for products that take printing (product.acceptsLogo),
 * so trophies and medals show no irrelevant controls. All state belongs to the line id, set by the cart page.
 */
export function CartLineCard({ line, pending, error, compatibleOthers, editHref, onQuantity, onRetry, onRemove, onLogo, onColour, onApplyColourToAll }: Props) {
  const { product } = line;
  const total = lineTotal(line.unitPrice, line.quantity);
  const logo = line.logo;
  return (
    <li>
      <article aria-label={product.name} aria-busy={pending || undefined} className={cx("rounded-lg border border-line bg-surface p-4 transition-opacity duration-fast sm:p-5", pending && "opacity-80")}>
        <div className="grid gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] lg:grid-cols-[6rem_minmax(0,1fr)_auto]">
          <div className="relative grid aspect-square w-24 place-items-center overflow-hidden rounded-md bg-surface-sunken p-2">
            {product.art ? <RosetteArt spec={product.art} label={`${product.name}, ${product.variant ?? ""}`} className="h-full w-auto" /> : <Icon name="trophy" size={40} className="text-fg-muted" />}
          </div>

          <div className="min-w-0">
            <h3 className="text-card-title">
              <Link href={product.href} className="no-underline hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="ds-numeric mt-0.5 text-body-sm text-fg-muted">Item no: {product.articleNumber}</p>
            <ul className="mt-1 text-body-sm text-fg-secondary">
              {product.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
              {product.variant ? <li>{product.variant}</li> : null}
            </ul>
            <div className="mt-3 flex items-center gap-4">
              <Link href={editHref} className="inline-flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-fg-link no-underline hover:underline">
                <Icon name="pen" size={16} />
                Edit
              </Link>
              <button type="button" onClick={onRemove} className="inline-flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-fg-link hover:underline">
                <Icon name="trash" size={16} />
                Remove
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-end gap-x-6 gap-y-3 sm:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:justify-items-end">
            <fieldset disabled={pending} className="m-0 min-w-0 border-0 p-0">
              <QuantityStepper label={`Quantity, ${product.name}`} hideLabel value={line.quantity} min={product.minQuantity} max={product.maxQuantity} onChange={onQuantity} />
            </fieldset>
            <div className="text-right">
              <p className="ds-numeric text-body-sm text-fg-muted">{formatMoney(line.unitPrice)} each</p>
              <p className="ds-numeric text-price text-fg">{formatMoney(total)}</p>
              <p className="text-caption text-fg-muted">Excl. VAT</p>
            </div>
          </div>
        </div>

        {error ? (
          <Alert
            tone="error"
            className="mt-4"
            action={
              <Button variant="outline" size="sm" onClick={onRetry}>
                Try again
              </Button>
            }
          >
            {error}
          </Alert>
        ) : null}

        {product.acceptsLogo ? (
          <div className="mt-4 grid gap-4 border-t border-line pt-4 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
            <div>
              <p className="text-label text-fg">Logo / motif</p>
              {logo ? (
                <div className="mt-2 flex items-start gap-3">
                  <LogoThumb logo={logo} />
                  <div className="min-w-0">
                    <p className="truncate text-body-sm font-semibold text-fg">{logo.label}</p>
                    <p className="text-caption text-fg-muted">Prints in {printColourName(logo.colour).toLowerCase()}</p>
                    <LogoMotifDialog
                      productName={product.name}
                      applied={logo}
                      onApply={onLogo}
                      trigger={(open) => (
                        <button type="button" onClick={open} className="inline-flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-fg-link hover:underline">
                          <Icon name="upload" size={16} />
                          Change logo / motif
                        </button>
                      )}
                    />
                    <button type="button" onClick={() => onLogo(null)} className="flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-fg-link hover:underline">
                      <Icon name="trash" size={16} />
                      Remove logo / motif
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <LogoMotifDialog
                    productName={product.name}
                    onApply={onLogo}
                    trigger={(open) => (
                      <Button variant="outline" size="md" iconStart="image" onClick={open}>
                        Choose logo / motif
                      </Button>
                    )}
                  />
                </div>
              )}
            </div>
            {logo ? (
              <div className="grid gap-2">
                <PrintColourPicker name={`print-colour-${line.id}`} legend="Print colour on centre disc" size="sm" value={logo.colour} onChange={onColour} />
                <p className="sr-only" aria-live="polite">{`Print colour: ${printColourName(logo.colour)}`}</p>
                {product.logoColourCompatible && compatibleOthers > 0 ? (
                  <Button variant="text" size="sm" onClick={onApplyColourToAll} className="justify-self-start">
                    Apply this colour to {compatibleOthers} other compatible {compatibleOthers === 1 ? "row" : "rows"}
                  </Button>
                ) : null}
              </div>
            ) : (
              <p className="self-end pb-2 text-body-sm text-fg-muted">Add a logo or motif to print on the centre disc, then choose its colour.</p>
            )}
          </div>
        ) : null}
      </article>
    </li>
  );
}
