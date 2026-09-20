# QA Report — visual rebuild ("Evening Index")

Measured against the running site, not read off the source. Every figure below
came from an automated pass over the real pages plus manual checks in a browser.

## Responsive

Swept 14 routes at **320, 390, 768, 1440 and 1920px**.

- **Horizontal overflow: none at any width.** Verified by comparing
  `documentElement.scrollWidth` against `clientWidth` on every route at every
  breakpoint.
- **Content visibility: no stranded sections.** Every scroll-reveal target
  resolves under slow scrolling, fast flicking, and a direct jump to the
  bottom of the page.
- Full-height sections use `min-h-[100svh]`; no `h-screen` anywhere.
- Fixed and sticky elements (header, sticky buy bar, filter sheet, cart drawer,
  consent, newsletter sheet) add `env(safe-area-inset-*)` to their own padding.

## Accessibility

- **Contrast: zero failures.** Every rendered text/background pair across 10
  routes was measured against WCAG AA (4.5:1 normal, 3:1 large). The one
  failure found during the rebuild — bone on ember at 12px, 3.43:1 — was fixed
  by splitting ember into a text-safe and a fill-safe token.
- **Heading order** is sequential on every route; exactly one `h1` per page.
- **Keyboard**: every tab stop has a visible focus ring. The cart drawer, mobile
  menu, filter sheet and newsletter sheet all trap focus, close on Escape, and
  return focus to where it came from. The cart drawer needed an explicit fix —
  it opens programmatically, so Radix had no trigger to restore to.
- **Reduced motion**: with `prefers-reduced-motion: reduce`, zero reveal targets
  remain hidden and all transitions collapse to 1ms.
- **Alt text**: no `img` is missing an `alt` attribute. Decorative imagery is
  passed an empty alt so it is skipped rather than announced.
- **Skip link** is the first focusable element, becomes visible on focus, and
  moves focus to `#main-content`.
- Touch targets meet 44px for controls; breadcrumbs and link lists were raised
  to clear the WCAG 2.2 24px minimum.

## Performance

Production build, mobile viewport, 4× CPU throttle and a ~1.6 Mbps connection —
with the real photography loading.

| Route | LCP | FCP | CLS |
|---|---|---|---|
| Home | 1364 ms | 812 ms | 0.0000 |
| Product | 856 ms | 224 ms | 0.0000 |
| Collection | 276 ms | 236 ms | 0.0000 |

CLS is zero because every image declares its box in CSS before it loads.
No animation library drives scroll; reveals are one `IntersectionObserver`
plus CSS, and only `transform` and `opacity` are animated.

## Functional regression

Re-tested after the visual rebuild:

- Hero CTA, final CTA, bundle CTA, quick add, buy-it-now and the sticky bar all
  add the correct line items.
- Variant selection carries through to the cart (verified Raw Linen, not the
  default).
- Quantity, remove and undo all behave; undo now appears only after a removal.
- Cart persists across reloads.
- Sort and filter change the result set and the URL.
- Search returns results and syncs the query.
- No `alert()` in the checkout path; no console errors on any route.

## Bugs found and fixed during the rebuild

1. `tailwind-merge` read the custom type scale as colour utilities and stripped
   `text-ink` from every primary button — they rendered bone-on-bone.
2. A `clip-path` reveal deadlock: clipping an observed element to zero made
   IntersectionObserver report it as never visible, so it could never unhide.
3. Reveals lost to fast scrolling, which crosses no observer threshold.
4. Cards inside the horizontal scroller never revealed — the scroller's own
   overflow clips their intersection rect.
5. `ProductCard` was an async server component rendered inside a client tree.
6. The sticky mobile buy bar never appeared on product pages.
7. The hero product had no cross-sell: relations matched on its first tag,
   `hero`, which nothing else carries.
8. The bundle page looked its contents up by handle while the data stores ids,
   so the contents list, the spec accordion and the bundle add-to-cart were all
   silently empty.
9. Focus was not restored when the cart drawer closed.

## Known gaps

- `content/reviews.ts` is deliberately empty. The reviews surface renders an
  honest zero-state and the product schema omits `aggregateRating` entirely.
- Operational facts (support email, addresses, shipping windows) still come
  from `lib/config/store-details.ts` and must be filled in before launch —
  see `LAUNCH.md`.
- Policy pages carry structure, not legal copy.
