"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type CurrencyCode = "CAD" | "USD" | "EUR" | "GBP" | "AUD" | string

// Formats for different locales
const LOCALES: Record<string, string> = {
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

export function CurrencyProvider({ children, initialCurrency }: { children: ReactNode, initialCurrency?: CurrencyCode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency || "CAD")
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Default static rates as fallback
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    CAD: 1.0,
    USD: 0.74,
    EUR: 0.68,
    GBP: 0.58,
    AUD: 1.13,
  })

  // Fetch live exchange rates
  useEffect(() => {
    async function fetchRates() {
      try {
        const cachedRates = localStorage.getItem("exchange_rates")
        const cachedTimestamp = localStorage.getItem("exchange_rates_timestamp")
        
        // Cache for 1 hour (3600000 ms)
        if (cachedRates && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < 3600000) {
          setExchangeRates(JSON.parse(cachedRates))
        } else {
          const res = await fetch("https://open.er-api.com/v6/latest/CAD")
          const data = await res.json()
          if (data && data.rates) {
            setExchangeRates(data.rates)
            localStorage.setItem("exchange_rates", JSON.stringify(data.rates))
            localStorage.setItem("exchange_rates_timestamp", Date.now().toString())
          }
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error)
      }
    }
    
    fetchRates()
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred_currency") as CurrencyCode
      if (saved) {
        setCurrencyState(saved)
      } else if (initialCurrency) {
        // If no localStorage but middleware passed one, use it
        setCurrencyState(initialCurrency)
      }
    } catch (e) {
      // Ignore
    }
    setIsHydrated(true)
  }, [initialCurrency])

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c)
    try {
      localStorage.setItem("preferred_currency", c)
      // Also write cookie so middleware knows
      document.cookie = `preferred_currency=${c}; path=/; max-age=31536000; samesite=lax`
    } catch (e) {
      // Ignore
    }
  }

  const money = (amountInCAD: number) => {
    // If not hydrated, use initialCurrency or CAD to prevent hydration mismatch
    const activeCurrency = isHydrated ? currency : (initialCurrency || "CAD")
    const rate = exchangeRates[activeCurrency] || 1.0
    const convertedAmount = amountInCAD * rate

    return new Intl.NumberFormat(LOCALES[activeCurrency] || "en-US", {
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
