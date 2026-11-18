import Link from "next/link";
import type { FooterColumn } from "@/lib/content/types";
import { contact, openingHours } from "@/content/site";
import { Logo } from "./Logo";
import { PendingFact } from "./PendingFact";

export function SiteFooter({ columns }: { columns: FooterColumn[] }) {
  const link = "inline-flex min-h-9 items-center text-b-on-navy no-underline hover:underline hover:decoration-b-on-navy-2 [overflow-wrap:anywhere]";
  return (
    <footer className="bg-b-navy-deep text-b-body text-b-on-navy-2">
      <div className="b-container grid grid-cols-2 gap-x-6 gap-y-12 pb-12 pt-16 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))] lg:pt-20">
        <div className="col-span-2 grid content-start gap-4 lg:col-span-1 lg:pr-8">
          <Logo tone="light" />
          <p className="max-w-[28ch]">Award rosettes, trophies and medals for competitions and events. Made in Osby, Sweden.</p>
          <address className="not-italic leading-relaxed">
            {contact.company}
            <br />
            {contact.street}
            <br />
            {contact.postcode} {contact.town}, {contact.country}
          </address>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="mb-3 text-b-label font-semibold text-b-yellow">{col.heading}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                      {l.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="mb-3 text-b-label font-semibold text-b-yellow">Contact</h2>
          <ul>
            <li>
              <a href={contact.phoneHref} className={`${link} tabular`}>
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={link}>
                {contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-3">
            <PendingFact fact={openingHours} render={(v) => v.join(", ")} tone="dark" />
          </p>
        </div>
      </div>
      <div className="b-container flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-b-rule-navy pb-24 pt-6 text-b-label">
        <p>© {contact.company}</p>
        <p className="max-w-[64ch]">
          Concept B prototype. Product images, banners and logo from intersilvi.com; photos marked &ldquo;Provisional&rdquo; are
          Unsplash stand-ins. Cart, search and sign-up are simulated.
        </p>
      </div>
    </footer>
  );
}
