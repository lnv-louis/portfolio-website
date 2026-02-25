"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SVGDividerProps {
  variant?: "wave" | "circuit" | "pulse";
  className?: string;
  flip?: boolean;
}

export function SVGDivider({ variant = "wave", className = "", flip = false }: SVGDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.4, 0.4, 0]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0, 0.6, 0.6, 0]);

  if (variant === "circuit") {
    const dotScales = [0, 1, 2, 3, 4].map(i =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTransform(scrollYProgress, [0.1 + i * 0.06, 0.2 + i * 0.06], [0, 1])
    );

    return (
      <div ref={ref} className={`w-full overflow-hidden ${className}`} style={{ transform: flip ? "scaleY(-1)" : undefined }}>
        <svg viewBox="0 0 1200 80" fill="none" className="w-full h-16 md:h-20">
          <motion.path
            d="M0 40 H200 L220 20 H400 L420 40 H600 L620 60 H800 L820 40 H1000 L1020 20 H1200"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength, opacity }}
          />
          {[200, 420, 620, 820, 1020].map((cx, i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={i % 2 === 0 ? 20 : 60}
              r="3"
              fill="var(--primary)"
              style={{ scale: dotScales[i], opacity: dotOpacity }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div ref={ref} className={`w-full overflow-hidden ${className}`} style={{ transform: flip ? "scaleY(-1)" : undefined }}>
        <svg viewBox="0 0 1200 60" fill="none" className="w-full h-12 md:h-16">
          <motion.path
            d="M0 30 H350 L380 8 L410 52 L440 8 L470 52 L500 30 H850 L880 8 L910 52 L940 8 L970 52 L1000 30 H1200"
            stroke="var(--primary)"
            strokeWidth="1.5"
            fill="none"
            style={{ pathLength, opacity }}
          />
        </svg>
      </div>
    );
  }

  // Default: wave
  const pathLength2 = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.05, 0.2, 0.85, 1], [0, 0.15, 0.15, 0]);

  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`} style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1200 60" fill="none" className="w-full h-12 md:h-16">
        <motion.path
          d="M0 30 C200 10, 400 50, 600 30 S1000 10, 1200 30"
          stroke="var(--primary)"
          strokeWidth="1"
          fill="none"
          style={{ pathLength, opacity }}
        />
        <motion.path
          d="M0 35 C300 55, 500 15, 700 35 S1100 55, 1200 35"
          stroke="var(--primary)"
          strokeWidth="0.5"
          fill="none"
          style={{ pathLength: pathLength2, opacity: opacity2 }}
        />
      </svg>
    </div>
  );
}
