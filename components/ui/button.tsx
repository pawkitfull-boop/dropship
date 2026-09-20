import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

/**
 * Premium D2C Wellness Button
 * Soft rounded corners, diffuse shadows, and gentle hover lifts.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "onLit" | "ember" | "outline" | "outlineLit" | "ghost" | "secondary" | "checkout"
  size?: "default" | "sm" | "lg" | "xl" | "icon"
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", isLoading, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        data-loading={isLoading ? "" : undefined}
        className={cn(
          "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap",
          "font-sans font-bold tracking-tight rounded-full uppercase",
          // Feedback includes a gentle lift and shadow expansion
          "transition-all duration-[var(--duration-feedback)] ease-out",
          "hover:-translate-y-[2px] active:translate-y-[1px]",
          "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:translate-y-0",
          {
            "bg-black text-white shadow-md hover:shadow-xl hover:bg-gray-800": variant === "primary" || variant === "onLit",
            // `checkout` is the strongest action, using the vibrant brand color
            "bg-[#00c881] text-white shadow-md hover:shadow-xl hover:bg-[#00a66b]": variant === "checkout" || variant === "ember",
            "border-2 border-gray-200 bg-transparent text-black hover:border-black":
              variant === "outline" || variant === "secondary",
            "border-2 border-gray-100 bg-transparent text-black hover:border-black hover:bg-black/5":
              variant === "outlineLit",
            "bg-transparent text-black hover:bg-gray-100": variant === "ghost",
          },
          {
            "h-12 px-8 text-sm": size === "default",
            "h-10 px-6 text-xs": size === "sm",
            "h-14 px-10 text-base": size === "lg",
            "h-16 px-12 text-lg": size === "xl",
            "size-12 px-0": size === "icon",
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
