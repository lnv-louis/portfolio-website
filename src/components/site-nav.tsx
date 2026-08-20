import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import Link from 'next/link'

import { navStyles } from '@/components/site-nav.stylex'

export function SiteNav() {
  return (
    <header {...stylex.props(navStyles.navbar)}>
      <svg aria-hidden="true" style={{ display: 'none' }}>
        <filter id="nav-glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.03"
            numOctaves={1}
            seed={17}
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div {...stylex.props(navStyles.navBody)}>
        <div {...stylex.props(navStyles.bar)}>
          <Link href="/" {...stylex.props(navStyles.wordmark)} aria-label="Louis Le home">
            <Image
              src="/favicon2.png"
              alt="Louis Le"
              width={28}
              height={28}
              {...stylex.props(navStyles.wordmarkLogo)}
            />
          </Link>

          <div {...stylex.props(navStyles.actions)}>
            <a
              href="https://x.com/lnv007"
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(navStyles.buttonBase, navStyles.buttonPrimary)}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
