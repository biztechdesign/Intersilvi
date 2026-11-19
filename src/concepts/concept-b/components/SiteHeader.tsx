import Image from "next/image";
import Link from "next/link";
import type { Market } from "@/lib/commerce/types";
import type { Link as NavLink, NavGroup } from "@/lib/content/types";
import { brandLogo } from "@/content/media";
import { contact } from "@/content/site";
import { ButtonLink, Icon } from "@/design-system";
import { headerNav } from "../headerNav";
import { StickyHeader } from "./StickyHeader";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";
import { QuickOrder } from "./QuickOrder";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SearchForm } from "./SearchForm";

interface SiteHeaderProps {
  markets: Market[];
  nav: NavGroup[];
  utility: NavLink[];
  base: string;
  /** Items in the cart. The prototype has no cart state yet, so the layout passes 0. */
  cartCount?: number;
  /** Signed-in customer's first name. Omit for a guest: the account action then reads "Log in". */
  customerName?: string;
}

const utilityLinkClass =
  "inline-flex min-h-12 items-center whitespace-nowrap text-body-sm font-medium text-fg-inverse no-underline transition-colors duration-fast ease-standard hover:text-brand-yellow";

const actionClass =
  "group relative inline-flex min-h-12 min-w-11 items-center justify-center gap-2 rounded-md px-2 text-nav text-fg no-underline transition-colors duration-fast ease-standard hover:bg-surface-soft active:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

/**
 * Concept B header: three tiers on desktop, composed from shared design-system parts (ButtonLink, Dropdown, Icon) and
 * the shared SearchInput, so Concept A's header is untouched. Shapes follow the brand guidelines: buttons rounded-md, inputs rounded-sm,
 * pills only for round elements (the cart count).
 *
 *   Row 1  navy utility bar: phone and email left; customer service, about us, contact, Quickorder (yellow) and the
 *          market selector right, after a divider.
 *   Row 2  logo | wide search (shared SearchInput, up to 640px) | "Design your own" (accent ButtonLink), account, cart.
 *   Row 3  category navigation with its mega menus (desktop only), a 3px underline on the current group.
 *
 * Rows 2 and 3 stick together as frosted glass once stuck (StickyHeader); the sticky header slides away on scroll up and returns on scroll down. Below 1024px the third row becomes the drawer, the
 * account and cart stay in the bar, and below 768px the search drops to its own line so nothing overlaps.
 */
export function SiteHeader({ markets, nav, utility, base, cartCount = 0, customerName }: SiteHeaderProps) {
  const groups = headerNav(nav, base);
  return (
    <>
      {/* Row 1: utility bar */}
      <div className="ds-inverse relative z-[45] bg-surface-inverse text-fg-inverse">
        <div className="ds-container flex min-h-12 items-stretch justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            <a href={contact.phoneHref} className={`ds-numeric gap-2 ${utilityLinkClass}`}>
              <Icon name="phone" size={20} />
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className={`hidden gap-2 sm:inline-flex ${utilityLinkClass}`}>
              <Icon name="mail" size={20} />
              {contact.email}
            </a>
          </div>
          <div className="flex items-stretch gap-0 lg:gap-8">
            {/* Quickorder comes first and fills the bar from top to bottom in brand yellow. */}
            <span className="hidden items-stretch sm:flex">
              <QuickOrder variant="tab" />
            </span>
            <ul className="hidden items-center gap-8 lg:flex">
              {utility.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={utilityLinkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="flex items-center border-l border-fg-inverse/25">
              <LocaleSwitcher markets={markets} />
            </span>
          </div>
        </div>
      </div>

      {/* Rows 2 and 3 stick together (StickyHeader): visible while scrolling down, slides away when scrolling back up. */}
      <StickyHeader>
      {/* Row 2: main header */}
      <header className="border-b border-line">
        <div className="ds-container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-2.5 [grid-template-areas:'brand_actions''search_search'] md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-3 md:[grid-template-areas:'brand_search_actions'] lg:gap-x-10 lg:py-5 lg:transition-[padding] lg:duration-300 lg:group-data-[stuck=true]/sticky:py-2">
          <div className="flex min-w-0 items-center gap-1 [grid-area:brand]">
            <div className="lg:hidden">
              <MobileMenu groups={groups} utility={utility} markets={markets} />
            </div>
            <Link href={base || "/"} aria-label={`${brandLogo.alt}, home`} className="inline-flex min-h-12 items-center">
              <Image src={brandLogo.src} alt="" width={brandLogo.width} height={brandLogo.height} priority className="h-11 w-auto transition-[height] duration-300 lg:h-16 lg:group-data-[stuck=true]/sticky:h-12" />
            </Link>
          </div>

          <div className="w-full [grid-area:search] lg:mx-auto lg:max-w-[40rem]">
            <SearchForm id="header-search" size="lg" />
          </div>

          <ul className="flex items-center justify-end gap-0 [grid-area:actions] lg:gap-1">
            <li className="hidden md:block md:mr-2">
              <ButtonLink href={`${base}/design-your-own`} variant="accent" size="md">
                Design your own
              </ButtonLink>
            </li>
            <li>
              <Link href={`${base}/wishlist`} className={actionClass}>
                <Icon name="heart" size={22} />
                <span className="hidden lg:inline">Wishlist</span>
                <span className="sr-only lg:hidden">Wishlist</span>
              </Link>
            </li>
            <li>
              <Link href={customerName ? `${base}/account` : `${base}/account/login`} className={actionClass}>
                <Icon name="user" size={22} />
                <span className="hidden max-w-[10ch] truncate lg:inline">{customerName ?? "Log in"}</span>
                <span className="sr-only lg:hidden">{customerName ? `My account, ${customerName}` : "Log in"}</span>
              </Link>
            </li>
            <li>
              <Link href={`${base}/cart`} className={actionClass}>
                <span className="relative inline-grid">
                  <Icon name="bag" size={22} />
                  <span
                    aria-hidden="true"
                    className="ds-numeric absolute -right-2.5 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-action-accent px-1 text-xs font-bold leading-none text-fg-on-accent ring-2 ring-surface"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                </span>
                <span className="hidden lg:ml-2 lg:inline">Cart</span>
                <span className="sr-only">
                  <span className="lg:hidden">Cart, </span>
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Row 3: category navigation (desktop only); the mega menu panels anchor to it. */}
      <div className="relative hidden border-b border-line lg:block">
        <div className="ds-container">
          <PrimaryNav groups={groups} />
        </div>
      </div>
      </StickyHeader>
    </>
  );
}
