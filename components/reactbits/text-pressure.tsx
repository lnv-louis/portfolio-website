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
  variableProximity?: boolean; // Add prop for proximity effect
}

export default function TextPressure({
  text = "Compressa",
  fontFamily = "Compressa VF",
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
  variableProximity = false,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    if (!variableProximity) return;

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

        // Update Variable Font Settings based on proximity
        if (containerRef.current) {
             const spans = containerRef.current.querySelectorAll('span.char-span');
             spans.forEach((span: Element) => {
                 const rect = span.getBoundingClientRect();
                 const spanX = rect.left + rect.width / 2;
                 const spanY = rect.top + rect.height / 2;
                 
                 const dist = Math.sqrt(Math.pow(spanX - cursorRef.current.x, 2) + Math.pow(spanY - cursorRef.current.y, 2));
                 const maxDist = 500;
                 const proximity = Math.max(0, 1 - dist / maxDist);

                 // Map proximity to variable font axes (weight, width)
                 // wght: 100-900, wdth: 50-100
                 const wght = 900 - (proximity * 800); // Gets thinner closer? Or bolder? Let's say thinner as "pressure"
                 const wdth = 100 - (proximity * 50);
                 
                 // If we are just simulating using CSS transform for now as Impact doesn't have axes
                 (span as HTMLElement).style.transform = `scale(${1 + proximity * 0.2})`;
                 (span as HTMLElement).style.color = proximity > 0.5 ? strokeColor : textColor;
             });
        }

        rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafId);
    };
  }, [variableProximity, strokeColor, textColor]);

  
  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
      <h1
        ref={titleRef}
        className={`text-center font-black uppercase leading-none w-full flex justify-between items-end h-full ${stroke ? "stroke-text" : ""}`}
        style={{
            color: textColor, 
            fontFamily,
            fontSize: "18vw", 
            lineHeight: 0.8,
        }}
      >
        {text.split("").map((char, i) => (
            <span key={i} className="block char-span transition-colors duration-75">{char}</span>
        ))}
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
