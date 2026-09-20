"use client"

import * as React from "react"
import { StickyCart } from "@/components/commerce/sticky-cart"
import { useCart } from "@/lib/commerce/cart-context"
import { Product } from "@/lib/commerce/types"

export function StickyCartController({ product }: { product: Product }) {
  const [showSticky, setShowSticky] = React.useState(false)
  const { addItem, openCart } = useCart()

  React.useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Find all primary CTAs on the page
    const ctas = document.querySelectorAll('[data-cart-cta="true"]')
    if (ctas.length === 0) return

    // Keep track of which CTAs are visible
    const visibleCtas = new Set<Element>()
    let hasScrolledPastFirst = false

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleCtas.add(entry.target)
        } else {
          visibleCtas.delete(entry.target)
          // If the element is above the viewport, we've scrolled past it
          if (entry.boundingClientRect.top < 0) {
            hasScrolledPastFirst = true
          }
        }
      })

      // Show sticky cart if no CTAs are visible AND we've scrolled past at least one
      setShowSticky(visibleCtas.size === 0 && hasScrolledPastFirst)
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0
    })

    ctas.forEach(cta => observer.observe(cta))

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleAdd = () => {
    const defaultVariant = product.variants[0]
    addItem({
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: defaultVariant?.title || "Default Title",
      variantId: defaultVariant?.id || "unknown",
      price: defaultVariant?.price || 0,
      quantity: 1,
      image: product.images[0]?.url || ""
    })
    openCart()
  }

  return (
    <StickyCart 
      isVisible={showSticky}
      price={`$${(product.variants[0]?.price || 0).toFixed(2)}`}
      title={product.title}
      onAdd={handleAdd}
    />
  )
}
