import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Link as NavLink } from "@/lib/content/types";
import { footerCopy as f } from "@/content/concept-b";
import { contact } from "@/content/site";
import { ButtonLink, Icon, type IconName } from "@/design-system";
import { BASE } from "../base";

/** Client-supplied logo (transparent, cropped to the artwork, 640px wide for 2x). The original is kept beside it as logo-silvi-original.webp. */
const footerLogo = { src: "/images/concept-b/logo-silvi-footer.webp", width: 900, height: 510 };
import { FooterNewsletter } from "./FooterNewsletter";
import { media } from "@/content/media";
import { awardCategories } from "../awardCategories";

const linkClass = "inline-flex min-h-9 items-center text-body-sm text-fg-inverse-muted no-underline transition-colors duration-fast hover:text-fg-inverse hover:underline lg:min-h-7 [overflow-wrap:anywhere]";

function FooterLink({ link, className = linkClass }: { link: NavLink; className?: string }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function ContactRow({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Icon name={icon} size={18} className="mt-0.5 flex-none text-brand-yellow" />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

/**
 * Concept B footer, full width on navy. Copy from the client's footer reference (footerCopy in src/content/concept-b.ts);
 * phone and email are the real contact details.
 *   Top     newsletter with a rounded field and the Subscribe button inside.
 *   Middle  brand, description and social links | Shop | Customer service | About us | "Need help with an order?" card.
 *   Bottom  copyright | Privacy Policy, Cookies, Sitemap.
 * The help card carries id="help", the target of every "Contact" link and the floating "Need help?" button.
 */
/** Photographer credits for stock images shown on the page (kept out of the pictures themselves). */
const photoCredits = [
  ...new Set(
    awardCategories
      .map((c) => media[c.media])
      .filter((m) => m.origin === "unsplash")
      .map((m) => `${m.credit} / Unsplash`),
  ),
];

export function SiteFooter() {
  return (
    <footer className="ds-inverse bg-surface-inverse text-fg-inverse">
      <div className="ds-container">
        {/* Newsletter */}
        <div data-stagger="" className="flex flex-col gap-6 border-b border-line-inverse py-7 md:flex-row md:items-center md:justify-between lg:py-8">
          <div>
            <h2 className="text-h4">{f.newsletter.title}</h2>
            <p className="mt-1.5 text-body-sm text-fg-inverse-muted">{f.newsletter.body}</p>
          </div>
          <FooterNewsletter />
        </div>

        {/* Brand, link columns and help card */}
        <div data-stagger="" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:gap-x-8 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))_minmax(0,1.5fr)] lg:py-0">
          <div className="col-span-2 grid content-start gap-5 lg:col-span-1 lg:py-14">
            <Link href={BASE} aria-label={`${f.brandName}, home`} className="inline-flex w-fit">
              <Image src={footerLogo.src} alt="" width={footerLogo.width} height={footerLogo.height} className="h-24 w-auto" />
            </Link>
            <p className="max-w-[32ch] text-body-sm leading-relaxed text-fg-inverse-muted">{f.description}</p>
            <ul className="flex gap-3" aria-label="Social media">
              {f.social.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-surface-inverse-raised text-fg-inverse transition-colors duration-fast hover:bg-action-primary-active"
                  >
                    <Icon name={s.icon} size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {f.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="lg:py-14">
              <h2 className="mb-3 font-bold">{col.heading}</h2>
              <ul className="grid lg:gap-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink link={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div id="help" className="col-span-2 flex scroll-mt-28 lg:scroll-mt-48 flex-col rounded-lg bg-surface-inverse-raised p-6 lg:col-span-1 lg:rounded-none lg:px-8 lg:py-14">
            <h2 className="text-h5">{f.help.title}</h2>
            <ul className="mt-4 grid gap-3 text-body-sm">
              <ContactRow icon="pin">
                <address className="not-italic">{f.help.address}</address>
              </ContactRow>
              <ContactRow icon="phone">
                <a href={contact.phoneHref} className="ds-numeric font-semibold text-fg-inverse no-underline hover:underline">
                  {contact.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon="mail">
                <a href={`mailto:${contact.email}`} className="font-semibold text-fg-inverse no-underline hover:underline">
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow icon="clock">{f.help.hours}</ContactRow>
            </ul>
            <ButtonLink href={`mailto:${contact.email}`} variant="outline" inverse iconEnd="arrow-right" className="mt-6 w-full">
              {f.help.action}
            </ButtonLink>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-4 border-t border-line-inverse py-6 pb-20 text-body-sm text-fg-inverse-muted md:flex-row md:items-center md:justify-between md:pb-6">
          <div className="grid gap-1">
            <p>
              © {new Date().getFullYear()} {f.copyright}
            </p>
            {photoCredits.length ? <p className="text-caption">Photography: {photoCredits.join(", ")}</p> : null}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {f.legal.map((l) => (
              <li key={l.label}>
                <FooterLink link={l} className="text-body-sm text-fg-inverse no-underline hover:underline" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
