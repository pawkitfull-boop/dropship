# Pre-Launch Go-Live Checklist

This checklist contains every real-world dependency that must be configured before spending a single dollar on paid social.

## 1. Environment & Infrastructure
- [ ] Connect custom domain (e.g., `the10minutereset.com`) and verify SSL.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Update `manifest.json` and `favicon.ico` with the final brand marks.

## 2. Commerce & Payments
- [ ] Connect the commerce adapter (`lib/commerce/api.ts`) to the production Shopify/Stripe backend.
- [ ] Verify standard shipping rates and regions are correctly configured in the commerce backend.
- [ ] Do a real end-to-end test purchase using a real credit card, then refund it.

## 3. Product & Copy Details
- [ ] Replace all placeholder imagery (`/placeholder.png`) with real, compressed product photography.
- [ ] Fill out all operational facts (support email, address, response times) in `lib/config/store-details.ts`. Do not invent these details.
- [ ] Supply real policies (Privacy, Terms, Returns) in the `/policies` directories, or they will remain `noindex`.

## 4. Analytics & Tracking
- [ ] Inject `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_TOKEN` in Vercel/Netlify environment variables.
- [ ] Inject `NEXT_PUBLIC_TIKTOK_PIXEL_ID` in environment variables.
- [ ] Navigate the site with `?qa_mode=true` on production to verify the pixels are firing correctly.
- [ ] Verify the Consent Banner correctly gates pixel initialization in production.

## 5. Marketing Operations
- [ ] Connect `subscribeToNewsletter` in `lib/marketing/newsletter-api.ts` to Klaviyo, Mailchimp, or your chosen ESP.
- [ ] Verify the automated welcome email delivers the "5-Minute Evening Reset Guide".
- [ ] Ensure order confirmation and shipping tracking emails are active in the commerce backend.

## Final Sign-Off
Do not run TikTok or Meta ads until this list is entirely checked off.
