import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Slot } from "radix-ui"

import { buttonStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantMap: Record<ButtonVariant, keyof typeof styles> = {
  default: "defaultVariant",
  destructive: "destructiveVariant",
  outline: "outlineVariant",
  secondary: "secondaryVariant",
  ghost: "ghostVariant",
  link: "linkVariant",
}

const sizeMap: Record<ButtonSize, keyof typeof styles> = {
  default: "defaultSize",
  xs: "xsSize",
  sm: "smSize",
  lg: "lgSize",
  icon: "iconSize",
  "icon-xs": "iconXsSize",
  "icon-sm": "iconSmSize",
  "icon-lg": "iconLgSize",
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const sxProps = stylex.props(
    styles.base,
    styles[variantMap[variant]],
    styles[sizeMap[size]],
  )

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

function buttonVariants(opts: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  const { variant = "default", size = "default" } = opts
  return stylex.props(
    styles.base,
    styles[variantMap[variant]],
    styles[sizeMap[size]],
  )
}

export { Button, buttonVariants }
export type { ButtonVariant, ButtonSize }
