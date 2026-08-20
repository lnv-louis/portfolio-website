import * as stylex from '@stylexjs/stylex'

import { color, layout, radius, space, text } from '@/tokens/token-consts.stylex'

export const heroStyles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: layout.containerWide,
    marginInline: 'auto',
    minHeight: '100dvh',
    paddingBlock: {
      default: space.x5xl,
      '@media (min-width: 960px)': space.x6xl,
    },
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 960px)': 'row',
    },
    gap: {
      default: space.x3xl,
      '@media (min-width: 960px)': space.x5xl,
    },
    justifyContent: 'center',
    marginInline: 'auto',
    maxWidth: layout.containerMax,
    width: '100%',
  },
  portrait: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: '0',
    justifyContent: 'center',
    width: {
      default: '240px',
      '@media (min-width: 960px)': '360px',
    },
  },
  portraitFrame: {
    aspectRatio: '3 / 4',
    backgroundColor: color.surfaceSoft,
    borderColor: color.hairline,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: '1px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  objectCover: {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.lg,
    maxWidth: '42rem',
  },
  heading: {
    color: color.ink,
    fontFamily: text.fontDisplay,
    fontSize: {
      default: text.sizeDisplayLg,
      '@media (min-width: 960px)': text.sizeDisplayXl,
    },
    fontWeight: text.weightMedium,
    letterSpacing: {
      default: text.trackingDisplayLg,
      '@media (min-width: 960px)': text.trackingDisplayXl,
    },
    lineHeight: {
      default: text.leadingDisplayLg,
      '@media (min-width: 960px)': text.leadingDisplayXl,
    },
    textWrap: 'balance',
  },
  subheading: {
    color: color.body,
    fontSize: text.sizeBodyLg,
    lineHeight: text.leadingBodyLg,
    maxWidth: '42rem',
  },
  subheadingLink: {
    color: color.ink,
    textDecoration: 'underline',
    textDecorationColor: {
      default: color.meta,
      ':hover': color.primary,
    },
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
    transitionProperty: 'text-decoration-color',
    transitionDuration: '150ms',
  },
  tooltipLink: {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationColor: 'color-mix(in srgb, currentcolor 50%, transparent)',
    textUnderlineOffset: '2px',
  },
  socials: {
    alignItems: 'center',
    display: 'flex',
    gap: space.md,
    marginTop: space.md,
  },
  socialLink: {
    alignItems: 'center',
    borderColor: color.hairline,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: color.meta,
    display: 'flex',
    height: '40px',
    justifyContent: 'center',
    transitionProperty: 'color, border-color',
    transitionDuration: '150ms',
    width: '40px',
  },
})
