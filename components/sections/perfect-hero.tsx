"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { ArrowRight, Star } from "lucide-react"

// The photo is landscape with the dog on the right and flat #c7deeb behind it.
// Cropping that to a portrait phone leaves nothing but the dog's face, which is
// what the copy was fighting with. Below md the hero stacks instead: copy on the
// flat colour, photo as a band beneath it. From md up nothing changes — the photo
// goes back to being an absolute background with the copy overlaid on it.
export function PerfectHero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#c7deeb] md:block md:bg-transparent">
      {/* Background Image */}
      <div className="relative z-0 order-2 h-[34vh] min-h-[190px] w-full md:absolute md:inset-0 md:order-none md:h-auto md:min-h-0">
        <CustomImage
          src="/images/dryer-hero.png"
          alt="Samoyed dog using the Foldable Pet Hair Blow Dryer Bag"
          sizes="100vw"
          className="absolute inset-0 size-full object-cover object-[62%_center] md:object-center"
          priority
        />
        {/* From md up the copy still overlaps the photo, so it keeps a scrim. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-white/85 via-white/45 to-transparent md:block lg:hidden"
        />
      </div>

      {/* Sits exactly below the header. dvh (not vh) so the mobile browser
          chrome collapsing doesn't leave the CTA hanging off-screen. */}
      <div className="relative z-10 order-1 mx-auto flex w-full max-w-[88rem] flex-col justify-start px-gutter py-14 md:order-none md:h-[calc(100dvh_-_var(--header-h,104px))] md:min-h-[520px] md:py-16 lg:justify-center lg:py-0 lg:pl-12 xl:pl-24 xl:min-h-[600px]">
        
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

          <h1 className="text-[2.75rem] leading-[1.1] font-bold text-black mb-6 sm:text-[3.5rem] md:text-[4.5rem] max-w-[12ch] drop-shadow-sm">
            Dry your dog in minutes, not hours.
          </h1>

          <p className="text-base sm:text-lg text-gray-800 mb-8 max-w-[40ch] drop-shadow-sm">
            The portable, foldable blow dryer bag that turns bath time from a chore into a breeze. Fast, safe, and stress-free.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products/pawkitfull-airdry-bag"
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
      <div className="order-3 bg-[#faebd7] py-4 overflow-hidden w-full relative flex border-t border-gray-200/50 md:order-none">
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
