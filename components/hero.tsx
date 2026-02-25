"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import Dither from "@/components/reactbits/dither";
import RotatingText from "@/components/reactbits/rotating-text";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-10 md:py-20 md:flex-row md:px-12">

      <Dither />

      <div className="z-10 grid max-w-7xl grid-cols-1 gap-8 md:gap-12 md:grid-cols-2 items-center h-full">

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex aspect-3/4 w-[280px] md:w-full max-w-md items-center justify-center order-1 md:order-1"
        >
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-[60px] md:blur-[100px] rounded-full transform scale-75"></div>

            <div className="relative h-full w-full overflow-hidden border border-border bg-card/50">
                <Image
                    src="/le-nguyen-vu.png"
                    alt="Louis Le"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                    priority
                />
                <BorderBeam size={250} duration={12} delay={9} borderWidth={2} colorFrom="#ef4444" colorTo="#dc2626" />
            </div>
        </motion.div>

        <div className="flex flex-col justify-center space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
             <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                I'm <span className="italic">Louis Le</span>
            </h1>

            <div className="mt-2 md:mt-4 flex items-center justify-center md:justify-start">
                 <RotatingText
                    texts={["AI infrastructure", "multi-agent systems", "fintech"]}
                    className=""
                 />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-lg text-base md:text-xl text-muted-foreground mx-auto md:mx-0"
          >
            Building production multi-agent orchestration systems and LLM-powered financial infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 md:justify-start items-center"
          >
            <Link href="#projects">
                 <InteractiveHoverButton text="see my work" className="w-48" />
            </Link>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 0.5 }}
             className="flex items-center justify-center gap-4 pt-4 md:justify-start"
          >
              <SocialLink href="https://github.com/lnv-louis" icon={<Github className="h-5 w-5" />} />
              <SocialLink href="https://linkedin.com/in/le-nguyen-vu" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="https://x.com/ixvlora" icon={<svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>} />
              <SocialLink href="mailto:lelouis.lnv@gmail.com" icon={<Mail className="h-5 w-5" />} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-110"
        >
            {icon}
        </a>
    )
}
