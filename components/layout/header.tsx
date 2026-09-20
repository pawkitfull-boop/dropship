"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ShoppingBag, Search, User } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { useCart } from "@/lib/commerce/cart-context"
import { MobileNav } from "./mobile-nav"
import { Wordmark } from "./wordmark"
import { cn } from "@/lib/utils"
import { CurrencySelector } from "@/components/layout/currency-selector"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { cartCount, openCart } = useCart()
  const headerRef = React.useRef<HTMLElement>(null)

  // Anything that needs to sit directly below the header (the hero's
  // above-the-fold height, sticky sub-bars) has to know how tall it
  // actually is. It varies with viewport: the banner wraps on narrow
  // screens and the icon labels only exist from md up.
  React.useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(entry.contentRect.height)}px`
      )
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full flex flex-col shadow-sm">
      {/* Tier 1: Top Banner */}
      <div className="bg-[#cde4f0] py-2 pl-4 pr-20 sm:pr-4 flex items-center justify-center gap-4 text-center relative">
        {/* The currency selector is absolutely pinned right, so the banner
            copy is shortened on phones rather than running underneath it. */}
        <span className="text-sm font-medium text-black sm:hidden">✨ Free Shipping on ALL Orders! 🚀</span>
        <span className="hidden text-sm font-medium text-black sm:inline">✨ Limited Time Only: Free Shipping on ALL Orders! 🚀</span>
        <Link href="/products/pawkitfull-airdry-bag" className="hidden sm:inline-flex bg-black text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide hover:bg-gray-800 transition-colors">
          SHOP NOW
        </Link>
        <div className="absolute right-4">
          <CurrencySelector />
        </div>
      </div>

      {/* Tier 2: Main Header (Black) */}
      <div className="bg-black text-white px-gutter py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <button
                className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
          </Dialog.Root>

          {/* Logo */}
          <Link
            href="/"
            aria-label="Perfect Pets — home"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          >
            <Wordmark />
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="flex items-center gap-6">
          <Link href="/search" className="flex flex-col items-center gap-1 group">
            <Search size={22} strokeWidth={2} className="text-white group-hover:text-gray-300 transition-colors" />
            <span className="text-[10px] font-bold tracking-wider text-white uppercase hidden md:block">Search</span>
          </Link>
          <Link href="/account" className="hidden flex-col items-center gap-1 group sm:flex">
            <User size={22} strokeWidth={2} className="text-white group-hover:text-gray-300 transition-colors" />
            <span className="text-[10px] font-bold tracking-wider text-white uppercase hidden md:block">Account</span>
          </Link>
          <button onClick={openCart} className="flex flex-col items-center gap-1 group relative">
            <div className="relative">
              <ShoppingBag size={22} strokeWidth={2} className="text-white group-hover:text-gray-300 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex size-[18px] items-center justify-center rounded-full bg-white text-[11px] font-bold text-black shadow-sm">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wider text-white uppercase hidden md:block">Cart</span>
          </button>
        </div>
      </div>
    </header>
  )
}

