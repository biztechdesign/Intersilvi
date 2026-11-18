import Image from "next/image";
import Link from "next/link";
import type { Market } from "@/lib/commerce/types";
import { brandLogo } from "@/content/media";
import { contact, primaryNav, utilityLinks } from "@/content/site";
import { ButtonLink, Dropdown, Icon } from "@/design-system";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";
import { QuickOrder } from "./QuickOrder";
import { SearchForm } from "./SearchForm";

const designGroup = primaryNav.find((g) => g.id === "design");

const utilityLink = "inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap font-medium text-fg-inverse no-underline hover:underline";

/** Round icon actions (account, cart): 48px targets on a soft fill. */
const roundAction =
  "relative grid h-12 w-12 place-items-center rounded-full bg-surface-alt text-fg no-underline transition-colors duration-fast ease-standard hover:bg-surface-soft";

/**
 * Concept A header: a floating bar over the hero.
 *
 *   Top row      transparent, white text: phone and email | customer service, about us, contact, language and market.
 *   White card   row 1: logo | search with the Quickorder chip | account, cart, "Design your own".
 *                row 2: category navigation; mega menus drop as a matching white card beneath.
 *
 * The card stays in view (sticky, 12px from the top) while the top row scrolls away. On the homepage the hero runs
 * behind both from 1024px (HeroSection pulls itself up by --a-chrome); every other page sits on the navy band the
 * layout paints behind the header. All labels and destinations come from src/content/site.ts; the "Design your own"
 * button reuses the design group's existing label and destination, and the nav row keeps its own item unchanged.
 * Below 1024px the category row and the Quickorder chip move into the drawer.
 */
export function SiteHeader({ markets }: { markets: Market[] }) {
  return (
    <>
      {/* Top row: transparent over the hero / navy band */}
      <div className="ds-inverse relative z-overlay text-label text-fg-inverse">
        <div className="ds-container">
          <div className="flex min-h-11 items-center justify-between gap-4 lg:px-6">
            <div className="flex items-center gap-5">
              <a href={contact.phoneHref} className={`ds-numeric ${utilityLink}`}>
                <Icon name="phone" size={15} />
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className={`hidden sm:inline-flex ${utilityLink}`}>
                <Icon name="mail" size={15} />
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <ul className="hidden items-center gap-6 lg:flex">
                {utilityLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={utilityLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Dropdown
                label="Language and market"
                icon="globe"
                tone="dark"
                value="com"
                align="end"
                options={markets.map((m) => ({ value: m.code, label: m.label, hint: m.domain }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* The white card */}
      <div className="sticky top-3 z-sticky pb-3 lg:pb-0">
        <div className="ds-container">
          <header className="relative rounded-lg bg-surface shadow-md">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-3 py-3 [grid-template-areas:'brand_actions''search_search'] sm:px-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-6 md:px-6 md:[grid-template-areas:'brand_search_actions'] lg:gap-x-8 lg:py-4">
              <div className="flex min-w-0 items-center gap-1 [grid-area:brand]">
                <MobileMenu groups={primaryNav} utility={utilityLinks} markets={markets} />
                <Link href="/concept-a" aria-label={`${brandLogo.alt}, home`} className="inline-flex min-h-11 items-center rounded-md">
                  <Image src={brandLogo.src} alt="" width={brandLogo.width} height={brandLogo.height} priority className="h-10 w-auto lg:h-12" />
                </Link>
              </div>

              <div className="w-full [grid-area:search]">
                <SearchForm id="header-search" trailing={<QuickOrder variant="chip" />} />
              </div>

              <ul className="flex items-center justify-end gap-2 [grid-area:actions] lg:gap-3">
                <li>
                  <Link href="/concept-a/account" title="Log in" className={roundAction}>
                    <Icon name="user" size={22} />
                    <span className="sr-only">Log in</span>
                  </Link>
                </li>
                <li>
                  <Link href="/concept-a/cart" title="Cart" className={roundAction}>
                    <Icon name="bag" size={22} />
                    <span aria-hidden="true" className="ds-numeric absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-action-accent px-1 text-caption font-extrabold text-fg-on-accent ring-2 ring-surface">
                      0
                    </span>
                    <span className="sr-only">Cart, 0 items</span>
                  </Link>
                </li>
                {designGroup ? (
                  <li className="hidden pl-1 lg:block">
                    <ButtonLink href={designGroup.href} variant="accent" size="lg">
                      {designGroup.label}
                    </ButtonLink>
                  </li>
                ) : null}
              </ul>
            </div>

            {/* Category navigation (the drawer carries it below 1024px) */}
            <div className="hidden border-t border-line px-6 lg:block">
              <PrimaryNav groups={primaryNav} />
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
