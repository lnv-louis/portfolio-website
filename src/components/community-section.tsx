import * as stylex from '@stylexjs/stylex'
import { HugeiconsIcon } from '@hugeicons/react'
import ArrowUpRight01Icon from '@hugeicons/core-free-icons/ArrowUpRight01Icon'

import { communityStyles } from '@/components/community-section.stylex'

const ITEMS = [
  {
    title: 'tradingview-mcp contributor.',
    href: 'https://github.com/tradesdontlie/tradingview-mcp',
  },
]

export function CommunitySection() {
  return (
    <section id="community" {...stylex.props(communityStyles.section)}>
      <div {...stylex.props(communityStyles.headingBlock)}>
        <h2 {...stylex.props(communityStyles.heading)}>
          Open source and community.
        </h2>
      </div>

      <div {...stylex.props(communityStyles.itemList)}>
        {ITEMS.map((item, i) => (
          <div
            key={i}
            {...stylex.props(communityStyles.item, i === 0 && communityStyles.itemFirst)}
          >
            <div {...stylex.props(communityStyles.itemHeader)}>
              <h3>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stylex.props(communityStyles.itemTitleLink)}
                >
                  {item.title}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} {...stylex.props(communityStyles.linkIcon)} />
                </a>
              </h3>
              <span {...stylex.props(communityStyles.itemNumber)}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}

        <div {...stylex.props(communityStyles.item)}>
          <div {...stylex.props(communityStyles.itemHeader)}>
            <h3>
              <a
                href="https://luma.com/thehackcollective"
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(communityStyles.itemTitleLink)}
              >
                Co-founder @ The Hack Collective.
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} {...stylex.props(communityStyles.linkIcon)} />
              </a>
              <br />
              <a
                href="https://uclaisociety.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(communityStyles.itemTitleLink)}
              >
                2025-2026 Nexus Labs Officer @ UCL AI Society.
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} {...stylex.props(communityStyles.linkIcon)} />
              </a>
            </h3>
            <span {...stylex.props(communityStyles.itemNumber)}>02</span>
          </div>
        </div>
      </div>
    </section>
  )
}
