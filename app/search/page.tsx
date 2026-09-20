import * as React from "react"
import { getProducts } from "@/lib/commerce/api"
import { SearchClient } from "./search-client"
import { Product } from "@/lib/commerce/types"

export const metadata = {
  title: "Search | The 10-Minute Reset",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined

  // Pass to server function if there's a query
  let initialResults: Product[] = []
  if (q && q.length > 0) {
    initialResults = await getProducts({ query: q })
  }

  // Also fetch popular products for empty state
  const popularProducts = await getProducts({ collectionHandle: "shop-all" })

  return (
    <SearchClient 
      initialQuery={q || ""} 
      initialResults={initialResults} 
      popularProducts={popularProducts.slice(0, 4)} 
    />
  )
}
