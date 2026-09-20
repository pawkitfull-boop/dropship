"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"
import { NewsletterForm } from "@/components/marketing/newsletter-form"
import { usePathname } from "next/navigation"
import { motionTokens } from "@/lib/utils/motion"

const CAP_DAYS = 7
const CAP_MS = CAP_DAYS * 24 * 60 * 60 * 1000

export function NewsletterModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    // 1. Never fire on cart, checkout, or the guide page itself
    const blocklist = ["/cart", "/checkout", "/guide"]
    if (blocklist.includes(pathname)) return

    // 2. Frequency cap (time-based re-entry)
    const capExpiry = localStorage.getItem("newsletterModalExpiry")
    if (capExpiry && parseInt(capExpiry, 10) > Date.now()) {
      return
    }

    // 3. Triggers: 30s Time on page OR Exit intent (desktop)
    // We avoid scroll listeners to prevent thrashing the main thread.
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 30000)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) { // Mouse moved off the top of the viewport
        setIsOpen(true)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [pathname])

  const closeAndCap = () => {
    setIsOpen(false)
    localStorage.setItem("newsletterModalExpiry", (Date.now() + CAP_MS).toString())
  }

  // Responsive motion variants: Bottom sheet on mobile, centered modal on desktop
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: motionTokens.transition.enter },
    exit: { opacity: 0, transition: motionTokens.transition.exit }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => {
      if (!open) closeAndCap()
    }}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                className="fixed inset-0 z-[100] bg-ink-deep/75 backdrop-blur-sm"
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
                initial={{ 
                  opacity: 0, 
                  x: "-50%",
                  y: typeof window !== 'undefined' && window.innerWidth >= 768 ? "-50%" : "100%",
                  top: typeof window !== 'undefined' && window.innerWidth >= 768 ? "50%" : "auto",
                  bottom: typeof window !== 'undefined' && window.innerWidth >= 768 ? "auto" : "0%"
                }}
                animate={{ 
                  opacity: 1, 
                  x: "-50%",
                  y: typeof window !== 'undefined' && window.innerWidth >= 768 ? "-50%" : "0%",
                  top: typeof window !== 'undefined' && window.innerWidth >= 768 ? "50%" : "auto",
                  bottom: typeof window !== 'undefined' && window.innerWidth >= 768 ? "auto" : "0%",
                  transition: shouldReduceMotion ? { duration: 0 } : motionTokens.transition.enter
                }}
                exit={{ 
                  opacity: 0, 
                  x: "-50%",
                  y: typeof window !== 'undefined' && window.innerWidth >= 768 ? "-48%" : "100%",
                  transition: shouldReduceMotion ? { duration: 0 } : motionTokens.transition.exit
                }}
                className="fixed left-[50%] z-[100] w-full overflow-hidden border-t border-line bg-ink outline-none pb-[env(safe-area-inset-bottom)] md:w-[90vw] md:max-w-lg md:border"
                style={{
                  maxHeight: "90vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header / Close */}
                <div className="absolute top-0 right-0 p-4 z-10">
                  <Dialog.Close asChild>
                    <button className="flex size-11 items-center justify-center text-text-muted transition-colors hover:text-text-primary">
                      <X size={20} strokeWidth={1.5} aria-hidden="true" />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </Dialog.Close>
                </div>

                <div className="overflow-y-auto px-gutter pb-8 pt-6 md:p-10">
                  {/* Handle for bottom sheet on mobile */}
                  <div className="mx-auto mb-6 h-1 w-10 bg-line md:hidden" aria-hidden="true" />
                  
                  <div>
                    <p className="text-mono-caption mb-4 text-text-muted">Free guide</p>
                    <Dialog.Title className="text-h1 text-bone">The five-minute evening reset.</Dialog.Title>
                    <p className="measure mt-4 text-body text-text-secondary">
                      A short sequence for putting the working day down. Sent the moment you subscribe.
                    </p>
                  </div>
                  
                  <div className="mt-7">
                    <NewsletterForm location="modal" onSuccess={closeAndCap} />
                  </div>
                  
                  <button 
                    onClick={closeAndCap}
                    className="mt-6 flex h-11 items-center text-body-small text-text-muted underline decoration-line underline-offset-4 transition-colors hover:text-text-primary"
                  >
                    No thanks
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
