# Product

<!-- impeccable:product-schema 1 -->

> Initialized 2026-11-17 with Impeccable `init`. Sources: the client's homepage reference image (a reference for content, features and structure, not an approved visual design), the live site https://intersilvi.com/ (read 2026-11-17), and the project brief. The discovery questions on primary buyer, conflicting facts and commerce backend were answered "no preference", so those points stay **open** below. Items marked **[Unconfirmed]** must not appear as stated fact on the site until the client confirms them.

## Platform

web

## Stack

Confirmed by the brief:

- Next.js (App Router), React and TypeScript.
- Responsive across desktop, tablet and mobile.
- Reusable, accessible React components that developers can reuse in production.
- Design tokens kept in one central place.
- Compatible with headless commerce: the UI talks to commerce data through a platform-neutral adapter, never directly to one vendor's SDK.
- Content kept separate from presentation: copy, navigation, categories and campaign content are data (CMS- or file-driven), not hard-coded in components.

Not installed yet. This step is discovery only.

## Users

Primary buyer priority is **open**: the client gave no preference. Buyer groups the live catalogue and the reference show:

- **Dog-show and breed clubs, kennel clubs and trial organisers.** This is the deepest part of the live catalogue: Swedish, Norwegian and Finnish award terms such as BIS, BIR/BIM, CACIB, certificates, championships, agility, rally obedience, nosework and hunting trials. They need the exact placement or award rosette their rules require, usually in quantity and ahead of a fixed event date.
- **Equestrian clubs and competition organisers.** Horse rosettes, placings 1st–5th, clear round, show jumping and cast stable plaques.
- **Sports clubs, associations, schools and companies.** Trophy cups, medals, medal ribbons, plaques and campaign or promotional rosettes and sashes.
- **Individuals and small organisers**, such as breeders (the business began by sewing rosettes for puppy buyers) and small events. They order smaller quantities and need more guidance.

The job is to get the right, correctly worded and branded awards delivered before a dated event, at a quantity price that fits the budget.

## Product Purpose

Intersilvi (Inter Silvi AB) designs, produces and sells award rosettes, ribbons, medals, trophies and plaques for competitions and events. The redesign creates a modern, premium, polished, responsive e-commerce site that puts **product discovery** and **rosette customization** first.

Success means:

- Visitors find the right stock rosette or award for their discipline and placement quickly.
- Visitors start, finish and order a custom rosette design with confidence, even without phoning for design help.
- Delivery-by-event-date and quantity pricing are clear before checkout.
- The front end can be reused on whichever headless commerce backend is chosen.

## Positioning

A Swedish manufacturer with its own production and showroom in Osby, northern Skåne, and decades of rosette making. Its stock range follows Nordic dog-show and trial award terms (Swedish, Norwegian and Finnish) at a depth general award shops do not offer, alongside fully customised rosettes (colours, printed ribbon text and printed centre badges with logos).

- Company history per the live About page: founded 1982 as a Labrador kennel that began sewing rosettes for puppy buyers, then for dog clubs; renamed Inter Silvi AB in 1992. **[Unconfirmed]** The reference image says "since 1992" and "over 30 years". The client must choose the wording.
- "Handmade by us" / "Designed by you. Handmade by us." (reference) is **[Unconfirmed]** as a claim about all products. The live site confirms production in Osby but does not say everything is handmade.
- "Produced in Europe" (reference) is **[Unconfirmed]**.

## Operating Context

Primary user journeys:

1. **Buy a stock rosette for a known award.** Pick a market range (Swedish, Norwegian or Finnish stock rosettes, horse rosettes), then the discipline (dog show, agility, show jumping, …), then the award or placement, then quantity, then cart. The taxonomy is deep (more than 250 nav links on the live site), so search, filtering and fast reorder matter.
2. **Design your own rosette (the key customization journey).**
   - Today the "Design your own rosettes" category lists 279 base design models. Filters: price, length, diameter, budget yes/no, construction (rings and folding), number of rings and number of streamers. Each product page has options such as tassels, fastener and cut type, plus a **DESIGN IT** button that opens a product designer. Customization includes colours from the colour chart, printed ribbon text (placement, year, organiser) and a printed centre badge (standard motif or a fully custom four-colour logo).
   - The reference proposes a guided five-step flow: **1 Type → 2 Centre → 3 Tails → 4 Text → 5 Extras**, with popular combinations, a ribbon-colour picker and a live preview.
   - Customised products cannot be returned. The customer approves the design by ordering, so the review and approval step before checkout must be explicit.
3. **Find awards by event type.** The reference groups these as Award ceremonies, Trophies & medals, Equestrian events and Dog shows. The live site has Sport awards, Trophies, Medals and Plaques.
4. **Plan against an event date.** Check production time and delivery, the free-shipping condition, and express orders by agreement.
5. **Quick order and reorder.** The reference shows a "Quickorder" entry for repeat buyers who know article numbers.
6. **Get help.** Design help by phone or email, the help centre, FAQ, contact, and the "Need help?" chat shown in the reference (chat is **[Unconfirmed]** as an actual service).
7. **Browse colour inspiration.** The colour chart and ribbon materials (satin, grosgrain, metallic, patterned), and the printed catalogue (currently a FlipHTML5 flipbook).

Homepage sections in the reference (the content and IA to preserve; the visual design is not approved):

