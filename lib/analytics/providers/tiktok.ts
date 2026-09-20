import { AnalyticsProvider, AnalyticsEvent } from "../types"

declare global {
  interface Window {
    ttq: { track: (event: string, data?: Record<string, unknown>) => void; load: (id: string) => void; page: () => void; [key: string]: unknown }
  }
}

// Map standard events to TikTok events
const ttEventMap: Record<string, string> = {
  "PageView": "Pageview",
  "ViewContent": "ViewContent",
  "AddToCart": "AddToCart",
  "InitiateCheckout": "InitiateCheckout",
  "Purchase": "CompletePayment",
  "Lead": "Subscribe",
  "Search": "Search"
}

export const tiktokProvider: AnalyticsProvider = {
  name: "TikTok",
  track: (event: AnalyticsEvent) => {
    if (typeof window !== "undefined" && window.ttq) {
      const ttEventName = ttEventMap[event.eventName] || event.eventName
      window.ttq.track(ttEventName, {
        ...event.payload,
        event_id: event.eventId 
      })
    }
  }
}
