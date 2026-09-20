"use client"

import * as React from "react"
import { Image as CustomImage } from "@/components/ui/image"
import Link from "next/link"

const STORIES = [
  {
    name: "Cooper's Bath Time",
    quote: "\"I have a golden retriever who takes hours to dry. This bag gets him completely dry in 20 minutes!\"",
    image: "/images/gallery-golden.jpg"
  },
  {
    name: "Luna's Setup",
    quote: "\"She used to be terrified of the blow dryer. Being inside the bag keeps her calm and the noise down.\"",
    image: "/images/luna-dog.jpg"
  },
  {
    name: "Milo's Storage",
    quote: "\"I love how small it folds up. We take it on camping trips and it takes up zero space.\"",
    image: "/images/milo-dog.png"
  }
]

export function PerfectSuccess() {
  return (
    <section className="w-full bg-[#fcf2e3] px-gutter py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[88rem] flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Stats Column */}
        <div className="w-full lg:w-[35%] flex flex-col items-start text-black">
          <h2 className="text-5xl md:text-[4rem] leading-[1.1] font-bold mb-6">
            See the Dryer Bag in action.
          </h2>
          
          <p className="text-xl text-gray-700 mb-10 max-w-[30ch]">
            Real pet owners. Real results. See why this is the fastest way to get a dry, happy dog.
          </p>

          <div className="space-y-8 mb-10">
            <div className="flex gap-6 items-start">
              <span className="text-4xl font-bold w-[72px] shrink-0">10k+</span>
              <p className="text-base font-medium pt-1">Dogs dried safely and comfortably.</p>
            </div>
            <div className="flex gap-6 items-start">
              <span className="text-4xl font-bold w-[72px] shrink-0">4.9</span>
              <p className="text-base font-medium pt-1">Average rating from thousands of happy pet owners.</p>
            </div>
          </div>

          <Link
            href="/products/foldable-pet-hair-blow-dryer-bag"
            className="inline-flex h-14 items-center justify-center rounded-full bg-black px-10 text-sm font-bold text-white transition-colors hover:bg-gray-800 w-fit"
          >
            GET YOURS NOW
          </Link>
        </div>

        {/* Right Carousel Column */}
        <div className="w-full lg:w-[65%] flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          {STORIES.map((story, i) => (
            <div key={i} className="snap-start shrink-0 w-[300px] sm:w-[340px] flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm">
              {/* Image */}
              <div className="relative w-full aspect-square">
                <CustomImage src={story.image} alt={story.name} className="object-cover size-full absolute inset-0" sizes="(max-width: 768px) 100vw, 340px" />
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-black mb-4">{story.name}</h3>
                <p className="text-gray-800 text-base mb-6 flex-1">{story.quote}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
