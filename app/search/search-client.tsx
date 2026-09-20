"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Section } from "@/components/layout/section"
import { ProductCard } from "@/components/commerce/product-card"
import { Search as SearchIcon } from "lucide-react"
import { Product } from "@/lib/commerce/types"

interface SearchClientProps {
  initialQuery: string
  initialResults: Product[]
  popularProducts: Product[]
}

export function SearchClient({ initialQuery, initialResults, popularProducts }: SearchClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [query, setQuery] = React.useState(initialQuery)
  
  // Debounce logic
  React.useEffect(() => {
    // If the input is empty but we had a query, or if it changed
    if (query !== initialQuery) {
      const handler = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (query) {
          params.set("q", query)
        } else {
          params.delete("q")
        }
        router.replace(pathname + "?" + params.toString(), { scroll: false })
      }, 300)

      return () => clearTimeout(handler)
    }
  }, [query, initialQuery, pathname, router, searchParams])

  const hasSearched = initialQuery.length > 0

  return (
    <>
      <section className="border-b border-line bg-surface-deep">
        <div className="mx-auto max-w-[88rem] px-gutter pb-10 pt-10 md:pt-14">
          <h1 className="text-display mb-8 text-bone">Search</h1>
          <form className="relative flex items-center" onSubmit={(e) => {
            e.preventDefault()
            const params = new URLSearchParams(searchParams.toString())
            if (query) params.set("q", query)
            else params.delete("q")
            router.push(pathname + "?" + params.toString())
          }}>
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <SearchIcon
              className="pointer-events-none absolute left-0 text-text-muted"
              size={22}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mat, roller, neck…"
              autoComplete="off"
              className="text-h2 w-full border-b border-line bg-transparent py-4 pl-9 pr-4 text-text-primary transition-colors placeholder:text-text-muted hover:border-text-muted focus:border-bone"
            />
          </form>
        </div>
      </section>

      <Section spacing="md">
        {!hasSearched ? (
          <div className="space-y-16">
            <div className="max-w-md">
              <h2 className="text-h2 text-bone">Start with a word.</h2>
              <p className="mt-3 text-body text-text-secondary">
                Try a tool, or the part of the body you want to work on.
              </p>
            </div>
            <div>
              <h3 className="text-mono-caption mb-8 border-b border-line pb-3 text-text-muted">Popular tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {popularProducts.map((p, idx) => (
                  <ProductCard key={p.id} product={p} priority={idx < 4} />
                ))}
              </div>
            </div>
          </div>
        ) : initialResults.length > 0 ? (
          <div>
            <div className="mb-8 border-b border-line pb-4">
              <span className="text-caption text-text-secondary" aria-live="polite">
                {initialResults.length} {initialResults.length === 1 ? 'result' : 'results'} for &ldquo;{initialQuery}&rdquo;
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {initialResults.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="max-w-md pt-4">
              <h2 className="text-h2 text-bone">Nothing matched that.</h2>
              <p className="mt-3 text-body text-text-secondary">
                We couldn&apos;t find anything matching &quot;{initialQuery}&quot;. Try a different term, or browse our popular tools below.
              </p>
            </div>
            <div>
              <h3 className="text-mono-caption mb-8 border-b border-line pb-3 text-text-muted">Popular tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {popularProducts.map((p, idx) => (
                  <ProductCard key={p.id} product={p} priority={idx < 4} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  )
}
