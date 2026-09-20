/**
 * One motion system, consumed by both CSS and Framer Motion so the two
 * can never drift. Mirrors the custom properties in `globals.css`.
 *
 * Exits run meaningfully faster than entrances — dismissing something
 * should feel immediate, arriving should feel considered.
 */

export const durations = {
  feedback: 0.12,
  exit: 0.22,
  enter: 0.38,
  reveal: 0.9,
} as const

type Cubic = readonly [number, number, number, number]

export const easings = {
  /** Decelerate into place. */
  enter: [0.16, 1, 0.3, 1] as unknown as Cubic,
  /** Accelerate away. */
  exit: [0.4, 0, 1, 1] as unknown as Cubic,
  /** Symmetric, for things that move within the view. */
  standard: [0.2, 0, 0, 1] as unknown as Cubic,
}

export const motionTokens = {
  transition: {
    enter: { duration: durations.enter, ease: easings.enter },
    exit: { duration: durations.exit, ease: easings.exit },
    standard: { duration: durations.enter, ease: easings.standard },
    feedback: { duration: durations.feedback, ease: easings.standard },
  },
}

/** Stagger children by a readable but brisk interval. */
export const stagger = (index: number, base = 0.08, step = 0.04) => base + index * step
