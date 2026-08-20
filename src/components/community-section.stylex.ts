import * as stylex from '@stylexjs/stylex'

import { color, space, text } from '@/tokens/token-consts.stylex'

export const communityStyles = stylex.create({
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
    textWrap: 'balance',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  item: {
    borderBottomColor: color.hairline,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
    paddingBlock: space.xl,
  },
  itemFirst: {
    borderTopColor: color.hairline,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space.lg,
  },
  itemTitle: {
    color: color.ink,
    fontFamily: text.fontDisplay,
    fontSize: {
      default: text.sizeDisplayXs,
      '@media (min-width: 960px)': text.sizeDisplaySm,
    },
    fontWeight: text.weightMedium,
    letterSpacing: text.trackingDisplayXs,
    lineHeight: text.leadingDisplayXs,
  },
  itemTitleLink: {
    color: color.ink,
    fontFamily: text.fontDisplay,
    fontSize: {
      default: text.sizeDisplayXs,
      '@media (min-width: 960px)': text.sizeDisplaySm,
    },
    fontWeight: text.weightMedium,
    letterSpacing: text.trackingDisplayXs,
    lineHeight: text.leadingDisplayXs,
    textDecoration: 'none',
    ':hover': {
      color: color.primary,
    },
  },
  linkIcon: {
    display: 'inline-block',
    marginLeft: '4px',
    verticalAlign: 'middle',
    color: {
      default: color.captionInk,
      ':hover': color.primary,
    },
  },
  itemNumber: {
    color: color.ink,
    fontFamily: text.fontDisplay,
    fontSize: {
      default: text.sizeDisplaySm,
      '@media (min-width: 960px)': text.sizeDisplayMd,
    },
    fontWeight: text.weightMedium,
    letterSpacing: text.trackingDisplaySm,
    lineHeight: text.leadingDisplaySm,
  },
})
