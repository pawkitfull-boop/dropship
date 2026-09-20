"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/commerce/cart-context"
import { trackEvent } from "@/lib/analytics/core"

const VARIANT = {
  productHandle: "acupressure-mat-pillow-set",
  productTitle: "Acupressure Mat & Pillow Set",
  variantTitle: "Midnight Black",
  variantId: "var_1",
  price: 79,
  image: "/images/mat-hero.jpg",
}

/**
 * The only interactive part of the hero, split out so the headline and
 * price stay in the server-rendered HTML.
 */
export function HeroCta() {
  const { addItem, openCart } = useCart()

  const handleShop = () => {
    trackEvent("AddToCart", {
      content_name: VARIANT.productTitle,
      content_ids: [VARIANT.variantId],
      content_type: "product",
      value: VARIANT.price,
      currency: "USD",
    })
    addItem({ ...VARIANT, quantity: 1 })
    openCart()
  }

  return (
    <Button size="lg" onClick={handleShop} data-cart-cta="true" className="w-full sm:w-auto">
      <span>Add the set</span>
      <span aria-hidden="true" className="opacity-40">
        /
      </span>
      <span className="font-mono text-[0.9375rem] tabular-nums">$79</span>
    </Button>
  )
}
