"use server"

export type TrackOrderFormState = {
  status: "idle" | "loading" | "success" | "not_found" | "error"
  errors?: {
    order?: string[]
    email?: string[]
    form?: string[]
  }
}

export async function submitTrackOrderForm(prevState: TrackOrderFormState, formData: FormData): Promise<TrackOrderFormState> {
  const order = formData.get("order") as string
  const email = formData.get("email") as string
  const honeypot = formData.get("_gotcha") as string

  // Spam protection: if honeypot is filled out, silently return not_found
  if (honeypot) {
    return { status: "not_found" }
  }

  const errors: TrackOrderFormState["errors"] = {}

  if (!order || order.trim().length < 2) {
    errors.order = ["Please enter a valid order number."]
  }

  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid email address."]
  }
  
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors }
  }

  try {
    // Simulate API call to fulfillment system
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // In a real implementation:
    // const res = await fetch(`https://api.shopify.com/orders?name=${order}`)
    
    // Simulate a not found state
    if (order.toLowerCase() === "notfound" || order === "#0000") {
      return { status: "not_found" }
    }

    return { status: "success" }
  } catch (_) {
    return { 
      status: "error", 
      errors: { form: ["We encountered an error looking up your order. Please try again later."] } 
    }
  }
}
