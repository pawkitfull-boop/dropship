import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import Script from "next/script"
import { getRelatedProducts, getReviewSummaries, getProduct, getProducts, getReviewsForProduct } from "@/lib/commerce/api"

import { Section } from "@/components/layout/section"
import { ProductStory } from "@/components/sections/product-story"
import { RecentlyViewed } from "@/components/commerce/recently-viewed"
import { ProductSchema } from "@/components/commerce/product-schema"
import { StickyCartController } from "@/components/commerce/sticky-cart-controller"
import { ProductCard } from "@/components/commerce/product-card"
import { AnalyticsViewContent } from "@/components/commerce/analytics-view-content"
import { ProductOverview } from "@/components/commerce/product-overview"
import { ProductFeaturesCross } from "@/components/commerce/product-features-cross"
import { ProductBeforeAfter } from "@/components/commerce/product-before-after"
import { ProductSteps } from "@/components/commerce/product-steps"
import { ProductTestimonials } from "@/components/commerce/product-testimonials"
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    handle: product.handle,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.handle)
  if (!product) return {}

  const description = product.positioning || "Premium physical tools for your daily routine."

  return {
    title: product.title,
    description: description,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      title: product.title,
      description: description,
      images: [
        {
          url: product.images[0]?.url || "",
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.handle)
  
  if (!product) {
    notFound()
  }

  const reviews = await getReviewsForProduct(product.id)
  
  const relatedProducts = await getRelatedProducts(product, 4)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://10minutereset.com"

  const relatedSummaries = await getReviewSummaries(relatedProducts.map((p) => p.id))

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.title,
        "item": `${siteUrl}/products/${product.handle}`
      }
    ]
  }

  return (
    <>
      <ProductSchema product={product} reviews={reviews} />
      <AnalyticsViewContent product={product} />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
        
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-line">
        <ol className="mx-auto flex max-w-[88rem] items-center gap-2 px-gutter py-4 text-caption text-text-muted">
          <li>
            <Link href="/" className="inline-flex min-h-6 items-center transition-colors hover:text-text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="min-w-0 truncate">
            <span aria-current="page" className="text-text-secondary">
              {product.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Main Product Overview */}
      <ProductOverview product={product} />

      {/* Feature Cross Section */}
      <ProductFeaturesCross />

      {/* Before & After Interactive Slider */}
      <ProductBeforeAfter />

      {/* How it Works: 3 Steps */}
      <ProductSteps />

      {/* Testimonials */}
      <ProductTestimonials />


      {/* Related */}
      {relatedProducts.length > 0 && (
        <Section spacing="md" border="bottom">
          <h2 className="text-3xl font-bold text-black mb-10 text-center">Pairs with</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} reviewSummary={relatedSummaries[p.id]} />
            ))}
          </div>
        </Section>
      )}
      <RecentlyViewed currentHandle={product.handle} />

      <StickyCartController product={product} />
    </>
  )
}
