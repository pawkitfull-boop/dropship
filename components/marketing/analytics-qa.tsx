"use client"

import * as React from "react"
import { AnalyticsEvent } from "@/lib/analytics/types"

export function AnalyticsQA() {
  const [events, setEvents] = React.useState<AnalyticsEvent[]>([])
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    // Check URL for ?qa=true
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("qa_mode") === "true") {
        localStorage.setItem("QA_MODE", "true")
      }
      if (localStorage.getItem("QA_MODE") === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsActive(true)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!isActive) return
    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setEvents(prev => [customEvent.detail, ...prev].slice(0, 50)) // Keep last 50
    }
    window.addEventListener("agy_analytics_qa", handleEvent)
    return () => window.removeEventListener("agy_analytics_qa", handleEvent)
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed top-20 right-4 w-80 max-h-[70vh] bg-ink-deep/95 backdrop-blur-md text-bone z-[100] border border-ember flex flex-col font-mono text-[10px] overflow-hidden shadow-2xl">
      <div className="bg-ember text-bone p-2 flex justify-between items-center font-bold">
        <span>ANALYTICS QA MODE</span>
        <button 
          onClick={() => {
            localStorage.removeItem("QA_MODE")
            setIsActive(false)
          }}
          className="hover:text-bone"
        >
          CLOSE
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {events.length === 0 && <p className="text-text-muted">Waiting for events...</p>}
        {events.map((ev, i) => (
          <div key={i} className="border border-linen/20 p-2 bg-black/50 break-words">
            <div className="text-ember font-bold mb-1">{ev.eventName}</div>
            <div className="text-text-muted mb-1">ID: {ev.eventId.split("-")[0]}...</div>
            <pre className="whitespace-pre-wrap text-bone/80">
              {JSON.stringify(ev.payload || {}, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
