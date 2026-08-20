import * as stylex from '@stylexjs/stylex'
import { HugeiconsIcon } from '@hugeicons/react'
import ArrowUpRight01Icon from '@hugeicons/core-free-icons/ArrowUpRight01Icon'

import { researchStyles } from '@/components/research-section.stylex'

const MANUSCRIPTS = [
  {
    title: 'Machine Learning Classification of Leukaemia',
    fileName: 'ML-classification-leukaemia.pdf',
    src: 'https://media.lenguyenvu.com/ML-classification-leukaemia.pdf',
  },
  {
    title: 'Machine Learning Sentiment Analysis',
    fileName: 'ML-sentiment-analysis.pdf',
    src: 'https://media.lenguyenvu.com/ML-sentiment-analysis.pdf',
  },
]

export function ResearchSection() {
  return (
    <section id="research" {...stylex.props(researchStyles.section)}>
      <div {...stylex.props(researchStyles.contentRow)}>
        <div {...stylex.props(researchStyles.textCol)}>
          <h2 {...stylex.props(researchStyles.heading)}>
            Authored research manuscripts on AI for cancer classification and sentiment analysis.
          </h2>
        </div>

        <div {...stylex.props(researchStyles.viewerCol)}>
          {MANUSCRIPTS.map((manuscript) => (
            <div key={manuscript.fileName} {...stylex.props(researchStyles.pdfEntry)}>
              <a
                href={manuscript.src}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(researchStyles.pdfCard)}
              >
                <span {...stylex.props(researchStyles.pdfCardTitle)}>
                  {manuscript.title}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} strokeWidth={1.8} />
                </span>
                <span {...stylex.props(researchStyles.pdfCardMeta)}>
                  Open the manuscript
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
