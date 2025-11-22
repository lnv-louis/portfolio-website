import { cn } from "@/lib/utils";

interface DitherProps {
  className?: string;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export default function Dither({
    className,
    waveAmplitude = 10,
    waveFrequency = 5,
    waveSpeed = 0.05,
    enableMouseInteraction = true,
    mouseRadius = 1,
}: DitherProps) {
    return (
        <div className={cn("absolute inset-0 -z-10 pointer-events-none", className)}>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             {/* Gradient Overlay for depth */}
             <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background"></div>
        </div>
    );
}
