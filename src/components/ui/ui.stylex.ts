import * as stylex from '@stylexjs/stylex'

import {
  color,
  motion,
  radius,
  shadow,
  space,
  text,
} from '@/tokens/token-consts.stylex'

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const spin = stylex.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

export const buttonStyles = stylex.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.md,
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: text.sizeBodySm,
    fontWeight: text.weightMedium,
    gap: space.xs,
    justifyContent: 'center',
    lineHeight: 1,
    outlineStyle: 'none',
    transitionDuration: motion.durationFast,
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionTimingFunction: motion.easeSmooth,
    whiteSpace: 'nowrap',
  },
  defaultVariant: {
    backgroundColor: {
      default: color.primary,
      ':hover': color.primaryActive,
    },
    color: color.onPrimary,
  },
  destructiveVariant: {
    backgroundColor: {
      default: color.negative,
      ':hover': color.negative,
    },
    color: color.onPrimary,
  },
  outlineVariant: {
    backgroundColor: {
      default: 'transparent',
      ':hover': color.surfaceHover,
    },
    borderColor: color.inputBorder,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: color.ink,
  },
  secondaryVariant: {
    backgroundColor: {
      default: color.surfaceSoft,
      ':hover': color.surfaceHover,
    },
    color: color.ink,
  },
  ghostVariant: {
    backgroundColor: {
      default: 'transparent',
      ':hover': color.surfaceHover,
    },
    color: color.ink,
  },
  linkVariant: {
    backgroundColor: 'transparent',
    color: color.primary,
    textDecorationLine: {
      default: 'none',
      ':hover': 'underline',
    },
    textDecorationOffset: '4px',
  },
  // sizes
  defaultSize: {
    height: 36,
    paddingBlock: space.xs,
    paddingInline: space.md,
  },
  xsSize: {
    borderRadius: radius.md,
    fontSize: text.sizeCaption,
    gap: space.xxs,
    height: 24,
    paddingInline: space.xs,
  },
  smSize: {
    borderRadius: radius.md,
    gap: 6,
    height: 32,
    paddingInline: space.sm,
  },
  lgSize: {
    borderRadius: radius.md,
    height: 40,
    paddingInline: 24,
  },
  iconSize: {
    height: 36,
    width: 36,
  },
  iconXsSize: {
    borderRadius: radius.md,
    height: 24,
    width: 24,
  },
  iconSmSize: {
    height: 32,
    width: 32,
  },
  iconLgSize: {
    height: 40,
    width: 40,
  },
})

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

export const inputStyles = stylex.create({
  base: {
    backgroundColor: 'transparent',
    borderColor: color.inputBorder,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: color.ink,
    fontSize: text.sizeBodyMd,
    height: 36,
    minWidth: 0,
    outlineStyle: 'none',
    paddingBlock: space.xxs,
    paddingInline: space.sm,
    transitionDuration: motion.durationFast,
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: motion.easeSmooth,
    width: '100%',
  },
})

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------

export const spinnerStyles = stylex.create({
  base: {
    animationName: spin,
    animationDuration: '0.8s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    display: 'inline-block',
    height: 16,
    width: 16,
  },
})

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export const separatorStyles = stylex.create({
  base: {
    backgroundColor: color.hairline,
    flexShrink: 0,
  },
  horizontal: {
    height: '1px',
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: '1px',
  },
})

// ---------------------------------------------------------------------------
// ScrollArea
// ---------------------------------------------------------------------------

