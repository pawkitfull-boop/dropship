"use client"

import * as React from "react"
import Link from "next/link"
import { Section } from "@/components/layout/section"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { allFaqs } from "@/content/faqs"

export function FaqSection() {
  return (
    <Section tone="ink" spacing="lg" border="none">
      {/* Heading held to the left with the questions beside it, rather
          than a centred title over a centred column. */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-h1 text-text-primary">Common questions.</h2>
          <p className="mt-4 text-body font-medium text-text-secondary">
            Everything else is on the{" "}
            <Link
              href="/faq"
              className="font-semibold text-ember underline decoration-ember underline-offset-4 transition-colors hover:text-ember-deep hover:decoration-ember-deep"
            >
              full FAQ
            </Link>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {allFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-h3">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-body">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
