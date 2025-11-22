"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  transition?: { duration: number; ease: string };
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
    <div className={cn("relative inline-flex h-[1.2em] overflow-hidden w-full justify-center md:justify-start", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={transition}
          className="absolute"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
