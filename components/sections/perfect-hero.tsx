"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { ArrowRight, Star } from "lucide-react"

export function PerfectHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <CustomImage 
          src="/images/dryer-hero.png" 
          alt="Samoyed dog using the Foldable Pet Hair Blow Dryer Bag" 
          sizes="100vw"
          className="object-cover absolute inset-0 size-full object-[70%_center] md:object-center"
          priority
        />
      </div>

      {/* Explicit height so it perfectly fits above the fold alongside the header */}
      <div className="relative z-10 mx-auto flex max-w-[88rem] flex-col justify-center px-gutter py-16 lg:py-0 lg:pl-12 xl:pl-24 h-[calc(100vh-175px)] min-h-[500px] xl:min-h-[600px]">
        
        {/* Content Box (Constrained width so it stays on the left) */}
        <div className="flex flex-col max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-black">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm font-semibold tracking-wide text-gray-800 uppercase drop-shadow-sm">
              13K+ HAPPY CUSTOMERS
            </span>
          </div>

          <h1 className="text-[3.5rem] leading-[1.1] font-bold text-black mb-6 md:text-[4.5rem] max-w-[12ch] drop-shadow-sm">
            Dry your dog in minutes, not hours.
          </h1>
          
          <p className="text-lg text-gray-800 mb-8 max-w-[40ch] drop-shadow-sm">
            The portable, foldable blow dryer bag that turns bath time from a chore into a breeze. Fast, safe, and stress-free.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products/foldable-pet-hair-blow-dryer-bag"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-bold text-white transition-transform hover:scale-105 w-fit group shadow-lg"
            >
              GET YOURS NOW
              <div className="flex size-7 items-center justify-center rounded-full bg-[#00c881] text-white">
                <ArrowRight size={16} strokeWidth={3} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-[#faebd7] py-4 overflow-hidden w-full relative flex border-t border-gray-200/50">
        <div className="flex items-center w-max min-w-full animate-marquee">
           {/* Duplicate the items to allow seamless looping */}
           {[...Array(4)].map((_, arrayIndex) => (
             <React.Fragment key={arrayIndex}>
               {[
                 { icon: "⚡", label: "Fast Drying" },
                 { icon: "🐕", label: "Fits All Sizes" },
                 { icon: "📦", label: "Folds Flat" },
                 { icon: "💡", label: "Energy Efficient" },
                 { icon: "💚", label: "Pet Safe" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 shrink-0 px-8">
                   <span className="text-2xl">{item.icon}</span>
                   <span className="text-lg font-medium text-gray-800 whitespace-nowrap">{item.label}</span>
                 </div>
               ))}
             </React.Fragment>
           ))}
        </div>
      </div>
    </section>
  )
}
