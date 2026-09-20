"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type CurrencyCode = "CAD" | "USD" | "EUR" | "GBP" | "AUD"

// Approximate exchange rates relative to CAD (Base currency)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  CAD: 1.0,
  USD: 0.74,
  EUR: 0.68,
  GBP: 0.58,
  AUD: 1.13,
}

// Formats for different locales
const LOCALES: Record<CurrencyCode, string> = {
  CAD: "en-CA",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
  AUD: "en-AU",
}

interface CurrencyContextType {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
  money: (amountInCAD: number) => string
  isHydrated: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("CAD")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred_currency") as CurrencyCode
      if (saved && EXCHANGE_RATES[saved]) {
        setCurrencyState(saved)
      }
    } catch (e) {
      // Ignore
    }
    setIsHydrated(true)
  }, [])

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c)
    try {
      localStorage.setItem("preferred_currency", c)
    } catch (e) {
      // Ignore
    }
  }

  const money = (amountInCAD: number) => {
    // If not hydrated, return CAD to prevent hydration mismatch
    const activeCurrency = isHydrated ? currency : "CAD"
    const rate = EXCHANGE_RATES[activeCurrency]
    const convertedAmount = amountInCAD * rate

    return new Intl.NumberFormat(LOCALES[activeCurrency], {
      style: "currency",
      currency: activeCurrency,
      minimumFractionDigits: 2,
    }).format(convertedAmount)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, money, isHydrated }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
