import Image from "next/image";
import type { ReactNode } from "react";
import { commerce } from "@/lib/commerce/adapter";
import type { Product } from "@/lib/commerce/types";
import { ribbonColours } from "@/lib/commerce/mock/ribbons";
import { heroStillLife } from "@/lib/commerce/mock/showcase";
import { brandLogo, media } from "@/content/media";
import { contact } from "@/content/site";
import {
  Accordion,
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  ButtonLink,
  CartItem,
  CategoryCard,
  Checkbox,
  ConfigurationSummary,
  CountedInput,
  Dropdown,
  Field,
  Fieldset,
  FileUpload,
  HelpPanel,
  IconButton,
  MegaMenuPanel,
  NewsletterForm,
  OptionCardGroup,
  OrderSummary,
  Pagination,
  Panel,
  Price,
  PrimaryNavRow,
  ProductCard,
  ProductGallery,
  PromoBanner,
  QuantityStepper,
  Radio,
  RosetteModelCta,
  SearchInput,
  SectionHeading,
  SegmentedControl,
  Select,
  SiteFooter,
  SiteHeader,
  Skeleton,
  SpecList,
  Spinner,
  StateMessage,
  StepIndicator,
  StockStatus,
  SwatchGroup,
  Tabs,
  Textarea,
  TextInput,
  Toggle,
  Tooltip,
  UtilityBar,
  WishlistButton,
  borderRadius,
  boxShadow,
  color,
  describedBy,
  flattenColors,
  fontSize,
  motion,
  palette,
  type ProductCardData,
} from "@/design-system";
import { contrastRatio, wcagRating } from "@/design-system/contrast";
import { DialogDemo, DrawerMenuDemo, EntranceDemo, FilterDemo, RevealDemo, SliderDemo, TierDemo, ToastDemo } from "./Demos";

/**
 * /design-system: the living reference. Every example below renders the shared production components from
 * "@/design-system"; nothing is a static mock-up. Data marked "Example data" is illustrative, not business data.
 */

const NAV = [
  ["colour", "Colour"],
  ["type", "Typography"],
  ["space", "Spacing and shape"],
  ["buttons", "Buttons"],
  ["forms", "Form controls"],
  ["navigation", "Navigation"],
  ["commerce", "Commerce"],
  ["customization", "Customization"],
  ["shared", "Shared UI"],
  ["motion", "Motion"],
  ["feedback", "Feedback states"],
  ["footer", "Footer"],
  ["responsive", "Responsive rules"],
] as const;

/** Adapter shape → presentational card data. Lives at the page edge, so ProductCard never knows the commerce model. */
function toCard(p: Product, ranges: Record<string, string>): ProductCardData {
  return {
    name: p.name,
    href: "#commerce",
    image: p.image ? { src: p.image.src, alt: p.image.alt } : undefined,
    eyebrow: ranges[p.categoryId],
    meta: [p.awardTerm, p.specs?.[0], p.articleNumber ? `Art. no. ${p.articleNumber}` : undefined].filter(Boolean).join(" · ") || undefined,
    price: p.price,
    priceFrom: p.priceFrom,
    tier: p.tiers[0],
    availability: p.stock,
  };
}

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6 border-t border-line py-section-sm first:border-t-0 first:pt-0">
      <SectionHeading id={`${id}-title`} title={title} intro={intro} />
      <div className="grid grid-cols-1 gap-12">{children}</div>
    </section>
  );
}

function Sub({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="grid min-w-0 grid-cols-1 content-start gap-4">
      <div>
        <h3 className="text-h5">{title}</h3>
        {note ? <p className="mt-1 max-w-body text-body-sm text-fg-muted">{note}</p> : null}
      </div>
      {children}
    </div>
  );
}

function MotionTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[30rem] text-left text-body-sm">
        <thead className="bg-surface-alt text-label text-fg">
          <tr>
            <th className="px-4 py-2.5">Token</th>
            <th className="px-4 py-2.5">Value</th>
            <th className="px-4 py-2.5">Use</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map(([name, value, use]) => (
            <tr key={name}>
              <td className="px-4 py-2.5 font-semibold text-fg">{name}</td>
              <td className="ds-numeric px-4 py-2.5 text-fg-secondary">{value}</td>
              <td className="px-4 py-2.5 text-fg-secondary">{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Swatch({ name, hex, on }: { name: string; hex: string; on?: string }) {
  const ratio = on ? contrastRatio(hex, on) : undefined;
  return (
    <li className="overflow-hidden rounded-md border border-line bg-surface">
      <span className="block h-16" style={{ backgroundColor: hex }} />
      <span className="block p-3">
        <span className="block text-body-sm font-bold text-fg">{name}</span>
        <span className="ds-numeric block text-caption text-fg-muted">{hex.toUpperCase()}</span>
        {ratio ? (
          <span className="ds-numeric block text-caption text-fg-muted">
            {ratio}:1 on white · {wcagRating(ratio)}
          </span>
        ) : null}
      </span>
    </li>
  );
}

const TEXT_PAIRS: [string, string, string, string][] = [
  ["fg", color.fg.DEFAULT, "surface", color.surface.DEFAULT],
  ["fg-secondary", color.fg.secondary, "surface", color.surface.DEFAULT],
  ["fg-muted", color.fg.muted, "surface", color.surface.DEFAULT],
  ["fg-muted", color.fg.muted, "surface-soft", color.surface.soft],
  ["fg-link", color.fg.link, "surface-alt", color.surface.alt],
  ["fg-inverse", color.fg.inverse, "surface-inverse", color.surface.inverse],
  ["fg-inverse-muted", color.fg["inverse-muted"], "surface-inverse", color.surface.inverse],
  ["fg-on-accent", color.fg["on-accent"], "action-accent", color.action.accent],
  ["status-error", color.status.error, "status-error-surface", color.status["error-surface"]],
  ["status-success", color.status.success, "status-success-surface", color.status["success-surface"]],
  ["status-warning", color.status.warning, "status-warning-surface", color.status["warning-surface"]],
  ["line-input (non-text)", color.line.input, "surface", color.surface.DEFAULT],
];

const TYPE_ROWS: { key: string; label: string; use: string; sample: string; cls: string }[] = [
  { key: "serif-display", label: "Editorial display (Instrument Serif)", use: "One brand-story statement per page, at most", sample: "Made in Osby since 1982", cls: "font-serif text-serif-display" },
  { key: "display", label: "Display", use: "Hero headline", sample: "Award rosettes for every event", cls: "text-display" },
  { key: "h1", label: "H1", use: "Page title", sample: "Horse rosettes", cls: "text-h1" },
  { key: "h2", label: "H2", use: "Section title", sample: "Find the right award", cls: "text-h2" },
  { key: "h3", label: "H3", use: "Sub-section, featured card", sample: "Dog shows and trials", cls: "text-h3" },
  { key: "h4", label: "H4", use: "Panel and dialog titles", sample: "Order summary", cls: "text-h4" },
  { key: "h5", label: "H5", use: "Group titles", sample: "Delivery", cls: "text-h5" },
  { key: "h6", label: "H6", use: "Small headings, list titles", sample: "Customer service", cls: "text-h6" },
  { key: "card-title", label: "Card title", use: "Product and category names", sample: "Luxury Rosette", cls: "text-card-title" },
  { key: "lead", label: "Lead", use: "Intro paragraph under a heading", sample: "Choose a model, then make it yours in five steps.", cls: "text-lead text-fg-secondary" },
  { key: "body", label: "Body", use: "Running text", sample: "Rosettes are made at our workshop in Osby, where our showroom is too.", cls: "text-body" },
  { key: "body-sm", label: "Body small", use: "Secondary copy, table cells", sample: "Lower prices for larger quantities.", cls: "text-body-sm text-fg-secondary" },
  { key: "label", label: "Label", use: "Form labels, column headings", sample: "Email address", cls: "text-label" },
  { key: "caption", label: "Caption", use: "Metadata, image captions", sample: "Art. no. 106330", cls: "text-caption text-fg-muted" },
  { key: "nav", label: "Navigation", use: "Header and tab labels", sample: "Sport awards", cls: "text-nav" },
  { key: "button", label: "Button", use: "Button labels", sample: "Add to cart", cls: "text-button" },
  { key: "price", label: "Price", use: "Card prices", sample: "SEK 128", cls: "ds-numeric text-price" },
  { key: "price-lg", label: "Price large", use: "Product detail price", sample: "SEK 1,280", cls: "ds-numeric text-price-lg" },
];

/* Tailwind only generates classes it can see written out in full. */
const SHADOW_CLASS = { xs: "shadow-xs", sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg" } as const;

const SPACE: [string, number][] = [
  ["1", 4], ["2", 8], ["3", 12], ["4", 16], ["5", 20], ["6", 24], ["8", 32], ["10", 40], ["12", 48], ["16", 64], ["20", 80], ["24", 96], ["30", 120],
];

export default async function DesignSystemPage() {
  const [products, categories] = await Promise.all([commerce.getShowcaseProducts(), commerce.getCategories()]);
  const ranges = Object.fromEntries(categories.map((c) => [c.id, c.label]));
  const cards = products.slice(0, 4).map((p) => toCard(p, ranges));
  const luxury = products.find((p) => p.articleNumber === "106330") ?? products[0];
  const swatches = ribbonColours.map((c) => ({ id: c.id, name: c.name, hex: c.hex, finish: c.material.charAt(0).toUpperCase() + c.material.slice(1) }));
  const markets = [
    { value: "se", label: "Svenska", hint: "intersilvi.se" },
    { value: "com", label: "English", hint: "intersilvi.com" },
    { value: "no", label: "Norsk", hint: "intersilvi.no" },
    { value: "fi", label: "Suomi", hint: "intersilvi.fi" },
  ];

  return (
    <>
      <header className="ds-inverse bg-surface-inverse text-fg-inverse">
        <div className="ds-container py-section-sm">
          <p className="text-label text-brand-yellow">Intersilvi</p>
          <h1 className="mt-3 max-w-heading-wide text-display">Design system</h1>
          <p className="mt-4 max-w-lead text-lead text-fg-inverse-muted">
            One shared foundation for every Intersilvi page: semantic tokens, a Manrope type scale, a 4px spacing system and accessible, typed React
            components. Every example here is the production component.
          </p>
        </div>
      </header>

      <div className="ds-container grid grid-cols-[minmax(0,1fr)] gap-10 py-section-sm lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="Design system sections" className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0">
            {NAV.map(([id, label]) => (
              <li key={id} className="flex-none">
                <a href={`#${id}`} className="flex min-h-10 items-center rounded-md px-3 text-body-sm font-semibold text-fg-secondary no-underline hover:bg-surface-alt hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0">
          {/* ---------- Colour ---------- */}
          <Block id="colour" title="Colour" intro="Navy carries the brand and the text; yellow marks the one most important commercial action in a view. Everything else is quiet neutrals, so product photography leads.">
            <Sub title="Brand primitives" note="Provisional values from the brief, pending official brand files. Components never use primitives directly.">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
                <Swatch name="Navy 950" hex={palette.navy[950]} on="#FFFFFF" />
                <Swatch name="Navy 800" hex={palette.navy[800]} on="#FFFFFF" />
                <Swatch name="Navy 700" hex={palette.navy[700]} on="#FFFFFF" />
                <Swatch name="Navy 100" hex={palette.navy[100]} />
                <Swatch name="Yellow 500" hex={palette.yellow[500]} on="#FFFFFF" />
                <Swatch name="Yellow 600" hex={palette.yellow[600]} />
                <Swatch name="Neutral 25" hex={palette.neutral[25]} />
                <Swatch name="Neutral 200" hex={palette.neutral[200]} />
                <Swatch name="Neutral 500" hex={palette.neutral[500]} on="#FFFFFF" />
                <Swatch name="Neutral 600" hex={palette.neutral[600]} on="#FFFFFF" />
                <Swatch name="Neutral 700" hex={palette.neutral[700]} on="#FFFFFF" />
              </ul>
            </Sub>
            <Sub title="Semantic roles" note="These are the names used in code (bg-surface-alt, text-fg-muted, border-line-input…). Each is also a CSS variable: --ds-color-<role>.">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {Object.entries(flattenColors()).map(([name, hex]) => (
                  <li key={name} className="flex items-center gap-3 rounded-md border border-line p-2.5">
                    <span className="h-9 w-9 flex-none rounded-sm ring-1 ring-inset ring-line" style={{ backgroundColor: hex }} />
                    <span className="min-w-0">
                      <code className="block truncate text-caption font-bold text-fg">{name}</code>
                      <span className="ds-numeric block text-caption text-fg-muted">{hex.toUpperCase()}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Sub>
            <Sub title="Measured contrast" note="Computed from the tokens at render time. Body text needs 4.5:1 (AA); input borders and focus rings need 3:1. Yellow is 1.7:1 on white, so it is never used for text on light grounds.">
              <div className="overflow-x-auto">
                <table className="ds-numeric w-full min-w-[34rem] border-collapse text-body-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-caption text-fg-muted">
                      <th className="py-2 pr-4 font-semibold">Foreground</th>
                      <th className="py-2 pr-4 font-semibold">Background</th>
                      <th className="py-2 pr-4 font-semibold">Sample</th>
                      <th className="py-2 text-right font-semibold">Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEXT_PAIRS.map(([fn, fh, bn, bh]) => {
                      const r = contrastRatio(fh, bh);
                      return (
                        <tr key={fn + bn} className="border-b border-line">
                          <td className="py-2 pr-4"><code>{fn}</code></td>
                          <td className="py-2 pr-4"><code>{bn}</code></td>
                          <td className="py-2 pr-4">
                            <span className="inline-block rounded-sm px-2 py-0.5 font-semibold" style={{ color: fh, backgroundColor: bh }}>Aa 128</span>
                          </td>
                          <td className="py-2 text-right font-bold">
                            {r}:1 <Badge variant={r >= 4.5 ? "success" : r >= 3 ? "info" : "error"}>{wcagRating(r)}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Sub>
          </Block>

          {/* ---------- Typography ---------- */}
          <Block id="type" title="Typography" intro="Manrope for everything functional; Instrument Serif only for a single editorial statement. Sizes are fluid between a mobile minimum and a desktop maximum, and headings balance their line breaks.">
            <div className="divide-y divide-line border-y border-line">
              {TYPE_ROWS.map((t) => {
                const spec = fontSize[t.key];
                return (
                  <div key={t.key} className="grid gap-2 py-5 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
                    <div>
                      <p className="text-label">{t.label}</p>
                      <p className="text-caption text-fg-muted">{t.use}</p>
                      <p className="ds-numeric mt-1 break-words text-caption text-fg-muted">
                        <code>text-{t.key}</code> · lh {spec?.[1].lineHeight}
                        {spec?.[1].fontWeight ? ` · ${spec[1].fontWeight}` : ""}
                      </p>
                    </div>
                    <p className={t.cls}>{t.sample}</p>
                  </div>
                );
              })}
            </div>
            <Sub title="Text and links" note="Links in running text are underlined (1px, 0.2em offset) and keep their colour on hover; the underline darkens. Body copy is capped at 68ch.">
              <p className="max-w-body text-body text-fg-secondary">
                Read our <a href="#type" className="text-fg-link underline decoration-line-strong hover:decoration-fg-link">terms of purchase</a> before ordering custom rosettes. Custom designs are approved by you and cannot be returned.
              </p>
            </Sub>
          </Block>

          {/* ---------- Spacing ---------- */}
          <Block id="space" title="Spacing and shape" intro="A 4px scale for everything inside components; three section densities between them. Corners are small and consistent: 4px for inputs and chips, 6px for buttons and cards, 10px for panels and dialogs.">
            <Sub title="Spacing scale" note="Tailwind class suffix → pixels.">
              <ul className="grid gap-2">
                {SPACE.map(([k, px]) => (
                  <li key={k} className="grid grid-cols-[3rem_4rem_minmax(0,1fr)] items-center gap-3 text-body-sm">
                    <code className="text-fg">{k}</code>
                    <span className="ds-numeric text-fg-muted">{px}px</span>
                    <span className="h-3 rounded-sm bg-brand-navy" style={{ width: `min(100%, ${px * 2}px)` }} />
                  </li>
                ))}
              </ul>
            </Sub>
            <Sub title="Section spacing" note="Pick by content density, not by habit: sm for utility bands, md for most sections, lg for editorial and hero sections.">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["py-section-sm", "48 → 64px", "Delivery band, promo strips"],
                  ["py-section", "64 → 96px", "Standard sections"],
                  ["py-section-lg", "80 → 120px", "Hero, editorial story"],
                ].map(([c, v, use]) => (
                  <Panel key={c} padding="sm">
                    <code className="text-body-sm font-bold">{c}</code>
                    <p className="ds-numeric text-body-sm text-fg-secondary">{v}</p>
                    <p className="text-caption text-fg-muted">{use}</p>
                  </Panel>
                ))}
              </div>
            </Sub>
            <Sub title="Radius and elevation">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Object.entries(borderRadius).map(([k, v]) => (
                  <div key={k} className="grid gap-2">
                    <span className="h-20 border border-line-strong bg-surface-alt" style={{ borderRadius: v }} />
                    <code className="text-caption">rounded-{k} · {v}</code>
                  </div>
                ))}
                {(Object.keys(boxShadow) as (keyof typeof boxShadow)[]).map((k) => (
                  <div key={k} className="grid gap-2">
                    <span className={`h-20 rounded-md bg-surface ${SHADOW_CLASS[k]}`} />
                    <code className="text-caption">shadow-{k}</code>
                  </div>
                ))}
              </div>
            </Sub>
          </Block>

          {/* ---------- Buttons ---------- */}
          <Block id="buttons" title="Buttons" intro="One button family. Navy primary for most actions; yellow accent for the single most important commercial action in a view. Medium buttons are 44px tall, which is also the minimum touch target.">
            <Sub title="Variants">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="accent" iconEnd="arrow-right">Accent</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="text">Text link</Button>
                <Button variant="destructive" iconStart="trash">Remove</Button>
              </div>
            </Sub>
            <Sub title="Sizes and states">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Adding</Button>
                <Button variant="accent" loading>Adding</Button>
              </div>
            </Sub>
            <Sub title="Icon buttons" note="Icon-only buttons always carry an accessible label.">
              <div className="flex flex-wrap items-center gap-2">
                <IconButton icon="search" label="Search" />
                <IconButton icon="heart" label="Save to wishlist" variant="outline" />
                <IconButton icon="bag" label="Open cart" variant="primary" />
                <IconButton icon="close" label="Close" size="sm" />
                <WishlistButton productName="Luxury Rosette" />
              </div>
            </Sub>
            <Sub title="On navy">
              <div className="ds-inverse flex flex-wrap items-center gap-3 rounded-lg bg-surface-inverse p-6">
                <Button inverse>Primary</Button>
                <Button variant="accent" inverse>Accent</Button>
                <Button variant="outline" inverse>Outline</Button>
                <Button variant="text" inverse>Text link</Button>
                <IconButton icon="close" label="Close" inverse />
              </div>
            </Sub>
          </Block>

          {/* ---------- Forms ---------- */}
          <Block id="forms" title="Form controls" intro="Native controls styled from tokens. Labels are always visible (search is the one exception), help and errors sit under the control and are linked with aria-describedby, and input borders meet the 3:1 non-text contrast requirement.">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="grid content-start gap-5">
                <Field id="club" label="Club or organisation" help="Shown on the invoice.">
                  <TextInput id="club" placeholder="e.g. Osby Ridklubb" aria-describedby={describedBy("club", { help: "Shown on the invoice." })} />
                </Field>
                <Field id="email-err" label="Email address" error="Enter an email address like name@club.se.">
                  <TextInput id="email-err" type="email" defaultValue="name@club" aria-invalid="true" aria-describedby="email-err-error" />
                </Field>
                <Field id="disabled" label="Article number">
                  <TextInput id="disabled" disabled defaultValue="106330" />
                </Field>
                <Field id="msg" label="Message" optional>
                  <Textarea id="msg" placeholder="Tell us about your event" />
                </Field>
                <Field id="market" label="Country">
                  <Select id="market" defaultValue="se">
                    <option value="se">Sweden</option>
                    <option value="no">Norway</option>
                    <option value="fi">Finland</option>
                  </Select>
                </Field>
              </div>
              <div className="grid content-start gap-6">
                <form role="search">
                  <SearchInput id="search-demo" placeholder="Search name or article no." />
                </form>
                <Fieldset legend="Ribbon finish">
                  <Radio id="r1" name="finish" label="Satin" description="Smooth with a soft sheen" defaultChecked />
                  <Radio id="r2" name="finish" label="Grosgrain" description="Fine ribbed texture" />
                  <Radio id="r3" name="finish" label="Metallic" disabled description="Not available for this model" />
                </Fieldset>
                <Fieldset legend="Availability">
                  <Checkbox id="c1" label="In stock" defaultChecked />
                  <Checkbox id="c2" label="Made to order" />
                </Fieldset>
                <Toggle id="t1" label="Email me when my order ships" description="Takes effect immediately." defaultChecked />
                <QuantityStepper label="Quantity" defaultValue={25} />
                <SliderDemo />
                <FileUpload label="Logo for the centre badge" accept=".png,.jpg,.svg,.pdf" help="PNG, JPG, SVG or PDF, up to 10 MB" />
              </div>
            </div>
          </Block>

          {/* ---------- Navigation ---------- */}
          <Block id="navigation" title="Navigation" intro="Utility bar, header, category row and mega-menu content. On phones the category row moves into a drawer and search takes its own full-width row.">
            <div className="overflow-hidden rounded-lg border border-line">
              <UtilityBar
                start={
                  <a href={contact.phoneHref} className="ds-numeric inline-flex min-h-11 items-center gap-1.5 text-fg-inverse no-underline">
                    {contact.phoneDisplay}
                  </a>
                }
                links={[
                  { label: "Customer service", href: "#navigation" },
                  { label: "About us", href: "#navigation" },
                ]}
                end={
                  <>
                    <a href="#navigation" className="hidden min-h-11 items-center font-bold text-fg-inverse underline decoration-brand-yellow decoration-2 underline-offset-[0.4em] sm:inline-flex">
                      Quickorder
                    </a>
                    <Dropdown label="Language and market" options={markets} value="com" icon="globe" tone="dark" />
                  </>
                }
              />
              <SiteHeader
                logo={{ src: brandLogo.src, alt: "Inter Silvi AB", width: brandLogo.width, height: brandLogo.height, href: "#navigation" }}
                search={
                  <form role="search">
                    <SearchInput id="header-search-demo" placeholder="Search name or article no." />
                  </form>
                }
                actions={[
                  { icon: "user", label: "Log in", href: "#navigation" },
                  { icon: "heart", label: "Wishlist", href: "#navigation" },
                  { icon: "bag", label: "Cart", href: "#navigation", count: 2 },
                ]}
                menu={<DrawerMenuDemo />}
                nav={
                  <PrimaryNavRow
                    current="#nav-horse"
                    items={[
                      { label: "Design your own", href: "#nav-design" },
                      { label: "Horse rosettes", href: "#nav-horse" },
                      { label: "Swedish", href: "#nav-se" },
                      { label: "Norwegian", href: "#nav-no" },
                      { label: "Sport awards", href: "#nav-sport" },
                      { label: "Accessories", href: "#nav-acc" },
                    ]}
                  />
                }
              />
            </div>
            <Sub title="Mega-menu panel">
              <MegaMenuPanel
                columns={[
                  { heading: "Dog shows", links: [{ label: "Best in Show (BIS)", href: "#n1" }, { label: "BIR and BIM", href: "#n2" }, { label: "Certifikat", href: "#n3" }] },
                  { heading: "Trials and sport", links: [{ label: "Agility", href: "#n4" }, { label: "Rallylydnad", href: "#n5" }, { label: "Nosework", href: "#n6" }] },
                  { heading: "Placings", links: [{ label: "1:a–5:e pris", href: "#n7" }, { label: "Championat", href: "#n8" }] },
                ]}
                feature={
                  <div className="grid gap-2">
                    <p className="text-h5">Swedish stock rosettes</p>
                    <ButtonLink href="#navigation" variant="text" iconEnd="arrow-right">View the full range</ButtonLink>
                  </div>
                }
              />
            </Sub>
            <Sub title="Breadcrumbs and pagination">
              <Breadcrumbs items={[{ label: "Home", href: "#navigation" }, { label: "Sport awards", href: "#navigation" }, { label: "Trophy cups" }]} />
              <Pagination current={3} total={9} hrefFor={(p) => `#page-${p}`} />
            </Sub>
          </Block>

          {/* ---------- Commerce ---------- */}
          <Block id="commerce" title="Commerce" intro="Product photography leads: cutouts sit on one soft stage at one scale. Cards show only data the store provides; prices, tiers and availability are passed in, never computed by a component.">
            <Sub title="Product cards" note="Live-store products via the commerce adapter.">
              <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {cards.map((c) => (
                  <li key={c.name}>
                    <ProductCard product={c} action={<WishlistButton productName={c.name} />} />
                  </li>
                ))}
              </ul>
            </Sub>
            <Sub title="Category cards" note="Featured spans two rows; standard fills a grid cell. A bottom scrim keeps white text at least 7:1.">
              <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
                <div className="lg:row-span-2">
                  <CategoryCard
                    variant="featured"
                    data={{ title: "Dog shows and trials", description: "BIS, BIR, certifikat and more, in Swedish, Norwegian and Finnish terms.", href: "#commerce", image: { src: media.dogsWithRosette.src, alt: media.dogsWithRosette.alt, position: "50% 60%" } }}
                  />
                </div>
                <CategoryCard data={{ title: "Trophies", href: "#commerce", image: { src: media.goldTrophies.src, alt: media.goldTrophies.alt } }} />
                <CategoryCard data={{ title: "Plaques and medals", href: "#commerce", image: { src: media.stablePlaques.src, alt: media.stablePlaques.alt } }} />
                <CategoryCard data={{ title: "Equestrian events", href: "#commerce", image: { src: media.equestrian.src, alt: media.equestrian.alt }, credit: "Provisional photo" }} />
                <CategoryCard data={{ title: "Horse rosettes", href: "#commerce", image: { src: media.heroHorseRosette.src, alt: media.heroHorseRosette.alt, position: "30% 40%" } }} />
              </div>
            </Sub>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <Sub title="Price display">
                <div className="grid gap-3">
                  <Price price={{ amount: 128, currency: "SEK" }} />
                  <Price price={{ amount: 52, currency: "SEK" }} from />
                  <Price price={{ amount: 99, currency: "SEK" }} compareAt={{ amount: 128, currency: "SEK" }} vatNote="incl. VAT" />
                  <Price price={{ amount: 360, currency: "SEK" }} from size="lg" />
                  <p className="text-caption text-fg-muted">Sale price is example data.</p>
                </div>
              </Sub>
              <Sub title="Quantity and tier pricing" note="Luxury Rosette, as listed in the live store.">
                <TierDemo tiers={[{ minQuantity: 1, unitPrice: luxury?.price ?? { amount: 128, currency: "SEK" } }, ...(luxury?.tiers ?? [])]} />
              </Sub>
              <Sub title="Badges and availability">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="new">New</Badge>
                  <Badge variant="sale">Sale</Badge>
                  <Badge variant="custom">Custom design</Badge>
                  <Badge>BIS</Badge>
                  <Badge variant="info">Pre-order</Badge>
                </div>
                <div className="grid gap-2">
                  <StockStatus status="in_stock" />
                  <StockStatus status="made_to_order" detail="Production time from the store's terms" />
                  <StockStatus status="low_stock" />
                  <StockStatus status="out_of_stock" />
                </div>
              </Sub>
              <Sub title="Specifications">
                <SpecList
                  items={[
                    { label: "Article number", value: luxury?.articleNumber },
                    { label: "Size", value: luxury?.specs?.[0] },
                    { label: "Options", value: "Tassels, fastener, cut type" },
                    { label: "Customization", value: "Colours, ribbon text, centre badge" },
                  ]}
                />
              </Sub>
            </div>
            <Sub title="Sorting and filtering" note="On every width the filter panel is a drawer; desktop listings may also show filters inline in a sidebar.">
              <FilterDemo />
            </Sub>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <Sub title="Product gallery">
                <div className="max-w-md">
                  <ProductGallery
                    productName="Rosettes"
                    images={[heroStillLife.rosetteBlue, heroStillLife.rosetteRed, heroStillLife.rosetteTeal, heroStillLife.cup].map((i) => ({ src: i.src, alt: i.alt }))}
                  />
                </div>
              </Sub>
              <Sub title="Cart item and order summary" note="Example data.">
                <div>
                  <CartItem
                    item={{
                      name: "Luxury Rosette",
                      href: "#commerce",
                      image: luxury?.image ? { src: luxury.image.src, alt: luxury.image.alt } : undefined,
                      details: ["Ribbon: Navy and gold", "Text: Club Show 2027"],
                      unitPrice: { amount: 97, currency: "SEK" },
                      lineTotal: { amount: 2425, currency: "SEK" },
                    }}
                    quantity={<QuantityStepper label="Quantity" hideLabel size="sm" defaultValue={25} />}
                    remove={<Button variant="text" size="sm">Remove</Button>}
                  />
                </div>
                <OrderSummary
                  lines={[
                    { label: "Subtotal", value: "SEK 2,425" },
                    { label: "Shipping", value: "—", note: "Calculated at checkout" },
                  ]}
                  total={{ label: "Total incl. VAT", value: "SEK 2,425" }}
                  action={<Button variant="accent" block size="lg">Go to checkout</Button>}
                  footnote="Example data. Totals come from the cart service."
                />
              </Sub>
            </div>
          </Block>

          {/* ---------- Customization ---------- */}
          <Block id="customization" title="Customization" intro="Presentation controls only. The rosette designer is a separate application reached through model selection; the trophy customizer is its own feature module that composes these controls.">
            <Sub title="Step indicator">
              <StepIndicator
                current={2}
                steps={[
                  { id: "type", label: "Type" },
                  { id: "centre", label: "Centre" },
                  { id: "tails", label: "Tails" },
                  { id: "text", label: "Text" },
                  { id: "extras", label: "Extras" },
                ]}
              />
            </Sub>
            <Sub title="Ribbon colour swatches" note="Indicative screen colours; every swatch is named. Selection is a native radio group.">
              <SwatchGroup name="ribbon" legend="Ribbon colour" options={swatches} defaultValue="navy" />
              <SwatchGroup name="ribbon-compact" legend="Compact (names announced, not shown)" options={swatches.slice(0, 8)} defaultValue="red" showNames={false} size="sm" />
            </Sub>
            <Sub title="Rosette model-selection entry" note="The only way into the designer: listing → model → designer.">
              <RosetteModelCta
                title="Design your own rosette"
                body="Start from one of our rosette models, then choose colours, centre, ribbon text and extras."
                href="#customization"
                steps={["Type", "Centre", "Tails", "Text", "Extras"]}
                media={
                  <div className="absolute inset-0 flex items-end justify-center gap-4 p-6">
                    {[heroStillLife.rosetteBlue, heroStillLife.rosetteRed, heroStillLife.rosetteTeal].map((i) => (
                      <div key={i.src} className="relative h-[85%] w-[26%]">
                        <Image src={i.src} alt={i.alt} fill sizes="15vw" className="object-contain object-bottom" />
                      </div>
                    ))}
                  </div>
                }
              />
            </Sub>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <Sub title="Trophy customizer controls" note="Example data: sizes and limits will come from the trophy module.">
                <OptionCardGroup
                  name="trophy-size"
                  legend="Cup size"
                  defaultValue="m"
                  options={[
                    { id: "s", title: "Small", detail: "Size from product data" },
                    { id: "m", title: "Medium", detail: "Size from product data" },
                    { id: "l", title: "Large", detail: "Size from product data" },
                  ]}
                />
                <CountedInput id="engrave-1" label="Engraving, line 1" maxLength={28} defaultValue="Osby Ridklubb" />
                <CountedInput id="engrave-2" label="Engraving, line 2" maxLength={28} placeholder="e.g. Club Show 2027" />
                <FileUpload label="Logo for the plate" accept=".png,.svg,.pdf" help="Vector (SVG, PDF) gives the sharpest engraving" />
              </Sub>
              <Sub title="Preview controls and summary">
                <Panel variant="filled" padding="sm">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface">
                    <Image src={heroStillLife.cup.src} alt={heroStillLife.cup.alt} fill sizes="30vw" className="object-contain p-6" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <SegmentedControl name="view" legend="Preview view" defaultValue="front" options={[{ id: "front", label: "Front" }, { id: "side", label: "Side" }, { id: "back", label: "Back" }]} />
                    <div className="flex gap-1">
                      <IconButton icon="zoom-out" label="Zoom out" size="sm" variant="outline" />
                      <IconButton icon="zoom-in" label="Zoom in" size="sm" variant="outline" />
                      <IconButton icon="rotate" label="Reset view" size="sm" variant="outline" />
                    </div>
                  </div>
                </Panel>
                <ConfigurationSummary
                  items={[
                    { label: "Cup size", value: "Medium", editHref: "#customization" },
                    { label: "Engraving", value: "Osby Ridklubb", editHref: "#customization" },
                    { label: "Logo", value: "Not added", editHref: "#customization" },
                  ]}
                  footer={<Button variant="accent" block iconStart="bag">Add to cart</Button>}
                />
              </Sub>
            </div>
          </Block>

          {/* ---------- Shared UI ---------- */}
          <Block id="shared" title="Shared UI" intro="Panels, tabs, accordions, dialogs and tooltips behave the same everywhere: keyboard-operable, announced to screen readers and calm in motion.">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Sub title="Tabs">
                <Tabs
                  label="Product information"
                  items={[
                    { id: "desc", label: "Description", content: <p className="text-body text-fg-secondary">Large luxury rosette for competitions, exhibitions and events.</p> },
                    { id: "spec", label: "Specifications", content: <SpecList items={[{ label: "Article number", value: luxury?.articleNumber }, { label: "Size", value: luxury?.specs?.[0] }]} /> },
                    { id: "delivery", label: "Delivery", content: <p className="text-body text-fg-secondary">Delivery information comes from the store&apos;s terms.</p> },
                  ]}
                />
              </Sub>
              <Sub title="Accordion">
                <Accordion
                  exclusive
                  items={[
                    { id: "a1", title: "Can I return a custom rosette?", content: "Products designed with your own text, logos and colours can't be returned. Defective products can.", defaultOpen: true },
                    { id: "a2", title: "Do you help with designs?", content: "Yes. Call or email us and we will help you set up your rosette." },
                    { id: "a3", title: "Which markets do you deliver to?", content: "Shipping options and costs are shown in the cart." },
                  ]}
                />
              </Sub>
              <Sub title="Dialog, tooltip and toast">
                <div className="flex flex-wrap items-center gap-4">
                  <DialogDemo />
                  <Tooltip id="tip-vat" content="All prices include 25% Swedish VAT">
                    <button type="button" className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-body-sm font-semibold text-fg-link underline underline-offset-[0.2em]">
                      Prices incl. VAT
                    </button>
                  </Tooltip>
                  <ToastDemo />
                </div>
              </Sub>
              <Sub title="Panels">
                <div className="grid gap-3 sm:grid-cols-3">
                  <Panel padding="sm"><p className="text-h6">Bordered</p><p className="text-caption text-fg-muted">Default container</p></Panel>
                  <Panel variant="filled" padding="sm"><p className="text-h6">Filled</p><p className="text-caption text-fg-muted">Quiet emphasis</p></Panel>
                  <Panel variant="elevated" padding="sm"><p className="text-h6">Elevated</p><p className="text-caption text-fg-muted">Menus, popovers</p></Panel>
                </div>
              </Sub>
              <Sub title="Help and contact">
                <HelpPanel
                  title="We are here to help"
                  body="Questions about an order, a design or delivery? Get in touch."
                  channels={[
                    { icon: "phone", label: contact.phoneDisplay, href: contact.phoneHref, detail: "Opening hours from the content service" },
                    { icon: "mail", label: contact.email, href: `mailto:${contact.email}` },
                  ]}
                />
              </Sub>
              <Sub title="Newsletter and promotion">
                <NewsletterForm />
                <PromoBanner title="Order early for spring shows" body="Example promotion. One per view at most." action={<ButtonLink href="#shared" variant="primary">Shop now</ButtonLink>} />
              </Sub>
            </div>
          </Block>

          {/* ---------- Motion ---------- */}
          <Block id="motion" title="Motion" intro="Quiet and purposeful: motion confirms an action, explains a change of state, or marks the hero's single arrival. Nothing bounces, rotates for show, loops or parallaxes. With reduced motion on, movement stops and colour feedback stays.">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Sub title="Durations" note="Interactions take 160 to 220ms. Larger surfaces take 400ms. The hero arrival takes 700ms and staggers by 120ms (up to five steps). Scroll reveals take 650ms and stagger by 100ms (up to eight steps).">
                <MotionTable
                  rows={[
                    ["fast", motion.duration.fast, "Hover colour, pressed state, toggles, form focus"],
                    ["base", motion.duration.base, "Buttons, tabs, menus, swatches, arrows"],
                    ["slow", motion.duration.slow, "Drawers, image zoom, nav underlines"],
                    ["entrance", motion.duration.entrance, "Hero arrival"],
                    ["reveal", motion.duration.reveal, "Scroll reveals"],
                    ["stagger", motion.stagger, "Delay between hero items"],
                    ["staggerReveal", motion.staggerReveal, "Delay between items revealed together on scroll"],
                  ]}
                />
              </Sub>
              <Sub title="Easing, distance and scale" note="Arrivals decelerate (a soft cubic ease-out); exits leave faster. Movement stays controlled: 3px lifts, 4px nudges, 22 to 24px rises, never scale-ins or spins.">
                <MotionTable
                  rows={[
                    ["ease-standard", motion.easing.standard, "Interactions"],
                    ["ease-enter", motion.easing.enter, "Hero arrival and scroll reveals"],
                    ["ease-emphasized", motion.easing.emphasized, "Arrows, image zoom, menus"],
                    ["ease-exit", motion.easing.exit, "Exits"],
                    ["lift", motion.distance.lift, "Button hover lift"],
                    ["nudge", motion.distance.nudge, "Arrow hover nudge"],
                    ["enter", motion.distance.enter, "Hero entrance offset"],
                    ["rise", motion.distance.rise, "Scroll reveal offset"],
                    ["scale-media", motion.scale.media, "Card and editorial image zoom"],
                  ]}
                />
              </Sub>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Sub title="Hero entrance" note="The page's first moment. It's pure CSS (.ds-enter, .ds-enter-2 to -5), runs once on load, refresh and client-side navigation, and never hides content when JavaScript fails. Headlines move as a whole, never split into words or letters.">
                <EntranceDemo />
              </Sub>
              <Sub title="Section reveal" note="Every major section: add data-reveal to one element, data-reveal set to fade for imagery, or data-stagger to a group whose children should arrive one after another (a heading, its paragraph and its action; a row of cards). Never navigation, and never anything that must be usable before it finishes. One RevealObserver per layout reveals each target once.">
                <RevealDemo />
              </Sub>
            </div>
            <Sub title="Interaction feedback" note="Hover on a pointer device. Filled and outlined buttons lift 2px and settle when pressed. Arrows nudge 4px. Card photos zoom to 1.03 while the text and the card's size stay put. Touch screens get no hover state; keyboard focus gets the same ring everywhere.">
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="grid content-start gap-5">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" iconEnd="arrow-right">Primary</Button>
                    <Button variant="accent" iconEnd="arrow-right">Design your own</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="primary" disabled>Disabled stays still</Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    <ButtonLink href="#motion" variant="text" iconEnd="arrow-right">Text link with arrow</ButtonLink>
                    <IconButton icon="heart" label="Save to wishlist" variant="outline" />
                    <IconButton icon="close" label="Close" />
                  </div>
                </div>
                <div className="max-w-sm">
                  <CategoryCard data={{ title: "Trophies", href: "#motion", image: { src: media.goldTrophies.src, alt: media.goldTrophies.alt } }} />
                </div>
              </div>
            </Sub>
            <Sub title="Rules">
              <ul className="grid max-w-body list-disc gap-2 pl-5 text-body text-fg-secondary">
                <li>Animate opacity and transform only, so nothing changes layout. Card dimensions never move.</li>
                <li>Gate every hover transform with motion-safe. Hover styles only apply to devices with a fine pointer.</li>
                <li>Menus and dropdowns fade in (with a 4px settle when motion is allowed). Dialogs rise 8px. Drawers slide 24px. They close instantly.</li>
                <li>The hero arrives in a staggered sequence; sections then reveal once as they scroll into view, with groups and card rows staggered 100ms apart. Nothing replays.</li>
                <li>No animation libraries, loops, parallax, bounce, spring or decorative rotation. Chevrons may flip to show open and closed.</li>
              </ul>
            </Sub>
          </Block>

          {/* ---------- Feedback ---------- */}
          <Block id="feedback" title="Feedback states" intro="Every state says what happened and what to do next. Tone is carried by icon and words, not colour alone.">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Alert tone="info" title="Production starts after approval">We will email a proof before we print your logo.</Alert>
              <Alert tone="success" title="Added to cart">Luxury Rosette × 25</Alert>
              <Alert tone="warning" title="Order soon for your event date">Custom rosettes take longer than stock rosettes.</Alert>
              <Alert tone="error" title="We couldn't add this item" action={<Button size="sm" variant="outline">Try again</Button>}>
                The cart service didn&apos;t respond. Your selection is kept.
              </Alert>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Sub title="Loading">
                <div className="flex items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner />
                  <Spinner size="lg" />
                </div>
                <div aria-hidden="true" className="grid gap-3 rounded-md border border-line p-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </Sub>
              <Sub title="Empty state">
                <StateMessage title="No products match these filters" body="Remove a filter or search for an article number." action={<Button variant="outline">Clear all filters</Button>} />
              </Sub>
              <Sub title="Error state">
                <StateMessage tone="error" title="This page didn't load" body="Check your connection and try again. Your cart is safe." action={<Button>Try again</Button>} />
              </Sub>
            </div>
          </Block>

          {/* ---------- Footer ---------- */}
          <Block id="footer" title="Footer" intro="Navy, dense and complete: shop, service, about, contact and legal. The one place besides an editorial band where navy fills a full section.">
            <div className="overflow-hidden rounded-lg">
              <SiteFooter
                brand={
                  <>
                    <span className="inline-flex w-fit rounded-md bg-surface px-3 py-2">
                      <Image src={brandLogo.src} alt="Inter Silvi AB" width={brandLogo.width} height={brandLogo.height} className="h-9 w-auto" />
                    </span>
                    <p className="max-w-[28ch]">Award rosettes, trophies and medals for competitions and events. Made in Osby, Sweden.</p>
                  </>
                }
                columns={[
                  { heading: "Shop", links: [{ label: "Design your own", href: "#footer" }, { label: "Horse rosettes", href: "#footer" }, { label: "Sport awards", href: "#footer" }] },
                  { heading: "Service", links: [{ label: "Help centre", href: "#footer" }, { label: "Terms of purchase", href: "#footer" }, { label: "FAQ", href: "#footer" }] },
                  { heading: "About", links: [{ label: "About us", href: "#footer" }, { label: "Printed catalogue", href: "https://online.fliphtml5.com/ksisq/cwsb/", external: true }] },
                ]}
                contact={
                  <div>
                    <h2 className="mb-3 text-label text-fg-inverse">Contact</h2>
                    <a href={contact.phoneHref} className="ds-numeric block text-fg-inverse no-underline">{contact.phoneDisplay}</a>
                    <a href={`mailto:${contact.email}`} className="block text-fg-inverse no-underline">{contact.email}</a>
                  </div>
                }
                legal={<p>© {contact.company} · Design-system showcase</p>}
              />
            </div>
          </Block>

          {/* ---------- Responsive ---------- */}
          <Block id="responsive" title="Responsive rules" intro="One container (max 1320px, gutters 16 → 40px) and a small set of grid patterns that reflow at the same breakpoints everywhere.">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-body-sm">
                <thead>
                  <tr className="border-b border-line text-left text-caption text-fg-muted">
                    {["Pattern", "Phone < 640", "Tablet 640–1023", "Desktop ≥ 1024", "Wide ≥ 1536"].map((h) => (
                      <th key={h} className="py-2 pr-4 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Product grid", "2 columns", "3 columns", "4 columns", "4 (5 on listings)"],
                    ["Category mosaic", "1 column", "2 columns", "featured + 2×2", "same, taller"],
                    ["Image + text", "stacked, image first", "stacked", "50/50 or 7/5", "same, max 1320"],
                    ["Header", "logo, actions; search row; drawer menu", "same", "logo, search, actions; nav row", "same"],
                    ["Filters", "drawer", "drawer", "drawer or sidebar", "sidebar"],
                    ["Dialog", "bottom sheet, full width", "centred", "centred", "centred"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-b border-line">
                      {r.map((c, i) => (
                        <td key={i} className={i === 0 ? "py-2.5 pr-4 font-bold text-fg" : "py-2.5 pr-4 text-fg-secondary"}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Sub title="Live product grid" note="Resize the window: 2 → 3 → 4 columns, cards never drop below a readable width.">
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.slice(0, 8).map((p) => (
                  <li key={p.id}>
                    <ProductCard product={toCard(p, ranges)} />
                  </li>
                ))}
              </ul>
            </Sub>
          </Block>
        </main>
      </div>
    </>
  );
}
