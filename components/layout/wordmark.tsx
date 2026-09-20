import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Lockup: a ten-minute dial and the wordmark.
 *
 * The dial arc is drawn at exactly one sixth of the circle — ten minutes
 * of sixty — so the mark states the product's whole proposition without
 * a tagline. The gap in the ring is the elapsed reset.
 *
 * `textLength` pins the wordmark's width, so the lockup occupies the same
 * space whether the display face has loaded or the fallback is still in.
 * No reflow, no shifting header.
 */
export function Wordmark({ className, title }: { className?: string; title?: string }) {
  return (
    <span className={cn("font-display font-bold text-2xl tracking-tight text-white whitespace-nowrap", className)}>
      {title || "Pawkitfull"}
    </span>
  )
}
