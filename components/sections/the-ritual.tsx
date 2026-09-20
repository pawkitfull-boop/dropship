import * as React from "react"
import { Section } from "@/components/layout/section"
import { Image as CustomImage } from "@/components/ui/image"

/**
 * This one genuinely is a sequence, so it is numbered and set on a
 * timeline. The clock values carry the structure — no eyebrow labels,
 * no repeated icon-heading-paragraph blocks.
 *
 * On a phone it becomes a snapping horizontal index, which is how the
 * strongest mobile commerce apps handle an ordered set: peek the next
 * card so the sequence is legible without a scrollbar.
 */

const STEPS = [
  {
    at: "00:00",
    title: "Set up",
    body: "Mat on the floor or the bed. A thin t-shirt the first few times. Phone in another room.",
    image: "/images/roller-foam.jpg",
    alt: "The mat rolled out, ready",
  },
  {
    at: "00:15",
    title: "Lie back",
    body: "Lower your back onto the points in one go. It is immediate, and it asks for a little commitment.",
    image: "/images/mat-detail.jpg",
    alt: "The spike field in close detail",
  },
  {
    at: "02:00",
    title: "It turns",
    body: "Keep breathing. The sharpness gives way to a broad, heavy warmth spreading across the back.",
    image: "/images/mat-use.jpg",
    alt: "Resting through the shift",
  },
  {
    at: "10:00",
    title: "Roll off",
    body: "Stand up slowly. The thing you notice is the absence — of tension, and of the day.",
    image: "/images/mask-hero.jpg",
    alt: "After the reset",
  },
]

export function TheRitual() {
  return (
    <Section tone="ink-deep" spacing="lg" border="bottom" bleed>
      <div className="mx-auto max-w-[88rem] px-gutter">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 data-reveal className="text-h1 max-w-[16ch] text-bone">
            What ten minutes looks like.
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
            className="measure-tight text-body-large text-text-secondary"
          >
            The same four beats every evening. That repetition is most of
            the point.
          </p>
        </div>
      </div>

      {/* Horizontal index. Snaps on touch, settles into a grid at width. */}
      <ol
        data-reveal-children
        className="hide-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter
                   lg:mx-auto lg:max-w-[88rem] lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
      >
        {STEPS.map((step) => (
          <li
            key={step.at}
            className="w-[78vw] max-w-[22rem] shrink-0 snap-start last:pr-gutter lg:w-auto lg:max-w-none lg:last:pr-0"
          >
            <div className="group relative overflow-hidden">
              <CustomImage
                src={step.image}
                alt={step.alt}
                aspectRatio="tall"
                sizes="(max-width: 1024px) 78vw, 22vw"
                zoomOnHover
              />
              {/* The clock value sits on the image — the sequence is the
                  structure, so it is set as a mark, not a caption. */}
              <span className="text-mono-caption absolute left-4 top-4 bg-ink-deep/80 px-2 py-1 text-bone backdrop-blur-sm">
                {step.at}
              </span>
            </div>

            <h3 className="text-h3 mt-5 text-bone">{step.title}</h3>
            <p className="mt-2 text-body text-text-secondary">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
