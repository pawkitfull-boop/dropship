"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border-2 bg-transparent px-4 py-3 text-body-small transition-colors",
          "border-line text-text-primary placeholder:text-text-muted",
          "hover:border-ink focus:border-ember",
          "[.on-lit_&]:border-line-on-lit [.on-lit_&]:text-text-on-lit [.on-lit_&]:placeholder:text-text-on-lit-muted",
          "[.on-lit_&]:hover:border-ink [.on-lit_&]:focus:border-ember",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-ember [.on-lit_&]:border-ember",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
