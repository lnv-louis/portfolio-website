"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/reactbits/spotlight-card";
import Link from "next/link";

const getR2UrlRoot = (filename: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
    if (!baseUrl) return `/${filename}`;
    const cleanBase = baseUrl.replace(/\/$/, "");
    return `${cleanBase}/${encodeURIComponent(filename)}`;
};

const projects = [
  {
    title: "Grounded",
    category: "AI fact-checking platform",
    description:
      "1st place, Lovable Hackathon. Multi-stage prompt chain with Perplexity's Sonar Pro tracing claims through citation hierarchies across 6+ sources per query.",
    video: getR2UrlRoot("Grounded Lovable Demo.mp4"),
    tags: ["React", "Supabase", "Deno Edge Functions", "Perplexity API"],
    href: "https://github.com/lnv-louis/grounded-fact-checking",
  },
  {
    title: "Dex",
    category: "live facial recognition for networking",
    description:
      "6th place, Cursor London. Full recognition pipeline: Luma event scraper, Apify LinkedIn enrichment, Facenet512 embeddings, and live camera matching with RetinaFace. Sub-2-second identification, cosine similarity in <100ms.",
    video: getR2UrlRoot("Dex Cursor Demo.mp4"),
    tags: ["Python", "Facenet512", "RetinaFace", "Convex"],
    href: "https://github.com/lnv-louis/dex-face-recognition",
  },
  {
    title: "Homiq",
    category: "AI property search engine",
    description:
      "Perplexity Hackathon. Draggable, resizable widget system on an infinite zoomable canvas. Server-side streaming from Perplexity's Sonar Pro generates full research dashboards.",
    video: getR2UrlRoot("Homiq Perplexity Demo.mp4"),
    tags: ["Next.js", "react-grid-layout", "Perplexity API"],
    href: "https://github.com/lnv-louis/homiq-property-search-engine",
  },
];

export function Projects() {
  return (
    <div id="projects" className="flex flex-col w-full">
      <section className="flex items-center justify-center py-24">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-light tracking-tighter text-foreground sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            selected <span className="text-primary">projects</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-muted-foreground">
            Recent work in AI infrastructure, agent orchestration, and applied ML.
            </p>
         </div>
      </section>

      {projects.map((project, index) => (
        <section key={index} className="w-full flex items-center justify-center py-12 md:py-32">
          <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full"
            >
                <SpotlightCard className="w-full overflow-hidden border-border bg-card/50 p-0 shadow-2xl" spotlightColor="rgba(239, 68, 68, 0.15)">
                    <div className="flex flex-col lg:flex-row h-full min-h-[60vh] lg:h-[70vh]">
                        <div className="relative w-full lg:w-[65%] h-[300px] lg:h-full overflow-hidden bg-background group">
                            {project.video ? (
                              <video
                                  src={project.video}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-card">
                                <span className="text-6xl md:text-8xl font-light text-primary/20" style={{ fontFamily: "Georgia, serif" }}>{project.title}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/70 pointer-events-none"></div>
                        </div>

                        <div className="flex flex-col justify-center p-8 lg:w-[35%] lg:p-12 bg-card/20 backdrop-blur-sm">
                            <div className="mb-6 flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{project.title}</h3>
                            <p className="mb-4 text-lg font-medium text-primary">{project.category}</p>
                            <p className="mb-8 text-muted-foreground leading-relaxed text-base md:text-lg">{project.description}</p>

                            <div className="mt-auto">
                                <Button size="lg" className="group w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide" asChild>
                                    <Link href={project.href} target="_blank">
                                        view project <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
