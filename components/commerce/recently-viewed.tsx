"use client"

import * as React from "react"
import { Section } from "@/components/layout/section"
import { ProductCard } from "@/components/commerce/product-card"
import { Product } from "@/lib/commerce/types"

// In a real app we'd fetch this from the server or use SWR. For the mock, we import the mock data.
import { products } from "@/content/products"

export function RecentlyViewed({ currentHandle }: { currentHandle: string }) {
  const [viewedProducts, setViewedProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("recently-viewed")
      let history: string[] = stored ? JSON.parse(stored) : []
      
      // Add current to history if not there, move to front if it is
      history = history.filter(h => h !== currentHandle)
      history.unshift(currentHandle)
      history = history.slice(0, 5) // Keep last 5, including current
      
      localStorage.setItem("recently-viewed", JSON.stringify(history))
      
      // Hydrate the products for display (excluding current)
      const displayHandles = history.filter(h => h !== currentHandle).slice(0, 4)
      const mappedProducts = displayHandles
        .map(h => products.find(p => p.handle === h))
        .filter((p): p is Product => p !== undefined)
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setViewedProducts(mappedProducts)
    } catch {
      // Ignore localStorage errors
    }
  }, [currentHandle])

  if (viewedProducts.length === 0) return null

  return (
    <Section spacing="md" border="top">
      <h2 className="text-3xl font-bold text-black mb-8 text-center">Recently viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
        {viewedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  )
}
