"use client";

import { SwatchGroup } from "@/design-system";
import { printColours } from "@/lib/cart/motifs";
import type { PrintColourId } from "@/lib/cart/types";

/**
 * Print colour for a logo or motif (not the ribbon colour). A labelled radio group on the shared SwatchGroup.
 * "Another colour" (in the client's reference) is shown disabled: how it is ordered and produced is not defined yet (supported: false in the data).
 */
export function PrintColourPicker({ name, legend = "Print colour", value, onChange, size = "md" }: { name: string; legend?: string; value: PrintColourId; onChange: (id: PrintColourId) => void; size?: "sm" | "md" }) {
  return (
    <SwatchGroup
      name={name}
      legend={legend}
      size={size}
      value={value}
      onChange={(id) => onChange(id as PrintColourId)}
      options={printColours.map((c) => ({ id: c.id, name: c.name, finish: c.finish, hex: "#ffffff", background: c.swatch, disabled: !c.supported }))}
    />
  );
}
