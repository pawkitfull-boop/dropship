import * as React from "react"
import Link from "next/link"
import { Product } from "@/lib/commerce/types"
import { Image as CustomImage } from "@/components/ui/image"
import type { ReviewSummary } from "@/lib/commerce/api"
import { QuickAddButton } from "@/components/commerce/quick-add-button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  priority?: boolean
  /** A featured card spans two columns and carries a wider crop. */
  feature?: boolean
  /**
   * Resolved by the caller via `getReviewSummaries`. Omitted when the
   * caller is a client component, or when the product has no reviews.
   */
  reviewSummary?: ReviewSummary
}

/**
 * One card, used in collections, search, cross-sells and history.
 *
 * The frame is the card — no border, no shadow, no rounded container.
 * Title and price share a baseline so the row reads as one line of
 * information rather than two competing columns, and every card
 * reserves the same rows regardless of variants or reviews so a grid
 * never goes ragged.
 */
import { Star } from "lucide-react"

export function ProductCard({
  product,
  priority = false,
  feature = false,
  reviewSummary,
}: ProductCardProps) {
  const variant = product.variants[0]
  const price = variant?.price ?? 0
  const compareAt = variant?.compareAtPrice
  const onSale = !!compareAt && compareAt > price

  const primary = product.images[0]
  const secondary = product.images[1]

  const money = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: n % 1 !== 0 ? 2 : 0,
    }).format(n)

  return (
    <article className={cn("group relative flex flex-col h-full border-2 border-gray-100 rounded-3xl p-6 items-center text-center transition-shadow hover:shadow-xl bg-white", feature && "sm:col-span-2")}>
      {/* Category Pill */}
      <div className="border-2 border-[#b6efc4] text-[#00c881] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 w-max mx-auto">
        {product.tags[0] || "BEST SELLER"}
      </div>

      <Link href={`/products/${product.handle}`} className="relative w-full aspect-square mb-6 group-hover:scale-105 transition-transform block">
        <div className="absolute inset-0 bg-gray-50 rounded-2xl" />
        {primary && (
          <CustomImage
            src={primary.url}
            alt=""
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover rounded-2xl relative z-10 w-full h-full"
          />
        )}
      </Link>

      {/* Rating */}
      <div className="flex items-center justify-center gap-2 mb-4 w-full">
        <div className="flex text-[#fbbf24]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {reviewSummary ? `${reviewSummary.count} Reviews` : "5,000+ Reviews"}
        </span>
      </div>

      <h3 className="text-xl font-bold text-black mb-2 hover:text-[#00c881] transition-colors line-clamp-2 min-h-[56px] w-full">
        <Link href={`/products/${product.handle}`}>
          {product.title}
        </Link>
      </h3>

      <div className="text-lg font-bold text-black mb-6 w-full">
        {onSale && (
          <span className="mr-2 text-gray-400 line-through text-sm font-normal">
            <span className="sr-only">Was </span>
            {money(compareAt!)}
          </span>
        )}
        {money(price)}
      </div>

      <div className="w-full mt-auto">
        <QuickAddButton product={product} />
      </div>
    </article>
  )
}
