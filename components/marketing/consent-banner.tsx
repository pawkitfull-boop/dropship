"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ConsentBanner() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (!localStorage.getItem("agy_consent")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true)
    }
  }, [])

  const handleConsent = (granted: boolean) => {
    localStorage.setItem("agy_consent", granted ? "granted" : "denied")
    setShow(false)
    if (granted) {
      // Initialize pixels in place without reloading
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fbq = (window as any).fbq
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ttq = (window as any).ttq

        if (fbq) {
          fbq('init', process.env.NEXT_PUBLIC_META_PIXEL_ID || '')
          fbq('track', 'PageView')
        }
        
        if (ttq) {
          ttq.load(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '')
          ttq.page()
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-ink-deep/95 px-4 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] backdrop-blur-md sm:px-6 md:py-4 md:pb-4"
        >
          <div className="mx-auto flex max-w-[88rem] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-body-small text-bone/80">
              We use cookies to improve your experience and personalize our marketing.{" "}
              <a href="/policies/privacy" className="text-bone underline underline-offset-2 transition-colors hover:text-white">
                Learn more
              </a>
              .
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button 
                onClick={() => handleConsent(false)}
                className="h-9 px-4 text-body-small font-medium text-bone/70 transition-colors hover:text-white"
              >
                Decline
              </button>
              <button 
                onClick={() => handleConsent(true)}
                className="inline-flex h-9 items-center justify-center rounded-full bg-bone px-6 text-body-small font-medium text-ink transition-colors hover:bg-white"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
