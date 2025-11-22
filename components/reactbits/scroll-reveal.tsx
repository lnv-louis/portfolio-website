import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export default function ScrollReveal({
  children,
  className,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word');

    gsap.fromTo(
      words,
      { opacity: baseOpacity, filter: enableBlur ? 'blur(4px)' : 'none', transform: `rotate(${baseRotation}deg) translateY(40%)` },
      {
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'rotate(0deg) translateY(0%)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=100',
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [baseOpacity, enableBlur, baseRotation, wordAnimationEnd]);

  const splitText = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em] origin-left">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={cn("relative leading-relaxed", className)}>
        {/* 
            This basic implementation assumes children is mostly text. 
            For mixed content, a more complex parser is needed.
            Here we just wrap the whole children if it's not a string, 
            or split if it is.
        */}
        {typeof children === 'string' ? splitText(children) : (
            // If children is complex, we just animate the container or elements with class 'word' if user provides them
            <div className="word">{children}</div>
        )}
    </div>
  );
}

