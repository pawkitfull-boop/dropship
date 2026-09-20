# Design Notes

This document serves as a scratchpad for design experiments, rejected ideas, and the rationale behind visual decisions.

---

## Current direction: "Evening Index" (visual rebuild)

The site was functionally complete but visually flat, dated and under-designed. This pass rebuilt the visual system from the ground up while preserving every behaviour.

### The diagnosis

1. **The palette was the single biggest problem.** Warm cream ground (`#F2EFE9`) plus a terracotta accent (`#E86A33`) is, almost exactly, the most common signature of AI-generated design — and it is also the default palette of every other wellness brand. It made the store look generic before a single word was read.
2. **It fought its own photography.** The product imagery is genuinely excellent: dark, high-contrast, material — slate, cold steel, charcoal, black silk, coarse linen. The beige UI was working against the strongest asset the brand had.
3. **No tonal range.** Nine consecutive sections on the same light ground. Nothing anchored the eye, so nothing felt important.
4. **Typography was assigned, not composed.** Inter (a generic default) at modest sizes, with headings that were all roughly the same weight and scale.
5. **Images were dropped into rectangles.** No full-bleed, no art direction, no relationship between type and image.
6. **Mobile was a stacked desktop**, not a designed composition.

### The decision

Build the identity *out of* the photography rather than against it. The dominant ground became a warm near-black; light "lit" surfaces now appear as deliberate moments where reading and buying happen. This kills the generic palette, makes the imagery sing, and matches the product truth — this is an evening ritual involving cold steel, heavy weight and sharp points.

### The system

- **Surfaces.** `ink` is the ground, `ink-deep` for wells and page heads, `ink-raised` for cards and image wells. `bone` / `paper` / `clay` are the lit surfaces, applied via an `.on-lit` region class so components adapt automatically rather than needing light and dark variants.
- **Contrast is the accent.** The primary action is bone-on-ink, inverting to ink-on-bone on lit surfaces. Both clear ~14:1, so the strongest action on any screen is also the most legible.
- **Ember is a signal, not a colour scheme.** It appears only for savings and genuine heat. It is split into two tokens with distinct jobs: `ember` is tuned to pass 4.5:1 as *text* on ink; `ember-deep` is tuned to pass 4.5:1 as a *fill* behind bone text. Using the wrong one of the pair is the only way to fail contrast in this system.
- **Type.** Bricolage Grotesque (variable, with optical-size and width axes) for display, so headlines can be composed rather than merely sized; Geist for the interface; Geist Mono, tabular, strictly for values read as data — prices, quantities, clock positions, order numbers.
- **Shape.** The 0px-radius structural language was kept. It is a real point of view and it differentiates the store. Separation is done with hairlines, ground shifts and space — not shadows, not rounded cards.
- **Motion.** One orchestrated reveal per view, driven by a single IntersectionObserver and CSS. Exits run faster than entrances. Everything animates only `transform` and `opacity`.

### Rejected during this pass

- **Accenting one phrase of the headline in a second colour.** Tried it in the hero; it is one of the named tells of generated design, and it was removed.
- **A `text-mega` hero headline.** At 9.5rem it pushed the price and CTA below the fold and read as shouting. The hero now uses `text-display` with a hand-broken line.
- **Keeping the warm-cream ground "because it is the existing brand".** The palette was the problem, not an asset to protect.
- **The corporate gifting module.** Unused, with a dead CTA. Deleted rather than restyled — it earned no place on any page.

### Bugs found and fixed while rebuilding

