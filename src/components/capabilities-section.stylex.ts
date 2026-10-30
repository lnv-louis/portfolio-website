import * as stylex from '@stylexjs/stylex'

import { color, space, text } from '@/tokens/token-consts.stylex'

export const capsStyles = stylex.create({
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
  headingBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.md,
  },
  heading: {
    color: color.ink,
    fontFamily: text.fontSerif,
    fontSize: {
      default: text.sizeDisplayMd,
      '@media (min-width: 960px)': text.sizeDisplayXl,
    },
    fontWeight: text.weightRegular,
    letterSpacing: {
      default: text.trackingDisplayMd,
      '@media (min-width: 960px)': text.trackingDisplayXl,
    },
    lineHeight: {
      default: text.leadingDisplayMd,
      '@media (min-width: 960px)': text.leadingDisplayXl,
    },
    textWrap: 'balance',
  },
})
