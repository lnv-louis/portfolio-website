import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { proseStyles as styles } from '@/components/prose-page.stylex'

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
]

export function ProsePage({ path, title, children }: { path: string; title: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.rail)}>
        <header {...stylex.props(styles.header)}>
          <a href="/" {...stylex.props(styles.home)}>
            Louis Le
          </a>
          <nav aria-label="Pages" {...stylex.props(styles.nav)}>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.href === path ? 'page' : undefined}
                {...stylex.props(styles.navLink, item.href === path && styles.navLinkCurrent)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>
        <main {...stylex.props(styles.main)}>
          <h1 {...stylex.props(styles.title)}>{title}</h1>
          {children}
        </main>
        <footer {...stylex.props(styles.footer)}>&copy; 2026 Louis Le. London.</footer>
      </div>
    </div>
  )
}

export const prose = styles