- **`tailwind-merge` was silently stripping button text colours.** It read the custom type scale (`text-body`, `text-display`…) as colour utilities, so `cn("text-ink", "text-body")` dropped `text-ink` and every primary button rendered bone-on-bone. Fixed by registering the scale as font-size utilities in `lib/utils.ts`.
- **A reveal deadlock.** `clip-path` on an observed element shrinks its intersection rect to zero, so IntersectionObserver reported it as never visible and it could never unhide. The clip now applies to the child.
- **Reveals lost to fast scrolling.** A large scroll jump crosses no threshold, so the observer never fired and sections stayed permanently invisible. The observer root is now expanded upward and sideways so "at or above the fold" always intersects.
- **Cards inside the horizontal scroller never revealed** — the scroller's own `overflow` clips their intersection rect. Those now reveal from the container via `data-reveal-children`.
- **`ProductCard` was an async server component rendered inside a client tree** (search), which React errors on. It is now synchronous and takes a `reviewSummary` resolved by server callers via `getReviewSummaries`.
- **The sticky mobile buy bar never appeared on product pages** — it watches `[data-cart-cta]` and the PDP had none. The buy box's add-to-cart is now flagged as the page's primary CTA.
- **The hero product had no cross-sell at all.** Related products matched on the first tag, which for the mat is `hero` — a tag nothing else carries. Relations are now ranked by shared-tag overlap across the whole catalogue.
- **Focus was not restored when the cart drawer closed.** It is opened programmatically, so Radix had no trigger to return to; the drawer now remembers and restores the previously focused element.
- **"Undo" showed permanently in the cart** rather than only after a removal.

## Historical notes (pre-rebuild)

## Ideas Tried
- Initial Pass: Generic calm wellness trope (warm ivory, sage green, Ogg serif, floaty fades, soft 12px radii).

## Rejected Ideas & Why
- **Generic Calm Wellness**: Rejected because it's an oversaturated aesthetic that doesn't speak to the specific mechanics of *acupressure* or the *10-minute* constraint. Sage green and pill buttons feel like a thousand other skincare brands.

## Rationale
- **Structural Brutalism**: We chose 0px border radii, visible 1px borders, and rigid grids to represent the sharp, physical interaction of acupressure on the body.
- **Time as a Feature**: We use a monospace font (`Geist Mono`) exclusively for prices and the 10-minute timer to emphasize the ritual constraint.
- **Thermal Isolation**: We swapped Sage Green for "Thermal Orange" (`#E86A33`), representing heat and blood flow. It is used strictly for primary conversion actions to isolate its boldness.
- **Midnight Amethyst**: Used instead of pure black or generic charcoal to subtly hint at the brand's premium wellness origins without reverting to standard tropes.
- **Component Architecture**: We explicitly rejected unstyled or soft component libraries. Our buttons maintain a strict minimum 44px mobile touch target, and the Header's mobile menu uses Radix Dialog to guarantee flawless body scroll locking and focus trapping. All animations (via framer-motion) respect the brutalist "no bounce" rule, using linear wipes or direct slides. We established a foundational set of brutalist atomic primitives (`Input`, `Textarea`, `FieldGroup`, `Label`, `Separator`, `PriceDisplay`, `TrustRow`, `VisuallyHidden`) ensuring consistent 1px borders and 0px radii across all forms and trust modules.
- **Data & Copy Strategy**: The product copy focuses exclusively on *tactile sensations* (cold, sharp, heavy) and the *ritual* of pausing. We strictly avoid claims about pain relief or muscle recovery in a clinical sense. Furthermore, the `reviews.ts` seed file is intentionally kept empty, with comments enforcing that the UI must gracefully handle a 0-review state rather than rendering fake social proof.
- **Hero & Motion Strategy**: We explicitly rejected the "slow cinematic fade" and the "centered text over lifestyle image" tropes. The Hero isolates the mat's sharp spikes in a brutalist reticle, and the motion is restricted entirely to this single arresting moment on page load (a 1px grid wipe). This guarantees a fast LCP (by avoiding fade-in delays on the main image) and prevents the rest of the page from feeling like a sluggish presentation deck.
- **Conversion Architecture**: We audited the homepage funnel for cognitive load and deliberately cut the "Shop All" secondary CTA from the Hero. Users arriving from a one-tap ad for a specific product must be presented with a binary choice (Buy the Mat vs. Keep Scrolling), rather than being immediately distracted by a catalog. Additionally, the Social Proof module was built to check the data layer and gracefully fallback to an honest "Our Physical Guarantee" statement when reviews are at 0, strictly avoiding the "fake stars" dropshipping trope.
- **PDP Architecture**: Built a heavily generalized Product Detail Page that relies on robust CSS scroll-snapping rather than heavy JS carousels for the gallery to prevent layout shifts. The JSON-LD schema is strictly dynamic, explicitly rejecting the common black-hat SEO tactic of hardcoding a 5.0 aggregateRating when the product has no reviews.
- **Browse Layer UX**: Filters on collection pages explicitly use a mobile-first bottom-sheet (via Radix Dialog) rather than a desktop sidebar, ensuring filtering feels native on iOS/Android. Search and Error states (404/500) were heavily copywritten to act as funnels themselves, never leaving the user stranded without a clear path back to the hero product or primary collection.
- **Cart & Trust Layer**: The Cart explicitly rejects dark patterns. There are no fake "Hold your items" countdown timers and no pre-ticked upsells. The order bump is presented honestly as "Complete the System," directly inside the slide-out drawer (and full `/cart` page). The final checkout CTA sits alongside a robust, three-point trust layer (Secure Encryption, Free Shipping, 30-Day Guarantee) exactly at the point of highest friction.
- **Trust Pages Architecture**: About, Contact, FAQ, and Legal pages were built to establish legitimacy through absolute honesty. Rather than inventing a founder mythology or fake business address (a hallmark of low-quality dropshipping), the design incorporates explicit `[PLACEHOLDER: ]` fields. This forces the operator to provide real, verifiable facts before launch. The Guarantee page serves as a dedicated landing environment for social proof, reinforcing the "30-Day Physical Guarantee" concept without relying on fake star ratings.
- **Email Capture UX**: The newsletter capture strictly avoids the "spin to win" or aggressive popup patterns typical of low-tier dropshipping. The modal is frequency-capped globally (`localStorage`), only triggers on exit-intent or delayed scroll (ensuring the user has actually seen the product first), and explicitly prevents rendering on the cart or checkout routes to protect the conversion funnel. Delivery of the lead magnet is instantaneous upon success state.
- **Motion Restraint**: Animation is strictly reserved for orchestrating the initial hero load and confirming explicit user actions (opening drawers, expanding accordions). Decorative scroll-jacking, fade-and-slide up content reveals, and hover-scale transforms were explicitly stripped from the codebase. All remaining motion is standardized to a single 0.3s `circOut` curve, uses only composite layer properties (`transform`, `opacity`) to guarantee 60fps without layout thrashing, and respects `prefers-reduced-motion` with graceful crossfade fallbacks.

