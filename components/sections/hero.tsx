import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { HeroCta } from "./hero-cta"

/**
 * The opening is the product's most characteristic moment: the spike
 * field, shot close, in low light. Type sits inside the image rather
 * than beside it, and the ten-minute arc runs along the foot of the
 * frame as the brand's own device.
 *
 * This is a server component — the headline and price are in the HTML
 * on first byte. Only the add-to-cart is a client island.
 */

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-ink-deep">
      {/* Ground */}
      <NextImage
        src="/images/mat-detail.jpg"
        alt="The acupressure mat's spike field, shot close in low light"
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Scrim. Two passes: a vertical lift for the type at the foot,
          and a slight left weight so the headline holds on desktop. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/55 to-ink-deep/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-deep/75 via-transparent to-transparent"
      />

      <div className="relative flex min-h-[100svh] flex-col justify-end px-gutter pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] pt-28">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="max-w-[46rem]">
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
              className="text-mono-caption mb-5 text-text-muted"
            >
              Acupressure mat &amp; pillow set
            </p>

            {/* Broken by hand into two measured lines rather than left
                to wrap at whatever width the viewport happens to be. */}
            <h1
              data-reveal
              style={{ ["--reveal-delay" as string]: "60ms" }}
              className="text-display text-balance text-bone"
            >
              Ten minutes on the floor.
            </h1>

            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
              className="text-body-large measure mt-5 text-text-secondary"
            >
              Sharp for two minutes. Warm for the next eight. A physical
              full stop at the end of the working day.
            </p>
          </div>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "220ms" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <HeroCta />
            <Link
              href="/products/acupressure-mat-pillow-set"
              className="inline-flex h-[52px] items-center justify-center px-2 text-body text-text-secondary underline decoration-line underline-offset-[6px] transition-colors hover:text-bone hover:decoration-bone sm:px-4"
            >
              See the detail
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
