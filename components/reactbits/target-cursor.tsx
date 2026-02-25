"use client";

import React, { useEffect, useRef } from 'react';

export default function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const animate = () => {
      cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -ml-3 -mt-3 hidden h-6 w-6 items-center justify-center rounded-full border border-white mix-blend-difference md:flex"
        style={{ willChange: 'transform' }}
    >
        <div className="h-1 w-1 rounded-full bg-white"></div>
    </div>
  );
}
