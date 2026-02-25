import { cn } from "@/lib/utils";

interface DitherProps {
  className?: string;
}

export default function Dither({ className }: DitherProps) {
    return (
        <div className={cn("absolute inset-0 -z-10 pointer-events-none", className)}>
             <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
               <filter id="noise">
                 <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
               </filter>
               <rect width="100%" height="100%" filter="url(#noise)" />
             </svg>
             <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background"></div>
        </div>
    );
}
