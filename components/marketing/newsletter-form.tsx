"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldGroup, FieldError } from "@/components/ui/field"
import { subscribeToNewsletter, NewsletterStatus } from "@/lib/marketing/newsletter-api"
import { trackEvent } from "@/lib/analytics/core"
import Link from "next/link"

interface NewsletterFormProps {
  location: "modal" | "footer" | "inline" | "landing"
  onSuccess?: () => void
}

export function NewsletterForm({ location, onSuccess }: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<NewsletterStatus>("idle")
  const errorSummaryRef = React.useRef<HTMLDivElement>(null)

  const validateEmail = (val: string) => {
    if (!val) return "Email address is required."
    if (!val.includes("@")) return "Please enter a valid email address."
    return null
  }

  const handleBlur = () => {
    setError(validateEmail(email))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setStatus("loading")
    setError(null)
    const result = await subscribeToNewsletter(email)
    setStatus(result)

    if (result === "success") {
      trackEvent("Lead", { content_name: "5-Minute Evening Reset Guide" })
      if (onSuccess) {
        onSuccess()
      }
    } else if (result === "error") {
      setError("We couldn't submit your email. Check for typos and try again.")
      // Focus error summary for accessibility
      setTimeout(() => errorSummaryRef.current?.focus(), 50)
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div className="w-full border border-line p-6 [.on-lit_&]:border-line-on-lit" role="status" aria-live="polite">
        <h3 className="text-h3 text-text-primary [.on-lit_&]:text-text-on-lit">
          {status === "duplicate" ? "You're already on the list." : "The guide is yours."}
        </h3>
        <p className="mt-2 text-body text-text-secondary [.on-lit_&]:text-text-on-lit-secondary">
          Click below to access the 5-Minute Evening Reset Guide immediately.
        </p>
        <Link 
          href="/guide/download"
          className="mt-5 inline-flex h-12 w-full items-center justify-center bg-bone px-8 text-body font-medium text-ink transition-colors hover:bg-paper sm:w-auto [.on-lit_&]:bg-ink [.on-lit_&]:text-bone [.on-lit_&]:hover:bg-ink-raised"
        >
          Access the guide
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      {error && status === "error" && (
        <div 
          ref={errorSummaryRef}
          tabIndex={-1}
          className="mb-4 border border-ember/50 bg-ember/10 p-3.5 text-left text-body-small text-text-primary [.on-lit_&]:text-text-on-lit"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      
      <div className="flex flex-col items-end gap-3 sm:flex-row">
        <FieldGroup className="w-full flex-1 space-y-2 text-left">
          <Label htmlFor={`email-${location}`}>Email address</Label>
          <Input
            id={`email-${location}`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null) // clear on type
            }}
            onBlur={handleBlur}
            placeholder="you@example.com"
            required
            autoComplete="email"
            inputMode="email"
            disabled={status === "loading"}
            error={!!error}
            aria-invalid={!!error}
            aria-describedby={error ? `email-error-${location}` : undefined}
          />
          {error && (
            <FieldError id={`email-error-${location}`}>{error}</FieldError>
          )}
        </FieldGroup>
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="h-12 w-full shrink-0 sm:w-auto [.on-lit_&]:bg-ink [.on-lit_&]:text-bone [.on-lit_&]:hover:bg-ink-raised"
          isLoading={status === "loading"}
        >
          {status === "loading" ? "Sending" : "Get the guide"}
        </Button>
      </div>
      
      <p className="mt-3 text-caption text-text-muted [.on-lit_&]:text-text-on-lit-muted">
        By submitting, you agree to receive marketing emails from The 10-Minute Reset. 
        Unsubscribe securely at any time with one click.
      </p>
    </form>
  )
}
