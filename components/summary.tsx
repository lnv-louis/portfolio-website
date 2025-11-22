"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/reactbits/scroll-reveal";

export function Summary() {
  return (
    <section className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl text-center">
        <h2 className="text-sm font-mono text-primary mb-8 uppercase tracking-widest">
            Professional Summary
        </h2>
        <ScrollReveal 
            baseOpacity={0.2} 
            enableBlur={true} 
            baseRotation={5} 
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
        >
            AI-focused Full-stack software engineer (UCL, BSc CS 2028) with TypeScript/React, Tailwind, Supabase experience, shipping high-impact MVPs and ML pipelines (Facenet512, RetinaFace, RF, SVM). Lovable Hackathon winner (1/25+ teams) for a multi-stage fact-checking agent; built an under-5-second face-recognition data pipeline and scalable backends with Convex/Deno Edge. Eager to leverage skills in web development to create scalable and user-friendly web apps.
        </ScrollReveal>
      </div>
    </section>
  );
}