1. Utility bar: quality, fast delivery and produced-in-Europe claims; Quickorder; language; customer service, about and contact.
2. Header: logo; Design your own, Horse, Swedish, Norwegian, Finnish and Sports rosettes, Accessories; search, account and cart.
3. Hero: award rosettes, trophies and medals for competitions and events, with CTAs **Design your own rosette** and **Explore our products**, plus a trust row.
4. Delivery times: stock rosettes compared with custom rosettes, each with its own CTA.
5. Design your own: a teaser for the five-step configurator with popular combinations, ribbon colours and "Choose your rosette".
6. Craftsmanship: Osby workshop story and a CTA.
7. Shop by event: four event categories.
8. Colour inspiration: ribbons and materials, with a CTA to the colour chart.
9. Our story: history and three proof points (experience, materials and craftsmanship, production and delivery).
10. Help band: contact CTA.
11. Footer: Shop, Customer service, About, Contact, social links, opening hours and legal links.
12. Persistent "Need help?" chat button.

Live-site sections the reference leaves out but that are durable product facts: Sale (Utförsäljning), Accessories, newsletter signup, wishlist, product reviews (the review feature exists, but there are 0 reviews), customer accounts (login and signup) and the printed catalogue.

## Capabilities and Constraints

Confirmed from the live site (current business rules; re-confirm them before launch):

- **Markets:** separate storefronts for SV (intersilvi.se), ENG (intersilvi.com), NO, DK, FI and DE. The live ENG site prices in **SEK including tax**, and some category and product names stay in Swedish on the ENG site. The new site needs full multi-language, multi-market support; currency per market is **open**.
- **Quantity pricing:** for example, "Buy 25 for SEK 97.00 each and save 39%". Tiered prices must be visible on product cards and pages.
- **Production time (Terms of Purchase):** stock products 4–7 workdays; other articles 14–20 workdays; express by agreement. **Conflict:** the reference says stock 7 working days and custom 10 working days. **[Unconfirmed]** The client must confirm which figures are current.
- **Transport:** Sweden 2–4 workdays; Europe 5–7 workdays.
- **Free shipping:** if ordered 30 days before use and the order is over SEK 3,750.
- **Returns:** defective goods within 8 days, written orders only; no returns on products designed with the customer's own text, logos or colours.
- **Customer service:** phone 0479-100 70 (+46 479 100 70), info@intersilvi.se, Södra Portgatan 37, 283 50 Osby, Sweden. Hours Mon–Thu 07.00–16.00, Fri 07.00–14.00; closed weeks 29–30. The reference shows "Mon–Fri 08:00–16:00" **[Unconfirmed]**.
- **Product attributes in use:** article number, stock status, tassels, fastener, cut type, length, diameter, rings, streamers and construction.

Open decisions:

- **Commerce backend:** the client gave no preference. The live storefront is a Next.js build by PrintXpand; its customer-account URLs look like Magento (not verified). The new front end stays **platform-agnostic** behind an adapter layer and uses mock data until a backend is chosen.
- **Configurator engine:** rebuild the five-step designer natively in React, or integrate the existing PrintXpand designer. How it prices, previews, uploads logos and hands the design to production is undefined.
- **Logo upload and artwork proofing:** whether customers upload logos in the flow, and whether a proof is sent for approval before production.
- **Primary buyer priority** (see Users).
- **Currency per market**, VAT display for B2B buyers, invoice payment for clubs, and payment methods (none were confirmed in discovery).
- **Search**, Quickorder behaviour, and whether customer accounts support reorder and saved designs.
- **CMS** for content separation.

## Redesign Scope (brief)

Two homepage concepts will be produced later. Both must keep the essential content and functions listed under Operating Context.

1. **Premium Scandinavian commerce:** minimalist, refined, elegant and product-focused.
2. **Interactive product commerce:** modern, engaging, focused on product discovery and customization.

These are the client's stated directions. The visual worlds are defined later in new-work and DESIGN.md, not here.

## Brand Commitments

- Name: **Intersilvi** (the legal entity is **Inter Silvi AB**). The reference uses "INTERSILVI" and "Inter Silvi" with a rosette mark. The final logo files and wordmark rules have not been supplied.
- The reference has the tagline "Rosettes for every achievement" under the logo **[Unconfirmed]**.
- The voice in the reference is warm, proud of craft and practical. Copy should use the correct award terms for each discipline and market.
- Swedish award terminology (BIS, BIR, CACIB, Certifikat, …) is product truth and must not be "translated away".

## Evidence on Hand

- The reference homepage image (in the conversation, not in the project folder). Its photography and illustrations are reference only and are **not licensed assets**.
- Copy from the live site: About (history from 1982 and 1992), Terms of Purchase, contact details, and the category and product taxonomy.
- Live product data examples: "Luxury Rosette", article 106330, SEK 128.00; 279 design-rosette base models.
- **Absent, so the design must not fabricate them:** customer testimonials or reviews (0 on the live site), certifications, sustainability claims, customer logos, award counts, real product photography and logo or brand files. Any placeholder must be clearly marked as such.

## Product Principles

1. **Right award, first time.** Discipline, market terminology and placement must be unambiguous. A wrong rosette at a show is a failure the customer cannot fix.
2. **Event date drives the order.** Production time, shipping and the free-shipping deadline should show up wherever someone decides to buy, not only in the terms.
3. **Customization should feel guided and safe.** Because custom orders cannot be returned, the configurator shows what will be produced and asks for clear approval.
4. **Built for quantity and repeat orders.** Tier pricing, quick order and reorder serve the clubs and organisers who buy every season.
5. **Content and commerce stay portable.** Copy, taxonomy and markets are data, and commerce runs through an adapter, so the front end outlives any one backend.

## Accessibility & Inclusion

The brief requires accessible components. The target standard is **[Unconfirmed]**; WCAG 2.2 AA is proposed. It is relevant here because the EU Accessibility Act applies to e-commerce sold in Sweden and the EU. The configurator's colour choices need names or labels as well as swatches, and its preview must not rely on colour alone. The site is multilingual, so typography and layouts must handle Swedish, Norwegian, Danish, Finnish and German text lengths and diacritics.
