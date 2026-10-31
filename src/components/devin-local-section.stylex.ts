import * as stylex from '@stylexjs/stylex'

import { color, radius, shadow, space, text } from '@/tokens/token-consts.stylex'

export const devinStyles = stylex.create({
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
  heading: {
    color: color.ink,
    fontFamily: text.fontSerif,
    fontSize: {
      default: text.sizeDisplayXl,
      '@media (min-width: 960px)': text.sizeDisplay3xl,
    },
    fontWeight: text.weightRegular,
    letterSpacing: {
      default: text.trackingDisplayXl,
      '@media (min-width: 960px)': text.trackingDisplay3xl,
    },
    lineHeight: {
      default: text.leadingDisplayXl,
      '@media (min-width: 960px)': text.leadingDisplay3xl,
    },
    maxWidth: '18ch',
    textWrap: 'balance',
  },
  film: {
    aspectRatio: '848 / 480',
    backgroundColor: color.ink,
    borderRadius: radius.card,
    boxShadow: shadow.s2,
    display: 'block',
    height: 'auto',
    width: '100%',
  },
})
