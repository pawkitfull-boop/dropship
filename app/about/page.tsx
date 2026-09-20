import * as React from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { storeDetails } from "@/lib/config/store-details"
import { Image as CustomImage } from "@/components/ui/image"

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Why this exists"
        lede="Sitting still all day while thinking at speed leaves a physical mark. This is what we built for it."
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="flex flex-col gap-12">

          <div className="w-full aspect-[16/9] bg-ink-raised relative overflow-hidden my-12">
            <CustomImage 
              src="/images/mat-use.jpg" 
              alt="Using the acupressure mat" 
              aspectRatio="auto" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
          
          <div className="space-y-6 pt-8 text-body-large text-text-secondary max-w-2xl mx-auto">
            <p>
              We built The 10-Minute Reset because soft, gentle routines weren&apos;t working for us. Digital fatigue requires a physical intervention—something sharp enough to pull the mind out of the screen and anchor it back in the body.
            </p>
            {storeDetails.manufacturingRegion && storeDetails.manufacturingDetail && (
              <p>
                We source our materials from {storeDetails.manufacturingRegion} and work with manufacturing partners who {storeDetails.manufacturingDetail}.
              </p>
            )}
            <p>
              There is no secret ancient wisdom here. It is just physics, pressure, and the biological necessity of taking 10 minutes to do absolutely nothing.
            </p>
          </div>
          
          {(storeDetails.foundedYear || storeDetails.foundedLocation) && (
            <div className="pt-12 mt-12 border-t border-line max-w-2xl mx-auto">
              <h2 className="text-mono-caption text-text-muted mb-4">Founded</h2>
              <p className="text-body">
                {storeDetails.foundedYear} {storeDetails.foundedLocation ? `in ${storeDetails.foundedLocation}` : ""}
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
