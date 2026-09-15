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
