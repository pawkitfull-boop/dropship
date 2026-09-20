"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { ArrowRight } from "lucide-react"

export function PerfectBundle() {
  return (
    <section className="w-full bg-[#f4f4f4] px-gutter py-16 md:py-24">
      <div className="mx-auto max-w-[88rem]">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Bundles & Kits</h2>
          <p className="text-lg text-gray-600">
            Save when you buy the essentials together.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Bundle 1 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-gray-100 shadow-sm transition-transform hover:-translate-y-1 max-w-4xl w-full">
            <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative bg-[#faebd7]">
              <CustomImage 
                src="/images/bundle-dogs.png" 
                alt="Pawkitfull Blow Dryer Bag 2-Pack" 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover absolute inset-0 size-full"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col items-start flex-1 justify-center">
              <h3 className="text-3xl font-bold text-black mb-4">Pawkitfull Blow Dryer Bag 2-Pack</h3>
              <p className="text-gray-700 mb-8 max-w-[30ch]">
                Perfect for multi-dog households. Get two and save $19.95.
              </p>
              <Link
                href="/bundles/pawkitfull-dryer-bag-2-pack"
                className="mt-auto md:mt-0 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-8 text-sm font-bold text-white transition-transform hover:scale-105 w-fit group"
              >
                SHOP 2-PACK
                <div className="flex size-7 items-center justify-center rounded-full bg-[#00c881] text-white">
                  <ArrowRight size={16} strokeWidth={3} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
