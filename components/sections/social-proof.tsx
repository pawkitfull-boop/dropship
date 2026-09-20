import * as React from "react"
import { Section } from "@/components/layout/section"
import { Reviews } from "@/components/commerce/product-utils"
import { getReviewsForProduct } from "@/lib/commerce/api"

/**
 * With zero real reviews the honest guarantee does the work that fake
 * stars would otherwise do — so it is given real presence rather than
 * being apologised for in grey text. Set on the lit surface so it reads
 * as a statement the brand is standing behind.
 */
export async function SocialProof() {
  const reviews = await getReviewsForProduct("prod_1")

  if (reviews.length > 0) {
    return (
      <Section tone="ink" spacing="md" border="bottom" width="narrow">
        <h2 className="text-h1 mb-12 text-bone">The physical response.</h2>
        <Reviews reviews={reviews} />
      </Section>
    )
  }

  return (
    <Section tone="lit" spacing="md" border="bottom">
      <div className="mx-auto grid max-w-[64rem] grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <p className="text-mono-caption text-text-on-lit-muted lg:pt-2">No reviews yet</p>

        <div>
          <h2 data-reveal className="text-h1 text-ink">
            We would rather have none than invent them.
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
            className="measure mt-6 text-body-large text-text-on-lit-secondary"
          >
            There are no manufactured five-star reviews here, and no clinical
            statistics we cannot stand behind. What we offer instead is time:
            use the mat for thirty days. If the shift in physical tension is not
            distinct, pack it back into the canvas bag and send it back for a
            full refund.
          </p>

          <ul
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line-on-lit pt-5 text-body-small text-text-on-lit-secondary"
          >
            <li>Free shipping</li>
            <li>Thirty days to return it</li>
            <li>No questions asked</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
