import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import * as stylex from "@stylexjs/stylex"

import { color, motion, radius, shadow, space, text } from "@/tokens/token-consts.stylex"

const styles = stylex.create({
  arrow: {
    backgroundColor: color.ink,
    borderRadius: radius.xs,
    height: "10px",
    transform: "rotate(45deg)",
    width: "10px",
    zIndex: 50,
  },
  arrowMedia: {
    backgroundColor: color.surfaceCard,
  },
  popup: {
    backgroundColor: color.ink,
    borderRadius: radius.md,
    boxShadow: shadow.s3,
    color: color.surfaceCard,
    fontFamily: text.fontSans,
    fontSize: text.sizeBodyLg,
    lineHeight: text.leadingBodyLg,
    maxWidth: "20rem",
    opacity: 1,
    outline: "none",
    paddingBlock: space.xs,
    paddingInline: space.sm,
    textAlign: "center",
    textWrap: "balance",
    transform: "scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionProperty: "opacity, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: motion.easeSpring,
    width: "fit-content",
    zIndex: 50,
  },
  // Image previews: a light card around the media instead of the ink text bubble.
  popupMedia: {
    backgroundColor: color.surfaceCard,
    borderRadius: radius.lg,
    boxShadow: shadow.s5,
    color: color.ink,
    maxWidth: "none",
    paddingBlock: space.xxs,
    paddingInline: space.xxs,
    textAlign: "start",
  },
  popupHidden: {
    opacity: 0,
    transform: "scale(0.95)",
  },
})

const isHidden = (status: string | undefined) =>
  status === "starting" || status === "ending"

// Wrap a group of tooltips so they share timing: the first opens after `delay`,
// neighbours open instantly while the group is warm (within `timeout` of the last close).
function TooltipProvider({
  delay = 200,
  timeout = 400,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} timeout={timeout} {...props} />
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  align = "center",
  children,
  side = "top",
  sideOffset = 4,
  variant = "text",
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Popup>, "className"> & {
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  variant?: "text" | "media"
}) {
  const media = variant === "media"
  const arrowSx = stylex.props(styles.arrow, media && styles.arrowMedia)

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={(state: { transitionStatus?: string }) =>
            stylex.props(
              styles.popup,
              media && styles.popupMedia,
              isHidden(state.transitionStatus) && styles.popupHidden,
            ).className
          }
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className={arrowSx.className} style={arrowSx.style} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
