import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/hero";
import { BentoGridSection } from "@/components/bento";
import { Projects } from "@/components/projects";
import { Research } from "@/components/research";
import { Contact } from "@/components/contact";
import { SVGDivider } from "@/components/svg-divider";
import { TechEcosystemSection } from "@/components/tech-ecosystem";

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground selection:bg-primary selection:text-white overflow-y-auto scroll-smooth">
      <Navbar />
      <Hero />
      <SVGDivider variant="circuit" />
      <BentoGridSection />
      <SVGDivider variant="wave" />
      <TechEcosystemSection />
      <SVGDivider variant="pulse" />
      <Projects />
      <SVGDivider variant="circuit" flip />
      <Research />
      <SVGDivider variant="wave" />
      <Contact />
    </main>
  );
}
