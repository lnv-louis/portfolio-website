import * as stylex from '@stylexjs/stylex'

import { color, radius, space, text } from '@/tokens/token-consts.stylex'

export const proseCodeStyles = stylex.create({
  inline: {
    backgroundColor: color.surfaceSoft,
    borderRadius: radius.xs,
    color: color.ink,
    fontFamily: text.fontMono,
    fontSize: '0.875em',
    paddingInline: space.xxs,
  },
  block: {
    backgroundColor: color.surfaceSoft,
    borderColor: color.hairline,
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: color.ink,
    fontFamily: text.fontMono,
    fontSize: text.sizeCode,
    lineHeight: text.leadingCode,
    margin: 0,
    maxWidth: '100%',
    overflowX: 'auto',
    paddingBlock: space.md,
    paddingInline: space.lg,
    whiteSpace: 'pre',
  },
})
