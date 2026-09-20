import * as React from "react"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = {
  robots: {
    index: false,
  }
}

export default function CookieNotice() {
  return (
    <>
      <PageHeader
        title="Cookie Notice"
        crumbs={[{ href: "/faq", label: "Support" }]}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            
          </div>
          
          <div className="space-y-6 text-body text-text-secondary">
            <p>
              Our Cookie Notice is currently being updated. Please check back later.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
