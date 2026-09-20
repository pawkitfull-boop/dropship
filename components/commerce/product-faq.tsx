"use client"

import * as React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { Plus, Minus } from "lucide-react"
import { Product } from "@/lib/commerce/types"

export function ProductFaq({ product }: { product: Product }) {
  if (!product.faqs || product.faqs.length === 0) return null

  return (
    <section className="bg-white px-gutter py-24 border-b border-gray-100">
      <div className="mx-auto max-w-[56rem]">
        
        <div className="mb-16 flex items-center justify-between">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-gray-400 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="hidden lg:flex gap-2">
            <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors disabled:opacity-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors disabled:opacity-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <Accordion.Root type="single" collapsible className="w-full">
          {product.faqs.map((faq, index) => (
            <Accordion.Item key={index} value={`faq-${index}`} className="border-t border-gray-200 last:border-b">
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 items-center gap-6 py-8 text-left transition-all">
                  <span className="text-sm font-bold text-gray-400 w-8">({index + 1})</span>
                  <span className="flex-1 text-xl font-medium text-black group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  <div className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600 group-data-[state=open]:hidden transition-colors shrink-0">
                    <Plus size={20} strokeWidth={1.5} />
                  </div>
                  <div className="size-10 rounded-full border border-blue-600 flex items-center justify-center text-white bg-blue-600 hidden group-data-[state=open]:flex shrink-0">
                    <Minus size={20} strokeWidth={1.5} />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-lg text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pb-8 pl-14 pr-10 leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

      </div>
    </section>
  )
}
