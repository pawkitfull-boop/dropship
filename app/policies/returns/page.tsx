import * as React from "react"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { storeDetails } from "@/lib/config/store-details"

export const metadata: Metadata = {
  robots: {
    index: false,
  }
}

export default function ReturnsPolicy() {
  return (
    <>
      <PageHeader
        title="Returns & Refunds"
        crumbs={[{ href: "/faq", label: "Support" }]}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="max-w-2xl mx-auto space-y-12">
          <div>
            
            <p className="text-body-large text-text-muted">The {storeDetails.returnsWindowDays}-Day Physical Guarantee.</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-h2">The Window</h2>
            <p className="text-body">
              You have {storeDetails.returnsWindowDays} days from the date of delivery to return your items for a full refund to your original payment method. 
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-h2">Condition Requirements</h2>
            <p className="text-body">
              We accept returns on items that have been used (we want you to try the ritual). However, items must be returned in their original packaging, including the canvas bag, and must be free of major damage, stains, or missing parts.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-h2">How to Start a Return</h2>
            <div className="bg-ink-raised p-6 border border-line space-y-4">
              <ol className="list-decimal list-inside text-body space-y-2">
                <li>Email {storeDetails.supportEmail ? <a href={`mailto:${storeDetails.supportEmail}`} className="underline hover:text-text-primary">{storeDetails.supportEmail}</a> : "support"} with your order number.</li>
                <li>We will approve the request within {storeDetails.supportResponseTime || "1-2 business days"} and send you instructions.</li>
                <li>Pack the item in its original bag.</li>
                <li>Drop it off at the designated carrier.</li>
              </ol>
            </div>
            <p className="text-body mt-4">
              Refunds are processed within 5-7 business days after we receive and inspect the returned item.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
