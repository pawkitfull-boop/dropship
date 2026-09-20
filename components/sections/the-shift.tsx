import * as React from "react"
import { Image as CustomImage } from "@/components/ui/image"

/**
 * The argument for the product, told once. An asymmetric split — the
 * image runs to the page edge and outweighs the column of type, so the
 * section reads as a composition rather than two equal boxes.
 */
export function TheShift() {
  return (
    <section className="w-full bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image runs full-bleed to the left edge. It carries its own
            ratio on small screens and fills the row at width. */}
        <div
          data-wipe
          className="relative aspect-[16/10] w-full overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[40rem]"
        >
          <CustomImage
            src="/images/mat-use.jpg"
            alt="Lying back on the mat, eyes closed, mid-reset"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>

        <div className="flex flex-col justify-center px-gutter py-24 lg:col-span-5 lg:py-32 lg:pl-14 lg:pr-[max(3.5rem,calc((100vw-88rem)/2+3.5rem))]">
          <p data-reveal className="text-mono-caption mb-6 text-ember uppercase tracking-wider font-bold">
            Why it works
          </p>

          <h2 data-reveal style={{ ["--reveal-delay" as string]: "60ms" }} className="text-h1 text-text-primary">
            You cannot think your way out of a physical problem.
          </h2>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="measure mt-8 flex flex-col gap-5 text-body-large text-text-secondary"
          >
            <p>
              Ten hours at a desk leaves a mark. It sits in the neck and the
              shoulders, and it does not leave when the laptop closes.
            </p>
            <p>
              The mat interrupts it. For the first two minutes the sensation is
              sharp enough that nothing else holds your attention. Then it turns
              — the sharpness spreads into heat, and the muscles let go.
            </p>
            <p className="font-medium text-text-primary">
              By minute ten you are on the floor, and the day is behind you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
