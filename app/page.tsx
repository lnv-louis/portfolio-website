import * as stylex from "@stylexjs/stylex";

import { color, layout } from "@/tokens/token-consts.stylex";
import { SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/hero-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CommunitySection } from "@/components/community-section";
import { ResearchSection } from "@/components/research-section";
import { ContactSection } from "@/components/contact-section";

const pageStyles = stylex.create({
  page: {
    backgroundColor: color.canvas,
    minHeight: '100dvh',
  },
  rail: {
    backgroundColor: color.surfaceCard,
    borderLeftColor: color.hairlineStrong,
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderRightColor: color.hairlineStrong,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    marginInline: 'auto',
    maxWidth: layout.containerWide,
    position: 'relative',
    width: '100%',
  },
  divider: {
    borderTopColor: color.hairlineStrong,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
});

export default async function Home() {
  "use cache";
  return (
    <div {...stylex.props(pageStyles.page)}>
      <SiteNav />
      <HeroSection />
      <div {...stylex.props(pageStyles.rail)}>
        <div {...stylex.props(pageStyles.divider)}>
          <CapabilitiesSection />
        </div>
        <div {...stylex.props(pageStyles.divider)}>
          <CommunitySection />
        </div>
        <div {...stylex.props(pageStyles.divider)}>
          <ResearchSection />
        </div>
        <div {...stylex.props(pageStyles.divider)}>
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
