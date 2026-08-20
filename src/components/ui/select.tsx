"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { HugeiconsIcon } from "@hugeicons/react"
import CheckIcon from "@hugeicons/core-free-icons/CheckIcon"
import ChevronDownIcon from "@hugeicons/core-free-icons/ChevronDownIcon"
import ChevronUpIcon from "@hugeicons/core-free-icons/ChevronUpIcon"
import { Select as SelectPrimitive } from "radix-ui"

import { selectStyles as styles } from "@/components/ui/ui.stylex"
import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & { modal?: boolean }) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  const sxProps = stylex.props(
    styles.trigger,
    size === "sm" ? styles.triggerSm : styles.triggerDefault,
  )

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <HugeiconsIcon
          icon={ChevronDownIcon}
          size={16}
          strokeWidth={2}
          {...stylex.props(styles.triggerIcon)}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  alignItemWithTrigger?: boolean
}) {
  const contentSx = stylex.props(styles.content)

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        {...contentSx}
        className={cn(contentSx.className, className)}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          {...stylex.props(
            styles.viewport,
            position === "popper" && styles.viewportPopper,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  const sxProps = stylex.props(styles.label)

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const sxProps = stylex.props(styles.item)

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    >
      <span {...stylex.props(styles.itemIndicator)}>
        <SelectPrimitive.ItemIndicator>
          <HugeiconsIcon icon={CheckIcon} size={16} strokeWidth={2} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const sxProps = stylex.props(styles.separator)

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  const sxProps = stylex.props(styles.scrollButton)

  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    >
      <HugeiconsIcon icon={ChevronUpIcon} size={16} strokeWidth={2} />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  const sxProps = stylex.props(styles.scrollButton)

  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      {...sxProps}
      className={cn(sxProps.className, className)}
      {...props}
    >
      <HugeiconsIcon icon={ChevronDownIcon} size={16} strokeWidth={2} />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
