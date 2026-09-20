"use server"

import { AnalyticsEvent } from "@/lib/analytics/types"
import { cookies, headers } from "next/headers"

export async function sendMetaCAPI(event: AnalyticsEvent) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const CAPI_TOKEN = process.env.META_CAPI_TOKEN
  
  if (!PIXEL_ID || !CAPI_TOKEN) {
    return { success: false, reason: "Missing credentials" }
  }

  const cookieStore = await cookies()
  const fbp = cookieStore.get("_fbp")?.value
  const fbc = cookieStore.get("_fbc")?.value

  const headerStore = await headers()
  const userAgent = headerStore.get("user-agent") || ""
  const clientIpAddress = headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip") || ""

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(event.timestamp / 1000),
        action_source: "website",
        event_id: event.eventId,
        event_source_url: event.url,
        user_data: {
          client_ip_address: clientIpAddress,
          client_user_agent: userAgent,
          fbp: fbp,
          fbc: fbc,
        },
        custom_data: {
          ...event.payload,
          ...event.utms
        }
      }
    ]
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error("[CAPI Error]", errorText)
      return { success: false, error: errorText }
    }
    
    return { success: true }
  } catch (err) {
    console.error("[CAPI Error]", err)
    return { success: false }
  }
}
