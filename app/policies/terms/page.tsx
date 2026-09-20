import * as React from "react"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = {
  robots: {
    index: false,
  }
}

export default function TermsOfService() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        crumbs={[{ href: "/faq", label: "Support" }]}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            
          </div>
          
          <div className="space-y-6 text-body text-text-secondary">
            <p>
              Our Terms of Service are currently being updated. Please check back later.
            </p>
            <h2 className="text-h2 text-text-primary pt-4">Medical Disclaimer</h2>
            <p>
              The products and information provided by The 10-Minute Reset are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before beginning any new physical regimen.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
