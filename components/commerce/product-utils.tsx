"use client"

import * as React from "react"
import { Star, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Star Rating ---
export function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("w-4 h-4", star <= rating ? "fill-midnight text-text-primary" : "text-text-primary/20")}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-mono-caption text-text-muted">({count})</span>
      )}
    </div>
  )
}

// --- Quantity Stepper ---
interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantityStepper({ value, onChange, min = 1, max = 99 }: QuantityStepperProps) {
  const decrease = () => value > min && onChange(value - 1)
  const increase = () => value < max && onChange(value + 1)

  return (
    <div className="flex shrink-0 items-center border-2 border-gray-200 rounded-full h-14 overflow-hidden">
      <button
        onClick={decrease}
        disabled={value <= min}
        className="flex h-full w-12 items-center justify-center text-black transition-colors hover:bg-gray-100 disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
      <div className="flex h-full w-12 items-center justify-center text-black font-bold text-lg" aria-live="polite" aria-atomic="true">
        <span className="sr-only">Quantity: </span>
        {value}
      </div>
      <button
        onClick={increase}
        disabled={value >= max}
        className="flex h-full w-12 items-center justify-center text-black transition-colors hover:bg-gray-100 disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}

// --- Reviews ---
export interface ReviewData {
  id: string
  author: string
  rating: number
  date: string
  content: string
}

export function Reviews({ reviews }: { reviews?: ReviewData[] }) {
  if (!reviews || reviews.length === 0) {
    // "No component may imply urgency, scarcity or social proof that is not real... renders nothing at all when there is none."
    return null
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="border-t border-line pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <StarRating rating={review.rating} />
            <span className="text-mono-caption text-text-muted">{review.date}</span>
          </div>
          <p className="text-body font-medium">{review.author}</p>
          <p className="text-body text-text-muted">{review.content}</p>
        </div>
      ))}
    </div>
  )
}
