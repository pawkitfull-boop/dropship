"use client"

import * as React from "react"

/**
 * Drives every `[data-reveal]` element on the page with a single
 * IntersectionObserver — no scroll listeners, no animation library,
 * no per-section fade-up class.
 *
 * Content is readable without JavaScript: `globals.css` only hides a
 * reveal target once `html.js` is present, and that class is set by a
 * pre-paint inline script. If scripting is off or fails, everything
 * renders in its final state.
 */
export function RevealOrchestrator() {
  React.useEffect(() => {
    const targets = new Set<Element>()

    const attrFor = (el: Element) =>
      el.hasAttribute("data-wipe")
        ? "data-wipe"
        : el.hasAttribute("data-reveal-children")
          ? "data-reveal-children"
          : "data-reveal"

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      document
        .querySelectorAll("[data-reveal], [data-wipe], [data-reveal-children]")
        .forEach((el) => el.setAttribute(attrFor(el), "in"))
      return
    }

    const show = (el: Element) => {
      el.setAttribute(attrFor(el), "in")
      io.unobserve(el)
      targets.delete(el)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Either it is in view, or it has already reached the fold at
          // some point — measured live, because a batched record can be
          // delivered after the scroll position has moved on again.
          if (entry.isIntersecting || entry.target.getBoundingClientRect().top < window.innerHeight) {
            show(entry.target)
          }
        }
      },
      {
        // The root is expanded upward without limit, so "intersecting"
        // means "has reached the fold, or is anywhere above it".
        //
        // A plain viewport-sized root is not enough: a fast flick or a
        // restored scroll position can move an element from below the
        // fold to above it within a single frame, crossing no threshold
        // at all, and the observer then never fires — leaving the
        // section permanently invisible. Extending the root upward means
        // a skipped element still reports as intersecting on the next
        // tick and reveals.
        //
        // Left and right are expanded for the same reason: cards inside a
        // horizontal scroller sit outside the viewport horizontally even
        // once their row is on screen, and would otherwise never reveal.
        //
        // The -8% bottom inset keeps the trigger just short of the fold
        // so the motion reads as the page settling rather than a pop.
        rootMargin: "100000px 100000px -8% 100000px",
        threshold: 0,
      }
    )

    const observe = () => {
      document
        .querySelectorAll(
          "[data-reveal]:not([data-reveal='in']), [data-wipe]:not([data-wipe='in']), [data-reveal-children]:not([data-reveal-children='in'])"
        )
        .forEach((el) => {
        if (targets.has(el)) return
        // Anything already on screen at mount reveals immediately so
        // above-the-fold content is never gated on an observer tick.
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.92) {
          show(el)
          return
        }
        targets.add(el)
        io.observe(el)
      })
    }

    observe()

    // Catch client-navigated content and late-mounting islands.
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
