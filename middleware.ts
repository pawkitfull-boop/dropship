import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mapping of country codes to currencies
const countryToCurrency: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  GR: "EUR",
  PT: "EUR",
  FI: "EUR",
  AU: "AUD",
}

export function middleware(request: NextRequest) {
  // Try to get country from Vercel header
  const country = request.geo?.country || request.headers.get("x-vercel-ip-country")
  
  const response = NextResponse.next()

  // Only apply default if they don't already have a preference
  if (!request.cookies.has("preferred_currency") && country) {
    const currency = countryToCurrency[country] || "CAD"
    // Set cookie that the frontend can read
    response.cookies.set("preferred_currency", currency, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
}
