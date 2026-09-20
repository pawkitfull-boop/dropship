import { CartItem } from "./cart-context"

// ... existing code ...

export async function createCheckout(items: CartItem[]): Promise<string> {
  if (items.length === 0) {
    throw new Error("Cart is empty")
  }

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Failed to create checkout session")
  }

  const data = await response.json()
  
  if (!data.url) {
    throw new Error("No checkout URL returned")
  }

  return data.url
}
