"use client";

import dynamic from "next/dynamic";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { CodeBlock, Terminal, Handshake, HardDrives, Brain } from "@phosphor-icons/react";

const IconCloud = dynamic(() => import("@/components/magicui/icon-cloud").then(m => m.IconCloud), { ssr: false });

const slugs = [
  "fastapi", "react", "typescript", "redis", "docker", "firebase", "python",
  "anthropic", "vercel", "github", "git", "cloudflare", "railway",
];

const features = [
  {
    Icon: CodeBlock,
    name: "AI infrastructure",
    description: "Multi-agent orchestration, LLM pipelines, and production financial systems with 31 integrated APIs.",
    href: "#projects",
    cta: "see projects",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0">
         <div className="relative flex h-full w-full max-w-lg items-center justify-center overflow-hidden bg-transparent px-8 pb-8 pt-8">
            <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    ),
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Terminal,
    name: "dev workflow",
    description: "Claude Code, Ghostty, tmux, Git Worktrees, parallel agent dispatch.",
    href: "#about",
    cta: "tools",
    background: (
        <div className="absolute inset-0 flex items-center justify-center bg-card mask-[linear-gradient(to_top,transparent_10%,black)]">
           <div className="grid grid-cols-2 gap-4 p-8 opacity-30">
                <div className="h-20 w-20 border border-primary/20 animate-pulse"></div>
                <div className="h-20 w-20 border border-primary/10 animate-pulse delay-75"></div>
                <div className="h-20 w-20 border border-primary/10 animate-pulse delay-150"></div>
                <div className="h-20 w-20 border border-primary/20 animate-pulse delay-200"></div>
           </div>
        </div>
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Handshake,
    name: "open to contracts",
    description: "Available for part-time AI/LLM engineering contracts. Let's build something.",
    href: "mailto:lelouis.lnv@gmail.com",
    cta: "get in touch",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-card to-background transition-all duration-300 group-hover:from-primary/5" />
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: HardDrives,
    name: "infrastructure",
    description: "FastAPI, Redis, Firestore, Pinecone RAG, Railway, Docker, Langfuse observability.",
    href: "#",
    cta: "stack",
    background: <div className="absolute inset-0 bg-card/30" />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Brain,
    name: "research",
    description: "Cancer subtype classification and financial sentiment analysis manuscripts.",
    href: "#research",
    cta: "read",
    background: <div className="absolute inset-0 bg-card/30" />,
    className: "col-span-3 lg:col-span-1",
  },
];

export function BentoGridSection() {
  return (
    <section id="about" className="relative container mx-auto px-6 py-24 flex flex-col justify-center bg-background">
        <div className="w-full h-full flex flex-col justify-center z-10">
            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                what I <span className="text-primary inline-block italic">work with</span>
                </h2>
                <p className="mt-4 max-w-[700px] text-muted-foreground">
                    Tools and systems for building production AI infrastructure.
                </p>
            </div>
            <BentoGrid className="lg:grid-rows-2">
                {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    </section>
  );
}
