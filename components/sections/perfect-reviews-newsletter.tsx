"use client"

import * as React from "react"
import { Star, ArrowRightCircle } from "lucide-react"

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

export function PerfectReviewsNewsletter() {
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

        {/* Newsletter Pill Bar */}
        <div className="w-full max-w-6xl bg-black rounded-3xl md:rounded-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-8 shadow-2xl relative">
          
          {/* Claim Off Badge */}
          <div className="absolute -left-6 -bottom-6 hidden size-[100px] items-center justify-center rounded-full bg-black text-white font-bold text-center leading-tight shadow-xl border-4 border-white md:flex">
            <span className="text-lg">Claim<br/>15% Off</span>
          </div>

          <div className="flex-1 md:ml-12 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Join the Pawkitfull Pack
            </h3>
            <p className="text-[#a0a0a0] text-sm md:text-base">
              We'll send you new product drops, pet care tips, and exclusive offers.
            </p>
          </div>

          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex-1 w-full max-w-md bg-[#222] rounded-full p-1.5 flex items-center shadow-inner"
          >
            <input 
              type="email" 
              placeholder="email@example.com" 
              className="w-full min-w-0 flex-1 bg-transparent text-white px-5 sm:px-6 py-3 outline-none placeholder:text-gray-500 text-base sm:text-sm"
              required
            />
            <button 
              type="submit" 
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#00c881] px-5 sm:px-6 text-sm font-bold text-white transition-colors hover:bg-[#00a66b]"
            >
              SUBMIT
              <ArrowRightCircle size={18} fill="white" className="text-[#00c881]" />
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
