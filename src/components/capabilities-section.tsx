import * as stylex from '@stylexjs/stylex'

import { capsStyles } from '@/components/capabilities-section.stylex'
import { ProductDemoSection } from '@/components/product-demo-section'

export function CapabilitiesSection() {
  return (
    <section id="about" {...stylex.props(capsStyles.section)}>
      <div {...stylex.props(capsStyles.headingBlock)}>
        <h2 {...stylex.props(capsStyles.heading)}>
          Building production systems at the intersection of AI and finance.
        </h2>
      </div>

      <ProductDemoSection />
    </section>
  )
}
