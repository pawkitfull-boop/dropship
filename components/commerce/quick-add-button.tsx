"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/commerce/cart-context"
import { Product } from "@/lib/commerce/types"

export function QuickAddButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()
  const router = useRouter()
  const [added, setAdded] = React.useState(false)
  
  const hasMultipleVariants = product.variants.length > 1
  const defaultVariant = product.variants[0]

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to product page automatically if wrapped in a link

    if (!defaultVariant || !product.availableForSale) return

    if (hasMultipleVariants) {
      router.push(`/products/${product.handle}`)
      return
    }

    addItem({
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: defaultVariant.title,
      variantId: defaultVariant.id,
      price: defaultVariant.price,
      quantity: 1,
      image: product.images[0]?.url || ""
    })
    
    setAdded(true)
    openCart()
    
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  const label = !product.availableForSale 
    ? "Out of stock" 
    : added 
      ? "Added" 
      : hasMultipleVariants 
        ? "Choose option" 
        : "Quick add"

  return (
    <button
      onClick={handleAdd}
      disabled={!product.availableForSale}
      aria-label={
        hasMultipleVariants
          ? `Choose options for ${product.title}`
          : `Add ${product.title} to cart`
      }
      className="w-full bg-black text-white rounded-full py-4 font-bold text-sm hover:bg-gray-800 transition-colors mt-auto
                 disabled:pointer-events-none disabled:opacity-50"
    >
      {label === "Quick add" ? "ADD TO CART" : label.toUpperCase()}
    </button>
  )
}
