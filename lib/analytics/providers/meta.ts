import { AnalyticsProvider, AnalyticsEvent } from "../types"
import { sendMetaCAPI } from "@/app/actions/capi"

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

export const metaProvider: AnalyticsProvider = {
  name: "Meta",
  track: (event: AnalyticsEvent) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", event.eventName, event.payload, { eventID: event.eventId })
    }
    
    // Fire CAPI simultaneously. Meta deduplicates based on eventID
    sendMetaCAPI(event).catch(console.error)
  }
}
