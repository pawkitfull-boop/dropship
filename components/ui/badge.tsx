import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 text-mono-caption transition-colors",
        {
          "border-transparent bg-ink-raised text-bone": variant === "default",
          "border-transparent bg-ink-raised text-text-primary": variant === "secondary",
        },
        className
      )}
      {...props}
    />
  )
}

