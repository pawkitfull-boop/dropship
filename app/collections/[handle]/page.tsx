import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getCollection, getCollections, getProducts, getReviewSummaries } from "@/lib/commerce/api"

import { ProductCard } from "@/components/commerce/product-card"
import { FilterDrawer } from "@/components/commerce/filter-drawer"

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((collection) => ({
    handle: collection.handle,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const collection = await getCollection(resolvedParams.handle)
  if (!collection) return {}

  return {
    title: collection.title,
    description: collection.description,
    alternates: {
      canonical: `/collections/${collection.handle}`,
    },
  }
}

export default async function CollectionPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ handle: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const collection = await getCollection(resolvedParams.handle)
  const collections = await getCollections()
  
  if (!collection) {
    notFound()
  }

  const sort = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : undefined
  const inStock = resolvedSearchParams.inStock === 'true'

  const collectionProducts = await getProducts({
    collectionHandle: collection.handle,
    sort,
    inStock
  })

  const reviewSummaries = await getReviewSummaries(collectionProducts.map((p) => p.id))

  const hasActiveFilters = inStock

  return (
    <>
      <section className="bg-white border-b-2 border-gray-100">
        <div className="mx-auto max-w-[88rem] px-gutter pb-12 pt-10 md:pb-16 md:pt-14">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <li>
                <Link href="/" className="inline-flex min-h-6 items-center transition-colors hover:text-black">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page" className="text-black">
                  {collection.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="text-4xl md:text-[3.5rem] leading-[1.1] font-bold text-black max-w-[14ch]">{collection.title}</h1>
            <p className="text-base font-medium text-gray-500 max-w-xl">
              {collection.description}
            </p>
          </div>

          {/* Lateral navigation between collections. */}
          <nav aria-label="Collections" className="mt-12">
            <ul className="hide-scrollbar -mx-gutter flex gap-3 overflow-x-auto px-gutter pb-2">
              {collections.map((c) => {
                const active = c.handle === collection.handle
                return (
                  <li key={c.id} className="shrink-0">
                    <Link
                      href={`/collections/${c.handle}`}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex h-11 items-center rounded-full px-6 text-sm font-bold tracking-widest uppercase transition-colors ${
                        active
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-black hover:text-white"
                      }`}
                    >
                      {c.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </section>

      <div className="mx-auto flex max-w-[88rem] flex-col md:flex-row">
        {/* Desktop facet rail */}
        <aside className="hidden w-60 shrink-0 border-r border-line py-10 pl-gutter pr-8 md:block">
          <div className="sticky top-28">
            <FilterDrawer isDesktop />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile filter bar */}
          <div className="sticky top-16 z-30 border-b border-line bg-ink/90 px-gutter py-3 backdrop-blur-xl md:hidden">
            <div className="flex items-center justify-between">
              <span className="text-caption text-text-secondary">
                {collectionProducts.length}{" "}
                {collectionProducts.length === 1 ? "product" : "products"}
              </span>
              <FilterDrawer />
            </div>
          </div>

          <div className="hidden items-center justify-between border-b border-line px-gutter py-5 md:flex">
            <span className="text-caption text-text-secondary">
              {collectionProducts.length}{" "}
              {collectionProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* Announce result changes without moving focus. */}
          <span aria-live="polite" aria-atomic="true" className="sr-only">
            {collectionProducts.length} products
          </span>

          <div className="px-gutter py-section-sm">
            {collectionProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {collectionProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={idx < 3}
                    reviewSummary={reviewSummaries[product.id]}
                  />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md py-24 text-center">
                <h2 className="text-h2 mb-3 text-bone">Nothing matches that.</h2>
                <p className="text-body text-text-secondary">
                  Try removing a filter, or browse the full collection.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  {hasActiveFilters && (
                    <Link
                      href={`/collections/${collection.handle}`}
                      className="inline-flex h-11 items-center justify-center border border-line px-6 text-body-small text-text-secondary transition-colors hover:border-bone hover:text-text-primary"
                    >
                      Clear filters
                    </Link>
                  )}
                  <Link
                    href="/collections/shop-all"
                    className="inline-flex h-11 items-center justify-center bg-bone px-6 text-body-small text-ink transition-colors hover:bg-paper"
                  >
                    Shop all
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
