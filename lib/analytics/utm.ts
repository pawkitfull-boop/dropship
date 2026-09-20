"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

export function getUtms(): Record<string, string | null> {
  if (typeof window === "undefined") return {}
  
  try {
    const stored = sessionStorage.getItem("agy_utms")
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {}
  
  return {}
}

export function UtmTracker() {
  const searchParams = useSearchParams()

  React.useEffect(() => {
    if (!searchParams) return
    
    let hasUtm = false
    const currentUtms: Record<string, string | null> = {}
    
    UTM_KEYS.forEach(key => {
      const val = searchParams.get(key)
      if (val) {
        hasUtm = true
        currentUtms[key] = val
      }
    })

    if (hasUtm) {
      sessionStorage.setItem("agy_utms", JSON.stringify(currentUtms))
      // Can also sync to cookies if needed for server-side
      document.cookie = `agy_utms=${encodeURIComponent(JSON.stringify(currentUtms))}; path=/; max-age=2592000; SameSite=Lax`
    }
  }, [searchParams])

  return null
}
