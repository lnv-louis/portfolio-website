import * as stylex from '@stylexjs/stylex'

import { color, motion, radius, shadow, space, text } from '@/tokens/token-consts.stylex'

export const devinStyles = stylex.create({
  section: {
    alignItems: 'center',
    display: 'grid',
    gap: {
      default: space.x3xl,
      '@media (min-width: 1100px)': space.x5xl,
    },
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 1100px)': '1fr 1.25fr',
    },
    paddingBlock: space.x5xl,
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
  },
  copy: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.lg,
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
    textWrap: 'balance',
  },
  body: {
    color: color.body,
    fontSize: text.sizeBodyLg,
    lineHeight: text.leadingBodyLg,
    maxWidth: '52ch',
    textWrap: 'pretty',
  },
  facts: {
    borderTopColor: color.hairline,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    display: 'grid',
    gap: space.md,
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    margin: 0,
    paddingTop: space.lg,
  },
  fact: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.xxs,
  },
  factLabel: {
    color: color.meta,
    fontFamily: text.fontMono,
    fontSize: text.sizeMicro,
    letterSpacing: text.trackingAllcaps,
    lineHeight: text.leadingMicro,
    textTransform: 'uppercase',
  },
  factValue: {
    color: color.ink,
    fontSize: text.sizeBodyMd,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: text.leadingBodyMd,
    margin: 0,
  },
  link: {
    alignSelf: 'flex-start',
    color: {
      default: color.ink,
      ':hover': { default: null, '@media (hover: hover) and (pointer: fine)': color.primary },
    },
    fontSize: text.sizeBodySm,
    textDecorationColor: color.hairlineStrong,
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    transitionDuration: motion.durationFast,
    transitionProperty: 'color',
  },
  linkIcon: {
    display: 'inline-block',
    marginLeft: space.xxs,
    verticalAlign: 'middle',
  },
  film: {
    aspectRatio: '848 / 480',
    backgroundColor: color.ink,
    borderRadius: radius.card,
    boxShadow: shadow.s2,
    display: 'block',
    width: '100%',
  },
})
