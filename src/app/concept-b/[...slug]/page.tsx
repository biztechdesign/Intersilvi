import type { Metadata } from "next";
import { ButtonLink } from "@/concepts/concept-b/components/Button";
import { BASE } from "@/concepts/concept-b/base";
import { stubSlugs } from "@/lib/stubSlugs";
import { QueryFilters } from "./QueryFilters";

export const dynamicParams = false;
export const generateStaticParams = () => stubSlugs();

interface StubProps {
  params: Promise<{ slug: string[] }>;
}

function titleFrom(slug: string[]): string {
  const words = (slug.at(-1) ?? "").replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export async function generateMetadata({ params }: StubProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: titleFrom(slug) };
}

/**
 * Catch-all for links that lead outside this phase: categories, the model listing and designer, cart, account, legal pages.
 * The rosette journey is Homepage, Model listing, Product detail, then the separate designer.
 */
export default async function StubPage({ params }: StubProps) {
  const { slug } = await params;
  const isDesign = slug[0] === "design-your-own";
  return (
    <section aria-labelledby="stub-title" className="ds-container grid min-h-[60vh] content-start justify-items-start gap-5 py-section">
      <p className="text-label text-fg-muted [overflow-wrap:anywhere]">
        {BASE}/{slug.join("/")}
      </p>
      <h1 id="stub-title" className="text-h2">
        {titleFrom(slug)}
      </h1>
      <p className="max-w-[52ch] text-lead text-fg-secondary">
        {isDesign
          ? "The model listing lives here: choose a rosette model, open its detail page, then start the designer. This flow is outside the scope of the homepage prototype."
          : "This page isn't part of the homepage prototype. The link is here so the navigation and journeys can be reviewed."}
      </p>
      <QueryFilters />
      <ButtonLink href={BASE}>Back to the homepage</ButtonLink>
    </section>
  );
}
