import * as stylex from '@stylexjs/stylex'

import { ProsePage, prose } from '@/components/prose-page'

export function NotFoundPage() {
  return (
    <ProsePage path="/404" title="Page not found">
      <p {...stylex.props(prose.p)}>
        There&rsquo;s nothing at this address. The site is one page plus an{' '}
        <a href="/about" {...stylex.props(prose.link)}>
          about
        </a>
        ,{' '}
        <a href="/contact" {...stylex.props(prose.link)}>
          contact
        </a>{' '}
        and{' '}
        <a href="/privacy" {...stylex.props(prose.link)}>
          privacy
        </a>{' '}
        page.
      </p>
      <p {...stylex.props(prose.p)}>
        <a href="/" {...stylex.props(prose.link)}>
          Go to the homepage
        </a>
      </p>
    </ProsePage>
  )
}
