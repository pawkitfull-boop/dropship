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
          initial={{ y: "120%", opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: "120%", opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
          className="fixed bottom-4 left-4 right-4 z-[60] rounded-2xl border border-line/20 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[340px]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface">
                <svg className="h-4 w-4 text-ink/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                We use cookies to improve your experience and personalize marketing.{" "}
                <a href="/policies/privacy" className="font-medium text-ink underline decoration-line underline-offset-2 transition-colors hover:decoration-ink">
                  Learn more
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleConsent(true)}
                className="flex-1 rounded-xl bg-ink py-2.5 text-sm font-medium text-bone transition-colors hover:bg-ink/90"
              >
                Accept All
              </button>
              <button 
                onClick={() => handleConsent(false)}
                className="flex-1 rounded-xl border border-line bg-transparent py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-ink"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
