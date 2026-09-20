import * as React from "react"
import { Product } from "@/lib/commerce/types"
import { Truck, RefreshCcw, ShieldCheck } from "lucide-react"
import { BuyBoxClient } from "./buy-box-client"

/**
 * The buy box reads as one composition, not a stack of widgets.
 * Order follows the decision: what it is, what it feels like, what it
 * costs, which one, then the action — with the reassurance directly
 * under the button, where the hesitation actually happens.
 */
export function BuyBox({ product }: { product: Product }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-h1 text-bone">{product.title}</h1>
      <p className="measure mt-4 text-body-large text-text-secondary">{product.positioning}</p>

      {/* What it does. Set as a list of statements, not plus-bulleted rows.
          The last row carries no rule, so it does not double up with the
          divider above the price. */}
      <ul className="mt-8 flex flex-col gap-0 border-t border-line">
        {product.benefits.slice(0, 3).map((benefit, i) => (
          <li
            key={i}
            className="border-b border-line py-3.5 text-body text-text-secondary last:border-b-0"
          >
            {benefit}
          </li>
        ))}
      </ul>

      {/* Price, variants, quantity, actions. */}
      <BuyBoxClient product={product} />

      {/* Reassurance sits with the action. */}
      <dl className="mt-8 flex flex-col gap-0 border-t border-line text-body-small">
        <div className="flex items-start gap-3.5 border-b border-line py-4">
          <Truck size={17} strokeWidth={1.5} aria-hidden="true" className="mt-px shrink-0 text-text-muted" />
          <div>
            <dt className="sr-only">Shipping</dt>
            <dd className="text-text-secondary">{product.shippingExpectations}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3.5 border-b border-line py-4">
          <RefreshCcw size={17} strokeWidth={1.5} aria-hidden="true" className="mt-px shrink-0 text-text-muted" />
          <div>
            <dt className="sr-only">Returns</dt>
            <dd className="text-text-secondary">
              Thirty days to try it. Free returns if it is not for you.
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3.5 border-b border-line py-4">
          <ShieldCheck size={17} strokeWidth={1.5} aria-hidden="true" className="mt-px shrink-0 text-text-muted" />
          <div>
            <dt className="sr-only">Payment</dt>
            <dd className="text-text-secondary">
              Secure checkout with Apple Pay, Shop Pay or card.
            </dd>
          </div>
        </div>
      </dl>
    </div>
  )
}
