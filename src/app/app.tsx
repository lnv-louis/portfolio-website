import * as stylex from "@stylexjs/stylex";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import { color, layout } from "@/tokens/token-consts.stylex";
import { AgentationToolbar } from "@/components/agentation";
import { LenisProvider } from "@/components/lenis-provider";
import { HeroSection } from "@/components/hero-section";
import { HackathonScenesSection } from "@/components/hackathon-scenes-section";
import { DevinLocalSection } from "@/components/devin-local-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { CommunitySection } from "@/components/community-section";
import { ResearchSection } from "@/components/research-section";
import { ContactSection } from "@/components/contact-section";

const pageStyles = stylex.create({
  page: {
    backgroundColor: color.canvas,
    minHeight: "100dvh",
  },
  rail: {
    backgroundColor: color.surfaceCard,
    borderLeftColor: color.hairlineStrong,
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderRightColor: color.hairlineStrong,
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    marginInline: "auto",
    maxWidth: layout.containerWide,
    position: "relative",
    width: "100%",
  },
  divider: {
    borderTopColor: color.hairlineStrong,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
  },
});

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <LenisProvider>
          <div {...stylex.props(pageStyles.page)}>
            <HeroSection />
            <div {...stylex.props(pageStyles.rail)}>
              <div {...stylex.props(pageStyles.divider)}>
                <HackathonScenesSection />
              </div>
              <div {...stylex.props(pageStyles.divider)}>
                <DevinLocalSection />
              </div>
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
            <AgentationToolbar />
          </div>
        </LenisProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
