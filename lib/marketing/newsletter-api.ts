export type NewsletterStatus = "idle" | "loading" | "success" | "duplicate" | "error"

export async function subscribeToNewsletter(email: string): Promise<NewsletterStatus> {
  // Basic validation
  if (!email || !email.includes("@")) {
    return "error"
  }

  // Simulate network latency for external provider (e.g., Klaviyo, Mailchimp)
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock checking for a duplicate
  if (email.toLowerCase() === "test@example.com" || email.toLowerCase() === "duplicate@example.com") {
    return "duplicate"
  }

  // Mock catching a network error
  if (email.toLowerCase() === "error@example.com") {
    return "error"
  }

  // In a real integration:
  // const response = await fetch("https://a.klaviyo.com/api/v2/list/{LIST_ID}/subscribe", { ... })
  // if (response.status === 409) return "duplicate"
  // if (!response.ok) return "error"
  
  return "success"
}
