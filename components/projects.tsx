"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/reactbits/spotlight-card";
import { Lens } from "@/components/magicui/lens";
import Link from "next/link";

const projects = [
  {
    title: "Grounded",
    category: "AI Fact-Checking Platform",
    description:
      "1st Place Winner, Lovable Hackathon. Multi-stage prompt chain with Perplexity’s Sonar Pro Model to recursively trace claims through citation hierarchies.",
    video: "/Grounded Lovable Demo.mp4",
    tags: ["React", "Supabase", "Deno Edge Functions", "AI"],
    href: "https://github.com/lnv-louis/grounded-fact-checking",
  },
  {
    title: "Dex",
    category: "Live Facial Recognition",
    description:
      "Real-time facial recognition data pipeline to identify event attendees in <5 seconds. Scraped Luma & LinkedIn, implemented Facenet512 & RetinaFace.",
    video: "/Dex Cursor Demo.mp4",
    tags: ["Python", "Facenet512", "Chrome Extension", "Convex"],
    href: "https://github.com/lnv-louis/dex-face-recognition",
  },
  {
    title: "Homiq",
    category: "AI Property Search",
    description:
      "Intuitive property search tool using Perplexity’s Sonar Pro model. Infinite canvas UI displaying insights as modular widgets.",
    video: "/Homiq Perplexity Demo.mp4",
    tags: ["Next.js", "Tailwind", "Perplexity API", "React Flow"],
    href: "https://github.com/lnv-louis/homiq-property-search-engine",
  },
];

export function Projects() {
  return (
    <div id="projects" className="flex flex-col w-full">
      {/* Intro Section - Optional or merged with first project */}
      <section className="snap-section flex items-center justify-center min-h-[50vh] md:min-h-[60vh]">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl font-mono">
            Selected <span className="text-primary">Projects</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-neutral-400">
            A showcase of my recent work in AI, full-stack development, and research.
            </p>
         </div>
      </section>

      {projects.map((project, index) => (
        <section key={index} className="snap-section w-full flex items-center justify-center py-12 md:py-0">
          <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }} // Re-animate on scroll
                className="w-full"
            >
                <SpotlightCard className="w-full overflow-hidden rounded-3xl border-neutral-800 bg-neutral-900/50 p-0 shadow-2xl" spotlightColor="rgba(239, 68, 68, 0.15)">
                    <div className="flex flex-col lg:flex-row h-full min-h-[60vh] lg:h-[70vh]">
                        {/* Video Section - 65% on desktop */}
                        <div className="relative w-full lg:w-[65%] h-[300px] lg:h-full overflow-hidden bg-neutral-950 group">
                             {/* Video Background */}
                            <video 
                                src={project.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Lens Effect over video - tricky with video but works for interactions */}
                            {/* Actually Lens over video might be performance heavy or buggy with z-index. Let's stick to simple hover scale for video or use Lens cautiously. */}
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-neutral-900/90 pointer-events-none"></div>
                        </div>

                        {/* Content Section - 35% on desktop */}
                        <div className="flex flex-col justify-center p-8 lg:w-[35%] lg:p-12 bg-neutral-900/20 backdrop-blur-sm">
                            <div className="mb-6 flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="mb-4 text-3xl font-bold text-white md:text-5xl tracking-tight">{project.title}</h3>
                            <p className="mb-4 text-lg font-medium text-primary">{project.category}</p>
                            <p className="mb-8 text-neutral-400 leading-relaxed text-base md:text-lg">{project.description}</p>

                            <div className="mt-auto">
                                <Button size="lg" className="group w-full md:w-auto rounded-full bg-white text-black hover:bg-neutral-200 font-bold tracking-wide" asChild>
                                    <Link href={project.href} target="_blank">
                                        View Project <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
