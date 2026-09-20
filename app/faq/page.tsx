import * as React from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { storeFaqs, productFaqs, allFaqs } from "@/content/faqs"
import { storeDetails } from "@/lib/config/store-details"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ | The 10-Minute Reset",
  description: "Common questions about our physical tools, shipping, returns, and the ritual.",
}

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeader
        title="Questions"
        lede="Everything about the tools, the shipping and the returns. If it is not here, write to us."
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="flex flex-col gap-16">

          <div className="space-y-6">
            <h2 className="text-h2 border-b border-line pb-4">Shipping & Returns</h2>
            <Accordion type="single" collapsible className="w-full">
              {storeFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`store-${i}`}>
                  <AccordionTrigger className="text-body-large font-medium text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-body text-text-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <h2 className="text-h2 border-b border-line pb-4">The Ritual & Products</h2>
            <Accordion type="single" collapsible className="w-full">
              {productFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`product-${i}`}>
                  <AccordionTrigger className="text-body-large font-medium text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-body text-text-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-h2 text-bone">Still stuck?</h2>
              <p className="mt-3 text-body text-text-secondary">
                Write to us. We aim to reply within{" "}
                {storeDetails.supportResponseTime || "24 hours"}.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-[52px] shrink-0 items-center justify-center border border-line px-7 text-body text-text-primary transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              Contact support
            </Link>
          </div>

        </div>
      </Section>
    </>
  )
}
