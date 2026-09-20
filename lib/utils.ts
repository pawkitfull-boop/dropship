import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The type scale is declared as custom utilities (`text-display`,
 * `text-body`, `text-mono-caption`…). Out of the box tailwind-merge
 * reads anything matching `text-*` as a colour, so a class list like
 * `text-ink text-body` silently loses `text-ink` — which is how every
 * primary button ended up bone-on-bone.
 *
 * Registering the scale as font-size utilities makes the two groups
 * distinct, so a size and a colour can coexist and only true conflicts
 * are resolved.
 */
const FONT_SIZES = [
  "mega",
  "display",
  "h1",
  "h2",
  "h3",
  "body-large",
  "body",
  "body-small",
  "caption",
  "mono-caption",
  "mono-numeric",
] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
