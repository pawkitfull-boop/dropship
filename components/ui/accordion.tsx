"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-line [.on-lit_&]:border-line-on-lit", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-6 py-5 text-left text-text-primary transition-opacity hover:opacity-70 [.on-lit_&]:text-text-on-lit [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      <Plus
        className="size-[18px] shrink-0 text-text-muted transition-transform duration-[var(--duration-enter)] ease-[var(--ease-enter)] [.on-lit_&]:text-text-on-lit-muted motion-reduce:transition-none"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("measure pb-6 pt-0 text-text-secondary [.on-lit_&]:text-text-on-lit-secondary", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
