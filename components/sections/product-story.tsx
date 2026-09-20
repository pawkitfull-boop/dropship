import * as React from "react"
import { Product } from "@/lib/commerce/types"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Image as CustomImage } from "@/components/ui/image"

export function ProductStory({ product }: { product: Product }) {
  const storyImage1 = product.images[1] || product.images[0]
  const storyImage2 = product.images[2] || product.images[0]

  return (
    <>
      {/* Intro Description */}
      <section className="w-full bg-white px-gutter py-16 md:py-24 border-b border-gray-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 leading-tight">
            The physical shift.
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </section>

      {/* Why You'll Love It */}
      <section className="w-full bg-[#fcf2e3] px-gutter py-16 md:py-24">
        <div className="mx-auto max-w-[88rem] grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-black mb-8">Why You'll Love It.</h2>
            <ul className="space-y-6">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00c881] text-white mt-1">
                    <span className="font-bold text-sm">✓</span>
                  </div>
                  <span className="text-xl text-gray-800 leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
            <CustomImage
              src={storyImage1.url}
              alt={storyImage1.altText || "The product in use"}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover absolute inset-0 size-full"
            />
          </div>
        </div>
      </section>

      {/* The Details */}
      <section className="w-full bg-white px-gutter py-16 md:py-24 border-b border-gray-100">
        <div className="mx-auto max-w-[88rem] grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl border-4 border-gray-50 bg-gray-50">
            <CustomImage
              src={storyImage2.url}
              alt={storyImage2.altText || "Material detail"}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover absolute inset-0 size-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-black mb-10">The Details.</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="included" className="border-b-2 border-gray-100 py-2">
                <AccordionTrigger className="text-xl font-bold text-black hover:text-[#00c881]">What's included</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 mt-4 text-gray-700 text-lg">
                    {product.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#00c881] font-bold mt-1">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="materials" className="border-b-2 border-gray-100 py-2">
                <AccordionTrigger className="text-xl font-bold text-black hover:text-[#00c881]">Materials and care</AccordionTrigger>
                <AccordionContent>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed">{product.materialsAndCare}</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="specs" className="border-b-2 border-gray-100 py-2">
                <AccordionTrigger className="text-xl font-bold text-black hover:text-[#00c881]">Size and specs</AccordionTrigger>
                <AccordionContent>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed">{product.sizeAndSpecs}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Product Specific FAQ */}
      {(product.faqs && product.faqs.length > 0) ? (
        <section className="w-full bg-[#f4f4f4] px-gutter py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-black mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-3xl p-8 shadow-sm">
              {product.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gray-100 last:border-0 py-2">
                  <AccordionTrigger className="text-lg font-bold text-black text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base leading-relaxed mt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}
    </>
  )
}
