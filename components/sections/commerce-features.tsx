"use client"

import * as React from "react"
import { Section } from "@/components/layout/section"
import { Image as CustomImage } from "@/components/ui/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/commerce/cart-context"

export function BundleFeature() {
  const { addItem, openCart } = useCart()

  const handleShopBundle = () => {
    // Add the 3 items in the bundle to the cart
    addItem({
      productHandle: "acupressure-mat-pillow-set",
      productTitle: "Acupressure Mat & Pillow Set",
      variantTitle: "Midnight Black",
      variantId: "var_1",
      price: 79,
      quantity: 1,
      image: "/images/mat-hero.jpg"
    })
    addItem({
      productHandle: "weighted-eye-mask",
      productTitle: "Weighted Eye Mask",
      variantTitle: "Default Title",
      variantId: "var_4", // Mocked variant ID
      price: 35,
      quantity: 1,
      image: "/images/mask-hero.jpg"
    })
    addItem({
      productHandle: "gua-sha-ice-roller-set",
      productTitle: "Gua Sha & Ice Roller Set",
      variantTitle: "Default Title",
      variantId: "var_2", // Mocked variant ID
      price: 45,
      quantity: 1,
      image: "/images/roller-hero.jpg"
    })
    openCart()
  }

  return (
    <Section tone="ink-deep" spacing="none" border="bottom" bleed>
      <div className="mx-auto grid max-w-[100rem] grid-cols-1 lg:grid-cols-2">
        <div data-wipe className="relative min-h-[24rem] lg:min-h-[44rem]">
          <CustomImage
            src="/images/bundle-hero.jpg"
            alt="The three tools of the five-minute reset, laid out together"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center px-gutter py-section-md lg:py-section-lg lg:pl-14 lg:pr-[max(3.5rem,calc((100vw-100rem)/2+3.5rem))]">
          <p data-reveal className="text-mono-caption mb-5 text-text-muted">
            The system
          </p>
          <h2 data-reveal style={{ ["--reveal-delay" as string]: "60ms" }} className="text-h1 text-bone">
            The five-minute reset bundle.
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="measure mt-5 text-body-large text-text-secondary"
          >
            The mat for the back, the weighted mask for the eyes, and the cold
            steel roller for the face and neck. Three sensations, one sequence.
          </p>

          {/* The arithmetic, stated plainly. */}
          <dl
            data-reveal
            style={{ ["--reveal-delay" as string]: "140ms" }}
            className="mt-10 border-t border-line"
          >
            {[
              ["Acupressure mat & pillow set", "$79"],
              ["Weighted eye mask", "$35"],
              ["Gua sha & ice roller set", "$45"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between border-b border-line py-3">
                <dt className="text-body text-text-secondary">{label}</dt>
                <dd className="font-mono text-body-small text-text-muted tabular-nums">{value}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between border-b border-line py-3">
              <dt className="text-body text-text-muted">Bought separately</dt>
              <dd className="font-mono text-body-small text-text-muted tabular-nums line-through">$159</dd>
            </div>
            <div className="flex items-baseline justify-between py-4">
              <dt className="text-body text-bone">Bundle price</dt>
              <dd className="font-mono text-[1.5rem] leading-none text-bone tabular-nums">$135</dd>
            </div>
          </dl>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button size="lg" onClick={handleShopBundle} className="w-full sm:w-auto">
              Add the bundle
            </Button>
            <Link
              href="/bundles/5-minute-reset-bundle"
              className="inline-flex h-[52px] items-center justify-center px-2 text-body text-text-secondary underline decoration-line underline-offset-[6px] transition-colors hover:text-bone hover:decoration-bone sm:px-4"
            >
              What is in it
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
