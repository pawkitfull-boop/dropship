import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] w-full items-end overflow-hidden border-b border-line bg-ink-deep">
      <CustomImage src="/images/mat-detail.jpg" alt="" sizes="100vw" className="opacity-35" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-ink-deep/40"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-gutter py-section-md">
        <p className="text-mono-caption mb-5 text-text-muted">Error 404</p>
        <h1 className="text-display max-w-[16ch] text-bone">
          That page is not here.
        </h1>
        <p className="measure mt-5 text-body-large text-text-secondary">
          The link is broken or the page has moved. The whole collection is two
          taps away.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/collections/shop-all"
            className="inline-flex h-[52px] items-center justify-center bg-bone px-8 text-body font-medium text-ink transition-colors hover:bg-paper"
          >
            Shop all tools
          </Link>
          <Link
            href="/"
            className="inline-flex h-[52px] items-center justify-center px-2 text-body text-text-secondary underline decoration-line underline-offset-[6px] transition-colors hover:text-bone hover:decoration-bone sm:px-4"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
