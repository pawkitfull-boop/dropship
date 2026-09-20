"use client"

import * as React from "react"
import { Star } from "lucide-react"

const REVIEWS = [
  {
    name: "Sarah M.",
    product: "Dryer Bag",
    initials: "SM",
    text: "Amazing product - absolutely love how much easier it makes drying my Golden Retriever."
  },
  {
    name: "Jason K.",
    product: "Dryer Bag",
    initials: "JK",
    text: "This is so good. No more wet dog smell in the house. I love it!"
  },
  {
    name: "Emily R.",
    product: "Dryer Bag",
    initials: "ER",
    text: "By far the best pet grooming tool there is! My dog isn't scared of the noise anymore."
  },
  {
    name: "Marcus T.",
    product: "Dryer Bag",
    initials: "MT",
    text: "So convenient for travel. Fits right into our bag for muddy weekend trips."
  }
]

export function PerfectReviews() {
  return (
    <section className="w-full bg-white px-gutter py-16 md:py-24 overflow-hidden relative border-t-[16px] border-[#cde4f0]">
      <div className="mx-auto max-w-[88rem] flex flex-col items-center">
        
        {/* Reviews Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-[#fbbf24]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700 ml-2">10,000+ Reviews</span>
        </div>
        <h2 className="text-4xl md:text-[3.5rem] font-bold text-black mb-16 text-center">
          Customers Love Pawkitfull.
        </h2>

        {/* Reviews Carousel */}
        <div className="w-full flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
          {REVIEWS.map((review, i) => (
            <div key={i} className="snap-start shrink-0 w-[280px] sm:w-[300px] flex flex-col">
              <div className="flex text-[#fbbf24] mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#222] text-white font-bold text-lg">
                  {review.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black text-lg">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.product}</span>
                </div>
              </div>
              <p className="text-gray-800 text-base leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
