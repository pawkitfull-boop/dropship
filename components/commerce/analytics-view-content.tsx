"use client"

import * as React from "react"
import { Product } from "@/lib/commerce/types"
import { trackEvent } from "@/lib/analytics/core"

export function AnalyticsViewContent({ product }: { product: Product }) {
  React.useEffect(() => {
    trackEvent("ViewContent", {
      content_name: product.title,
      content_ids: product.variants.map(v => v.sku || v.id),
      content_type: "product",
      value: product.variants[0]?.price || 0,
      currency: "USD"
    })
  }, [product.id, product.title, product.variants])

  return null
}