export const scrollAreaStyles = stylex.create({
  root: {
    position: 'relative',
  },
  viewport: {
    borderRadius: 'inherit',
    height: '100%',
    outlineStyle: 'none',
    transitionProperty: 'color, box-shadow',
    width: '100%',
  },
  scrollbar: {
    display: 'flex',
    padding: '1px',
    transitionProperty: 'background-color',
    userSelect: 'none',
  },
  scrollbarVertical: {
    height: '100%',
    width: 10,
    borderLeftColor: 'transparent',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
  },
  scrollbarHorizontal: {
    flexDirection: 'column',
    height: 10,
    width: '100%',
    borderTopColor: 'transparent',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
  thumb: {
    backgroundColor: color.hairline,
    borderRadius: radius.full,
    flexGrow: 1,
    position: 'relative',
  },
})

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

export const tooltipStyles = stylex.create({
  content: {
    backgroundColor: color.ink,
    borderRadius: radius.md,
    color: color.canvas,
    fontSize: text.sizeCaption,
    lineHeight: text.leadingCaption,
    maxWidth: 'max-content',
    paddingBlock: 6,
    paddingInline: space.sm,
    textAlign: 'balance',
    width: 'fit-content',
    zIndex: 50,
  },
  arrow: {
    backgroundColor: color.ink,
    borderRadius: '2px',
    height: 10,
    transform: 'rotate(45deg) translateY(calc(-50% - 2px))',
    width: 10,
    zIndex: 50,
  },
})

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------

export const popoverStyles = stylex.create({
  content: {
    backgroundColor: color.surfaceCard,
    borderColor: color.hairline,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: shadow.s3,
    color: color.ink,
    minWidth: 288,
    padding: space.md,
    width: 288,
    zIndex: 50,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: text.sizeBodySm,
    gap: space.xxs,
  },
  title: {
    fontWeight: text.weightMedium,
  },
  description: {
    color: color.meta,
  },
})

// ---------------------------------------------------------------------------
// DropdownMenu
// ---------------------------------------------------------------------------

export const dropdownMenuStyles = stylex.create({
  content: {
    backgroundColor: color.surfaceCard,
    borderColor: color.hairline,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: shadow.s3,
    color: color.ink,
    minWidth: 128,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: space.xxs,
    zIndex: 50,
  },
  subContent: {
    backgroundColor: color.surfaceCard,
    borderColor: color.hairline,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: shadow.s3,
    color: color.ink,
    minWidth: 128,
    overflow: 'hidden',
    padding: space.xxs,
    zIndex: 50,
  },
  item: {
    alignItems: 'center',
    borderRadius: radius.xs,
    color: color.ink,
    cursor: 'default',
    display: 'flex',
    fontSize: text.sizeBodySm,
    gap: space.xs,
    paddingBlock: 6,
    paddingInline: space.xs,
    position: 'relative',
    userSelect: 'none',
  },
  itemInset: {
    paddingInlineStart: 32,
  },
  itemDestructive: {
    color: color.negative,
  },
  checkboxItem: {
    alignItems: 'center',
    borderRadius: radius.xs,
    color: color.ink,
    cursor: 'default',
    display: 'flex',
    fontSize: text.sizeBodySm,
    gap: space.xs,
    paddingBlock: 6,
    paddingInlineEnd: space.xs,
    paddingInlineStart: 32,
    position: 'relative',
    userSelect: 'none',
  },
  radioItem: {
    alignItems: 'center',
    borderRadius: radius.xs,
    color: color.ink,
    cursor: 'default',
    display: 'flex',
    fontSize: text.sizeBodySm,
    gap: space.xs,
    paddingBlock: 6,
    paddingInlineEnd: space.xs,
    paddingInlineStart: 32,
    position: 'relative',
    userSelect: 'none',
  },
  itemIndicator: {
    alignItems: 'center',
    display: 'flex',
    height: 14,
    justifyContent: 'center',
    left: space.xs,
    pointerEvents: 'none',
    position: 'absolute',
    width: 14,
  },
  label: {
    color: color.ink,
    fontSize: text.sizeBodySm,
    fontWeight: text.weightMedium,
    paddingBlock: 6,
    paddingInline: space.xs,
  },
  labelInset: {
    paddingInlineStart: 32,
  },
  separator: {
    backgroundColor: color.hairline,
    height: '1px',
    marginBlock: space.xxs,
    marginInline: '-4px',
  },
  shortcut: {
    color: color.meta,
    fontSize: text.sizeCaption,
    letterSpacing: '0.1em',
    marginLeft: 'auto',
  },
  subTrigger: {
    alignItems: 'center',
    borderRadius: radius.xs,
    color: color.ink,
    cursor: 'default',
    display: 'flex',
    fontSize: text.sizeBodySm,
    gap: space.xs,
    paddingBlock: 6,
    paddingInline: space.xs,
    userSelect: 'none',
  },
  subTriggerInset: {
    paddingInlineStart: 32,
  },
  subTriggerIcon: {
    marginLeft: 'auto',
  },
})

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------

export const selectStyles = stylex.create({
  trigger: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: color.inputBorder,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: color.ink,
    display: 'flex',
    fontSize: text.sizeBodySm,
    gap: space.xs,
    justifyContent: 'space-between',
    outlineStyle: 'none',
    paddingBlock: space.xs,
    paddingInline: space.sm,
    transitionDuration: motion.durationFast,
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: motion.easeSmooth,
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },
  triggerSm: {
    height: 32,
  },
  triggerDefault: {
    height: 36,
  },
  content: {
    backgroundColor: color.surfaceCard,
    borderColor: color.hairline,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: shadow.s3,
    color: color.ink,
    minWidth: 128,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    zIndex: 50,
  },
  viewport: {
    padding: space.xxs,
  },
  viewportPopper: {
    height: 'var(--radix-select-trigger-height)',
    minWidth: 'var(--radix-select-trigger-width)',
    scrollMarginBlock: space.xxs,
    width: '100%',
  },
  item: {
    alignItems: 'center',
    borderRadius: radius.xs,
    color: color.ink,
    cursor: 'default',
    display: 'flex',
    fontSize: text.sizeBodySm,
    gap: space.xs,
    paddingBlock: 6,
    paddingInlineEnd: 32,
    paddingInlineStart: space.xs,
    position: 'relative',
    userSelect: 'none',
    width: '100%',
  },
  itemIndicator: {
    alignItems: 'center',
    display: 'flex',
    height: 14,
    justifyContent: 'center',
    position: 'absolute',
    right: space.xs,
    width: 14,
  },
  label: {
    color: color.meta,
    fontSize: text.sizeCaption,
    paddingBlock: 6,
    paddingInline: space.xs,
  },
  separator: {
    backgroundColor: color.hairline,
    height: '1px',
    marginBlock: space.xxs,
    marginInline: '-4px',
    pointerEvents: 'none',
  },
  scrollButton: {
    alignItems: 'center',
    color: color.ink,
    cursor: 'default',
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: space.xxs,
  },
  triggerIcon: {
    color: color.meta,
  },
})

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

export const toggleStyles = stylex.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.md,
    display: 'inline-flex',
    fontSize: text.sizeBodySm,
    fontWeight: text.weightMedium,
    gap: space.xs,
    justifyContent: 'center',
    outlineStyle: 'none',
    transitionDuration: motion.durationFast,
    transitionProperty: 'color, background-color, box-shadow',
    transitionTimingFunction: motion.easeSmooth,
    whiteSpace: 'nowrap',
  },
  defaultVariant: {
    backgroundColor: 'transparent',
    color: color.ink,
  },
  outlineVariant: {
    backgroundColor: 'transparent',
    borderColor: color.inputBorder,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: color.ink,
  },
  defaultSize: {
    height: 36,
    minWidth: 36,
    paddingInline: space.xs,
  },
  smSize: {
    height: 32,
    minWidth: 32,
    paddingInline: 6,
  },
  lgSize: {
    height: 40,
    minWidth: 40,
    paddingInline: 10,
  },
})
