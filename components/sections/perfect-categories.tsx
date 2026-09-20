"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"

const CATEGORIES = [
  {
    title: "Groom",
    description: "Tools to keep their coat healthy and your home clean.",
    bgColor: "bg-[#b6efc4]", // Pastel Green
    href: "/collections/groom",
    image: "/images/groommist-1.jpg"
  },
  {
    title: "Hydrate",
    description: "Smarter ways to keep them refreshed, at home or on the go.",
    bgColor: "bg-[#cde4f0]", // Pastel Blue
    href: "/collections/hydrate",
    image: "/images/freshflow-1.jpg"
  },
  {
    title: "Play",
    description: "Engaging toys designed for their natural instincts.",
    bgColor: "bg-[#fff0b3]", // Pastel Yellow
    href: "/collections/play",
    image: "/images/pounce-1.jpg"
  },
  {
    title: "Adventure",
    description: "Gear built for the walk, the hike, and the road trip.",
    bgColor: "bg-[#ffc7ba]", // Pastel Peach
    href: "/collections/adventure",
    image: "/images/roampack-1.jpg"
  }
]

export function PerfectCategories() {
  return (
    <section className="w-full bg-white px-gutter py-16 md:py-24">
      <div className="mx-auto max-w-[88rem]">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-black mb-12">
          Shop by Pet Life
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((category, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col sm:flex-row overflow-hidden rounded-2xl ${category.bgColor} p-8 lg:p-12 min-h-[300px]`}
            >
              <div className="flex-1 flex flex-col justify-center max-w-[280px] z-10">
                <h3 className="text-3xl font-bold text-black mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-800 text-lg mb-8 leading-snug">
                  {category.description}
                </p>
                <Link
                  href={category.href}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-bold text-white transition-transform hover:scale-105 w-fit"
                >
                  SHOP NOW
                </Link>
              </div>
              
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end pr-4 sm:pr-8 opacity-90 transition-transform duration-500 hover:scale-105">
                <div className="relative w-4/5 aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white/20">
                  <CustomImage 
                    src={category.image} 
                    alt={category.title} 
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
