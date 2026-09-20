"use client"

import * as React from "react"
import { useCart } from "@/lib/commerce/cart-context"
import { Lock, Truck, RefreshCcw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics/core"

export function CartSummary({ 
  className = "",
  buttonClassName = "w-full"
}: { 
  className?: string
  buttonClassName?: string
}) {
  const { cartTotal, cartCount, checkout, isLoading, error } = useCart()

  const handleCheckout = () => {
    trackEvent("InitiateCheckout", {
      content_name: "Cart Summary",
      value: cartTotal,
      currency: "USD",
      num_items: cartCount
    })
    checkout()
  }

  return (
    <div className={`px-8 py-8 pb-[max(2rem,calc(env(safe-area-inset-bottom)+2rem))] bg-white ${className}`}>
      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          <AlertCircle size={18} strokeWidth={2} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xl font-bold text-black">Subtotal</span>
        <span className="text-2xl font-bold text-black tabular-nums">
          ${cartTotal.toFixed(2)}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500 font-medium">
        Shipping and taxes calculated at checkout.
      </p>

      <Button
        onClick={handleCheckout}
        disabled={isLoading || cartTotal === 0}
        isLoading={isLoading}
        variant="checkout"
        className={`mt-6 ${buttonClassName}`}
        size="lg"
      >
        {isLoading ? "PROCESSING..." : "CHECKOUT SECURELY"}
      </Button>

      {/* Reassurance */}
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-bold text-gray-400">
        <li className="flex items-center gap-2">
          <Lock size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>Secure checkout</span>
        </li>
        <li className="flex items-center gap-2">
          <Truck size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>Free shipping</span>
        </li>
        <li className="flex items-center gap-2">
          <RefreshCcw size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>30-day returns</span>
        </li>
      </ul>
    </div>
  )
}
