"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { X, ArrowRight } from "lucide-react"
import { Image as CustomImage } from "@/components/ui/image"
import { durations, easings } from "@/lib/utils/motion"

interface MobileNavProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SUPPORT = [
  { href: "/track-order", label: "Track order" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/guarantee", label: "Guarantee" },
  { href: "/policies/returns", label: "Returns" },
]

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  const reduce = useReducedMotion()
  const close = () => setIsOpen(false)

  const panel = {
    hidden: reduce ? { opacity: 0 } : { x: "-100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.enter, ease: easings.enter },
    },
    exit: reduce
      ? { opacity: 0, transition: { duration: durations.exit } }
      : { x: "-100%", transition: { duration: durations.exit, ease: easings.exit } },
  }

  // Primary destinations stagger in behind the panel. 40ms apart —
  // enough to read as sequence, fast enough never to feel slow.
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: durations.enter, ease: easings.enter, delay: 0.08 + i * 0.04 },
        }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: durations.enter } }}
              exit={{ opacity: 0, transition: { duration: durations.exit } }}
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
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 flex w-full max-w-[26rem] flex-col bg-ink outline-none"
            >
              <Dialog.Title className="sr-only">Menu</Dialog.Title>

              <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-gutter pt-[env(safe-area-inset-top,0px)]">
                <span className="text-mono-caption text-text-muted">Menu</span>
                <Dialog.Close asChild>
                  <button
                    className="-mr-2.5 flex size-11 items-center justify-center text-text-primary transition-opacity hover:opacity-70"
                    aria-label="Close menu"
                  >
                    <X size={22} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain">
                <nav aria-label="Primary" className="px-gutter pb-10 pt-8">
                  {/* Primary destinations, set at display scale so the
                      menu has the same typographic voice as the site. */}
                  <ul className="flex flex-col">
                    {[
                      { href: "/products/pawkitfull-airdry-bag", label: "Shop Now" },
                      { href: "/about", label: "Our story" },
                    ].map((l, i) => (
                      <motion.li key={l.href} {...item(i)} className="border-b border-line-soft">
                        <Link
                          href={l.href}
                          onClick={close}
                          className="group flex items-center justify-between py-4 text-h2 text-text-primary"
                        >
                          {l.label}
                          <ArrowRight
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="translate-x-0 text-text-muted transition-transform duration-[var(--duration-enter)] ease-[var(--ease-enter)] group-hover:translate-x-1"
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Featured — a menu that merchandises rather than just lists. */}
                  <motion.div {...item(2)} className="mt-10">
                    <Link
                      href="/products/pawkitfull-airdry-bag"
                      onClick={close}
                      className="group relative block overflow-hidden"
                    >
                      <CustomImage
                        src="/images/white-dog.jpg"
                        alt="PawKitFull AirDry+"
                        aspectRatio="landscape"
                        sizes="(max-width: 420px) 100vw, 420px"
                        zoomOnHover
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/90 to-transparent p-5 pt-16">
                        <p className="text-mono-caption mb-1.5 text-text-muted">Start here</p>
                        <p className="text-h3 text-bone">PawKitFull AirDry+</p>
                        <p className="text-sm text-bone-muted mt-1">From $34.99</p>
                      </div>
                    </Link>
                  </motion.div>

                  <motion.div {...item(6)} className="mt-10 border-t border-line pt-8">
                    <h2 className="text-mono-caption mb-4 text-text-muted">Support</h2>
                    <ul className="grid grid-cols-2 gap-x-4">
                      {SUPPORT.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={close}
                            className="flex h-11 items-center text-body text-text-secondary transition-colors hover:text-text-primary"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  )
}
