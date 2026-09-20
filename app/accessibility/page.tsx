import * as React from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { storeDetails } from "@/lib/config/store-details"

export default function AccessibilityStatement() {
  return (
    <>
      <PageHeader
        title="Accessibility"
        lede="How this site is built, what it supports, and where we know it still falls short."
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="sr-only">Accessibility statement</h2>
          </div>
          
          <div className="space-y-6 text-body text-text-secondary">
            <p>
              {storeDetails.name} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
            <h2 className="text-h2 text-text-primary pt-4">Conformance Status</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. This site uses high-contrast typography, structural markup, keyboard navigation support, and aria-labels for all interactive elements to ensure screen-reader compatibility.
            </p>
            <h2 className="text-h2 text-text-primary pt-4">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our site. If you encounter accessibility barriers, please contact us at {storeDetails.supportEmail ? <a href={`mailto:${storeDetails.supportEmail}`} className="underline hover:text-text-primary">{storeDetails.supportEmail}</a> : "support"}.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
