import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "xs" | "sm" | "md" | "lg"
  border?: "none" | "top" | "bottom" | "both"
  /** Lit surfaces are the deliberate reading/buying moments. */
  tone?: "ink" | "ink-deep" | "ink-raised" | "lit" | "lit-sunken" | "none"
  /** Content runs edge to edge; only the vertical rhythm is applied. */
  bleed?: boolean
  /** Wider than prose, narrower than full — for editorial blocks. */
  width?: "default" | "wide" | "narrow"
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing = "md",
      border = "none",
      tone = "none",
      bleed = false,
      width = "default",
      children,
      ...props
    },
    ref
  ) => {
    const isLit = tone === "lit" || tone === "lit-sunken"

    return (
      <section
        ref={ref}
        className={cn(
          "w-full",
          isLit && "on-lit",
          {
            "py-0": spacing === "none",
            "py-section-xs": spacing === "xs",
            "py-section-sm": spacing === "sm",
            "py-section-md": spacing === "md",
            "py-section-lg": spacing === "lg",
          },
          {
            "bg-surface text-text-primary": tone === "ink",
            "bg-surface-deep text-text-primary": tone === "ink-deep",
            "bg-surface-raised text-text-primary": tone === "ink-raised",
            "bg-surface-lit text-text-on-lit": tone === "lit",
            "bg-surface-lit-sunken text-text-on-lit": tone === "lit-sunken",
          },
          {
            "border-t": border === "top" || border === "both",
            "border-b": border === "bottom" || border === "both",
          },
          isLit ? "border-line-on-lit" : "border-line",
          className
        )}
        {...props}
      >
        {bleed ? (
          children
        ) : (
          <div
            className={cn("mx-auto px-gutter", {
              "max-w-[88rem]": width === "default",
              "max-w-[100rem]": width === "wide",
              "max-w-[64rem]": width === "narrow",
            })}
          >
            {children}
          </div>
        )}
      </section>
    )
  }
)
Section.displayName = "Section"

/** Shared padded container for use inside a `bleed` section. */
export function Container({
  className,
  width = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { width?: "default" | "wide" | "narrow" }) {
  return (
    <div
      className={cn(
        "mx-auto px-gutter",
        {
          "max-w-[88rem]": width === "default",
          "max-w-[100rem]": width === "wide",
          "max-w-[64rem]": width === "narrow",
        },
        className
      )}
      {...props}
    />
  )
}
