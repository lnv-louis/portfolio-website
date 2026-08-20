"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { scrollAreaStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  const sxProps = stylex.props(styles.root)

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        {...stylex.props(styles.viewport)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  const sxProps = stylex.props(
    styles.scrollbar,
    orientation === "vertical"
      ? styles.scrollbarVertical
      : styles.scrollbarHorizontal,
  )

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        {...stylex.props(styles.thumb)}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
