import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";
import type { FeatureCategory, FieldTone, TileCategory } from "../content";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

const FIELD: Record<FieldTone, { bg: string; text: string; sub: string; action: string }> = {
  navy: { bg: "bg-b-navy", text: "text-b-on-navy", sub: "text-b-on-navy-2", action: "text-b-yellow" },
  gold: { bg: "bg-b-yellow", text: "text-b-navy-deep", sub: "text-b-navy", action: "text-b-navy-deep" },
  sun: { bg: "bg-b-yellow-soft", text: "text-b-navy-deep", sub: "text-b-ink-2", action: "text-b-navy" },
  sky: { bg: "bg-b-linen", text: "text-b-navy-deep", sub: "text-b-ink-2", action: "text-b-navy" },
};

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-b-navy focus-visible:ring-offset-4";

/** Featured category: a photograph with a solid text plate beneath it, so type never sits on a busy image. */
export function CategoryFeature({ category }: { category: FeatureCategory }) {
  return (
    <Link href={category.href} className={`group flex h-full flex-col overflow-hidden rounded-b-card bg-b-navy-deep text-b-on-navy no-underline ${focus}`}>
      <div className="relative min-h-[16rem] flex-1 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-b-out group-hover:scale-[1.03]">
          <Photo asset={media[category.photo]} sizes="(min-width: 64rem) 56vw, 100vw" position={category.photoPosition} />
        </div>
      </div>
      <div className="grid gap-2 p-6 sm:p-8">
        <h3 className="b-display text-b-display-3">{category.title}</h3>
        <p className="max-w-[44ch] text-b-on-navy-2">{category.body}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-b-small font-semibold text-b-yellow">
          {category.actionLabel}
          <Icon name="arrow-right" size={16} className="transition-transform duration-300 ease-b-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Standard category: text on a flat colour field with the client's product cutouts standing in the right half. */
export function CategoryTile({ category }: { category: TileCategory }) {
  const f = FIELD[category.tone];
  return (
    <Link
      href={category.href}
      className={`group relative isolate block min-h-[13.5rem] overflow-hidden rounded-b-card no-underline sm:min-h-[15rem] ${f.bg} ${f.text} ${focus}`}
    >
      <div className="relative z-[1] grid max-w-[54%] content-start gap-1.5 p-5 sm:p-7">
        <h3 className="b-display text-b-display-3 leading-tight">{category.title}</h3>
        <p className={`text-b-small ${f.sub}`}>{category.body}</p>
        <span className={`mt-3 inline-flex items-center gap-2 text-b-small font-semibold ${f.action}`}>
          {category.actionLabel}
          <Icon name="arrow-right" size={16} className="flex-none transition-transform duration-300 ease-b-out group-hover:translate-x-1" />
        </span>
      </div>
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2">
        {category.cutouts.map((c) => (
          <div
            key={c.image.src}
            className="absolute transition-transform duration-500 ease-b-out group-hover:-translate-y-1.5"
            style={{ right: `${c.right * 2}%`, bottom: `${c.bottom}%`, height: `${c.height}%`, aspectRatio: `${c.image.width} / ${c.image.height}` }}
          >
            <Image src={c.image.src} alt="" width={c.image.width} height={c.image.height} sizes="12rem" className="h-full w-full object-contain object-bottom drop-shadow-[0_10px_10px_rgba(11,26,61,0.28)]" />
          </div>
        ))}
      </div>
    </Link>
  );
}
