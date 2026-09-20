"use client"

import * as React from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { useCart } from "@/lib/commerce/cart-context"
import { CartBump } from "@/components/commerce/cart-bump"
import { CartLineItem } from "@/components/commerce/cart-line-item"
import { CartSummary } from "@/components/commerce/cart-summary"
import { CartEmptyState } from "@/components/commerce/cart-empty-state"

export default function CartPage() {
  const { items, isHydrated, undoRemove, canUndo, cartCount } = useCart()

  return (
    <>
      <PageHeader title="Your cart" />

      <Section spacing="md" border="bottom">
        <div>
          {/* Hydration / Loading state */}
          {!isHydrated ? (
            <div className="py-24 text-center space-y-4 border-y border-line animate-pulse">
              <div className="h-8 bg-ink-raised w-48 mx-auto rounded"></div>
              <div className="h-4 bg-ink-raised w-32 mx-auto rounded"></div>
            </div>
          ) : items.length === 0 ? (
            <CartEmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
              {/* Line items */}
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                  <span className="text-caption text-text-muted">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                  {canUndo && (
                    <button
                      onClick={undoRemove}
                      className="text-body-small text-text-muted underline decoration-line underline-offset-4 transition-colors hover:text-text-primary hover:decoration-bone"
                    >
                      Undo remove
                    </button>
                  )}
                </div>
                <span aria-live="polite" aria-atomic="true" className="sr-only">
                  {cartCount} {cartCount === 1 ? "item" : "items"} in cart
                </span>

                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <CartLineItem key={item.id} item={item} />
                  ))}
                </div>
                
                {!items.find((i) => i.productHandle === "pawkitfull-everyday-kit") && (
                  <div className="mt-10 lg:mt-16">
                    <CartBump />
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <div className="sticky top-28 border border-line">
                  <CartSummary />
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
