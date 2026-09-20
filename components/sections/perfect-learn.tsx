"use client"

import * as React from "react"
import { Image as CustomImage } from "@/components/ui/image"
import * as Accordion from "@radix-ui/react-accordion"
import { Plus, Minus, ArrowRight } from "lucide-react"

const FAQ = [
  {
    icon: "!",
    question: "What makes these products different?",
    answer: "Our products are made with 100% natural ingredients, zero fillers, and formulated by leading veterinarians to ensure maximum bioavailability and effectiveness."
  },
  {
    icon: "►",
    question: "How long does it take to see results?",
    answer: "Most pet parents notice an improvement in energy and digestion within the first 2-3 weeks of consistent daily use."
  },
  {
    icon: "🍽️",
    question: "Can I mix this with regular food?",
    answer: "Yes! Our supplements are designed to be easily mixed with any wet or dry food. They have a natural savory flavor that most pets love."
  }
]

export function PerfectLearn() {
  return (
    <section className="w-full bg-white px-gutter py-16 md:py-24">
      <div className="mx-auto max-w-[88rem] flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <CustomImage 
            src="/images/compression-hero.jpg" 
            alt="Happy pet learning" 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-[3.5rem] leading-[1.1] font-bold text-black mb-10">
            Learn about <br /> Perfect Pets
          </h2>

          <Accordion.Root type="single" collapsible className="w-full space-y-4">
            {FAQ.map((item, index) => (
              <Accordion.Item 
                key={index} 
                value={`item-${index}`} 
                className="border-2 border-gray-100 rounded-3xl overflow-hidden data-[state=open]:border-[#00c881] transition-colors"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="group flex flex-1 items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors [&[data-state=open]>div>svg.plus]:hidden [&[data-state=closed]>div>svg.minus]:hidden">
                    <div className="flex items-center gap-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#b6efc4] text-[#00c881] text-xl font-black">
                        {item.icon}
                      </div>
                      <span className="text-lg font-bold text-black text-left">
                        {item.question}
                      </span>
                    </div>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 group-data-[state=open]:bg-[#00c881] group-data-[state=open]:text-white transition-colors ml-4 text-gray-500">
                      <Plus className="plus" size={20} strokeWidth={2.5} />
                      <Minus className="minus" size={20} strokeWidth={2.5} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden bg-white text-base text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-6 pb-6 pt-2 ml-[4.5rem]">
                    <p className="mb-4 leading-relaxed">{item.answer}</p>
                    <a href="/guide" className="inline-flex items-center gap-2 text-[#00c881] font-bold hover:underline">
                      Read more <ArrowRight size={16} strokeWidth={2.5} />
                    </a>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

      </div>
    </section>
  )
}
