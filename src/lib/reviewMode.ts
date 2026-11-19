/**
 * Client-review switches. While the site is being shared for review, only the pages that have been built open.
 * Set REVIEW_MODE to false to restore every link and the mega menus once the remaining pages exist.
 */
export const REVIEW_MODE = true;

/** Mega-menu panels in the header. Off during review. */
export const MEGA_MENUS_ENABLED = !REVIEW_MODE;

/**
 * Pages that links may open in review mode (path after the site's base path, no trailing slash): the homepage only.
 * Cart, sign-in, registration and account selection are built and kept, but nothing links to them during review.
 */
export const BUILT_PATHS = new Set<string>(["", "/concept-b"]);

export function isBuiltPath(pathname: string, basePath = ""): boolean {
  let p = pathname;
  if (basePath && p.startsWith(basePath)) p = p.slice(basePath.length);
  p = p.replace(/\/+$/, "");
  return BUILT_PATHS.has(p);
}
