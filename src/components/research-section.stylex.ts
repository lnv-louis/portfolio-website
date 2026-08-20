import * as stylex from '@stylexjs/stylex'

import { color, layout, radius, space, text } from '@/tokens/token-consts.stylex'

export const researchStyles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x3xl,
    paddingBlock: space.x5xl,
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
  },
  contentRow: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 960px)': 'row',
    },
    gap: {
      default: space.x3xl,
      '@media (min-width: 960px)': space.x5xl,
    },
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 960px)': 'stretch',
    },
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x2xl,
    flex: '1',
    justifyContent: 'center',
  },
  viewerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.md,
    flex: '1',
    justifyContent: 'center',
    minHeight: 0,
  },
  pdfEntry: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
  },
  pdfCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.hairline,
    borderRadius: radius.card,
    paddingBlock: space.x2xl,
    paddingInline: space.x2xl,
    textDecoration: 'none',
    transitionProperty: 'border-color, background-color',
    transitionDuration: '150ms',
    ':hover': {
      borderColor: color.hairlineStrong,
      backgroundColor: color.surfaceHover,
    },
  },
  pdfCardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: space.xs,
    color: color.ink,
    fontFamily: text.fontMono,
    fontSize: text.sizeBodySm,
  },
  pdfCardMeta: {
    color: color.meta,
    fontFamily: text.fontSans,
    fontSize: text.sizeBodySm,
  },
  heading: {
    color: color.ink,
    fontFamily: text.fontDisplay,
    fontSize: {
      default: text.sizeDisplayMd,
      '@media (min-width: 960px)': text.sizeDisplayXl,
    },
    fontWeight: text.weightMedium,
    letterSpacing: {
      default: text.trackingDisplayMd,
      '@media (min-width: 960px)': text.trackingDisplayXl,
    },
    lineHeight: {
      default: text.leadingDisplayMd,
      '@media (min-width: 960px)': text.leadingDisplayXl,
    },
    maxWidth: layout.proseMax,
    textWrap: 'balance',
  },
})
