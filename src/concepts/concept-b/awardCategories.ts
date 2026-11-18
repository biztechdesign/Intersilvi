import { events } from "@/content/homepage";
import type { MediaKey } from "@/content/media";
import { rebase } from "@/lib/content/paths";
import { BASE } from "./base";

/**
 * "Find the right awards for your event": four categories in the order the client's reference gives them.
 * Destinations, photographs and crops are reused from the shared `events` content; nothing here is a new route.
 *
 * Mapping to confirm with the client:
 * - "Award ceremonies" has no range of its own on the live store. It points at the existing plaques destination, and its
 *   photograph is the client's cast-plaque banner as a stand-in. A ceremony photograph is a missing asset.
 * - "Trophies & medals" points at the existing Sport awards range (trophy cups, medals, medal ribbons, plaques).
 * - The equestrian photograph is a provisional Unsplash image (shown with a credit); a photo with Intersilvi rosettes is a missing asset.
 */
export interface AwardCategory {
  id: string;
  title: string;
  href: string;
  media: MediaKey;
  /** object-position for the portrait crop. */
  position?: string;
  /** Extra classes for the photograph (a tighter crop where the subject is small in its frame). */
  imageClassName?: string;
}

const source = (id: string) => {
  const e = events.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown event category: ${id}`);
  return { href: rebase(e.href, BASE), media: e.media, position: e.position };
};

export const awardCategories: AwardCategory[] = [
  { id: "award-ceremonies", title: "Award ceremonies", ...source("plaques"), media: "eventAwardCeremonies", position: "50% 50%" },
  { id: "trophies-medals", title: "Trophies & medals", ...source("trophies"), media: "eventTrophiesMedals", position: "50% 50%" },
  { id: "equestrian", title: "Equestrian events", ...source("equestrian"), media: "eventEquestrian", position: "35% 45%" },
  { id: "dog-shows", title: "Dog shows", ...source("dog-shows"), media: "eventDogShows", position: "50% 40%" },
];

/** Where "View all awards" goes: the existing ranges section on this page. */
export const allAwardsHref = "#ranges";
