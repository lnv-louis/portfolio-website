"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { separatorStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  const sxProps = stylex.props(
    styles.base,
    orientation === "horizontal" ? styles.horizontal : styles.vertical,
  )

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

export { Separator }
