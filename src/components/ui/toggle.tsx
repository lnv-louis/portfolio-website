"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Toggle as TogglePrimitive } from "radix-ui"

import { toggleStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

type ToggleVariant = "default" | "outline"
type ToggleSize = "default" | "sm" | "lg"

interface ToggleProps extends React.ComponentProps<typeof TogglePrimitive.Root> {
  variant?: ToggleVariant
  size?: ToggleSize
}

const variantMap: Record<ToggleVariant, keyof typeof styles> = {
  default: "defaultVariant",
  outline: "outlineVariant",
}

const sizeMap: Record<ToggleSize, keyof typeof styles> = {
  default: "defaultSize",
  sm: "smSize",
  lg: "lgSize",
}

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: ToggleProps) {
  const sxProps = stylex.props(
    styles.base,
    styles[variantMap[variant]],
    styles[sizeMap[size]],
  )

  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

function toggleVariants(opts: { variant?: ToggleVariant; size?: ToggleSize } = {}) {
  const { variant = "default", size = "default" } = opts
  return stylex.props(
    styles.base,
    styles[variantMap[variant]],
    styles[sizeMap[size]],
  )
}

export { Toggle, toggleVariants }
export type { ToggleVariant, ToggleSize }
