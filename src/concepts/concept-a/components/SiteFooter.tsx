import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@/content/media";
import { contact, footerColumns, openingHours } from "@/content/site";
import { SiteFooter as DsSiteFooter } from "@/design-system";
import { PendingFact } from "./PendingFact";

/** Concept A footer on the shared SiteFooter. Content comes from src/content/site.ts. */
export function SiteFooter() {
  return (
    <DsSiteFooter
      brand={
        <>
          <Link href="/concept-a" aria-label="Intersilvi, home" className="inline-flex w-fit rounded-md bg-surface px-3 py-2">
            <Image src={brandLogo.src} alt="" width={brandLogo.width} height={brandLogo.height} className="h-9 w-auto" />
          </Link>
          <p className="max-w-[28ch]">Award rosettes, trophies and medals for competitions and events. Made in Osby, Sweden.</p>
          <address className="not-italic leading-relaxed">
            {contact.company}
            <br />
            {contact.street}
            <br />
            {contact.postcode} {contact.town}, {contact.country}
          </address>
        </>
      }
      columns={footerColumns.map((c) => ({ heading: c.heading, links: c.links }))}
      contact={
        <div>
          <h2 className="mb-3 text-label text-fg-inverse">Contact</h2>
          <a href={contact.phoneHref} className="ds-numeric flex min-h-9 items-center text-fg-inverse no-underline hover:underline">
            {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className="flex min-h-9 items-center text-fg-inverse no-underline hover:underline">
            {contact.email}
          </a>
          <p className="mt-2">
            <PendingFact fact={openingHours} render={(v) => v.join(", ")} tone="dark" />
          </p>
        </div>
      }
      legal={
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 pb-16">
          <p>© {contact.company}</p>
          <p className="max-w-[64ch]">
            Concept A prototype. Product images, banners and logo from intersilvi.com; photos marked &ldquo;Provisional&rdquo; are Unsplash stand-ins.
            Cart, search and sign-up are simulated.
          </p>
        </div>
      }
    />
  );
}
