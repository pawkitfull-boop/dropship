export type AnalyticsEventName = 
  | "PageView" 
  | "ViewContent" 
  | "AddToCart" 
  | "InitiateCheckout" 
  | "Purchase" 
  | "Lead" 
  | "Search"

export interface BasePayload {
  currency?: string
  value?: number
  content_name?: string
  content_ids?: string[]
  content_type?: string
}

export type ViewContentPayload = BasePayload
export type AddToCartPayload = BasePayload
export interface InitiateCheckoutPayload extends BasePayload {
  num_items?: number
}
export interface PurchasePayload extends BasePayload {
  transaction_id: string
}
export interface LeadPayload {
  content_name?: string
}
export interface SearchPayload {
  search_string: string
}

export type EventPayload = 
  | BasePayload 
  | ViewContentPayload 
  | AddToCartPayload 
  | InitiateCheckoutPayload 
  | PurchasePayload 
  | LeadPayload 
  | SearchPayload

export interface AnalyticsEvent {
  eventName: AnalyticsEventName
  payload?: EventPayload
  eventId: string
  url: string
  timestamp: number
  utms: Record<string, string | null>
}

export interface AnalyticsProvider {
  name: string
  init?: () => void
  track: (event: AnalyticsEvent) => void
}
