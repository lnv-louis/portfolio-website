import * as stylex from '@stylexjs/stylex'

import { contactStyles } from '@/components/contact-section.stylex'

const CONTACT_ROWS = [
  { label: 'GitHub', value: 'github.com/lnv-louis', href: 'https://github.com/lnv-louis' },
  { label: 'LinkedIn', value: 'linkedin.com/in/le-nguyen-vu', href: 'https://linkedin.com/in/le-nguyen-vu' },
  { label: 'X', value: 'x.com/lnv007', href: 'https://x.com/lnv007' },
]

const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
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
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stylex.props(contactStyles.contactValue, contactStyles.contactLink)}
                >
                  {row.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer {...stylex.props(contactStyles.footer)}>
        <span>&copy; 2026 Louis Le. London.</span>
        <nav aria-label="Pages" {...stylex.props(contactStyles.footerNav)}>
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} {...stylex.props(contactStyles.footerLink)}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </section>
  )
}
