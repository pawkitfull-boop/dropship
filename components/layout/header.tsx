"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ShoppingBag, Search, User } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { useCart } from "@/lib/commerce/cart-context"
import { MobileNav } from "./mobile-nav"
import { Wordmark } from "./wordmark"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { cartCount, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col shadow-sm">
      {/* Tier 1: Top Banner */}
      <div className="bg-[#cde4f0] py-2 px-4 flex items-center justify-center gap-4 text-center">
        <span className="text-sm font-medium text-black">Free Shipping on All Orders $75+</span>
        <Link href="/products/foldable-pet-hair-blow-dryer-bag" className="hidden sm:inline-flex bg-black text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide hover:bg-gray-800 transition-colors">
          SHOP NOW
        </Link>
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
          <Link href="/account" className="flex flex-col items-center gap-1 group hidden sm:flex">
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

