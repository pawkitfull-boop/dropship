import { Product, Bundle, Collection, Review } from "./types"
import { products } from "@/content/products"
import { bundles } from "@/content/bundles"
import { collections } from "@/content/collections"
import { reviews } from "@/content/reviews"

export interface ProductFilterParams {
  collectionHandle?: string
  sort?: string
  inStock?: boolean
  query?: string
}

export async function getProducts(params?: ProductFilterParams): Promise<Product[]> {
  let result = [...products]

  if (params?.collectionHandle) {
    const collection = await getCollection(params.collectionHandle)
    if (collection) {
      result = result.filter(p => collection.productIds.includes(p.id))
    }
  }

  if (params?.query) {
    const lowerQuery = params.query.toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(t => t.toLowerCase().includes(lowerQuery))
    )
  }

  if (params?.inStock) {
    result = result.filter(p => p.availableForSale)
  }

  if (params?.sort) {
    switch (params.sort) {
      case "price-asc":
        result.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0))
        break
      case "price-desc":
        result.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0))
        break
      case "featured":
      default:
        // Featured could be handled by tags, but for now we keep original order
        break
    }
  }

  return result
}

export async function getProduct(handle: string): Promise<Product | null> {
  const product = products.find((p) => p.handle === handle)
  return product || null
}

/**
 * Bundles reference their contents by product id, not handle, so they
 * need their own lookup. Using `getProduct` (which matches on handle)
 * silently returned null for every bundle item, leaving the bundle page
 * with an empty contents list and an add-to-cart that added nothing.
 */
export async function getProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null
}

export async function getBundles(): Promise<Bundle[]> {
  return bundles
}

export async function getBundle(handle: string): Promise<Bundle | null> {
  const bundle = bundles.find((b) => b.handle === handle)
  return bundle || null
}

export async function getCollections(): Promise<Collection[]> {
  return collections
}

export async function getCollection(handle: string): Promise<Collection | null> {
  const collection = collections.find((c) => c.handle === handle)
  return collection || null
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  return reviews.filter((r) => r.productId === productId)
}

export interface ReviewSummary {
  average: number
  count: number
}

/**
 * Batched review summaries, keyed by product id.
 *
 * Product cards render inside both server trees (collections, cross-sells)
 * and client trees (search), so the card itself must stay synchronous.
 * Server callers resolve summaries here and pass them down; a caller that
 * cannot await simply omits them and the card renders without a rating,
 * which is the correct zero-review presentation anyway.
 */
export async function getReviewSummaries(
  productIds: string[]
): Promise<Record<string, ReviewSummary>> {
  const entries = await Promise.all(
    productIds.map(async (id) => {
      const list = await getReviewsForProduct(id)
      if (list.length === 0) return null
      const average = list.reduce((sum, r) => sum + r.rating, 0) / list.length
      return [id, { average, count: list.length }] as const
    })
  )
  return Object.fromEntries(entries.filter((e): e is NonNullable<typeof e> => e !== null))
}

/**
 * Cross-sell for a product page.
 *
 * Ranks the rest of the catalogue by how many tags it shares with the
 * given product, then tops up from the remainder so a page always has a
 * full row. Matching on a single primary tag is not enough: the hero
 * product's first tag is "hero", which nothing else carries, so that
 * approach left the most important page in the store with no cross-sell
 * at all.
 */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const others = (await getProducts()).filter((p) => p.id !== product.id)
  const tags = new Set(product.tags.filter((t) => t !== "hero"))

  const scored = others
    .map((p) => ({ p, score: p.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.p)
}
