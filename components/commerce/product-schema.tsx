import * as React from "react"
import { Product, Review } from "@/lib/commerce/types"

export function ProductSchema({ product, reviews }: { product: Product, reviews: Review[] }) {
  const defaultVariant = product.variants[0]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://10minutereset.com"
  
  // Set price validity to 30 days from now
  const priceValidUntil = new Date()
  priceValidUntil.setDate(priceValidUntil.getDate() + 30)

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => `${siteUrl}${img.url}`),
    sku: defaultVariant?.sku,
    brand: {
      "@type": "Brand",
      name: "The 10-Minute Reset"
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.handle}`,
      priceCurrency: "USD",
      price: defaultVariant?.price,
      priceValidUntil: priceValidUntil.toISOString().split('T')[0],
      availability: product.availableForSale 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "d"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 5,
            unitCode: "d"
          }
        }
      }
    }
  }

  // Only attach aggregateRating if we have real reviews. No fake social proof.
  if (reviews.length > 0) {
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    const avg = sum / reviews.length
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
    }
    
    schema.review = reviews.map(r => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating
      },
      author: {
        "@type": "Person",
        name: r.author
      },
      reviewBody: r.content
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
