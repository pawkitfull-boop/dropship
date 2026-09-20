"use client"

import * as React from "react"
import { useCart } from "@/lib/commerce/cart-context"
import { X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { CartLineItem } from "@/components/commerce/cart-line-item"
import { CartSummary } from "@/components/commerce/cart-summary"
import { CartEmptyState } from "@/components/commerce/cart-empty-state"
import { CartBump } from "@/components/commerce/cart-bump"

import { motionTokens } from "@/lib/utils/motion"

export function CartDrawer() {
  const { isOpen, closeCart, items, isHydrated, undoRemove, canUndo } = useCart()

  // The drawer is opened programmatically from anywhere (header, hero,
  // quick add), so there is no Radix trigger for it to restore focus to.
  // Remember what was focused at open time and put focus back there on
  // close, otherwise keyboard users are dropped at the top of the page.
  const restoreRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      restoreRef.current = document.activeElement as HTMLElement | null
    }
  }, [isOpen])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: motionTokens.transition.enter }}
                exit={{ opacity: 0, transition: motionTokens.transition.exit }}
                className="fixed inset-0 z-50 bg-ink-deep/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              onCloseAutoFocus={(e) => {
                e.preventDefault()
                restoreRef.current?.focus?.()
              }}
              // Prevent focus ring on close button by focusing the dialog content itself
              onOpenAutoFocus={(e) => {
                e.preventDefault()
                const dialog = document.getElementById("cart-drawer-content")
                if (dialog) dialog.focus()
              }}
            >
              <motion.div
                id="cart-drawer-content"
                initial={{ x: "100%" }}
                animate={{ x: 0, transition: motionTokens.transition.enter }}
                exit={{ x: "100%", transition: motionTokens.transition.exit }}
                className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl outline-none md:w-[32rem] md:rounded-l-3xl overflow-hidden"
                tabIndex={-1}
              >
                {/* Header */}
                <div className="flex h-24 shrink-0 items-center justify-between border-b-2 border-gray-100 px-8 pt-[env(safe-area-inset-top,0px)] bg-white">
                  <Dialog.Title className="text-2xl font-bold flex items-center gap-3 text-black tracking-tight">
                    Your Cart
                    {isHydrated && items.length > 0 && (
                      <span className="flex size-8 items-center justify-center rounded-full bg-[#b6efc4] text-[#00c881] text-sm font-black" aria-live="polite">
                        {items.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    )}
                  </Dialog.Title>
                  <div className="flex items-center gap-4">
                    {isHydrated && canUndo && (
                      <button 
                        onClick={undoRemove} 
                        className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                        aria-label="Undo last removal"
                      >
                        Undo
                      </button>
                    )}
                    <Dialog.Close className="-mr-2 flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-black hover:text-white">
                      <X size={20} strokeWidth={2.5} aria-hidden="true" />
                      <span className="sr-only">Close cart</span>
                    </Dialog.Close>
                  </div>
                </div>

                {/* Content */}
                {!isHydrated ? (
                  <div className="flex-1 animate-pulse px-gutter py-6">
                    <div className="flex gap-6 border-b border-line pb-6">
                      <div className="w-24 h-32 md:w-32 md:h-40 rounded-xl bg-clay-deep shrink-0"></div>
                      <div className="flex-1 flex flex-col space-y-4 pt-2">
                        <div className="flex justify-between items-start">
                          <div className="h-4 bg-clay-deep rounded w-3/4"></div>
                          <div className="h-4 bg-clay-deep rounded w-12"></div>
                        </div>
                        <div className="h-3 bg-clay-deep rounded w-1/2"></div>
                        <div className="mt-auto flex justify-between items-end pb-2">
                          <div className="h-11 w-[104px] rounded-full bg-clay-deep"></div>
                          <div className="h-4 bg-clay-deep rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : items.length === 0 ? (
                  <CartEmptyState isDrawer />
                ) : (
                  <div className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain">
                    <div className="flex flex-col gap-6 px-gutter py-6">
                      <div className="flex flex-col gap-6">
                        {items.map((item) => (
                          <CartLineItem key={item.id} item={item} />
                        ))}
                      </div>

                      {!items.find(i => i.productHandle === "pawkitfull-everyday-kit") && (
                        <div className="mt-6 border-t border-line pt-6">
                          <CartBump />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer / Summary */}
                {isHydrated && items.length > 0 && (
                  <div className="z-10 shrink-0 border-t border-line bg-ink">
                    <CartSummary className="border-none" />
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
