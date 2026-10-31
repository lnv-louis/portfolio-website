import * as stylex from '@stylexjs/stylex'

import { ProsePage, prose } from '@/components/prose-page'

function Link({ href, children }: { href: string; children: string }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...stylex.props(prose.link)}
    >
      {children}
    </a>
  )
}

export function AboutPage() {
  return (
    <ProsePage path="/about" title="About Louis Le">
      <p {...stylex.props(prose.p)}>
        I&rsquo;m Louis Le (Le Nguyen Vu), a software engineer in London building production AI
        systems for real estate. I&rsquo;m Co-Founder and CTO of <Link href="https://cf0.ai/">cf0.ai</Link>,
        where Zero lets and manages homes: it answers renters, runs viewings, finds tenants and
        looks after repairs after move-in. I study Computer Science at University College London
        (BSc, expected 2028).
      </p>

      <h2 {...stylex.props(prose.h2)}>Community</h2>
      <p {...stylex.props(prose.p)}>
        I co-founded <Link href="https://hackcollective.uk/">The Hack Collective</Link>, London&rsquo;s
        hackathon community of 1.2k+ members and 500+ calendar subscribers. I host, sponsor and
        partner on hackathons: Devin Local: London on behalf of Cognition, the London hub of
        Hack-Nation&rsquo;s 7th Global AI Hackathon, the Grok Bot Community Engineering Hackathon,
        and Paris Builds as a sponsor. I&rsquo;m a Devin AI Ambassador, a EuroTech Fellow, a
        Thinking About Thinking Fellow, and the 2025&ndash;2026 Nexus Labs Officer at UCL AI Society.
      </p>

      <h2 {...stylex.props(prose.h2)}>Projects</h2>
      <ul {...stylex.props(prose.list)}>
        <li>
          Grounded, an AI fact-checking platform: 1st place out of 25+ teams at the Lovable
          Hackathon. A multi-stage prompt chain traces claims through citation hierarchies.
        </li>
        <li>
          Dex, live facial recognition for networking events: 6th place at the Cursor London
          Evening Hack. Identifies attendees and surfaces their profiles in under 5 seconds.
        </li>
        <li>
          Homiq, an AI property search engine on an infinite canvas, researching homes against
          personal criteria like safety, schools and amenities.
        </li>
      </ul>

      <h2 {...stylex.props(prose.h2)}>Research</h2>
      <p {...stylex.props(prose.p)}>
        Two machine learning manuscripts:{' '}
        <Link href="https://media.lenguyenvu.com/ML-classification-leukaemia.pdf">
          cancer subtype classification
        </Link>{' '}
        (an RBF-SVM reaching 82% accuracy on acute myeloid leukaemia gene expression data) and{' '}
        <Link href="https://media.lenguyenvu.com/ML-sentiment-analysis.pdf">
          comparative sentiment analysis of financial news
        </Link>{' '}
        (LinearSVC against a bidirectional LSTM, F1 of 0.74).
      </p>

      <h2 {...stylex.props(prose.h2)}>Before</h2>
      <p {...stylex.props(prose.p)}>
        Technology intern at HTP Pharma in Ho Chi Minh City, automating customer-service and KPI
        workflows. IB Diploma 43/45 at the British International School HCMC, and the F1 in
        Schools World Finals 2024, representing Vietnam.
      </p>
    </ProsePage>
  )
}
