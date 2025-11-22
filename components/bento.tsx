"use client";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { Code2, Palette, Share2, Database, Cpu } from "lucide-react";

const slugs = [
  "typescript", "javascript", "react", "html5", "css3", "nodedotjs", "express",
  "nextdotjs", "prisma", "amazonaws", "postgresql", "firebase", "nginx", "vercel",
  "testinglibrary", "jest", "cypress", "docker", "git", "jira", "github", "gitlab",
  "visualstudiocode", "androidstudio", "sonarqube", "figma", "python", "tensorflow",
  "keras", "scikitlearn", "pandas", "numpy", "supabase", "deno",
];

const features = [
  {
    Icon: Code2,
    name: "Full Stack & AI",
    description: "Shipping high-impact MVPs and ML pipelines (Facenet512, RetinaFace, RF, SVM).",
    href: "#projects",
    cta: "View Code",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
         <div className="relative flex h-full w-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background px-8 pb-8 pt-8 ">
            <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    ),
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Palette,
    name: "Dev & Design",
    description: "Excels in both development and design to create a seamless user experience.",
    href: "#about",
    cta: "Learn more",
    background: (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 mask-[linear-gradient(to_top,transparent_10%,black)]">
           <div className="grid grid-cols-2 gap-4 p-8 opacity-40">
                <div className="h-20 w-20 rounded-lg bg-neutral-800 animate-pulse"></div>
                <div className="h-20 w-20 rounded-lg bg-primary/20 animate-pulse delay-75"></div>
                <div className="h-20 w-20 rounded-lg bg-neutral-800 animate-pulse delay-150"></div>
                <div className="h-20 w-20 rounded-lg bg-neutral-800 animate-pulse delay-200"></div>
           </div>
        </div>
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Share2,
    name: "Open to Collaborations",
    description: "Whether a small project or your next big SaaS, I am always open to new ideas.",
    href: "mailto:lelouis.lnv@gmail.com",
    cta: "Contact Me",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-neutral-900 to-black transition-all duration-300 group-hover:bg-neutral-800" />
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Database,
    name: "Backend & DB",
    description: "Supabase, Convex, Deno Edge Functions, PostgreSQL.",
    href: "#",
    cta: "Stack",
    background: <div className="absolute inset-0 bg-neutral-900/50" />,
    className: "col-span-3 lg:col-span-1",
  },
    {
    Icon: Cpu,
    name: "ML & Research",
    description: "Published research on Cancer Subtype Classification & Sentiment Analysis.",
    href: "#",
    cta: "Read",
    background: <div className="absolute inset-0 bg-neutral-900/50" />,
    className: "col-span-3 lg:col-span-1",
  },
];

export function BentoGridSection() {
  // Reverted to standard design without complex color transitions as requested.
  return (
    <section id="about" className="snap-section relative container mx-auto px-6 py-20 flex flex-col justify-center min-h-screen bg-black">
        <div className="w-full h-full flex flex-col justify-center z-10">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Focusing on the <span className="text-primary inline-block">Best</span>
                </h2>
                <p className="mt-4 max-w-[700px] text-neutral-400">
                    My toolkit for building scalable, high-performance applications.
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
