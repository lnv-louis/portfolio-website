"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/hero";
import { BentoGridSection } from "@/components/bento";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Loader } from "@/components/loader";
import TargetCursor from "@/components/reactbits/target-cursor";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="h-screen w-full bg-background text-foreground selection:bg-primary selection:text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <TargetCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
           <motion.div
             key="content"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
           >
              <Navbar />
              
              {/* Hero Section */}
              <section className="snap-start w-full min-h-screen flex items-center justify-center">
                <Hero />
              </section>
              
              {/* Tech Stack & About */}
              <section className="snap-start w-full min-h-screen flex items-center justify-center">
                 <BentoGridSection />
              </section>
              
              {/* Projects Showcase */}
              <section className="snap-start w-full min-h-screen flex flex-col justify-center">
                <Projects />
              </section>
              
              {/* Contact & Footer */}
              <section className="snap-start w-full min-h-screen flex items-end">
                <Contact />
              </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
