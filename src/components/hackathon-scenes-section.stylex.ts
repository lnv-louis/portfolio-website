import * as stylex from '@stylexjs/stylex'

import { color, motion, radius, space, text } from '@/tokens/token-consts.stylex'

const HOVER = '@media (hover: hover) and (pointer: fine)'

export const scenesStyles = stylex.create({
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
    maxWidth: '18ch',
    textWrap: 'balance',
  },
  lede: {
    color: color.body,
    fontSize: text.sizeBodyLg,
    lineHeight: text.leadingBodyLg,
    maxWidth: '52ch',
    textWrap: 'pretty',
  },
  inlineLink: {
    color: color.ink,
    textDecorationColor: {
      default: color.meta,
      ':hover': { default: null, [HOVER]: color.primary },
    },
    textDecorationLine: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
    transitionDuration: motion.durationFast,
    transitionProperty: 'text-decoration-color',
  },
  wall: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.xs,
    marginInline: {
      default: `calc(${space.lg} * -1)`,
      '@media (min-width: 1200px)': `calc(${space.x4xl} * -1)`,
    },
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    gap: space.xs,
    width: 'max-content',
    willChange: 'transform',
  },
  tile: {
    backgroundColor: color.surfaceSoft,
    borderRadius: radius.sm,
    flexShrink: 0,
    height: {
      default: '120px',
      '@media (min-width: 960px)': '184px',
    },
    maxWidth: 'none',
    objectFit: 'cover',
    width: 'auto',
  },
  band: {
    borderBlockColor: color.hairline,
    borderBlockStyle: 'solid',
    borderBlockWidth: '1px',
    display: 'grid',
    gap: space.lg,
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 720px)': 'repeat(3, 1fr)',
    },
    margin: 0,
    marginBlock: space.md,
    paddingBlock: space.x2xl,
    paddingInline: space.lg,
  },
  bandItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: space.xs,
    textAlign: 'center',
  },
  bandValue: {
    color: color.ink,
    fontFamily: text.fontSerif,
    fontSize: {
      default: text.sizeDisplayXl,
      '@media (min-width: 960px)': text.sizeDisplay3xl,
    },
    fontVariantNumeric: 'tabular-nums',
    fontWeight: text.weightRegular,
    lineHeight: 1,
    margin: 0,
  },
  bandLabel: {
    color: color.body,
    fontSize: text.sizeBodyMd,
    lineHeight: text.leadingBodyMd,
  },
  label: {
    color: color.meta,
    fontFamily: text.fontMono,
    fontSize: text.sizeMicro,
    letterSpacing: text.trackingAllcaps,
    lineHeight: text.leadingMicro,
    textTransform: 'uppercase',
  },
  // Full-width rows across the rail, divided by hairlines like the contact list.
  events: {
    borderBottomColor: color.hairline,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    listStyle: 'none',
    margin: 0,
    // Bleed to the rail's edges (like the photo wall) so each row spans the white container.
    marginInline: {
      default: `calc(${space.lg} * -1)`,
      '@media (min-width: 1200px)': `calc(${space.x4xl} * -1)`,
    },
    padding: 0,
  },
  event: {
    alignItems: 'baseline',
    borderTopColor: color.hairline,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    columnGap: space.x2xl,
    display: 'grid',
    fontSize: text.sizeBodyLg,
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 960px)': 'minmax(0, 1fr) minmax(0, 1fr)',
    },
    lineHeight: text.leadingBodyLg,
    paddingBlock: space.lg,
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
    rowGap: space.xxs,
  },
  eventDetail: {
    color: color.body,
    textWrap: 'pretty',
  },
  previewImage: {
    borderRadius: radius.md,
    display: 'block',
    height: 'auto',
    maxWidth: 'none',
    objectFit: 'cover',
    width: '280px',
  },
  previewCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.xs,
    paddingBlock: space.md,
    paddingInline: space.md,
    width: '280px',
  },
  previewTitle: {
    color: color.ink,
    fontFamily: text.fontSerif,
    fontSize: text.sizeDisplaySm,
    lineHeight: text.leadingDisplaySm,
    textWrap: 'balance',
  },
  eventLink: {
    alignSelf: 'start',
    color: color.ink,
    justifySelf: 'start',
    textDecorationColor: {
      default: color.meta,
      ':hover': { default: null, [HOVER]: color.primary },
    },
    textDecorationLine: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
    transitionDuration: motion.durationFast,
    transitionProperty: 'text-decoration-color',
  },
  srOnly: {
    borderWidth: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
})
