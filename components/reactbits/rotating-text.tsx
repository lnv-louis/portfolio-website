"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  transition?: Transition;
}

export default function RotatingText({
  texts,
  className,
  transition = { duration: 0.5, ease: "easeInOut" },
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={cn("relative flex flex-wrap justify-center md:justify-start items-center text-xl sm:text-2xl md:text-3xl font-mono text-neutral-400 min-h-[3rem]", className)}>
      <span className="mr-2 text-primary font-bold">
        <AnimatePresence mode="wait">
            <motion.span
            key={index}
            initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
            transition={transition}
            className="inline-block"
            >
            {texts[index]}
            </motion.span>
        </AnimatePresence>
      </span>
      <span className="whitespace-nowrap">Software Engineer</span>
    </div>
  );
}
