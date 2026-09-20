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

export default function ShippingPolicy() {
  const hasShipping = storeDetails.shipping.standard.window !== ""

  if (!hasShipping) {
    return (
      <>
      <PageHeader
        title="Shipping Policy"
        crumbs={[{ href: "/faq", label: "Support" }]}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="max-w-2xl mx-auto space-y-12">
          
          <p className="text-body text-text-muted">
            Our shipping policy is currently being updated. Please contact {storeDetails.supportEmail || "support"} for shipping estimates.
          </p>
        </div>
      </Section>
      </>
    )
  }

  return (
    <>
      <Section spacing="lg" border="bottom">
        <div className="max-w-2xl mx-auto space-y-12">
          <div>
            
          </div>

          {storeDetails.shippingCutoff && (
            <div className="space-y-6">
              <h2 className="text-h2">Processing Times</h2>
              <p className="text-body">
                Orders placed before {storeDetails.shippingCutoff} on business days are processed the same day. Orders placed after the cutoff or on weekends will be processed the following business day.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-h2">Delivery Estimates & Costs</h2>
            <ul className="text-body space-y-4 border border-line divide-y divide-line p-0">
              <li className="p-4 flex justify-between">
                <span>Standard Domestic {storeDetails.shipping.standard.courier ? `(${storeDetails.shipping.standard.courier})` : ""}</span>
                <span>{storeDetails.shipping.standard.window} / {storeDetails.shipping.standard.price}</span>
              </li>
              {storeDetails.shipping.expedited.window && (
                <li className="p-4 flex justify-between">
                  <span>Expedited Domestic</span>
                  <span>{storeDetails.shipping.expedited.window} / {storeDetails.shipping.expedited.price}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-h2">Tracking Your Order</h2>
            <p className="text-body">
              Once your order ships, you will receive a shipping confirmation email containing a tracking number. You can also track your order directly on our <a href="/track-order" className="underline hover:text-text-primary">Track Order page</a>.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-h2">Delays & Lost Packages</h2>
            <p className="text-body">
              If your tracking information hasn&apos;t updated in a few business days, or if it shows delivered but you haven&apos;t received it, please contact us at {storeDetails.supportEmail ? <a href={`mailto:${storeDetails.supportEmail}`} className="underline hover:text-text-primary">{storeDetails.supportEmail}</a> : "support"}. We will open an investigation with the carrier and dispatch a replacement if necessary.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
