import * as stylex from '@stylexjs/stylex'

import { ProsePage, prose } from '@/components/prose-page'

const CHANNELS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/le-nguyen-vu', value: 'linkedin.com/in/le-nguyen-vu' },
  { label: 'X', href: 'https://x.com/lnv007', value: 'x.com/lnv007' },
  { label: 'GitHub', href: 'https://github.com/lnv-louis', value: 'github.com/lnv-louis' },
  { label: 'The Hack Collective', href: 'https://hackcollective.uk/', value: 'hackcollective.uk' },
]

export function ContactPage() {
  return (
    <ProsePage path="/contact" title="Contact">
      <p {...stylex.props(prose.p)}>
        I&rsquo;m based in London. You can reach me by direct message on LinkedIn or X. My code and
        open source work live on GitHub. For hackathons in London, The Hack Collective is the
        community I co-founded: its calendar lists London hackathons, and it&rsquo;s how I partner
        with organisers and sponsors.
      </p>
      <ul {...stylex.props(prose.list)}>
        {CHANNELS.map((channel) => (
          <li key={channel.href}>
            {channel.label}:{' '}
            <a href={channel.href} target="_blank" rel="noopener noreferrer" {...stylex.props(prose.link)}>
              {channel.value}
            </a>
          </li>
        ))}
      </ul>
      <h2 {...stylex.props(prose.h2)}>Elsewhere</h2>
      <p {...stylex.props(prose.p)}>
        For cf0.ai and Zero, the AI that lets and manages homes, see{' '}
        <a href="https://cf0.ai/" target="_blank" rel="noopener noreferrer" {...stylex.props(prose.link)}>
          cf0.ai
        </a>
        . For background on my work, projects and research, see the{' '}
        <a href="/about" {...stylex.props(prose.link)}>
          about page
        </a>
        .
      </p>
    </ProsePage>
  )
}
