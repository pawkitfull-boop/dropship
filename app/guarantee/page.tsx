import * as React from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import Link from "next/link"
import { storeDetails } from "@/lib/config/store-details"
import { Image as CustomImage } from "@/components/ui/image"

export default function GuaranteePage() {
  return (
    <>
      <PageHeader
        title="The guarantee"
        lede={`Use it for ${storeDetails.returnsWindowDays} days. If the shift is not distinct, send it back for a full refund.`}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="flex flex-col gap-12">

          <div className="w-full aspect-[16/9] bg-ink-raised relative overflow-hidden my-12">
            <CustomImage 
              src="/images/mat-detail.jpg" 
              alt="Close up of acupressure mat spikes" 
              aspectRatio="auto" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>

          <div className="bg-ink-raised p-8 md:p-12 border border-line text-left space-y-6 max-w-2xl mx-auto">
            <h2 className="text-h2">Our Promise</h2>
            <p className="text-body-large">
              If you do not feel a distinct, grounding shift in your physical tension after {storeDetails.returnsWindowDays} days of consistent use, we do not want your money.
            </p>
            <p className="text-body-large">
              Pack the tool back into its original canvas bag, email our team{storeDetails.supportEmail ? ` at ${storeDetails.supportEmail}` : ""}, and we will process a full refund to your original payment method. 
            </p>
            <div className="pt-8">
              <Link
                href="/collections/shop-all"
                className="inline-flex h-[52px] w-full items-center justify-center bg-bone px-8 text-body font-medium text-ink transition-colors hover:bg-paper sm:w-auto"
              >
                Shop the tools
              </Link>
            </div>
          </div>

          <div className="pt-8 text-body text-text-muted">
            <p>For full details, read our <Link href="/policies/returns" className="underline decoration-line underline-offset-4 transition-colors hover:text-text-primary hover:decoration-bone">returns policy</Link>.</p>
          </div>

        </div>
      </Section>
    </>
  )
}
