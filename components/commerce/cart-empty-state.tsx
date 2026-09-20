"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/commerce/cart-context"
import { useRouter } from "next/navigation"

export function CartEmptyState({ isDrawer = false }: { isDrawer?: boolean }) {
  const { closeCart } = useCart()
  const router = useRouter()
  
  return (
    <div className={`flex flex-col h-full ${isDrawer ? 'py-12' : 'py-section-md border-y border-line'}`}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center px-4">
        
        <div className="space-y-3">
          <p className="text-h2 text-text-primary">Your cart is empty</p>
          <p className="mx-auto max-w-sm text-body text-text-secondary">
            Grab your Pawkitfull AirDry+ bag and say goodbye to the wet dog smell.
          </p>
        </div>

        <div className="pt-4 w-full max-w-xs mx-auto">
          <Button 
            className="w-full h-12 text-sm font-bold tracking-widest text-white transition-all bg-black hover:bg-gray-800 rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5"
            onClick={() => {
              if (isDrawer) closeCart()
              router.push("/products/pawkitfull-airdry-bag")
            }}
          >
            GET YOURS NOW
          </Button>
        </div>

      </div>
    </div>
  )
}
