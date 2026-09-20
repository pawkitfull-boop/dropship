# Project Brief: "The 10-Minute Reset" E-commerce Store

## Goal
Premium, mobile-first e-commerce store for Recovery & Self-Care Rituals.

## Hero Product
Acupressure Mat & Pillow Set.

## Brand Concept
"The 10-Minute Reset"

## Audience
Desk workers, busy professionals, fitness/recovery and self-care shoppers.

## Style
Minimal, premium, calm wellness. Warm ivory, beige, sage, charcoal. Generous whitespace.

## Positioning
Sell a lifestyle and a daily ritual, not a medical product. Relaxation, unwinding, self-care, everyday tension, recovery routines.

## Product Line
- Acupressure Mat & Pillow Set
- Gua Sha / Ice Roller Set
- Heated Neck & Shoulder Wrap
- Cooling / Weighted Eye Mask
- Foam Roller
- Mini Recovery Tool
- Compression Recovery Products

## Traffic Source
TikTok, Instagram, Facebook and Meta Ads. The vast majority of visitors arrive on a phone, from a video ad, in one tap. Design for that entry point first.

## Hard Rules
- No generic dropshipping look
- No fake urgency timers
- No fake reviews
- No invented statistics
- No medical or clinical claims
- Never claim to cure, treat, diagnose or medically improve any condition.

## Build Order
1. **Scaffold the Project:** Next.js (App Router), TypeScript, Tailwind CSS, ESLint, Prettier, folder structure.
2. **Commerce Backend:** Build typed data layer in `lib/commerce` with an adapter interface (mock data first, Shopify Storefront API later).
3. **Design System & Components:** Setup based on the 9 design skills, Shadcn, Motion.dev, and 21st.dev.
4. **Hero/Landing Page Implementation:** Mobile-first design focusing on "The 10-Minute Reset" feeling.
5. **Product & Cart Flows:** Implement minimal and premium cart, product details, and checkout flows.
6. **Polishing & Animation:** Apply premium micro-interactions, scroll animations, and GSAP overlays.

