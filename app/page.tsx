"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/hero";
import { BentoGridSection } from "@/components/bento";
import { Projects } from "@/components/projects";
import { Research } from "@/components/research";
import { Contact } from "@/components/contact";
import { Loader } from "@/components/loader";
import { SVGDivider } from "@/components/svg-divider";
import { AnimatePresence, motion } from "framer-motion";

import { Maximize2, Minimize2 } from "lucide-react";

const D3ForceGraph = dynamic(() => import("@/components/d3-force-graph").then(m => m.D3ForceGraph), { ssr: false });
const TargetCursor = dynamic(() => import("@/components/reactbits/target-cursor"), { ssr: false });

function TechEcosystemSection() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Left: scroll-revealed bio text */}
          <div className="flex flex-col justify-center space-y-8 lg:pr-8">
            <div>
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                tech <span className="text-primary italic">ecosystem</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Drag nodes to explore connections. Hover to highlight relationships.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 text-muted-foreground leading-relaxed"
            >
              <p>
                AI infrastructure engineer building production multi-agent orchestration systems and LLM-powered financial platforms. Specialising in Claude Agent SDK, FastAPI microservices, and real-time data pipelines.
              </p>
              <p>
                Currently building <span className="text-foreground font-medium">cf0</span> — a financial intelligence platform with AI-powered equity research, dark pool analysis, and autonomous agent workflows processing 31 integrated APIs.
              </p>
              <p>
                Previous work spans hackathon-winning projects in AI fact-checking, facial recognition for networking, and property search engines. Research in cancer subtype classification with ML and financial sentiment analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {["Python", "TypeScript", "FastAPI", "React", "Claude SDK", "Redis", "Firestore", "Docker"].map(tag => (
                <span key={tag} className="inline-flex items-center border border-border px-3 py-1 text-xs font-mono text-muted-foreground">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: sticky D3 sandbox with border */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative border border-border bg-card/30 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
                <span className="text-xs font-mono text-muted-foreground tracking-wide uppercase">interactive graph</span>
                <button
                  onClick={() => setFullscreen(true)}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
              <div className="h-[400px] md:h-[500px]">
                <D3ForceGraph />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-mono text-foreground tracking-wide">tech ecosystem</h3>
              <button
                onClick={() => setFullscreen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Exit fullscreen"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1">
              <D3ForceGraph />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="w-full bg-background text-foreground selection:bg-primary selection:text-white overflow-y-auto scroll-smooth">
      <TargetCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
           <motion.div
             key="content"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
           >
              <Navbar />
              <Hero />
              <SVGDivider variant="circuit" />
              <BentoGridSection />
              <SVGDivider variant="wave" />
              <TechEcosystemSection />
              <SVGDivider variant="pulse" />
              <Projects />
              <SVGDivider variant="circuit" flip />
              <Research />
              <SVGDivider variant="wave" />
              <Contact />
          </motion.div>
        )}
      </AnimatePresence>
      </main>
  );
}
