"use client"

import * as React from "react"
import { useCurrency, CurrencyCode } from "@/lib/commerce/currency-context"

const currencies: { code: CurrencyCode; label: string }[] = [
  { code: "CAD", label: "CAD ($)" },
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "AUD", label: "AUD ($)" },
]

export function CurrencySelector() {
  const { currency, setCurrency, isHydrated } = useCurrency()

  if (!isHydrated) return <div className="w-[84px] h-[30px] animate-pulse bg-line/20 rounded-full"></div>

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="appearance-none bg-transparent pl-3 pr-7 py-1 text-xs font-semibold uppercase tracking-wider text-ink border border-line rounded-full hover:border-ink/50 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-1 transition-colors cursor-pointer"
        aria-label="Select currency"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
        <svg className="h-3 w-3 text-ink/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
