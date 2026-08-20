import * as stylex from '@stylexjs/stylex'

import { color, layout, space } from '@/tokens/token-consts.stylex'

const pulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.45 },
  '100%': { opacity: 1 },
})

const loadingStyles = stylex.create({
  shell: {
    backgroundColor: color.canvas,
    minHeight: '100dvh',
  },
  rail: {
    backgroundColor: color.surfaceCard,
    borderLeftColor: color.hairlineStrong,
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderRightColor: color.hairlineStrong,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    marginInline: 'auto',
    maxWidth: layout.containerWide,
    minHeight: '80dvh',
    width: '100%',
  },
  block: {
    backgroundColor: color.surfaceSoft,
    borderRadius: '6px',
    marginInline: 'auto',
    height: 160,
    maxWidth: layout.proseMax,
    width: '60%',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.xl,
    paddingBlock: space.x5xl,
    paddingInline: {
      default: space.lg,
      '@media (min-width: 1200px)': space.x4xl,
    },
  },
  pulse: {
    animationName: pulse,
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
})

export default function Loading() {
  return (
    <div {...stylex.props(loadingStyles.shell)}>
      <div {...stylex.props(loadingStyles.rail)}>
        <div {...stylex.props(loadingStyles.row)}>
          <div {...stylex.props(loadingStyles.block, loadingStyles.pulse)} />
          <div {...stylex.props(loadingStyles.block, loadingStyles.pulse)} />
        </div>
      </div>
    </div>
  )
}
