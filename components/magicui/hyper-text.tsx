"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  className?: string;
  duration?: number;
  framerProps?: any;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function HyperText({
  text,
  className,
  duration = 800,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    if (!trigger) return;

    intervalRef.current = setInterval(() => {
      if (iterations.current < text.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= iterations.current
              ? text[i]
              : alphabets[Math.floor(Math.random() * 26)]
          )
        );
        iterations.current = iterations.current + 0.1;
      } else {
        setDisplayText(text.split(""));
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTrigger(false);
      }
    }, duration / (text.length * 10));

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, duration, trigger]);

  return (
    <span
      className={cn("inline-block font-mono cursor-default", className)}
      onMouseEnter={triggerAnimation}
    >
      {displayText.join("")}
    </span>
  );
}

import { useState } from "react";

