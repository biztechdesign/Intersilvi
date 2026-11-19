"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Alert, Button, Dialog, FileUpload, Icon, Select, StateMessage, Tabs, TextInput, cx } from "@/design-system";
import { motifCategories, motifs, printColourName, savedLogos, uploadRules, type MotifCategory } from "@/lib/cart/motifs";
import type { AppliedLogo, LogoSource, PrintColourId } from "@/lib/cart/types";
import { MotifGlyph } from "./MotifGlyph";
import { PrintColourPicker } from "./PrintColourPicker";

/** What the dialog is previewing before the customer confirms. Nothing reaches the cart until "Use this …". */
interface Draft {
  source: LogoSource;
  assetId?: string;
  label: string;
  glyph?: string;
  previewUrl?: string;
  colour: PrintColourId;
}

const PAGE = 12;
const inkFor: Record<PrintColourId, string | undefined> = {
  gold: "#b8892f",
  silver: "#8a8e96",
  black: "#1b1b1d",
  bronze: "#9c5a2c",
  white: "#ffffff",
  "full-colour": undefined,
  other: undefined,
};

function toDraft(applied?: AppliedLogo): Draft | null {
  if (!applied) return null;
  const glyph = applied.source === "motif" ? motifs.find((m) => m.id === applied.assetId)?.glyph : applied.source === "saved-logo" ? savedLogos.find((l) => l.id === applied.assetId)?.glyph : applied.previewUrl ? undefined : "picture_as_pdf";
  return { source: applied.source, assetId: applied.assetId, label: applied.label, glyph, previewUrl: applied.previewUrl, colour: applied.colour };
}

/** Square selectable tile used by the motif and saved-logo grids. */
function Tile({ selected, onClick, label, children, sub }: { selected: boolean; onClick: () => void; label: string; children: ReactNode; sub?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cx(
        "relative grid min-h-24 w-full content-center justify-items-center gap-1 rounded-md border bg-surface p-3 text-center transition-colors duration-fast hover:bg-surface-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        selected ? "border-selected bg-selected-surface shadow-[0_0_0_1px_rgb(var(--ds-color-selected))]" : "border-line",
      )}
    >
      {selected ? (
        <span aria-hidden="true" className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-action-primary text-fg-inverse">
          <Icon name="check" size={14} />
        </span>
      ) : null}
      {children}
      <span className="text-body-sm font-medium text-fg">{label}</span>
      {sub}
    </button>
  );
}

