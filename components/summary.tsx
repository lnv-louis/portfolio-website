"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/reactbits/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";

export function Summary() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transition from Red (Hero theme context) to Black
  // Since this is the second section, we can simulate the transition 
  // by having a background overlay that fades in/out or scales.
  
  // Let's make the background scale down to reveal the black background of this section
  // or rather, have this section slide over the previous one with a parallax effect.
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  return (
    <section ref={containerRef} className="snap-section relative bg-black flex items-center justify-center overflow-hidden">
      {/* Red background transformation element */}
      <motion.div 
        style={{ scaleY: scale, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-primary/20 to-black pointer-events-none origin-bottom"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-mono text-primary mb-8 uppercase tracking-widest">
                Professional Summary
            </h2>
            <ScrollReveal 
                baseOpacity={0.2} 
                enableBlur={true} 
                baseRotation={5} 
                className="text-2xl md:text-4xl font-bold text-white leading-tight"
            >
                AI-focused Full-stack software engineer (UCL, BSc CS 2028) with TypeScript/React, Tailwind, Supabase experience, shipping high-impact MVPs and ML pipelines (Facenet512, RetinaFace, RF, SVM). Lovable Hackathon winner (1/25+ teams) for a multi-stage fact-checking agent; built an under-5-second face-recognition data pipeline and scalable backends with Convex/Deno Edge. Eager to leverage skills in web development to create scalable and user-friendly web apps.
            </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
