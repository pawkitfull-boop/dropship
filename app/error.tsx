"use client"

import * as React from "react"
import Link from "next/link"
import { Section } from "@/components/layout/section"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // -------------------------------------------------------------
    // ERROR REPORTING HOOK
    // -------------------------------------------------------------
    // In production, integrate this with Sentry, DataDog, or LogRocket.
    // Example: Sentry.captureException(error)
    console.error("Application Error Caught:", error)
  }, [error])

  return (
    <>
      <Section spacing="lg">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div>
            <h1 className="text-display mb-4 text-ember">500</h1>
            <h2 className="text-h2 mb-4">Something broke.</h2>
            <p className="text-body-large text-text-muted">
              We encountered a structural error loading this page. Let&apos;s try that again.
            </p>
          </div>
          
          <div className="pt-8 border-t border-line flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => reset()}
              className="inline-flex items-center justify-center h-14 px-8 text-body font-medium bg-ink-raised text-bone hover:bg-ember hover:text-text-primary transition-colors flex-1"
            >
              Try again
            </button>
            <Link 
              href="/products/pawkitfull-airdry-bag" 
              className="inline-flex items-center justify-center h-14 px-8 text-body font-medium border border-line hover:border-line text-text-primary bg-transparent transition-colors flex-1"
            >
              Return to shop
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
