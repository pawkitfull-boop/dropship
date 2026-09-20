import { AnalyticsEventName, EventPayload, AnalyticsEvent, AnalyticsProvider } from "./types"
import { getUtms } from "./utm"
import { metaProvider } from "./providers/meta"
import { tiktokProvider } from "./providers/tiktok"

const providers: AnalyticsProvider[] = [
  metaProvider,
  tiktokProvider
]

// Super simple UUID v4 generator for anonymous session tracking
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: string) =>
    (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
  )
}

export function trackEvent(eventName: AnalyticsEventName, payload?: EventPayload) {
  if (typeof window === "undefined") return

  const hasConsented = localStorage.getItem("agy_consent") === "granted"
  if (!hasConsented) return

  const event: AnalyticsEvent = {
    eventName,
    payload,
    eventId: uuidv4(),
    url: window.location.href,
    timestamp: Date.now(),
    utms: getUtms()
  }

  // Dispatch to all configured providers
  providers.forEach(p => p.track(event))

  // Dispatch to QA listener if active
  if (localStorage.getItem("QA_MODE") === "true") {
    window.dispatchEvent(new CustomEvent("agy_analytics_qa", { detail: event }))
  }
}
