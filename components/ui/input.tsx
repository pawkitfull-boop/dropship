"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border-2 bg-transparent px-4 text-body transition-colors",
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
Input.displayName = "Input"

export { Input }
