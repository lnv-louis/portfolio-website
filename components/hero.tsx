import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import Dither from "@/components/reactbits/dither";
import RotatingText from "@/components/reactbits/rotating-text";
import type { ReactNode } from "react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-10 md:py-20 md:flex-row md:px-12">

      <Dither />

      <div className="z-10 grid max-w-7xl grid-cols-1 gap-8 md:gap-12 md:grid-cols-2 items-center h-full">

        {/* Portrait — no animation, visible instantly for fast LCP */}
        <div className="relative mx-auto flex aspect-3/4 w-[280px] md:w-full max-w-md items-center justify-center order-1 md:order-1">
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-[60px] md:blur-[100px] rounded-full transform scale-75"></div>

            <div className="relative h-full w-full overflow-hidden border border-border bg-card/50">
                <Image
                    src="/le-nguyen-vu.png"
                    alt="Louis Le - AI Infrastructure Engineer"
                    fill
                    sizes="(max-width: 768px) 280px, 448px"
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                    priority
                />
                <BorderBeam size={250} duration={12} delay={9} borderWidth={2} colorFrom="#ef4444" colorTo="#dc2626" />
            </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-2">
          {/* H1 visible immediately for fast FCP */}
          <div>
             <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                I&apos;m <span className="italic">Louis Le</span>
            </h1>

            <div className="mt-2 md:mt-4 flex items-center justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
                 <RotatingText
                    texts={["AI infrastructure", "multi-agent systems", "fintech"]}
                    className=""
                 />
            </div>
          </div>

          <p
            className="max-w-lg text-base md:text-xl text-muted-foreground mx-auto md:mx-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Building production multi-agent orchestration systems and LLM-powered financial infrastructure.
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 md:gap-6 md:justify-start items-center animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Link href="#projects">
                 <InteractiveHoverButton text="see my work" className="w-48" />
            </Link>
          </div>

          <div
             className="flex items-center justify-center gap-4 pt-4 md:justify-start animate-fade-in"
             style={{ animationDelay: '0.5s' }}
          >
              <SocialLink href="https://github.com/lnv-louis" icon={<Github className="h-5 w-5" />} />
              <SocialLink href="https://linkedin.com/in/le-nguyen-vu" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="https://x.com/ixvlora" icon={<svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>} />
              <SocialLink href="mailto:lelouis.lnv@gmail.com" icon={<Mail className="h-5 w-5" />} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: ReactNode }) {
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
