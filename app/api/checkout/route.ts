import { NextResponse } from "next/server"
import { CartItem } from "@/lib/commerce/cart-context"

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

export async function POST(req: Request) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
      return NextResponse.json(
        { error: "Shopify credentials are not configured" },
        { status: 500 }
      )
    }

    // Format items for Shopify Storefront API
    const lineItems = items.map((item) => ({
      merchandiseId: item.variantId, // Must be a valid Shopify GID
      quantity: item.quantity,
    }))

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      input: {
        lines: lineItems,
      },
    }

    const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error("Failed to communicate with Shopify")
    }

    const { data, errors } = await response.json()

    if (errors) {
      console.error("Shopify GraphQL Errors:", errors)
      throw new Error("Shopify returned an error")
    }

    const userErrors = data?.cartCreate?.userErrors
    if (userErrors && userErrors.length > 0) {
      console.error("Shopify User Errors:", userErrors)
      throw new Error(userErrors[0].message)
    }

    const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl
    if (!checkoutUrl) {
      throw new Error("No checkout URL returned from Shopify")
    }

    return NextResponse.json({ url: checkoutUrl })
  } catch (error: any) {
    console.error("Shopify Checkout Error:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
