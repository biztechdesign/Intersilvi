import type { Category, Product } from "@/lib/commerce/types";
import type { FooterColumn, Link, NavGroup } from "./types";

/**
 * Shared content and mock data carry hrefs written for Concept A ("/concept-a/..."). Each concept re-roots them
 * under its own route instead of duplicating the data. A real CMS would supply route-neutral paths.
 */
const SOURCE_BASE = "/concept-a";

export function rebase(href: string, base: string): string {
  return href.startsWith(SOURCE_BASE) ? base + href.slice(SOURCE_BASE.length) : href;
}

export const rebaseLink = (l: Link, base: string): Link => ({ ...l, href: rebase(l.href, base) });

export const rebaseNav = (groups: NavGroup[], base: string): NavGroup[] =>
  groups.map((g) => ({
    ...g,
    href: rebase(g.href, base),
    columns: g.columns.map((c) => ({ ...c, links: c.links.map((l) => rebaseLink(l, base)) })),
  }));

export const rebaseFooter = (cols: FooterColumn[], base: string): FooterColumn[] =>
  cols.map((c) => ({ ...c, links: c.links.map((l) => rebaseLink(l, base)) }));

export const rebaseCategories = (cats: Category[], base: string): Category[] =>
  cats.map((c) => ({ ...c, href: rebase(c.href, base), children: c.children && rebaseCategories(c.children, base) }));

export const rebaseProducts = (products: Product[], base: string): Product[] =>
  products.map((p) => ({ ...p, href: rebase(p.href, base) }));
