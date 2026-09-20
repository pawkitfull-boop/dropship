"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/commerce/types"

export function PerfectFeatured({ products }: { products: Product[] }) {
  // Use first 4 products for carousel
  const displayProducts = products.slice(0, 4)

  return (
    <section className="w-full bg-white px-gutter py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-[88rem]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Trending / Best Sellers</h2>
          <p className="text-lg text-gray-600">
            Our most loved pet upgrades, trusted by thousands of happy pet parents.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows (Absolute positioned outside grid) */}
          <button className="hidden xl:flex absolute -left-16 top-1/2 -translate-y-1/2 size-12 items-center justify-center rounded-full bg-[#b6efc4] text-white hover:bg-[#00c881] transition-colors z-10">
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <button className="hidden xl:flex absolute -right-16 top-1/2 -translate-y-1/2 size-12 items-center justify-center rounded-full bg-[#00c881] text-white hover:bg-[#00a66b] transition-colors z-10">
            <ChevronRight size={24} strokeWidth={3} />
          </button>

          {/* Cards Grid */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {displayProducts.map((product) => (
              <div 
                key={product.id} 
                className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-1.125rem)] border-2 border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center transition-shadow hover:shadow-xl bg-white"
              >
                {/* Category Pill */}
                <div className="border-2 border-[#b6efc4] text-[#00c881] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                  {product.tags[0] || "BEST SELLER"}
                </div>

                {/* Product Image */}
                <Link href={`/products/${product.handle}`} className="relative w-full aspect-square mb-6 group">
                  <div className="absolute inset-0 bg-gray-50 rounded-2xl transition-transform group-hover:scale-105" />
                  <CustomImage 
                    src={product.images[0]?.url || "/images/mat-hero.jpg"} 
                    alt={product.title} 
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover rounded-2xl relative z-10"
                  />
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#fbbf24]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">5,000+ Reviews</span>
                </div>

                {/* Title */}
                <Link href={`/products/${product.handle}`} className="text-xl font-bold text-black mb-2 hover:text-[#00c881] transition-colors line-clamp-2 min-h-[56px]">
                  {product.title}
                </Link>

                {/* Price */}
                <div className="text-lg font-bold text-black mb-6">
                  ${product.variants[0]?.price.toFixed(2)}
                </div>

                {/* CTA */}
                <button className="w-full bg-black text-white rounded-full py-4 font-bold text-sm hover:bg-gray-800 transition-colors mt-auto">
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/collections/shop-all"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full border-2 border-black bg-white px-8 text-sm font-bold text-black transition-colors hover:bg-gray-50 group"
          >
            SHOP ALL PRODUCTS
            <div className="flex size-6 items-center justify-center rounded-full bg-[#00c881] text-white">
              <ArrowRight size={14} strokeWidth={3} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
