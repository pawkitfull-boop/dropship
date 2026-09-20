import { MetadataRoute } from "next"
import { getProducts, getCollections } from "@/lib/commerce/api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://10minutereset.com"

  const staticRoutes = [
    "",
    "/about",
    "/faq",
    "/contact",
    "/guide",
    "/guarantee",
    "/track-order",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
    "/policies/cookie-notice",
    "/accessibility",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.5,
  }))

  const products = await getProducts()
  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/products/${product.handle}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const collections = await getCollections()
  const collectionRoutes = collections.map((collection) => ({
    url: `${SITE_URL}/collections/${collection.handle}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...collectionRoutes]
}
