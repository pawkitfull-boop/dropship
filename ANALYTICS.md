# Analytics & Tracking Documentation

This document defines the analytics architecture, event schemas, and QA processes for paid media tracking (Meta Pixel, Meta Conversions API, TikTok Pixel) on The 10-Minute Reset.

## Core Abstraction Layer

All analytics events are routed through a central dispatcher located at `lib/analytics/core.ts`. 

To fire an event from anywhere in the client code:
```tsx
import { trackEvent } from "@/lib/analytics/core"

trackEvent("AddToCart", {
  content_name: product.title,
  content_ids: [variant.id],
  value: variant.price,
  currency: "USD"
})
```

### Automatic Enhancements
The `trackEvent` dispatcher automatically enriches every event with:
1. **Consent Verification**: Checks the `agy_consent` local storage key. If the user declined or hasn't accepted, the event is silently dropped.
2. **Event ID Generator**: Assigns a UUID (`eventId`) to the event to enable server/browser deduplication (critical for Meta CAPI).
3. **UTM Persistence**: Pulls any UTM parameters captured from the user's initial visit (`sessionStorage`) and appends them to the event payload.
4. **Timestamp & URL**: Automatically attaches contextual data.

## Standard Events

We track a strict set of typed standard events to keep the funnel unified across ad platforms.

| Event Name | Location / Trigger | Payload Schema |
| :--- | :--- | :--- |
| `PageView` | `app/layout.tsx` (Base Pixels) | `{}` |
| `ViewContent` | `app/products/[handle]/page.tsx` | `{ content_name, content_ids, value, currency }` |
| `AddToCart` | `<AddToCartButton>`, `<BuyBoxClient>` | `{ content_name, content_ids, value, currency }` |
| `InitiateCheckout` | `<BuyBoxClient>` (Buy Now button), `<CartDrawer>` (Checkout CTA) | `{ content_name, num_items, value, currency }` |
| `Purchase` | *Currently handled off-site by Shopify/Stripe checkout redirect.* | N/A |
| `Lead` | `<NewsletterForm>` (on successful submission) | `{ content_name }` |

## Conversions API (CAPI) Deduplication

When `trackEvent` is called, it fires the browser pixel (e.g., `fbq`) using the generated `eventId`. Simultaneously, it fires a Next.js Server Action (`app/actions/capi.ts`) containing the exact same `eventId`, along with user identifiers (like IP address, User-Agent, and `_fbp`/`_fbc` cookies). Meta receives both events and deduplicates them using the `eventId`, ensuring high match rates without double-counting.

## QA Mode

You can verify events without needing the Meta Pixel Helper or Network tab.

1. Append `?qa_mode=true` to any URL on the site (e.g., `localhost:3000/?qa_mode=true`).
2. A floating **ANALYTICS QA MODE** panel will appear on the right side of the screen.
3. This state persists in `localStorage` across page navigations.
4. Click "CLOSE" in the panel to disable QA mode.

## Environment Variables Required

For the pixels to track correctly, supply the following keys in your `.env.local` or production environment variables. Do **not** fabricate these IDs.

```env
# Meta
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
META_CAPI_TOKEN=your_conversions_api_access_token_here

# TikTok
NEXT_PUBLIC_TIKTOK_PIXEL_ID=your_tiktok_pixel_id_here
```