- **Voice and Tone**: Executed a site-wide copy architecture prioritizing a calm, plain, and confident adult voice. We explicitly rejected wellness hype ("game-changer", "unlock your best self") and uppercase shouting (purged all `uppercase` classes from buttons and labels). Buttons are written in sentence case and clearly state their action ("Add to cart", "Return to shop"). This restraint reinforces the premium, brutalist positioning by speaking to the user as an adult who is tired after a long day, rather than shouting at them to buy.

## Performance & SEO Architecture
- **Largest Contentful Paint (LCP)**: Kept under ~2.5s by avoiding client-side rendering for critical `h1` tags. Used Server Components for the `BuyBox` wrapper to ensure immediate text rendering. Removed all artificial `opacity: 0` states from text to prevent hydration delays.
- **Image Pipeline**: Relied on Next.js `next/image` with `sizes` heavily configured to prevent massive payload downloads on mobile (e.g. `sizes="(max-width: 768px) 100vw, 50vw"`).
- **SEO & Structured Data**: Built out comprehensive JSON-LD (FAQ, BreadcrumbList, Product, Organization) using purely accurate data with zero fabricated social proof (no fake `aggregateRating` objects).

## Analytics Architecture
- **Deduplication**: Meta Pixel and Meta CAPI use identical `eventId`s (UUID v4) generated client-side upon event dispatch. Meta's edge servers deduplicate these hits.
- **Privacy & GDPR**: No cookies or external script executions occur until explicit consent is clicked in the brutalist `ConsentBanner`. UTM persistence is kept to `sessionStorage` or consent-gated cookies.
- **Unified Abstraction**: Tracking pixels aren't scattered across components. Everything routes through `trackEvent(eventName, payload)` which handles routing, appending UTMs, and dispatching.
