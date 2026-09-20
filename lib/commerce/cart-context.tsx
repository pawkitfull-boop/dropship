"use client"

import * as React from "react"
// CartItem defined locally

export interface CartItem {
  id: string // Unique ID for the cart line item (e.g. variantId)
  productHandle: string
  productTitle: string
  variantTitle: string
  variantId: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  isHydrated: boolean
  isOpen: boolean
  isLoading: boolean
  error: string | null
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  undoRemove: () => void
  /** True only while a just-removed line can still be restored. */
  canUndo: boolean
  updateQuantity: (id: string, quantity: number) => void
  openCart: () => void
  closeCart: () => void
  checkout: () => Promise<void>
  cartTotal: number
  cartCount: number
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  // Track last removed item for undo functionality
  const [lastRemoved, setLastRemoved] = React.useState<{ item: CartItem, index: number } | null>(null)

  // Load from local storage safely
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("cart")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // Basic validation to ensure it looks like a cart item
          const validItems = parsed.filter(item => 
            item && typeof item === 'object' && 'id' in item && 'quantity' in item && 'price' in item
          )
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(validItems)
        }
      }
    } catch {
      console.warn("Failed to load cart from storage. Corrupt JSON ignored.")
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Persist to local storage
  React.useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem("cart", JSON.stringify(items))
    } catch {
      console.warn("Failed to save cart to storage")
    }
  }, [items, isHydrated])

  const addItem = React.useCallback((newItem: Omit<CartItem, "id">) => {
    setError(null)
    setItems(current => {
      const existing = current.find(item => item.variantId === newItem.variantId)
      if (existing) {
        return current.map(item => 
          item.variantId === newItem.variantId 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...current, { ...newItem, id: newItem.variantId }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = React.useCallback((id: string) => {
    setItems(current => {
      const index = current.findIndex(item => item.id === id)
      if (index !== -1) {
        setLastRemoved({ item: current[index], index })
      }
      return current.filter(item => item.id !== id)
    })
  }, [])

  const undoRemove = React.useCallback(() => {
    if (!lastRemoved) return
    setItems(current => {
      const newItems = [...current]
      newItems.splice(lastRemoved.index, 0, lastRemoved.item)
      return newItems
    })
    setLastRemoved(null)
  }, [lastRemoved])

  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems(current => 
      current.map(item => item.id === id ? { ...item, quantity } : item)
    )
  }, [removeItem])

  const openCart = React.useCallback(() => setIsOpen(true), [])
  const closeCart = React.useCallback(() => setIsOpen(false), [])

  const checkout = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Defer to the commerce adapter for checkout handoff
      const { createCheckout } = await import('@/lib/commerce/checkout-api')
      const checkoutUrl = await createCheckout(items)
      
      // Handoff to live Shopify/Stripe URL
      // We do NOT clear the cart here. A web hook or successful return will clear it.
      window.location.href = checkoutUrl
    } catch {
      setError("Network failure. Please try again.")
      setIsLoading(false)
    }
  }, [items])

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  const value = React.useMemo(() => ({
    items,
    isHydrated,
    isOpen,
    isLoading,
    error,
    addItem,
    removeItem,
    undoRemove,
    canUndo: lastRemoved !== null,
    updateQuantity,
    openCart,
    closeCart,
    checkout,
    cartTotal,
    cartCount
  }), [items, isHydrated, isOpen, isLoading, error, addItem, removeItem, undoRemove, lastRemoved, updateQuantity, openCart, closeCart, checkout, cartTotal, cartCount])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
