import * as stylex from '@stylexjs/stylex'

import { ProsePage, prose } from '@/components/prose-page'

export function PrivacyPage() {
  return (
    <ProsePage path="/privacy" title="Privacy">
      <p {...stylex.props(prose.p)}>
        lenguyenvu.com is a personal website. It has no accounts, no forms, no newsletter and no
        advertising. It sets no cookies and stores nothing in your browser.
      </p>
      <h2 {...stylex.props(prose.h2)}>What is processed when you visit</h2>
      <ul {...stylex.props(prose.list)}>
        <li>
          The site is hosted on Cloudflare. Like any web host, Cloudflare processes request data
          such as your IP address and browser user agent to deliver pages and protect the site
          from abuse.
        </li>
        <li>
          Cloudflare Web Analytics is enabled on the domain. It counts page views without cookies
          and without tracking you across other sites.
        </li>
        <li>
          Photos, films and PDFs are served from media.lenguyenvu.com, also on Cloudflare.
        </li>
        <li>
          Fonts load from Google Fonts, so your browser sends a request to Google when the page
          loads.
        </li>
      </ul>
      <h2 {...stylex.props(prose.h2)}>Links and AI agents</h2>
      <p {...stylex.props(prose.p)}>
        Links to other sites, such as LinkedIn, X, GitHub and event pages, follow those
        sites&rsquo; own privacy policies. AI search engines and assistants may read and cite this
        site&rsquo;s public pages; crawlers that train AI models are asked not to via robots.txt.
      </p>
      <h2 {...stylex.props(prose.h2)}>Questions</h2>
      <p {...stylex.props(prose.p)}>
        For anything about this policy, message me through one of the channels on the{' '}
        <a href="/contact" {...stylex.props(prose.link)}>
          contact page
        </a>
        . Last updated 31 October 2026.
      </p>
    </ProsePage>
  )
}
