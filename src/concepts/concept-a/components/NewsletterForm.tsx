"use client";

import { NewsletterForm as DsNewsletterForm } from "@/design-system";

/** Newsletter sign-up on the shared component. SIMULATED: no onSubmit integration, so it only validates. */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  return <DsNewsletterForm inverse={tone === "dark"} />;
}
