"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import Dither from "@/components/reactbits/dither";

const TextPressure = dynamic(() => import("@/components/reactbits/text-pressure"), { ssr: false });

export function Contact() {
  useEffect(() => {
    (async function () {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: "chat" });
      cal("floatingButton", {
        calLink: "louis-le/chat",
        config: { layout: "month_view" },
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <footer id="contact" className="relative bg-background pt-24 overflow-hidden w-full h-full flex flex-col justify-between">
      <Dither className="opacity-50" />

      <div className="container mx-auto px-6 mb-12 md:mb-24 grow flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-6">
             <h2 className="text-4xl font-light tracking-tighter text-foreground sm:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              let's build something <br />
              <span className="text-primary italic">together.</span>
            </h2>
            <p className="max-w-md text-lg text-muted-foreground">
              Available for part-time AI/LLM engineering contracts. Book a chat or reach out directly.
            </p>
             <div className="flex gap-4 pt-4">
                <SocialLink href="https://github.com/lnv-louis" label="GitHub" />
                <SocialLink href="https://linkedin.com/in/le-nguyen-vu" label="LinkedIn" />
                <SocialLink href="https://x.com/ixvlora" label="X" />
             </div>
          </div>

          <div className="flex flex-col items-start justify-center md:items-end relative">
             <a
              href="mailto:lelouis.lnv@gmail.com"
              className="group flex items-center space-x-4 text-2xl md:text-3xl font-bold text-foreground transition-colors hover:text-primary sm:text-4xl z-10 break-all"
            >
              <span>lelouis.lnv@gmail.com</span>
              <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[15vh] md:h-[25vh] cursor-default select-none flex items-end">
           <div className="w-full h-full">
                <TextPressure
                    text="LOUIS LE"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ef4444"
                    fontFamily="'Playfair Display', Georgia, serif"
                    minFontSize={40}
                    variableProximity={true}
                />
           </div>
           <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent h-full pointer-events-none"></div>
      </div>

      <div className="w-full border-t border-border z-10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} Louis Le. All rights reserved.</p>
          <p>built with Next.js and too much ambition</p>
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
            className="text-muted-foreground hover:text-primary transition-colors uppercase font-mono text-sm tracking-widest border-b border-transparent hover:border-primary"
        >
            {label}
        </a>
    )
}
