import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Build-time list of the stub pages the prototype links to (categories, designer, cart, legal pages...).
 * Scans the source for "/concept-a/..." paths and "${BASE}/..." template links, so the static export gets a page for
 * every link the homepage shows. Only used by generateStaticParams.
 */
function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(name)) out.push(p);
  }
  return out;
}

export function stubSlugs(): { slug: string[] }[] {
  const found = new Set<string>();
  const re = /(?<!concepts)(?:\/concept-[ab]|\$\{BASE\}|\$\{base\})\/([a-z0-9][a-z0-9-]*(?:\/[a-z0-9][a-z0-9-]*)*)/g;
  for (const file of walk(join(process.cwd(), "src"))) {
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(re)) found.add(m[1]!);
  }
  return [...found].map((s) => ({ slug: s.split("/") }));
}
