"use client"

import * as React from "react"
// Note: We cannot export metadata from a 'use client' file.
// Let's create a layout.tsx instead, or move the 'use client' out.
// Let's actually remove 'use client' if possible, or just skip metadata here and rely on robots.txt.
// Let's just rely on robots.txt.
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Image as CustomImage } from "@/components/ui/image"
import { Section } from "@/components/layout/section"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { StarRating, QuantityStepper, Reviews } from "@/components/commerce/product-utils"
import { StickyCart } from "@/components/commerce/sticky-cart"

export default function ComponentsPage() {
  const [qty, setQty] = React.useState(1)
  const [showSticky, setShowSticky] = React.useState(false)

  return (
    <>
        <Section spacing="lg" border="bottom">
          <h1 className="text-display mb-4">Component Library</h1>
          <p className="text-body-large text-ash">
            Brutalist app shell and reusable UI elements.
          </p>
        </Section>

        {/* Buttons */}
        <Section spacing="md" border="bottom">
          <h2 className="text-h2 mb-8">Buttons & Badges</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">PRIMARY</Button>
            <Button variant="secondary">SECONDARY</Button>
            <Button variant="ghost">GHOST</Button>
            <Button isLoading>LOADING</Button>
            <Button disabled>DISABLED</Button>
          </div>
          <div className="mt-8 flex gap-4">
            <Badge variant="default">NEW ARRIVAL</Badge>
            <Badge variant="secondary">SOLD OUT</Badge>
          </div>
        </Section>

        {/* Commerce */}
        <Section spacing="md" border="bottom">
          <h2 className="text-h2 mb-8">Commerce Utilities</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-mono-caption text-ash mb-2">Quantity Stepper</p>
                <QuantityStepper value={qty} onChange={setQty} />
              </div>
              
              <div>
                <p className="text-mono-caption text-ash mb-2">Star Rating</p>
                <StarRating rating={4} count={128} />
              </div>

              <div>
                <p className="text-mono-caption text-ash mb-4">Toggle Sticky Cart (Mobile only)</p>
                <Button variant="secondary" onClick={() => setShowSticky(!showSticky)}>
                  {showSticky ? "HIDE STICKY CART" : "SHOW STICKY CART"}
                </Button>
              </div>
            </div>

            <div>
              <p className="text-mono-caption text-ash mb-4">Reviews (Real data only)</p>
              <Reviews 
                reviews={[
                  {
                    id: "1",
                    author: "Sarah M.",
                    rating: 5,
                    date: "Oct 12, 2026",
                    content: "The brutalist layout really relieves my digital tension before the mat even arrives."
                  }
                ]} 
              />
            </div>
          </div>
        </Section>

        {/* Accordion & Image */}
        <Section spacing="md" border="bottom">
          <h2 className="text-h2 mb-8">Media & Disclosure</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-mono-caption text-ash mb-4">Image Placeholder (Aspect 4:3)</p>
              <div className="w-full max-w-sm">
                <CustomImage 
                  src="" 
                  alt="Placeholder" 
                  aspectRatio="landscape"
                />
              </div>
            </div>

            <div>
              <p className="text-mono-caption text-ash mb-4">Accordion (Radix Primitive)</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is there a fake urgency timer?</AccordionTrigger>
                  <AccordionContent>
                    No. The 10-Minute Reset respects your time and agency. We do not use dark patterns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the return policy?</AccordionTrigger>
                  <AccordionContent>
                    You have 30 days to return the item in its original condition.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Section>

        {/* Loading States */}
        <Section spacing="md">
          <h2 className="text-h2 mb-8">Loading States</h2>
          <div className="space-y-4 max-w-md">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-64 w-full mt-8" />
          </div>
        </Section>
      <StickyCart 
        isVisible={showSticky} 
        price="$79.00" 
        title="Acupressure Mat Set" 
        onAdd={() => alert("Added to cart")} 
      />
    </>
  )
}
