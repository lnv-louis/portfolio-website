"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TextPressure from "@/components/reactbits/text-pressure";
import Dither from "@/components/reactbits/dither";

export function Contact() {
  return (
    <footer id="contact" className="relative bg-background pt-24 overflow-hidden w-full h-full flex flex-col justify-between snap-section">
      {/* Dither Effect at the bottom/footer */}
      <Dither className="opacity-50" />

      <div className="container mx-auto px-6 mb-12 md:mb-24 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-6">
             <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl">
              Let's make something <br />
              <span className="text-primary font-serif italic">amazing</span> together.
            </h2>
            <p className="max-w-md text-lg text-neutral-400">
              Open for collaborations, freelance projects, or just a friendly chat about AI and tech.
            </p>
             <div className="flex gap-4 pt-4">
                <SocialLink href="https://github.com/lnv-louis" label="GitHub" />
                <SocialLink href="https://linkedin.com/in/le-nguyen-vu" label="LinkedIn" />
                <SocialLink href="https://x.com/ixvlora" label="X (Twitter)" />
             </div>
          </div>

          <div className="flex flex-col items-start justify-center md:items-end relative">
             <a
              href="mailto:lelouis.lnv@gmail.com"
              className="group flex items-center space-x-4 text-2xl md:text-3xl font-bold text-white transition-colors hover:text-primary sm:text-4xl z-10 break-all"
            >
              <span>lelouis.lnv@gmail.com</span>
              <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Massive Text Pressure */}
      <div className="relative w-full h-[15vh] md:h-[25vh] cursor-default select-none flex items-end">
           <div className="w-full h-full">
                <TextPressure 
                    text="LE NGUYEN VU" 
                    flex={true} 
                    alpha={false} 
                    stroke={false} 
                    width={true} 
                    weight={true} 
                    italic={true} 
                    textColor="#ef4444" 
                    fontFamily="Impact, sans-serif"
                    minFontSize={40}
                    variableProximity={true}
                />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-full pointer-events-none"></div>
      </div>

      {/* Full Width Copyright Border */}
      <div className="w-full border-t border-neutral-800 z-10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-between text-sm text-neutral-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Le Nguyen Vu. All rights reserved.</p>
          <p>Designed & Built with Next.js, Magic UI & React Bits</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-primary transition-colors uppercase font-mono text-sm tracking-widest border-b border-transparent hover:border-primary"
        >
            {label}
        </a>
    )
}
