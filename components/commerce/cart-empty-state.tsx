"use client"

import * as React from "react"
import Link from "next/link"
import { Image as CustomImage } from "@/components/ui/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/commerce/cart-context"
import { useRouter } from "next/navigation"

export function CartEmptyState({ isDrawer = false }: { isDrawer?: boolean }) {
  const { closeCart } = useCart()
  const router = useRouter()
  
  return (
    <div className={`flex flex-col h-full ${isDrawer ? 'py-12' : 'py-section-md border-y border-line'}`}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center px-4">
        
        <div className="space-y-2">
          <p className="text-h2 text-text-primary">Your cart is empty</p>
          <p className="mx-auto max-w-sm text-body text-text-secondary">
            Give your body the reset it deserves.
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[16rem] overflow-hidden border border-line text-left transition-colors hover:border-text-muted">
          <Link href="/products/foldable-pet-hair-blow-dryer-bag" onClick={isDrawer ? closeCart : undefined} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised">
              <CustomImage 
                src="/images/bundle-dogs.png" 
                alt="Pawkitfull Blow Dryer Bag" 
                sizes="256px"
                zoomOnHover
              />
            </div>
            <div className="border-t border-line p-4">
              <p className="text-body font-medium text-text-primary">
                <span className="font-bold text-text-primary transition-colors group-hover:text-black">Pawkitfull Blow Dryer Bag</span>
              </p>
              <p className="mt-1 font-mono text-body-small text-text-muted tabular-nums">$39.95</p>
            </div>
          </Link>
        </div>

        <div className="pt-4 w-full max-w-xs mx-auto">
          <Button 
            className="w-full"
            variant="outline"
          
            onClick={() => {
              if (isDrawer) closeCart()
              router.push("/collections/shop-all")
            }}
          >
            Continue shopping
          </Button>
        </div>

      </div>
    </div>
  )
}