function MotifsTab({ draft, onPick }: { draft: Draft | null; onPick: (d: Draft) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MotifCategory | "all">("all");
  const [shown, setShown] = useState(PAGE);
  const results = useMemo(() => motifs.filter((m) => (category === "all" || m.category === category) && m.name.toLowerCase().includes(query.trim().toLowerCase())), [query, category]);
  const chip = (id: MotifCategory | "all", label: string) => (
    <button
      key={id}
      type="button"
      aria-pressed={category === id}
      onClick={() => {
        setCategory(id);
        setShown(PAGE);
      }}
      className={cx(
        "min-h-9 rounded-full px-3.5 text-body-sm font-semibold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        category === id ? "bg-action-primary text-fg-inverse" : "bg-surface-soft text-fg hover:bg-action-secondary-hover",
      )}
    >
      {label}
    </button>
  );
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <TextInput aria-label="Search motifs" type="search" placeholder="Search motifs (e.g. dog, horse, agility)" value={query} onChange={(e) => (setQuery(e.target.value), setShown(PAGE))} />
        <Select aria-label="Category" value={category} onChange={(e) => (setCategory(e.target.value as MotifCategory | "all"), setShown(PAGE))}>
          <option value="all">All categories</option>
          {motifCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Motif categories">
        {chip("all", "All")}
        {motifCategories.map((c) => chip(c.id, c.label))}
      </div>
      {results.length === 0 ? (
        <StateMessage
          icon="search"
          title="No motifs match your search"
          body="Try a different word or choose another category."
          action={
            <Button variant="outline" size="sm" onClick={() => (setQuery(""), setCategory("all"))}>
              Clear search
            </Button>
          }
        />
      ) : (
        <>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4">
            {results.slice(0, shown).map((m) => (
              <li key={m.id}>
                <Tile selected={draft?.source === "motif" && draft.assetId === m.id} label={m.name} onClick={() => onPick({ source: "motif", assetId: m.id, label: m.name, glyph: m.glyph, colour: draft?.colour ?? "black" })}>
                  <MotifGlyph glyph={m.glyph} size={40} />
                </Tile>
              </li>
            ))}
          </ul>
          {shown < results.length ? (
            <Button variant="text" size="sm" iconEnd="chevron-down" className="justify-self-center" onClick={() => setShown((n) => n + PAGE)}>
              Show more motifs
            </Button>
          ) : null}
        </>
      )}
    </div>
  );
}

function LogosTab({ draft, onPick }: { draft: Draft | null; onPick: (d: Draft) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "name">("recent");
  const results = useMemo(() => {
    const list = savedLogos.filter((l) => l.name.toLowerCase().includes(query.trim().toLowerCase()));
    return [...list].sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : b.addedAt.localeCompare(a.addedAt)));
  }, [query, sort]);
  return (
    <div className="grid gap-4">
      <Alert tone="info">Saved logos below are sample data. Your own saved logos will appear here once you are signed in.</Alert>
      {savedLogos.length === 0 ? (
        <StateMessage icon="image" title="You have no saved logos yet" body="Upload a logo and it will be saved to your account for next time." />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
            <TextInput aria-label="Search my logos" type="search" placeholder="Search my logos" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Select aria-label="Sort logos" value={sort} onChange={(e) => setSort(e.target.value as "recent" | "name")}>
              <option value="recent">Recently added</option>
              <option value="name">Name A–Z</option>
            </Select>
          </div>
          {results.length === 0 ? (
            <StateMessage icon="search" title="No logos match your search" action={<Button variant="outline" size="sm" onClick={() => setQuery("")}>Clear search</Button>} />
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {results.map((l) => (
                <li key={l.id}>
                  <Tile
                    selected={draft?.source === "saved-logo" && draft.assetId === l.id}
                    label={l.name}
                    onClick={() => onPick({ source: "saved-logo", assetId: l.id, label: l.name, glyph: l.glyph, colour: l.colour })}
                    sub={<span className="text-caption text-fg-muted">{printColourName(l.colour)}</span>}
                  >
                    <MotifGlyph glyph={l.glyph} size={44} />
                  </Tile>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function UploadTab({ draft, onFile }: { draft: Draft | null; onFile: (file: File | null) => void }) {
  return (
    <div className="grid gap-4">
      <FileUpload
        label="Upload your logo"
        accept={uploadRules.accept}
        maxSizeMb={uploadRules.maxSizeMb}
        help={`${uploadRules.extensions.map((e) => e.toUpperCase()).join(", ")}, up to ${uploadRules.maxSizeMb} MB. Vector files (SVG, PDF) print sharpest.`}
        onFile={onFile}
      />
      <Alert tone="info">Prototype: your file is previewed in this browser only and is not uploaded or saved. Storage and artwork checks need the production backend.</Alert>
      {draft?.source === "upload" ? null : <p className="text-body-sm text-fg-muted">Choose a file to see it in the preview.</p>}
    </div>
  );
}

/**
 * Add / change logo or motif for ONE cart line. Three tabs (My logos, Predefined motifs, Upload logo) share one preview,
 * one print-colour choice and one confirmation. Nothing is applied until "Use this …"; Cancel, Escape and the close button
 * leave the line as it was. Reopening starts from what is currently applied to that line.
 */
export function LogoMotifDialog({ productName, applied, onApply, trigger }: { productName: string; applied?: AppliedLogo; onApply: (logo: AppliedLogo | null) => void; trigger: (open: () => void) => ReactNode }) {
  const [draft, setDraft] = useState<Draft | null>(toDraft(applied));
  const [session, setSession] = useState(0);
  const url = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  const colourName = useMemo(() => (draft ? printColourName(draft.colour) : ""), [draft]);
  const ink = draft ? inkFor[draft.colour] : undefined;

  function onFile(file: File | null) {
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    if (!file) return setDraft((d) => (d?.source === "upload" ? null : d));
    const isImage = /\.(png|jpe?g|svg)$/i.test(file.name);
    if (isImage) url.current = URL.createObjectURL(file);
    setDraft((d) => ({ source: "upload", label: file.name, glyph: isImage ? undefined : "picture_as_pdf", previewUrl: url.current ?? undefined, colour: d?.colour ?? "black" }));
  }

  const startTab = applied?.source === "saved-logo" ? "logos" : applied?.source === "upload" ? "upload" : "motifs";
  const verb = draft?.source === "motif" ? "motif" : "logo";

  return (
    <Dialog
      size="xl"
      title={applied ? "Change logo/motif" : "Add logo/motif"}
      description={`For ${productName}. Your choice is applied only when you confirm.`}
      trigger={(open) =>
        trigger(() => {
          setDraft(toDraft(applied));
          setSession((s) => s + 1);
          open();
        })
      }
      footer={(close) => (
        <>
          {applied ? (
            <Button
              variant="text"
              size="sm"
              iconStart="trash"
              className="mr-auto self-center text-status-error"
              onClick={() => {
                onApply(null);
                close();
              }}
            >
              Remove logo
            </Button>
          ) : null}
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!draft}
            onClick={() => {
              if (!draft) return;
              onApply({ source: draft.source, assetId: draft.assetId, label: draft.label, previewUrl: draft.previewUrl, colour: draft.colour });
              close();
            }}
          >
            Use this {verb}
          </Button>
        </>
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <Tabs
          key={session}
          label="Logo and motif source"
          defaultId={startTab}
          items={[
            { id: "logos", label: "My logos", content: <LogosTab draft={draft} onPick={setDraft} /> },
            { id: "motifs", label: "Predefined motifs", content: <MotifsTab draft={draft} onPick={setDraft} /> },
            { id: "upload", label: "Upload logo", content: <UploadTab draft={draft} onFile={onFile} /> },
          ]}
        />
        <section aria-label="Preview" className="grid content-start gap-4 rounded-lg border border-line bg-surface-alt p-4 lg:sticky lg:top-0">
          <h3 className="text-h5">Preview</h3>
          <div className={cx("grid aspect-[4/3] place-items-center overflow-hidden rounded-md border border-line", draft?.colour === "white" ? "bg-surface-inverse" : "bg-surface")}>
            {draft ? (
              draft.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={draft.previewUrl} alt={`Preview of ${draft.label}`} className="max-h-full max-w-full object-contain p-3" />
              ) : (
                <MotifGlyph glyph={draft.glyph ?? "image"} size={88} colour={ink} />
              )
            ) : (
              <p className="px-4 text-center text-body-sm text-fg-muted">Choose a motif or logo to preview it here.</p>
            )}
          </div>
          {draft ? <p className="truncate text-body font-bold text-fg">{draft.label}</p> : null}
          <div className={draft ? "" : "pointer-events-none opacity-50"}>
            <PrintColourPicker name="dialog-print-colour" value={draft?.colour ?? "black"} onChange={(colour) => setDraft((d) => (d ? { ...d, colour } : d))} />
            <p className="mt-3 text-body-sm text-fg-muted">Prints in {draft ? colourName.toLowerCase() : "the colour you choose"} on the rosette&apos;s centre disc. Ribbon colours are chosen separately.</p>
            <p className="mt-2 text-caption text-fg-muted">&ldquo;Another colour&rdquo; is not available yet: how custom colours are ordered still has to be confirmed.</p>
          </div>
        </section>
      </div>
    </Dialog>
  );
}
