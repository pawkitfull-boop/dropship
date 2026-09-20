"use client"

import * as React from "react"
import { ImageAsset } from "@/lib/commerce/types"
import { Image as CustomImage } from "@/components/ui/image"
import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

export function Gallery({ images }: { images: ImageAsset[] }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scrollTo = (index: number) => {
    setSelectedIndex(index)
    if (scrollRef.current) {
      const el = scrollRef.current
      const itemWidth = el.scrollWidth / images.length
      el.scrollTo({ left: itemWidth * index, behavior: "smooth" })
    }
  }

  const handleScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const el = scrollRef.current
      const itemWidth = el.scrollWidth / images.length
      const newIndex = Math.round(el.scrollLeft / itemWidth)
      if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < images.length) {
        setSelectedIndex(newIndex)
      }
    }
  }, [selectedIndex, images.length])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      const newIndex = Math.max(0, selectedIndex - 1)
      scrollTo(newIndex)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      const newIndex = Math.min(images.length - 1, selectedIndex + 1)
      scrollTo(newIndex)
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center bg-ink-raised md:aspect-[4/5]">
        <span className="text-mono-caption text-text-muted">No image available</span>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-3 md:flex-row-reverse md:gap-4">
      {/* Main Stage */}
      <div className="flex-1 min-w-0 relative group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="hide-scrollbar relative flex aspect-square snap-x snap-mandatory overflow-x-auto bg-ink-raised"
          tabIndex={0}
          role="region"
          aria-label="Image gallery. Use left and right arrows to navigate."
          aria-roledescription="carousel"
        >
          {images.map((image, i) => (
            <div 
              key={i} 
              className="flex-none w-full h-full snap-center relative"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <CustomImage 
                src={image.url}
                alt={image.altText || `Product image ${i + 1}`}
                aspectRatio="auto"
                preload={i === 0}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Swipe Affordance (Mobile) */}
        <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 bg-ink-deep/70 px-3 py-2 backdrop-blur-md">
            {images.map((_, i) => (
              <div 
                key={i}
                className={cn("h-1 transition-all duration-300", selectedIndex === i ? "w-5 bg-bone" : "w-1.5 bg-bone/35")}
              />
            ))}
          </div>
        </div>

        {/* Counter (Mobile Desktop) */}
        <div className="text-mono-caption pointer-events-none absolute bottom-4 right-4 hidden bg-ink-deep/75 px-2.5 py-1.5 text-bone backdrop-blur-sm md:flex">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Zoom Button */}
        <button 
          onClick={() => setIsLightboxOpen(true)}
          className="absolute right-4 top-4 flex size-11 items-center justify-center bg-ink-deep/75 text-bone opacity-0 backdrop-blur-sm transition-opacity hover:bg-ink-deep focus-visible:opacity-100 group-hover:opacity-100"
          aria-label="Open full screen view"
        >
          <ZoomIn size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      {/* Thumbnails Rail */}
      <div 
        className="hide-scrollbar flex w-full gap-2 overflow-x-auto md:w-[4.5rem] md:flex-col md:overflow-y-auto"
        role="tablist"
        aria-label="Product thumbnails"
      >
        {images.map((image, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={selectedIndex === i}
            aria-controls={`gallery-panel-${i}`}
            id={`gallery-tab-${i}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "relative size-16 flex-none overflow-hidden border bg-ink-raised transition-colors md:size-[4.5rem]",
              selectedIndex === i ? "border-bone" : "border-line hover:border-text-muted"
            )}
            aria-label={`View image ${i + 1}: ${image.altText || 'Thumbnail'}`}
          >
            <CustomImage 
              src={image.url}
              alt=""
              aspectRatio="auto"
              className={cn("transition-opacity", selectedIndex === i ? "opacity-100" : "opacity-55 hover:opacity-85")}
            />
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog.Root open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-deep/97 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 outline-none">
            <Dialog.Close asChild>
              <button className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center border border-line text-bone transition-colors hover:border-bone md:right-8 md:top-8">
                <X size={22} strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">Close full screen</span>
              </button>
            </Dialog.Close>

            <button 
              className="absolute left-4 md:left-8 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-line bg-ink-deep/70 text-bone transition-colors hover:border-bone disabled:opacity-25"
              onClick={() => {
                const newIndex = Math.max(0, selectedIndex - 1)
                scrollTo(newIndex)
              }}
              disabled={selectedIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button 
              className="absolute right-4 md:right-8 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-line bg-ink-deep/70 text-bone transition-colors hover:border-bone disabled:opacity-25"
              onClick={() => {
                const newIndex = Math.min(images.length - 1, selectedIndex + 1)
                scrollTo(newIndex)
              }}
              disabled={selectedIndex === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <div className="w-full max-w-5xl max-h-[85vh] relative flex items-center justify-center">
              <CustomImage 
                src={images[selectedIndex]?.url || ""}
                alt={images[selectedIndex]?.altText || `Zoomed image ${selectedIndex + 1}`}
                aspectRatio="auto"
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              />
            </div>
            
            {/* Lightbox indicator */}
            <div className="text-mono-caption absolute bottom-8 left-1/2 -translate-x-1/2 border border-line bg-ink-deep/80 px-4 py-2 text-bone">
              {selectedIndex + 1} of {images.length}
            </div>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}
