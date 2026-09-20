"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

export function RouteFocus() {
  const pathname = usePathname()
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    
    const main = document.getElementById("main-content")
    if (main) {
      main.focus({ preventScroll: true })
    }
  }, [pathname])

  return null
}
