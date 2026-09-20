"use client"

import * as React from "react"
import { Product } from "@/lib/commerce/types"
import { QuantityStepper } from "@/components/commerce/product-utils"
import { Button } from "@/components/ui/button"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useCart } from "@/lib/commerce/cart-context"
import { trackEvent } from "@/lib/analytics/core"

export function BuyBoxClient({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = React.useState(product.variants[0]?.id)
  const [quantity, setQuantity] = React.useState(1)
  const { checkout, addItem } = useCart()

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0]
  const isAvailable = product.availableForSale && selectedVariant.availableForSale

  const hasComparePrice = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price
  const savings = hasComparePrice ? selectedVariant.compareAtPrice! - selectedVariant.price : 0

  const handleBuyNow = () => {
    // Only dispatch InitiateCheckout for the express path since AddToCart is skipped here (or we do both if we strictly want funnel parity).
    // The previous implementation double-fired by putting AddToCart + InitiateCheckout here, and then openCart()'s own flow would do it.
    // If "Buy it now" skips the cart and goes to checkout:
    
    // According to best practices: Fire AddToCart, then InitiateCheckout.
    trackEvent("AddToCart", {
      content_name: product.title,
      content_ids: [selectedVariant.sku || selectedVariant.id],
      content_type: "product",
      value: selectedVariant.price,
      currency: "USD"
    })
    
    trackEvent("InitiateCheckout", {
      content_name: product.title,
      value: selectedVariant.price * quantity,
      currency: "USD",
      num_items: quantity
    })

    addItem({
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: selectedVariant.title,
      variantId: selectedVariant.id,
      price: selectedVariant.price,
      quantity: quantity,
      image: product.images[0]?.url || ""
    })
    checkout() // Programmatic navigation to checkout
  }

  // Swatch colours are derived from the variant name so the data layer
  // stays the source of truth; unknown names fall back to a neutral.
  const getSwatchColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "black":
      case "midnight black":
        return "bg-[#1a1a1a]"
      case "midnight":
        return "bg-[#0f172a]"
      case "raw linen":
      case "linen":
        return "bg-[#e8e0d2]"
      case "slate":
        return "bg-[#4a5158]"
      default:
        return "bg-ink-raised"
    }
  }

  const money = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: n % 1 !== 0 ? 2 : 0,
    }).format(n)

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      {/* Price */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-[2.25rem] leading-none tracking-[-0.03em] font-bold text-black tabular-nums">
          {money(selectedVariant.price)}
        </p>
        {hasComparePrice && (
          <>
            <s className="text-gray-400 tabular-nums font-normal">
              <span className="sr-only">Was </span>
              {money(selectedVariant.compareAtPrice!)}
            </s>
            <span className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
              Save {money(savings)}
            </span>
          </>
        )}
      </div>

      {/* Variants */}
      {product.variants.length > 1 && (
        <fieldset className="mt-8">
          <legend className="mb-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
            Size: <span className="text-black">{selectedVariant.title}</span>
          </legend>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Size">
            {product.variants.map((v) => {
              const active = selectedVariantId === v.id
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedVariantId(v.id)}
                  aria-label={v.title}
                  className={`flex h-12 min-w-[3rem] items-center justify-center rounded-full border px-4 text-sm font-bold transition-all duration-[var(--duration-feedback)] ${
                    active
                      ? "border-black bg-black text-white scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-black hover:text-black"
                  }`}
                >
                  {v.title}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
        {!isAvailable && (
          <p className="border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-500 font-medium">
            Out of stock. Join the list and we will tell you when it returns.
          </p>
        )}

        <div className="flex gap-3 h-14">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <AddToCartButton
            product={product}
            variant={selectedVariant}
            quantity={quantity}
            className="flex-1"
            isPrimaryCta
          />
        </div>

        <Button
          onClick={handleBuyNow}
          variant="outline"
          className="w-full h-14"
          size="lg"
          disabled={!isAvailable}
        >
          Buy it now
        </Button>
      </div>
    </div>
  )
}
