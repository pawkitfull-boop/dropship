"use client"

import * as React from "react"
import { useCart } from "@/lib/commerce/cart-context"
import { Product } from "@/lib/commerce/types"
import { useCurrency } from "@/lib/commerce/currency-context"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Truck, PackageCheck, ShieldCheck } from "lucide-react"
import { trackEvent } from "@/lib/analytics/core"

interface BundleBuyBoxProps {
  product: Product
}

export function BundleBuyBox({ product }: BundleBuyBoxProps) {
  const { addItem, openCart } = useCart()
  const { money } = useCurrency()
  const [selectedBundle, setSelectedBundle] = React.useState<"single" | "duo" | "trio">("trio")
  const [isAdding, setIsAdding] = React.useState(false)

  // Variant selections for each potential bag
  const defaultVariantId = product.variants[0]?.id || ""
  const [selections, setSelections] = React.useState<string[]>([defaultVariantId, defaultVariantId, defaultVariantId])

  const basePrice = product.variants[0]?.price || 39.99

  const bundles = {
    single: {
      id: "single",
      title: "Single",
      quantity: 1,
      badge: null,
      price: basePrice,
      originalPrice: basePrice,
    },
    duo: {
      id: "duo",
      title: "Duo",
      quantity: 2,
      badge: "2ND BAG 50% OFF",
      price: basePrice * 1.5,
      originalPrice: basePrice * 2,
    },
    trio: {
      id: "trio",
      title: "Trio",
      quantity: 3,
      badge: "BUY 2, GET 1 FREE",
      price: basePrice * 2,
      originalPrice: basePrice * 3,
    }
  }

  const handleVariantChange = (index: number, variantId: string) => {
    const newSelections = [...selections]
    newSelections[index] = variantId
    setSelections(newSelections)
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    const bundle = bundles[selectedBundle]

    trackEvent("AddToCart", {
      content_name: `${product.title} - ${bundle.title} Bundle`,
      content_ids: selections.slice(0, bundle.quantity),
      value: bundle.price,
      currency: "USD" // Fallback, context handles real currency
    })

    // Add each selected variant to cart
    // In a real Shopify setup without bundle apps, we add individual line items. 
    // To respect the bundle price, we assume automatic discounts are set up in Shopify matching these rules.
    const itemsToAdd = selections.slice(0, bundle.quantity).map(variantId => {
      const variant = product.variants.find(v => v.id === variantId) || product.variants[0]
      return {
        productHandle: product.handle,
        productTitle: product.title,
        variantTitle: variant.title,
        variantId: variant.id,
        price: variant.price, 
        quantity: 1,
        image: product.images[0]?.url || ""
      }
    })

    // Consolidate identical variants into higher quantities to prevent duplicate line item issues in context
    const consolidatedItems = itemsToAdd.reduce((acc, item) => {
      const existing = acc.find(i => i.variantId === item.variantId)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        acc.push({ ...item })
      }
      return acc
    }, [] as typeof itemsToAdd)

    consolidatedItems.forEach(item => {
      addItem(item)
    })

    openCart()
    setIsAdding(false)
  }

  // Shipping Dates Logic
  const today = new Date()
  const processDate = new Date(today)
  processDate.setDate(processDate.getDate() + 1)
  const deliveryStart = new Date(today)
  deliveryStart.setDate(deliveryStart.getDate() + 4)
  const deliveryEnd = new Date(today)
  deliveryEnd.setDate(deliveryEnd.getDate() + 7)

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-[1px] bg-gray-300 flex-1"></div>
        <span className="px-4 text-xs font-black tracking-widest text-black uppercase">Choose Your Pack</span>
        <div className="h-[1px] bg-gray-300 flex-1"></div>
      </div>

      {/* Bundle Options */}
      <div className="space-y-3 mb-6">
        {(Object.keys(bundles) as Array<keyof typeof bundles>).map((key) => {
          const bundle = bundles[key]
          const isSelected = selectedBundle === key

          return (
            <div 
              key={key}
              onClick={() => setSelectedBundle(key)}
              className={`relative rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${
                isSelected ? "border-black bg-[#faf9f8]" : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Most Popular Badge on Trio */}
              {key === "trio" && (
                <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
                  Most Popular
                </div>
              )}

              <div className={`p-4 ${key === "trio" ? "pt-7" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Custom Radio */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-black" : "border-gray-300"}`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                    </div>
                    
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="font-bold text-lg text-black">{bundle.title}</span>
                      {bundle.badge && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide whitespace-nowrap">
                          {bundle.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 pl-3 text-right">
                    <div className="font-bold text-lg text-black">{money(bundle.price)}</div>
                    {bundle.originalPrice > bundle.price && (
                      <div className="text-sm text-gray-400 line-through">{money(bundle.originalPrice)}</div>
                    )}
                  </div>
                </div>

                {bundle.quantity > 1 && (
                  <div className="pl-8 text-sm font-medium text-red-600">
                    {money(bundle.price / bundle.quantity)} each
                  </div>
                )}

                {/* Variant Selectors Expand */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 space-y-3 pl-8">
                        {Array.from({ length: bundle.quantity }).map((_, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                              {bundle.quantity > 1 ? `Bag ${idx + 1} Size` : `Select Size`}
                            </label>
                            <select 
                              className="w-full bg-white border border-gray-300 text-gray-900 text-base sm:text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 font-medium outline-none"
                              value={selections[idx]}
                              onChange={(e) => handleVariantChange(idx, e.target.value)}
                            >
                              {product.variants.map(v => (
                                <option key={v.id} value={v.id}>{v.title}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add to Cart */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isAdding || !product.availableForSale}
        className="w-full bg-black hover:bg-gray-900 text-white shadow-xl hover:shadow-2xl h-16 rounded-full font-black text-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mb-6 uppercase tracking-wider"
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </motion.button>

      {/* Trust Badges */}
      <div className="flex justify-center items-center gap-2 mb-8 opacity-70 grayscale">
        <ShieldCheck className="w-5 h-5 text-gray-600" />
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Guaranteed Safe Checkout</span>
      </div>

      {/* Shipping Timeline */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="relative flex justify-between items-center w-full">
          {/* Connecting Line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-gray-200 z-0"></div>
          
          {/* Steps */}
          <div className="flex flex-col items-center relative z-10 w-1/3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-2 shadow-md">
              <ShoppingCart size={18} />
            </div>
            <span className="text-xs font-bold text-center text-black mb-1">Order Placed</span>
            <span className="text-[10px] text-gray-500 font-medium">{formatDate(today)}</span>
          </div>

          <div className="flex flex-col items-center relative z-10 w-1/3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-2 shadow-md">
              <PackageCheck size={18} />
            </div>
            <span className="text-xs font-bold text-center text-black mb-1">Processed</span>
            <span className="text-[10px] text-gray-500 font-medium">{formatDate(processDate)}</span>
          </div>

          <div className="flex flex-col items-center relative z-10 w-1/3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-2 shadow-md">
              <Truck size={18} />
            </div>
            <span className="text-xs font-bold text-center text-black mb-1">Delivered</span>
            <span className="text-[10px] text-gray-500 font-medium">{formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
