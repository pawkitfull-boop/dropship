import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://10minutereset.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cart", "/checkout", "/styleguide", "/components"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
