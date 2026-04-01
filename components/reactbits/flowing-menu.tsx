import React, { useRef } from 'react';
import Link from 'next/link';

interface FlowingMenuProps {
  items: {
    text: string;
    image: string;
    link: string;
  }[];
}

export default function FlowingMenu({ items = [] }: FlowingMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (image: string) => {
    if (revealImgRef.current && revealRef.current) {
      revealRef.current.style.opacity = '1';
      revealImgRef.current.style.backgroundImage = `url(${image})`;
    }
  };

  const handleMouseLeave = () => {
     if (revealRef.current) {
        revealRef.current.style.opacity = '0';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (revealRef.current) {
        const { clientX, clientY } = e;
        revealRef.current.style.transform = `translate(${clientX - 150}px, ${clientY - 200}px)`;
    }
  };

  return (
    <div
        ref={menuRef}
        className="relative flex flex-col items-center justify-center space-y-4 py-10 md:py-20 min-h-screen md:min-h-0"
        onMouseMove={handleMouseMove}
    >
      {items.map((item, index) => (
        <div
            key={index}
            className="group relative z-10 cursor-pointer mix-blend-difference"
            onMouseEnter={() => handleMouseEnter(item.image)}
            onMouseLeave={handleMouseLeave}
        >
          <Link href={item.link} className="block text-5xl font-black uppercase tracking-tighter text-white transition-colors hover:text-transparent hover:stroke-white sm:text-7xl md:text-9xl">
            <span className="relative z-20 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-white/20" style={{ WebkitTextStroke: "1px transparent" }}>
                 {item.text}
            </span>
             <span className="absolute inset-0 z-10 text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                 {item.text}
            </span>
          </Link>
        </div>
      ))}

      {/* Hide reveal image on mobile as mouse move isn't applicable */}
      <div
        ref={revealRef}
        className="pointer-events-none fixed top-0 left-0 z-0 h-[300px] w-[200px] md:h-[400px] md:w-[300px] overflow-hidden rounded-lg opacity-0 hidden md:block"
        style={{
          transition: 'opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform, opacity',
        }}
      >
        <div
          ref={revealImgRef}
          className="h-full w-full bg-cover bg-center"
        ></div>
      </div>
    </div>
  );
}
