"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { QuantityStepper } from "@/components/commerce/product-utils"
import { useCart, CartItem } from "@/lib/commerce/cart-context"
import { useCurrency } from "@/lib/commerce/currency-context"

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart()
  const { money } = useCurrency()

  return (
    <div className="flex gap-4 border-b-2 border-gray-100 pb-6 last:border-0 last:pb-0">
      {/* Product Image */}
      <div className="relative h-28 w-[5.25rem] shrink-0 overflow-hidden rounded-2xl bg-gray-50 border-2 border-gray-100">
        <Link href={`/products/${item.productHandle}`} className="block size-full">
          <CustomImage src={item.image} alt="" sizes="88px" className="object-cover" />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-2">
          <Link href={`/products/${item.productHandle}`} className="text-base font-bold text-black transition-opacity hover:opacity-70 line-clamp-2">
            {item.productTitle}
          </Link>
          <span className="shrink-0 text-base font-bold text-black tabular-nums">{money(item.price * item.quantity)}</span>
        </div>
        
        {item.variantTitle !== "Default Title" && (
          <p className="mt-1 text-sm font-medium text-gray-500 uppercase tracking-widest">{item.variantTitle}</p>
        )}
        
        <div className="mt-auto flex items-end justify-between gap-3">
          <QuantityStepper 
            value={item.quantity} 
            onChange={(q) => updateQuantity(item.id, q)} 
          />
          <button 
            onClick={() => removeItem(item.id)} 
            className="-mr-2 flex h-14 items-center justify-center px-2 text-sm font-bold text-gray-400 underline decoration-gray-200 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
            aria-label={`Remove ${item.productTitle} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
