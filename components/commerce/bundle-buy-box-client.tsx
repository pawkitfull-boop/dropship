"use client"

import * as React from "react"
import { useCart } from "@/lib/commerce/cart-context"
import { Bundle, Product } from "@/lib/commerce/types"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics/core"

interface BundleBuyBoxClientProps {
  bundle: Bundle
  products: { product: Product, quantity: number }[]
}

export function BundleBuyBoxClient({ bundle, products }: BundleBuyBoxClientProps) {
  const { addItem, openCart } = useCart()
  const [isAdding, setIsAdding] = React.useState(false)

  const handleBuyBundle = () => {
    setIsAdding(true)

    // Track analytics for the bundle
    trackEvent("AddToCart", {
      content_name: bundle.title,
      content_ids: products.map(p => p.product.variants[0]?.sku || p.product.variants[0]?.id).filter(Boolean),
      content_type: "product_group",
      value: bundle.price,
      currency: "USD"
    })

    // Add each item in the bundle to the cart
    products.forEach(({ product, quantity }) => {
      const defaultVariant = product.variants[0]
      if (defaultVariant && product.availableForSale) {
        // Here we ideally want to apply a proportionate discount to the line items to match the bundle price,
        // but for now we add them with their individual prices, and a real Shopify backend would use an automatic discount or a separate bundle product.
        addItem({
          productHandle: product.handle,
          productTitle: product.title,
          variantTitle: defaultVariant.title,
          variantId: defaultVariant.id,
          price: defaultVariant.price, // For a true bundle, Shopify scripts/automatic discounts handle the total reduction in the cart
          quantity: quantity,
          image: product.images[0]?.url || ""
        })
      }
    })

    openCart()
    setIsAdding(false)
  }

  return (
    <Button 
      size="lg" 
      className="w-full h-14" 
      onClick={handleBuyBundle}
      data-cart-cta="true"
      disabled={!bundle.availableForSale || isAdding}
    >
      {!bundle.availableForSale ? "Out of stock" : `Add bundle to cart - $${bundle.price.toFixed(2)}`}
    </Button>
  )
}
