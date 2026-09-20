import * as React from "react"
import type { Metadata } from "next"
import { PerfectHero } from "@/components/sections/perfect-hero"

import { PawkitfullGroommistFeature } from "@/components/sections/pawkitfull-groommist-feature"
import { PawkitfullProblemSolution } from "@/components/sections/pawkitfull-problem-solution"

import { PawkitfullCatSection } from "@/components/sections/pawkitfull-cat-section"
import { PerfectSuccess } from "@/components/sections/perfect-success"
import { PerfectReviews } from "@/components/sections/perfect-reviews"
import { StickyCartController } from "@/components/commerce/sticky-cart-controller"

import { getProduct } from "@/lib/commerce/api"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default async function Home() {
  const product = await getProduct("foldable-pet-hair-blow-dryer-bag") // Keep for sticky cart fallback

  return (
    <div className="bg-white">
      <PerfectHero />
      <PawkitfullGroommistFeature />
      <PawkitfullProblemSolution />
      <PawkitfullCatSection />
      <PerfectSuccess />
      <PerfectReviews />
      {product && <StickyCartController product={product} />}
    </div>
  )
}
