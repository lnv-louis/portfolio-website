import * as stylex from '@stylexjs/stylex'

import { color, layout, motion, radius, space, text } from '@/tokens/token-consts.stylex'

export const contactStyles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  grid: {
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
    paddingBlock: space.x5xl,
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
  },
  imageCol: {
    display: {
      default: 'none',
      '@media (min-width: 960px)': 'flex',
    },
    flex: '1',
    position: 'relative',
  },
  imageFrame: {
    aspectRatio: '1 / 1',
    backgroundColor: color.surfaceSoft,
    borderColor: color.hairline,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: '1px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
  },
  objectCover: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x2xl,
    flex: '1',
    justifyContent: 'center',
  },
  copy: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.lg,
    maxWidth: layout.sidePanelMax,
  },
  heading: {
    color: color.ink,
    fontFamily: text.fontSerif,
    fontSize: {
      default: text.sizeDisplay2xl,
      '@media (min-width: 960px)': text.sizeDisplay3xl,
    },
    fontWeight: text.weightRegular,
    letterSpacing: {
      default: text.trackingDisplay2xl,
      '@media (min-width: 960px)': text.trackingDisplay3xl,
    },
    lineHeight: {
      default: text.leadingDisplay2xl,
      '@media (min-width: 960px)': text.leadingDisplay3xl,
    },
    textWrap: 'balance',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  contactRow: {
    alignItems: 'center',
    borderBottomColor: color.hairline,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlock: space.lg,
  },
  contactRowFirst: {
    borderTopColor: color.hairline,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
  contactLabel: {
    color: color.meta,
    fontFamily: text.fontMono,
    fontSize: text.sizeMicro,
    letterSpacing: text.trackingAllcaps,
    textTransform: 'uppercase',
  },
  contactValue: {
    color: color.ink,
    fontFamily: text.fontDisplay,
    fontSize: text.sizeBodyLg,
    fontWeight: text.weightMedium,
    transitionDuration: motion.durationFast,
    transitionProperty: 'color',
  },
  contactLink: {
    color: {
      default: color.ink,
      ':hover': { default: null, '@media (hover: hover) and (pointer: fine)': color.primary },
    },
    textDecorationLine: 'underline',
    textUnderlineOffset: '3px',
    textDecorationColor: {
      default: color.hairline,
      ':hover': { default: null, '@media (hover: hover) and (pointer: fine)': color.primary },
    },
  },
  footer: {
    alignItems: 'center',
    columnGap: space.lg,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: space.sm,
    borderTopColor: color.hairline,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    color: color.captionInk,
    fontFamily: text.fontMono,
    fontSize: text.sizeCaption,
    letterSpacing: text.trackingLabel,
    paddingBlock: space.xl,
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
    textTransform: 'uppercase',
  },
  footerNav: {
    columnGap: space.lg,
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: space.xs,
  },
  footerLink: {
    color: {
      default: color.captionInk,
      ':hover': { default: null, '@media (hover: hover) and (pointer: fine)': color.ink },
    },
    textDecoration: 'none',
    transitionDuration: motion.durationFast,
    transitionProperty: 'color',
  },
})