## Decisions Log
- **Setup (2026-09-15):** Initialized Next.js with App Router, TypeScript, and Tailwind CSS.
- **Backend (2026-09-15):** Created a mock commerce adapter adhering to an extensible interface so we can swap to Shopify later without rewriting UI.
- **Visual Identity (2026-09-15):** Adopted a structural, brutalist aesthetic over generic "calm wellness". Sharp corners (0px radii), visible grid borders, Inter for structure, Geist Mono for time/prices. Colors: Raw Linen, Plaster, Midnight Amethyst, Ash, and Thermal Orange for primary actions only.
- **Component Library (2026-09-15):** Built reusable, mobile-first components using Radix UI primitives for accessible mobile menus and accordions, Framer Motion for smooth sticky cart interactions, and strict Tailwind v4 utility constraints enforcing our brutalist token system. We introduced foundational atomic UI primitives (`Input`, `Textarea`, `FieldGroup`, `Label`, `Separator`, `PriceDisplay`, `TrustRow`, `VisuallyHidden`) to ensure consistent structural layouts across the site.
- **Product Data Layer (2026-09-15):** Established strict TypeScript types for Products, Bundles, Collections, and Reviews. Seeded the catalog with copy that emphasizes the physical, tactile ritual of relaxation without making any medical or curative claims. Enforced a strict 0-review empty state (no fake social proof).
- **Homepage First Half (2026-09-15):** Built the tactical close-up Hero section with a single brutalist motion moment using Framer Motion. Built the Benefits, Problem, and Demonstration sections prioritizing LCP (priority on hero image) and strictly avoiding medical claims.
- **Homepage Second Half (2026-09-15):** Completed the homepage funnel (How it Works, Product Details, Who it's For, Bundle Feature, Lead Gen, FAQ). Conducted a conversion audit and deliberately cut the secondary "Shop All" CTA from the Hero to reduce cognitive load and force a singular, high-intent funnel. Built the Social Proof module to gracefully degrade to an honest "Founder's Guarantee" due to the 0-review seed state.
- **Dynamic PDP Template (2026-09-15):** Built a universal Product Detail Page template (`/products/[handle]`) capable of rendering any product in the data layer. Features a strict mobile-first buy box, CSS scroll-snap gallery for zero layout shift, honest schema.org JSON-LD (omitting fake aggregate ratings), and integrated cross-sells.
- **Browse Layer (2026-09-15):** Built Collection pages, a dedicated Bundle Landing page (with honest "bought separately" math), and a robust Search page with sensible empty-state routing. Integrated a mobile-first bottom-sheet Filter Drawer using Radix Dialog, keeping the interface uncluttered. Created custom 404 and Error pages that maintain the brand voice and always route back to the funnel.
- **Cart & Checkout Handoff (2026-09-15):** Implemented a global React Context (`cart-context.tsx`) persisting state to `localStorage`. Built a slide-out Cart Drawer using Radix Dialog and Framer Motion, integrating a bundle order-bump. Built a dedicated `/cart` page mirroring the drawer's functionality. Checkouts defer via adapter pattern (`checkout-api.ts`) pointing cleanly to a simulated external endpoint, fulfilling strict decoupling requirements without touching UI.
- **Trust & Legal Layer (2026-09-15):** Built the About, Contact, FAQ, Tracking, Guarantee, and Policy pages. Adhered strictly to the anti-slop mandate by avoiding fake origin stories, fake company addresses, or invented heritage. Utilized explicit `[PLACEHOLDER]` tags for all legally required and operations-dependent facts (shipping times, warehouse locations, contact emails). Logged all placeholders to `CLAIMS_REVIEW.md`.
- **Email Capture System (2026-09-15):** Built a global, provider-agnostic `NewsletterForm` (with loading, duplicate, and success states) wrapping the `newsletter-api.ts` adapter. Implemented a dedicated link-in-bio landing page (`/guide`) and a global `NewsletterModal` (exit-intent/delayed-scroll). Authored "The 5-Minute Evening Reset Guide" as a downloadable markdown artifact focused entirely on the physical ritual, explicitly excluding medical claims.
- **Motion Architecture (2026-09-15):** Standardized all Framer Motion components to a strict 0.3s duration and `circOut` easing. Stripped out decorative hover scales (`hover:scale-105`) from product cards and buttons. Implemented explicit `useReducedMotion()` fallbacks across all overlays (modals, drawers, menus) to ensure a true crossfade alternative for accessibility, rather than relying on a broken global CSS kill-switch. Ensure 0 layout thrashing by animating only opacity and transforms.

- **Copywriting Rewrite (2026-09-15):** Executed a site-wide copy audit and rewrite enforcing a strict "sentence case, no hype" voice. Eliminated wellness clichés ("unlock your best self") and uppercase shouting. Standardized all button copy to describe exactly what happens (e.g., "Add to cart" -> "Added"). All medical/clinical claims were stripped or rewritten to focus on the physical sensation of the product. The `uppercase` utility classes were globally purged from all UI components (buttons, labels, nav links, error states).

## Step 9: Performance and SEO (Completed)
- Removed artificial rendering delay from the Hero component, ensuring text is visible instantly for optimal LCP.
- Refactored `BuyBox` into a Server Component structure to prevent hydration delays from blocking the primary text rendering.
- Implemented robust dynamic `<title>` and `<meta name="description">` generation for all product and collection routes.
- Configured JSON-LD structured data for WebSite, Organization, FAQPage, Breadcrumbs, and Products.
- Verified that all images use `priority` and `sizes` attributes for correct responsive loading without fetching oversized assets.
- Integrated dynamic Next.js `sitemap.xml` and `robots.txt` endpoints for complete indexability.

## Step 10: Analytics & Tracking (Completed)
- Built a deduplicated, privacy-first analytics core (`lib/analytics/core.ts`) to handle Meta Pixel, Meta Conversions API (CAPI), and TikTok Pixel.
- Added strict consent banner (`ConsentBanner`) that defaults to opt-in tracking for compliance.
- Captured UTM parameters and persisted them to `sessionStorage` for downstream attribution.
- Handled Server-to-Server CAPI tracking using a Next.js Server Action (`app/actions/capi.ts`).
- Fired typed standard events (`PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`, `Lead`) across the customer journey.
- Created `ANALYTICS.md` documenting schemas, workflows, and environment variables.
- Added an active `QA Mode` (`?qa_mode=true`) to expose fired events on the frontend without relying on network tabs.

- **Visual Rebuild — "Evening Index" (2026-09-15):** Functionality was strong but the design read as dated and generic. Diagnosed the root cause as the palette: warm cream plus terracotta is both the commonest signature of AI-generated design and the default of every other wellness brand, and it actively fought the store's own dark, material product photography. Rebuilt the visual system around a warm near-black ground with light "lit" surfaces as deliberate reading and buying moments, so the imagery leads. Replaced Inter with Bricolage Grotesque (display) and Geist (interface); kept Geist Mono strictly for values read as data. Made contrast the accent — the primary action is bone-on-ink and inverts on lit surfaces — and reduced ember to a signal for savings and heat only, split into text-safe and fill-safe tokens. Kept the 0px-radius structural language. Rebuilt the hero, the ritual index, the editorial splits, product cards, the PDP composition, the cart, the mobile navigation and the footer. Replaced per-section fades with a single IntersectionObserver-driven reveal. Fixed a `tailwind-merge` collision that was stripping every button's text colour, several reveal deadlocks, an async-component error on search, a sticky buy bar that never appeared on product pages, and a cross-sell that returned nothing for the hero product. Zero contrast failures, zero horizontal overflow from 320px to 1920px, clean lint, types and build.
