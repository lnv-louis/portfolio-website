import * as stylex from '@stylexjs/stylex'

import { researchStyles } from '@/components/research-section.stylex'
import { PDFViewer } from '@/components/pdf-viewer'

const PDF_SRC = '/research/aml-classification-research-manuscript.pdf'

export function ResearchSection() {
  return (
    <section id="research" {...stylex.props(researchStyles.section)}>
      <div {...stylex.props(researchStyles.contentRow)}>
        <div {...stylex.props(researchStyles.textCol)}>
          <h2 {...stylex.props(researchStyles.heading)}>
            Authored a research manuscript on cancer subtype classification using machine learning.
          </h2>
        </div>

        <div {...stylex.props(researchStyles.viewerCol)}>
          <PDFViewer
            src={PDF_SRC}
            fileName="AML-Classification-Research-Manuscript.pdf"
            showDownload
            showRotateControls
            showToolbar
            showUpload={false}
          />
        </div>
      </div>
    </section>
  )
}
