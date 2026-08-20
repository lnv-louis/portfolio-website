"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"

import { pvStyles } from "@/components/pdf-viewer.stylex"
import { cn } from "@/lib/utils"

const INLINE_THUMBNAIL_SIDEBAR_MIN_WIDTH = 768

export function useElementWidth<TElement extends HTMLElement>() {
  const ref = React.useRef<TElement | null>(null)
  const [width, setWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const updateWidth = () => {
      const nextWidth = element.getBoundingClientRect().width

      // Keep the last real measurement while the element is hidden or
      // detached (keep-alive preview pools, display:none ancestors): a
      // zero-width pass would re-lay-out the viewer for nothing, clearing
      // its rendered canvases, and force a blank-then-repaint flash when
      // the element comes back at its old size.
      if (nextWidth === 0) return
      setWidth(nextWidth)
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return [ref, width] as const
}

export function useInlineThumbnailSidebar(width: number) {
  return width >= INLINE_THUMBNAIL_SIDEBAR_MIN_WIDTH
}

export function DocumentViewerThumbnailSidebar({
  children,
  className,
  inline,
  open,
}: {
  children: React.ReactNode
  className?: string
  inline: boolean
  open: boolean
}) {
  const [transitionsReady, setTransitionsReady] = React.useState(false)
  const shouldAnimateSidebar = transitionsReady && open

  React.useEffect(() => {
    let secondFrameId = 0
    const firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        setTransitionsReady(true)
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrameId)
      window.cancelAnimationFrame(secondFrameId)
    }
  }, [])

  const sidebarSx = stylex.props(
    pvStyles.sidebar,
    pvStyles.sidebarWidth,
    !inline && pvStyles.sidebarShadow,
    shouldAnimateSidebar
      ? pvStyles.sidebarTransition
      : pvStyles.sidebarNoTransition,
    inline && pvStyles.sidebarInline,
    open
      ? pvStyles.sidebarOpen
      : inline
        ? pvStyles.sidebarClosedInline
        : pvStyles.sidebarClosedOverlay,
  )

  return (
    <aside
      data-document-thumbnail-sidebar=""
      data-sidebar-mode={inline ? "inline" : "overlay"}
      data-sidebar-open={open ? "true" : "false"}
      {...sidebarSx}
      className={cn(sidebarSx.className, className)}
    >
      {children}
    </aside>
  )
}

export function DocumentViewerSidebarSkeleton({
  className,
  inline,
}: {
  className?: string
  inline: boolean
}) {
  if (!inline) return null

  const sxProps = stylex.props(pvStyles.skeleton)

  return (
    <div {...sxProps} className={cn(sxProps.className, className)}>
      <div {...stylex.props(pvStyles.skeletonThumb)}>
        <div {...stylex.props(pvStyles.skeletonThumbInner)} />
      </div>
      <div {...stylex.props(pvStyles.skeletonLabel)} />
    </div>
  )
}
