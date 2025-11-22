"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  className?: string;
  textColor?: string;
  strokeColor?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  minFontSize?: number;
}

export default function TextPressure({
  text = "Compressa",
  fontFamily = "Compressa VF", // Ensure you have a variable font loaded or use a system one
  className = "",
  textColor = "#FFFFFF",
  strokeColor = "#FF0000",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  minFontSize = 24,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [spans, setSpans] = useState<JSX.Element[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [lineHeight, setLineHeight] = useState(1);

  useEffect(() => {
    if (scale && containerRef.current && titleRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      const newFontSize = Math.max(width, minFontSize);
      setFontSize(newFontSize);
      setLineHeight(newFontSize);
    }
  }, [scale, text, minFontSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // RAF loop for smooth cursor interpolation
    let rafId: number;
    const loop = () => {
        const dx = mouseRef.current.x - cursorRef.current.x;
        const dy = mouseRef.current.y - cursorRef.current.y;
        cursorRef.current.x += dx * 0.1;
        cursorRef.current.y += dy * 0.1;
        rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const chars = text.split("");
    const spans = chars.map((char, i) => (
      <span
        key={i}
        data-char={char}
        className="inline-block transition-all duration-100 ease-linear"
      >
        {char}
      </span>
    ));
    setSpans(spans);
  }, [text]);
  
  // In a real ReactBits implementation, this would interactively distort variable fonts.
  // Since we might not have a specific variable font loaded, we'll simulate pressure with standard CSS transforms for now
  // or rely on the fact that if the font IS variable, it would work.
  
  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
      <h1
        ref={titleRef}
        className={`text-center font-black uppercase leading-none ${
          flex ? "flex justify-between" : ""
        } ${stroke ? "stroke-text" : ""}`}
        style={{
            color: textColor, // Apply color directly here if stroke is false
            fontFamily,
            fontSize: scale ? fontSize : undefined,
            lineHeight: scale ? lineHeight : undefined,
            // Mock variable font settings if supported by the font
             fontVariationSettings: `"wdth" 100, "wght" 900`,
        }}
      >
        {spans}
      </h1>
      <style jsx>{`
        .stroke-text {
            -webkit-text-stroke: 2px ${strokeColor};
            color: transparent; 
        }
      `}</style>
    </div>
  );
}

