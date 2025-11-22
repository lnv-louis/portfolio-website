"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div 
        ref={cursorRef} 
        className="pointer-events-none fixed top-0 left-0 z-[9999] -ml-3 -mt-3 hidden h-6 w-6 items-center justify-center rounded-full border border-white mix-blend-difference md:flex"
    >
        <div className="h-1 w-1 rounded-full bg-white"></div>
    </div>
  );
}

