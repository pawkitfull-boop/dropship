"use client"

import * as React from "react"
import { useCart } from "@/lib/commerce/cart-context"
import { Product, Variant } from "@/lib/commerce/types"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics/core"

interface AddToCartButtonProps {
  product: Product
  variant: Variant
  quantity: number
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variantStyle?: "primary" | "secondary" | "ghost"
  label?: string
  /**
   * Marks this as the page's primary buy action. The sticky mobile bar
   * watches these and only appears once every one has scrolled away.
   */
  isPrimaryCta?: boolean
}

export function AddToCartButton({ 
  product, 
  variant, 
  quantity, 
  className,
  size = "lg",
  variantStyle = "primary",
  label = "Add to cart",
  isPrimaryCta = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = React.useState(false)

  const handleAdd = () => {
    trackEvent("AddToCart", {
      content_name: product.title,
      content_ids: [variant.sku || variant.id],
      content_type: "product",
      value: variant.price,
      currency: "USD"
    })

    addItem({
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: variant.title,
      variantId: variant.id,
      price: variant.price,
      quantity: quantity,
      image: product.images[0]?.url || ""
    })
    
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <Button 
      onClick={handleAdd}
      data-cart-cta={isPrimaryCta ? "true" : undefined} 
      className={className} 
      size={size} 
      variant={variantStyle}
      disabled={!variant.availableForSale}
    >
      {!variant.availableForSale ? "Out of stock" : added ? "Added to cart" : label}
    </Button>
  )
}
