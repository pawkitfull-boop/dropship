"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

import { motionTokens } from "@/lib/utils/motion"

interface StickyCartProps {
  isVisible: boolean
  price: string
  title: string
  onAdd: () => void
}

export function StickyCart({ isVisible, price, title, onAdd }: StickyCartProps) {
  const shouldReduceMotion = useReducedMotion()

  const stickyVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: "110%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: motionTokens.transition.enter,
    },
    exit: shouldReduceMotion
      ? { opacity: 0, transition: motionTokens.transition.exit }
      : { y: "110%", transition: motionTokens.transition.exit },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={stickyVariants}
          className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl bg-bone/95 px-gutter pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] backdrop-blur-xl md:hidden"
        >
          {/* One row: what it is, what it costs, and the action — so the
              bar never takes more of the screen than it earns. */}
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-small font-semibold text-ink-deep">{title}</p>
              <p className="font-mono text-body-small text-text-muted tabular-nums">{price}</p>
            </div>
            <Button onClick={onAdd} variant="checkout" className="shrink-0 px-8 py-6 text-base">
              Add to cart
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
