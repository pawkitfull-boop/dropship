"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/commerce/cart-context"

export function FinalCta() {
  const { addItem, openCart } = useCart()

  const handleShop = () => {
    addItem({
      productHandle: "acupressure-mat-pillow-set",
      productTitle: "Acupressure Mat & Pillow Set",
      variantTitle: "Midnight Black",
      variantId: "var_1",
      price: 79,
      quantity: 1,
      image: "/images/mat-hero.jpg"
    })
    openCart()
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-ink-deep">
      <CustomImage
        src="/images/mat-detail.jpg"
        alt=""
        sizes="100vw"
        className="opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-ink-deep/40"
      />

      <div className="relative mx-auto max-w-[88rem] px-gutter py-32">
        <div className="max-w-[24ch]">
          <h2 data-reveal className="text-display text-bone">
            Tonight, then every night.
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
            className="measure mt-6 text-body-large text-text-secondary"
          >
            The mat and pillow set, with the canvas bag. Free shipping, and
            thirty days to decide.
          </p>
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              size="lg"
              variant="ember"
              className="w-full sm:w-auto"
              onClick={handleShop}
              data-cart-cta="true"
            >
              <span>Add the set</span>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span className="font-mono text-[0.9375rem] tabular-nums">$79</span>
            </Button>
            <Link
              href="/products/acupressure-mat-pillow-set"
              className="inline-flex h-[52px] items-center justify-center px-2 text-body text-text-secondary underline decoration-line underline-offset-[6px] transition-colors hover:text-bone hover:decoration-bone sm:px-4"
            >
              Read the full detail
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
