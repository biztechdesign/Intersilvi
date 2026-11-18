import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RevealObserver } from "@/design-system/components/Motion";
import { dsFontVariables } from "@/design-system/fonts";


export const metadata: Metadata = {
  title: "Design system",
  description: "Intersilvi design system: tokens, typography and shared components.",
};

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`ds ${dsFontVariables}`}>
      {children}
      <RevealObserver />
    </div>
  );
}
