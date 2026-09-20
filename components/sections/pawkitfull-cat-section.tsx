"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Image as CustomImage } from "@/components/ui/image"

export function PawkitfullCatSection() {
  return (
    <section className="w-full bg-[#ffc7ba] px-gutter py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-[88rem] flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center">
        
        {/* Left: Copy */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#d65f42] font-bold text-xs tracking-widest uppercase mb-6 w-fit shadow-sm">
            Universal Fit
          </div>
          <h2 className="text-[2.5rem] leading-[1.1] font-bold text-black mb-6 md:text-[3.5rem] max-w-[15ch]">
            Great for all breeds.
          </h2>
          <p className="text-lg text-gray-800 mb-12 max-w-[40ch]">
            Available in sizes Small through XL, ensuring a secure and comfortable fit whether you have a tiny terrier or a large labrador.
          </p>

          <Link
            href="/products/foldable-pet-hair-blow-dryer-bag"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-bold text-white transition-transform hover:scale-105 w-fit group"
          >
            GET YOURS NOW
            <div className="flex size-7 items-center justify-center rounded-full bg-[#00c881] text-white">
              <ArrowRight size={16} strokeWidth={3} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        <div className="w-full flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[500px] aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex items-center justify-center -rotate-2">
            <CustomImage 
              src="/images/original-golden.png" 
              alt="Universal fit for large dogs" 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover absolute inset-0 size-full"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
