"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { motionTokens } from "@/lib/utils/motion"

export function FilterDrawer({ isDesktop = false }: { isDesktop?: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Local state for the filter drawer (so we don't update URL immediately on every click if we want an "Apply" button)
  // For desktop we could update immediately. For mobile, we might want an "Apply" button.
  // Actually, standard behavior for URL-driven filters is usually immediate on desktop, and immediate or apply on mobile.
  // Let's make it immediate for simplicity and real-time feel.

  const currentSort = searchParams.get("sort") || "featured"
  const inStock = searchParams.get("inStock") === "true"

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(pathname + "?" + createQueryString("sort", e.target.value))
  }

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(pathname + "?" + createQueryString("inStock", e.target.checked ? "true" : ""))
  }

  const handleClear = () => {
    router.push(pathname)
    setIsOpen(false)
  }

  const drawerVariants = {
    hidden: shouldReduceMotion ? { opacity: 0, y: 0 } : { y: "100%" },
    visible: { opacity: 1, y: 0, transition: motionTokens.transition.enter },
    exit: shouldReduceMotion
      ? { opacity: 0, y: 0, transition: motionTokens.transition.exit }
      : { y: "100%", transition: motionTokens.transition.exit },
  }

  const FilterContent = (
    <div className="space-y-12">
      {/* Sort */}
      <fieldset className="space-y-4">
        <legend className="text-mono-caption w-full border-b border-line pb-2 text-gray-500">Sort by</legend>
        <div className="flex flex-col space-y-3 pt-2">
          <label className="group flex h-11 cursor-pointer items-center gap-3 text-body text-gray-700 transition-colors hover:text-black">
            <input 
              type="radio" 
              name={`sort-${isDesktop ? 'desktop' : 'mobile'}`} 
              value="featured"
              checked={currentSort === "featured"}
              onChange={handleSortChange}
              className="size-[18px] shrink-0 accent-black" 
            />
            <span>Featured</span>
          </label>
          <label className="group flex h-11 cursor-pointer items-center gap-3 text-body text-gray-700 transition-colors hover:text-black">
            <input 
              type="radio" 
              name={`sort-${isDesktop ? 'desktop' : 'mobile'}`} 
              value="price-asc"
              checked={currentSort === "price-asc"}
              onChange={handleSortChange}
              className="size-[18px] shrink-0 accent-black" 
            />
            <span>Price, low to high</span>
          </label>
          <label className="group flex h-11 cursor-pointer items-center gap-3 text-body text-gray-700 transition-colors hover:text-black">
            <input 
              type="radio" 
              name={`sort-${isDesktop ? 'desktop' : 'mobile'}`} 
              value="price-desc"
              checked={currentSort === "price-desc"}
              onChange={handleSortChange}
              className="size-[18px] shrink-0 accent-black" 
            />
            <span>Price, high to low</span>
          </label>
        </div>
      </fieldset>

      {/* Filter - Availability */}
      <fieldset className="space-y-4">
        <legend className="text-mono-caption w-full border-b border-line pb-2 text-gray-500">Availability</legend>
        <div className="flex flex-col space-y-3 pt-2">
          <label className="group flex h-11 cursor-pointer items-center gap-3 text-body text-gray-700 transition-colors hover:text-black">
            <input 
              type="checkbox" 
              checked={inStock}
              onChange={handleInStockChange}
              className="size-[18px] shrink-0 rounded-none accent-black" 
            />
            <span>In stock only</span>
          </label>
        </div>
      </fieldset>
      
      {/* Clear Filters */}
      {(inStock || currentSort !== "featured") && (
        <button 
          onClick={handleClear}
          className="text-body-small text-gray-500 underline decoration-line underline-offset-4 transition-colors hover:text-black hover:decoration-black"
        >
          Clear filters
        </button>
      )}
    </div>
  )

  if (isDesktop) {
    return FilterContent
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-11 items-center gap-2 rounded-full border border-gray-300 px-5 text-body-small font-medium text-gray-700 transition-colors hover:border-black hover:text-black">
          <SlidersHorizontal size={15} strokeWidth={1.5} aria-hidden="true" />
          <span>Filter &amp; sort</span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: motionTokens.transition.enter }}
                exit={{ opacity: 0, transition: motionTokens.transition.exit }}
                className="fixed inset-0 z-50 bg-ink-deep/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              onOpenAutoFocus={(e) => {
                e.preventDefault()
                ;(e.currentTarget as HTMLElement)?.focus?.()
              }}
            >
              <motion.div
                tabIndex={-1}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={drawerVariants}
                className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl border-t border-line bg-white outline-none"
              >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-gutter">
                  <Dialog.Title className="text-h3 text-black">Filter &amp; sort</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="-mr-2.5 flex size-11 items-center justify-center text-black transition-opacity hover:opacity-70">
                      <X size={22} strokeWidth={1.5} aria-hidden="true" />
                      <span className="sr-only">Close filters</span>
                    </button>
                  </Dialog.Close>
                </div>
                
                <div className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain px-gutter py-8">
                  {FilterContent}
                </div>

                <div className="shrink-0 border-t border-line px-gutter py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="h-[52px] w-full rounded-full bg-black text-body font-medium text-white transition-colors hover:bg-gray-900 active:opacity-[0.86]"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
