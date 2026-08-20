import * as stylex from '@stylexjs/stylex'

import { color, motion, radius, space, text } from '@/tokens/token-consts.stylex'

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
})

export const pvStyles = stylex.create({
  // Root container
  root: {
    backgroundColor: color.canvas,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  },

  // Loading skeleton
  loadingOverlay: {
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    display: 'flex',
    inset: 0,
    position: 'absolute',
    zIndex: 20,
  },
  loadingContent: {
    alignItems: 'center',
    display: 'grid',
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
    placeItems: 'center',
  },
  spinner: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: spin,
    animationTimingFunction: 'linear',
    height: '16px',
    width: '16px',
  },

  // Error / empty states
  stateOverlay: {
    backgroundColor: color.canvas,
    color: color.meta,
    display: 'grid',
    fontSize: text.sizeBodySm,
    inset: 0,
    padding: space.xl,
    placeItems: 'center',
    position: 'absolute',
    zIndex: 20,
  },
  stateOverlayCenter: {
    textAlign: 'center',
  },
  stateContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
    maxWidth: '24rem',
  },
  stateTitle: {
    color: color.ink,
    fontWeight: text.weightMedium,
  },
  stateCode: {
    fontFamily: text.fontMono,
    fontSize: text.sizeBodySm,
  },

  // Toolbar
  toolbar: {
    alignItems: 'center',
    backgroundColor: color.canvas,
    borderBottomColor: color.hairline,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.xs,
    justifyContent: 'space-between',
    minHeight: '48px',
    paddingBlock: space.xs,
    paddingInline: space.sm,
  },
  toolbarLeft: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.xs,
    minWidth: 0,
  },
  toolbarRight: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    justifyContent: 'flex-end',
    minWidth: 0,
  },
  toolbarGroup: {
    alignItems: 'center',
    display: 'flex',
    flex: 'none',
    gap: '4px',
  },

  // Separator in toolbar
  toolbarSep: {
    alignSelf: 'center',
    height: '16px',
    marginInline: '4px',
  },

  // Page number control
  pageNumber: {
    alignItems: 'center',
    color: color.primary,
    display: 'flex',
    fontSize: text.sizeBodySm,
    whiteSpace: 'nowrap',
  },
  pageNumberInput: {
    borderRadius: radius.md,
    marginInline: '4px',
    minWidth: '56px',
    width: '56px',
  },
  pageNumberInputCenter: {
    textAlign: 'center',
  },

  // Search popover content
  searchContent: {
    width: '288px',
  },
  searchBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
  },
  searchResultRow: {
    alignItems: 'center',
    display: 'flex',
    gap: space.xs,
    justifyContent: 'space-between',
  },
  searchResultText: {
    color: color.meta,
    fontSize: text.sizeCaption,
    minWidth: 0,
  },
  searchResultTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  searchResultActive: {
    color: color.primary,
  },
  searchNavButtons: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    gap: '4px',
  },
  searchClearRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  // Main viewer area
  viewerArea: {
    backgroundColor: 'rgba(250, 250, 250, 0.3)',
    display: 'flex',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  viewerContent: {
    display: 'flex',
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  },
  viewportContainer: {
    display: 'flex',
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    minHeight: 0,
    minWidth: 0,
    position: 'relative',
  },

  // Scroll area
  scrollAreaContainer: {
    height: '100%',
    minHeight: 0,
    width: '100%',
  },
  scrollAreaInner: {
    minHeight: '100%',
  },
  scrollAreaViewport: {
    height: '100%',
    width: '100%',
  },
  viewportContent: {
    position: 'relative',
    userSelect: 'none',
    '::selection': {
      backgroundColor: 'transparent',
      color: 'inherit',
    },
  },
  thumbnailViewport: {
    paddingInline: space.md,
  },

  // Thumbnails
  thumbItem: {
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  thumbItemActive: {
    zIndex: 10,
  },
  thumbOption: {
    alignItems: 'center',
    borderRadius: radius.md,
    color: color.meta,
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
    fontSize: text.sizeCaption,
    height: '100%',
    justifyContent: 'space-between',
    outline: 'none',
    paddingBlock: 0,
    paddingInline: space.xs,
    userSelect: 'none',
    transitionProperty: 'box-shadow',
    width: '100%',
  },
  thumbOptionHover: {
    backgroundColor: {
      default: null,
      ':hover': color.surfaceHover,
    },
  },
  thumbOptionActive: {
    backgroundColor: color.surfaceHover,
    color: color.ink,
  },
  thumbImageWrap: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radius.md,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    overflow: 'hidden',
  },
  thumbImage: {
    borderRadius: radius.sm,
    display: 'block',
    objectFit: 'contain',
  },
  thumbLabel: {
    alignItems: 'center',
    display: 'flex',
    fontVariantNumeric: 'tabular-nums',
    justifyContent: 'center',
  },
  thumbLabelText: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '20px',
    minWidth: '20px',
    paddingInline: '6px',
    textAlign: 'center',
  },

  // Thumbnail sidebar
  thumbSidebar: {
    flexShrink: 0,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    transitionProperty: 'margin-left',
    transitionDuration: motion.durationFast,
  },
  thumbSidebarOpen: {
    marginLeft: 0,
  },
  thumbSidebarClosed: {
    marginLeft: '-160px',
  },
  thumbSidebarInline: {
    borderRightColor: color.hairline,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
  },

  // PDF page rendering
  pageContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0 0 0 1px #00000014 inset',
    position: 'relative',
    userSelect: 'none',
  },
  pageBg: {
    backgroundColor: 'white',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',
  },
  pageRenderLayer: {
    height: '100%',
    inset: 0,
    objectFit: 'fill',
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    filter: 'blur(0.35px)',
    transitionProperty: 'none',
  },
  pageTilingLayer: {
    opacity: 1,
    pointerEvents: 'none',
    transitionProperty: 'none',
  },
  pageSearchLayer: {
    pointerEvents: 'none',
  },
  pageSelectionLayer: {
    pointerEvents: 'none',
    position: 'absolute',
  },

  // Scroller
  scrollerRoot: {
    boxSizing: 'border-box',
    height: '100%',
    marginInline: 'auto',
    position: 'relative',
    width: '100%',
  },

  // File actions
  srOnly: {
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    width: '1px',
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },

  // Zoom select trigger
  zoomTrigger: {
    minWidth: '84px',
    width: '84px',
  },

  // Icon scale
  iconFlipX: {
    transform: 'scaleX(-1)',
  },

  // Document viewer sidebar
  sidebar: {
    backgroundColor: color.surfaceCard,
    borderColor: color.hairline,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 30,
  },
  sidebarWidth: {
    width: '160px',
  },
  sidebarTransition: {
    transitionDuration: '200ms',
    transitionProperty: 'translate, margin-left, border-color',
    transitionTimingFunction: 'ease-out',
  },
  sidebarNoTransition: {
    transitionProperty: 'none',
  },
  sidebarInline: {
    position: 'relative',
    shadow: 'none',
    transform: 'translateX(0)',
    zIndex: 'auto',
  },
  sidebarOpen: {
    marginLeft: 0,
    transform: 'translateX(0)',
  },
  sidebarClosedInline: {
    borderRightWidth: 0,
    marginLeft: '-160px',
    pointerEvents: 'auto',
  },
  sidebarClosedOverlay: {
    borderRightWidth: 0,
    pointerEvents: 'none',
    transform: 'translateX(-100%)',
  },
  sidebarShadow: {
    boxShadow: '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a',
  },

  // Sidebar skeleton
  skeleton: {
    backgroundColor: color.surfaceCard,
    borderRightColor: color.hairline,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    flexShrink: 0,
    padding: space.lg,
    width: '160px',
  },
  skeletonThumb: {
    backgroundColor: color.canvas,
    borderRadius: radius.md,
    boxShadow: '0 0 0 1px #00000014 inset',
    height: '112px',
    marginInline: 'auto',
    overflow: 'hidden',
    width: '80px',
  },
  skeletonThumbInner: {
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationName: pulse,
    animationTimingFunction: 'ease-in-out',
    backgroundColor: color.surfaceSoft,
    height: '100%',
  },
  skeletonLabel: {
    backgroundColor: color.surfaceSoft,
    borderRadius: radius.full,
    height: '12px',
    marginTop: space.sm,
    marginInline: 'auto',
    width: '40px',
  },

  // Tooltip trigger wrapper
  inlineFlex: {
    display: 'inline-flex',
  },

  // Dropdown menu width
  dropdownMenuWidth: {
    width: '160px',
  },

  // Button font weight
  fontNormal: {
    fontWeight: text.weightRegular,
  },

  // Primary text color
  textPrimary: {
    color: color.primary,
  },

  // Thumbnail list container
  thumbListRelative: {
    position: 'relative',
  },
})
