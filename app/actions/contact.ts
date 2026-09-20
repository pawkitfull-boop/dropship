"use server"

export type ContactFormState = {
  status: "idle" | "loading" | "success" | "error"
  errors?: {
    email?: string[]
    message?: string[]
    form?: string[]
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  const honeypot = formData.get("_gotcha") as string

  // Spam protection: if honeypot is filled out, silently succeed without sending
  if (honeypot) {
    return { status: "success" }
  }

  const errors: ContactFormState["errors"] = {}

  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid email address."]
  }
  
  if (!message || message.trim().length < 10) {
    errors.message = ["Message must be at least 10 characters long."]
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors }
  }

  try {
    // Simulate API call to support system (e.g. Zendesk, Gorgias)
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // In a real implementation:
    // await fetch("https://api.gorgias.com/v1/tickets", { ... })

    return { status: "success" }
  } catch (_) {
    return { 
      status: "error", 
      errors: { form: ["We encountered an error sending your message. Please try again later."] } 
    }
  }
}
