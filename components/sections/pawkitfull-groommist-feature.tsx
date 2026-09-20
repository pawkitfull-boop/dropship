"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Repeat, Sparkles, Trash2 } from "lucide-react"
import { Image as CustomImage } from "@/components/ui/image"

export function PawkitfullGroommistFeature() {
  return (
    <section className="w-full bg-[#fcf2e3] px-gutter py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-[88rem] flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center">
        
        {/* Left: Video / Image Placeholder */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white flex items-center justify-center">
            <CustomImage 
              src="/images/gallery-frenchie.jpg" 
              alt="Pawkitfull AirDry Bag steps" 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover absolute inset-0 size-full"
            />
          </div>
        </div>

        {/* Right: Copy & Steps */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0b3] text-[#b49820] font-bold text-xs tracking-widest uppercase mb-6 w-fit">
            Dry in Minutes
          </div>
          <h2 className="text-[2.5rem] leading-[1.1] font-bold text-black mb-6 md:text-[3.5rem] max-w-[15ch]">
            No more wrestling with towels.
          </h2>
          <p className="text-lg text-gray-800 mb-12 max-w-[40ch]">
            Towel dry, attach your hair dryer, and watch them dry safely. The fastest way to get a dry, happy dog.
          </p>

          <div className="flex flex-col gap-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-black">
                <Repeat size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-1">Step 1: Put it on</h3>
                <p className="text-gray-600">Quickly towel dry your dog, slip the bag over them, and secure the straps.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-black">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-1">Step 2: Attach Dryer</h3>
                <p className="text-gray-600">Connect your standard home hair dryer to the flexible inlet hose.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-black">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-1">Step 3: Watch them dry</h3>
                <p className="text-gray-600">Turn it on (warm air recommended) and let the bag quickly and safely dry their coat.</p>
              </div>
            </div>
          </div>

          <Link
            href="/products/pawkitfull-airdry-bag"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-bold text-white transition-transform hover:scale-105 w-fit group"
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
