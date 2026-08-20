import * as stylex from '@stylexjs/stylex'
import { HugeiconsIcon } from '@hugeicons/react'
import Github01Icon from '@hugeicons/core-free-icons/Github01Icon'
import Linkedin01Icon from '@hugeicons/core-free-icons/Linkedin01Icon'
import Image from 'next/image'

import { heroStyles } from '@/components/hero-section.stylex'
import {
  StaggerReveal,
  StaggerRevealHeadline,
  StaggerRevealItem,
} from '@/components/stagger-reveal'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/lnv-louis', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/le-nguyen-vu', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/lnv007', icon: 'x' },
]

const CURRENT_WORK = [
  {
    id: 'cf0',
    href: 'https://cf0.ai/',
    label: 'Currently building cf0.ai',
    tooltip: <>The AI brain for funds and family offices.</>,
  },
  {
    id: 'hack-collective',
    href: 'https://luma.com/thehackcollective',
    label: 'Currently building The Hack Collective',
    tooltip: <>A London hackathon community with 1,000+ members.</>,
  },
  {
    id: 'devin',
    href: 'https://devin.ai/',
    label: 'Currently a Devin AI Ambassador.',
    tooltip: (
      <>
        Frontier AI built by{' '}
        <a
          href="https://cognition.com/"
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(heroStyles.tooltipLink)}
        >
          Cognition AI
        </a>
        .
      </>
    ),
  },
]

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function HeroSection() {
  return (
    <section {...stylex.props(heroStyles.section)}>
      <div {...stylex.props(heroStyles.wrapper)}>
        <div {...stylex.props(heroStyles.portrait)}>
          <div {...stylex.props(heroStyles.portraitFrame)}>
            <Image
              src="/le-nguyen-vu.png"
              alt="Louis Le"
              fill
              sizes="(max-width: 960px) 240px, 360px"
              {...stylex.props(heroStyles.objectCover)}
              priority
            />
          </div>
        </div>

        <StaggerReveal className={stylex.props(heroStyles.content).className}>
          <StaggerRevealHeadline
            id="hero-heading"
            className={stylex.props(heroStyles.heading).className}
            ariaLabel="Hi, I am Louis."
          >
            Hi, I am Louis.
          </StaggerRevealHeadline>

          <StaggerRevealItem
            as="p"
            className={stylex.props(heroStyles.subheading).className}
          >
            {CURRENT_WORK.map((item, i) => (
              <span key={item.id}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...stylex.props(heroStyles.subheadingLink)}
                      />
                    }
                  >
                    {item.label}
                  </TooltipTrigger>
                  <TooltipContent>{item.tooltip}</TooltipContent>
                </Tooltip>
                {i < CURRENT_WORK.length - 1 && <br />}
              </span>
            ))}
          </StaggerRevealItem>

          <StaggerRevealItem className={stylex.props(heroStyles.socials).className}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                {...stylex.props(heroStyles.socialLink)}
              >
                {social.icon === 'github' && (
                  <HugeiconsIcon icon={Github01Icon} size={18} strokeWidth={1.8} />
                )}
                {social.icon === 'linkedin' && (
                  <HugeiconsIcon icon={Linkedin01Icon} size={18} strokeWidth={1.8} />
                )}
                {social.icon === 'x' && <XIcon />}
              </a>
            ))}
          </StaggerRevealItem>
        </StaggerReveal>
      </div>
    </section>
  )
}
