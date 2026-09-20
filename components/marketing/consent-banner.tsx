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
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-[60] border border-line bg-ink-raised/95 p-5 backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[24rem]"
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-h3 text-bone">Cookies</h3>
            <p className="text-body-small text-text-secondary">
              We use the cookies the site needs to work, plus optional analytics. Nothing is shared with advertising networks unless you accept.
            </p>
            <div className="flex gap-2.5 pt-1">
              <button 
                onClick={() => handleConsent(false)}
                className="h-11 flex-1 border border-line text-body-small text-text-secondary transition-colors hover:border-bone hover:text-text-primary"
              >
                Decline
              </button>
              <button 
                onClick={() => handleConsent(true)}
                className="h-11 flex-1 bg-bone text-body-small font-medium text-ink transition-colors hover:bg-paper"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
