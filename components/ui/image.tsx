"use client"

import * as React from "react"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ImageProps extends Omit<NextImageProps, "alt"> {
  alt: string
  aspectRatio?: "square" | "video" | "portrait" | "tall" | "landscape" | "wide" | "auto"
  /** Slow scale on hover of the nearest `.group`. Transform only. */
  zoomOnHover?: boolean
  fallbackText?: string
}

const RATIO: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  tall: "aspect-[2/3]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
}

/**
 * Wraps `next/image` so every call site declares a frame, and the
 * image always fills that frame. Reserving the box in CSS is what
 * keeps CLS at zero — nothing here measures or waits for the asset.
 */
export function Image({
  className,
  aspectRatio = "auto",
  alt,
  zoomOnHover = false,
  fallbackText,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: ImageProps) {
  const [failed, setFailed] = React.useState(false)
  const ratioClass = RATIO[aspectRatio] ?? ""

  if (failed || !props.src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-50",
          ratioClass || "absolute inset-0 size-full",
          className
        )}
      >
        <span className="text-mono-caption px-4 text-center text-text-muted">
          {fallbackText ?? alt}
        </span>
      </div>
    )
  }

  const img = (
    <NextImage
      alt={alt}
      sizes={sizes}
      fill
      onError={() => setFailed(true)}
      className={cn(
        "object-cover",
        zoomOnHover &&
          "transition-transform duration-[1200ms] ease-[var(--ease-enter)] will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        !ratioClass && className
      )}
      {...props}
    />
  )

  // With a declared ratio the component owns its own box; without one
  // it fills whatever positioned parent the caller has already set up.
  if (!ratioClass) return img

  return (
    <div className={cn("relative w-full overflow-hidden bg-gray-50", ratioClass, className)}>
      {img}
    </div>
  )
}
