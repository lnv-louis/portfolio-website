import * as stylex from '@stylexjs/stylex'

import { color, layout, space, text } from '@/tokens/token-consts.stylex'

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
    flex: '1',
    height: {
      default: '600px',
      '@media (min-width: 960px)': '800px',
    },
    minHeight: 0,
    position: 'relative',
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
