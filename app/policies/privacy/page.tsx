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

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        crumbs={[{ href: "/faq", label: "Support" }]}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            
          </div>
          
          <div className="space-y-6 text-body text-text-secondary">
            <p>
              Our Privacy Policy is currently being updated. Please check back later.
            </p>
            <h2 className="text-h2 text-text-primary pt-4">Data Collection</h2>
            <p>
              We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
            </p>
            <h2 className="text-h2 text-text-primary pt-4">Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at {storeDetails.supportEmail || "support"}.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
