import type { NavGroup } from "@/lib/content/types";

/**
 * Concept B's header navigation: seven items in this order, labelled as the client asked. It is built from the shared
 * primary navigation, so Concept A's navigation is untouched:
 *
 *   Design your own rosettes · Horse rosettes ▾ · Swedish rosettes ▾ · Norwegian rosettes ▾ · Finnish rosettes ▾ ·
 *   Sports rosettes ▾ · Accessories ▾
 *
 * Horse, Swedish and Sport keep their existing menus. Norwegian, Finnish and Accessories had none, so they get menus
 * built from the top-level category names on the live store. Like the existing menus, the destinations are prototype routes
 * (the catch-all page) until real category pages exist. Sale is not part of this list.
 */
const LABELS: Record<string, string> = {
  design: "Design your own rosettes",
  horse: "Horse rosettes",
  swedish: "Swedish rosettes",
  norwegian: "Norwegian rosettes",
  finnish: "Finnish rosettes",
  sport: "Sports rosettes",
  accessories: "Accessories",
};

const ORDER = ["design", "horse", "swedish", "norwegian", "finnish", "sport", "accessories"];

type Columns = NavGroup["columns"];

const menus = (base: string): Record<string, Columns> => {
  const no = (slug: string) => `${base}/norwegian-stock-rosettes/${slug}`;
  const fi = (slug: string) => `${base}/finnish-stock-rosettes/${slug}`;
  const acc = (slug: string) => `${base}/accessories/${slug}`;
  return {
    norwegian: [
      {
        heading: "Dog shows",
        links: [
          { label: "Best in Show", href: no("best-in-show") },
          { label: "Bir", href: no("bir") },
          { label: "Bim", href: no("bim") },
          { label: "Cacib", href: no("cacib") },
          { label: "Cert", href: no("cert") },
          { label: "Championat", href: no("championat") },
        ],
      },
      {
        heading: "Trials and sport",
        links: [
          { label: "Agility", href: no("agility") },
          { label: "Rally", href: no("rally") },
          { label: "Jakt", href: no("jakt") },
          { label: "Lydighetsprøve", href: no("lydighetsprove") },
        ],
      },
      {
        heading: "Placings",
        links: [
          { label: "Beste", href: no("beste") },
          { label: "Deltager", href: no("deltager") },
          { label: "Premie", href: no("premie") },
          { label: "Excellent", href: no("excellent") },
          { label: "Clear round", href: no("clear-round") },
        ],
      },
    ],
    finnish: [
      {
        heading: "Dog shows",
        links: [
          { label: "Best in show", href: fi("best-in-show") },
          { label: "Cacib", href: fi("cacib") },
          { label: "Rop", href: fi("rop") },
          { label: "Sert", href: fi("sert") },
          { label: "Vsp", href: fi("vsp") },
        ],
      },
      {
        heading: "Trials and sport",
        links: [
          { label: "Agility", href: fi("agility") },
          { label: "Nosework", href: fi("nosework") },
          { label: "Toko", href: fi("toko") },
          { label: "Metsästys", href: fi("metsastys") },
        ],
      },
      {
        heading: "Placings",
        links: [
          { label: "Excellent", href: fi("excellent") },
          { label: "Nordic", href: fi("nordic") },
          { label: "Paras", href: fi("paras") },
          { label: "Valio", href: fi("fi") },
        ],
      },
    ],
    accessories: [
      {
        heading: "For officials",
        links: [
          { label: "Judge", href: acc("judge") },
          { label: "Ring steward", href: acc("ring-steward") },
          { label: "Priskort", href: acc("priskort") },
        ],
      },
      {
        heading: "Ring and show",
        links: [
          { label: "Centers", href: acc("centers") },
          { label: "Plastic tapes", href: acc("plastic-tapes") },
          { label: "Barrier tape", href: acc("barrier-tape") },
        ],
      },
    ],
  };
};

export function headerNav(groups: NavGroup[], base: string): NavGroup[] {
  const byId = new Map(groups.map((g) => [g.id, g]));
  const extra = menus(base);
  return ORDER.flatMap((id) => {
    const g = byId.get(id);
    if (!g) return [];
    return [{ ...g, label: LABELS[id] ?? g.label, columns: g.columns.length ? g.columns : (extra[id] ?? []) }];
  });
}
