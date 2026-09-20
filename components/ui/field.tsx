"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function FieldGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  )
}

export function FieldDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-caption text-text-muted [.on-lit_&]:text-text-on-lit-muted", className)}
      {...props}
    />
  )
}

export function FieldError({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!props.children) return null
  return (
    <p
      className={cn("text-caption font-medium text-ember", className)}
      {...props}
    />
  )
}
