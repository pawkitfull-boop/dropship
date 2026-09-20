"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Minimize2, Ruler, Zap } from "lucide-react"
import { Image as CustomImage } from "@/components/ui/image"

export function PawkitfullFreshflowFeature() {
  return (
    <section className="w-full bg-[#e6f4ea] px-gutter py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-[88rem]">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#00a66b] font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            Smart Design
          </div>
          <h2 className="text-[2.5rem] leading-[1.1] font-bold text-black mb-6 md:text-[3.5rem] max-w-[15ch]">
            Designed for you and your pet.
          </h2>
          <p className="text-lg text-gray-800 max-w-[40ch] mb-12">
            We thought of everything. From storage constraints to pet safety, this bag makes drying simple and stress-free.
          </p>
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white aspect-video relative">
            <CustomImage 
              src="/images/gallery-golden.jpg" 
              alt="Foldable Pet Hair Blow Dryer Bag design" 
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover absolute inset-0 size-full"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-16">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-[240px]">
            <div className="flex size-20 items-center justify-center rounded-full bg-white shadow-xl text-[#00c881] mb-6 relative">
              <Minimize2 size={32} />
              <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold border-2 border-[#e6f4ea]">1</div>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Folds Flat</h3>
            <p className="text-gray-600">Packs down to just 20x20cm. Perfect for travel or small homes.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-[240px]">
            <div className="flex size-20 items-center justify-center rounded-full bg-white shadow-xl text-[#00c881] mb-6 relative">
              <Ruler size={32} />
              <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold border-2 border-[#e6f4ea]">2</div>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Universal Fit</h3>
            <p className="text-gray-600">Available in sizes S to XL to fit every breed comfortably.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-[240px]">
            <div className="flex size-20 items-center justify-center rounded-full bg-white shadow-xl text-[#00c881] mb-6 relative">
              <Zap size={32} />
              <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold border-2 border-[#e6f4ea]">3</div>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Energy Efficient</h3>
            <p className="text-gray-600">Under 1000W means safe, efficient drying with minimal heat risk.</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/products/pawkitfull-airdry-bag"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-bold text-white transition-transform hover:scale-105 group"
          >
            GET YOURS NOW
            <div className="flex size-7 items-center justify-center rounded-full bg-[#00c881] text-white">
              <ArrowRight size={16} strokeWidth={3} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  )
}
