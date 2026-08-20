import * as stylex from '@stylexjs/stylex'

import { contactStyles } from '@/components/contact-section.stylex'

const CONTACT_ROWS = [
  { label: 'Email', value: 'lelouis.lnv@gmail.com', href: 'mailto:lelouis.lnv@gmail.com' },
  { label: 'GitHub', value: 'github.com/lnv-louis', href: 'https://github.com/lnv-louis' },
  { label: 'LinkedIn', value: 'linkedin.com/in/le-nguyen-vu', href: 'https://linkedin.com/in/le-nguyen-vu' },
  { label: 'X', value: 'x.com/lnv007', href: 'https://x.com/lnv007' },
]

export function ContactSection() {
  return (
    <section id="contact" {...stylex.props(contactStyles.section)}>
      <div {...stylex.props(contactStyles.grid)}>
        <div {...stylex.props(contactStyles.imageCol)}>
          <div {...stylex.props(contactStyles.imageFrame)}>
            <img
              src="https://media.lenguyenvu.com/contact-photo.webp"
              alt=""
              loading="lazy"
              decoding="async"
              {...stylex.props(contactStyles.objectCover)}
            />
          </div>
        </div>

        <div {...stylex.props(contactStyles.textCol)}>
          <div {...stylex.props(contactStyles.copy)}>
            <h2 {...stylex.props(contactStyles.heading)}>
              Let&rsquo;s build together.
            </h2>
          </div>

          <div {...stylex.props(contactStyles.contactList)}>
            {CONTACT_ROWS.map((row, i) => (
              <div
                key={row.label}
                {...stylex.props(
                  contactStyles.contactRow,
                  i === 0 && contactStyles.contactRowFirst,
                )}
              >
                <span {...stylex.props(contactStyles.contactLabel)}>{row.label}</span>
                <a
                  href={row.href}
                  target={row.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={row.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  {...stylex.props(contactStyles.contactValue, contactStyles.contactLink)}
                >
                  {row.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div {...stylex.props(contactStyles.footer)}>
        &copy; 2026 Louis Le. London.
      </div>
    </section>
  )
}
