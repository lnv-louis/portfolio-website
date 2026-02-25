"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FlowingMenu from "@/components/reactbits/flowing-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  {
    text: "ABOUT",
    link: "#about",
    image: "radial-gradient(ellipse at 30% 50%, #ef4444 0%, #450a0a 50%, #0a0a0a 100%)"
  },
  {
    text: "PROJECTS",
    link: "#projects",
    image: "linear-gradient(135deg, #0a0a0a 0%, #1c1917 40%, #ef4444 100%)"
  },
  {
    text: "RESEARCH",
    link: "#research",
    image: "radial-gradient(circle at 70% 30%, #dc2626 0%, #1a0505 50%, #0a0a0a 100%)"
  },
  {
    text: "CONNECT",
    link: "#contact",
    image: "linear-gradient(160deg, #ef4444 0%, #450a0a 30%, #0a0a0a 70%)"
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
          scrolled && !isOpen ? "bg-background/50 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <Link href="/" className="relative z-50 flex items-center justify-center h-10 w-10 overflow-hidden" onClick={handleLinkClick}>
            <Image
                src="/favicon2.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-cover"
            />
        </Link>

        <div className="flex items-center gap-3 z-50">
          <ThemeToggle />
          <Button
            onClick={toggleMenu}
            variant="default"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
          >
            {isOpen ? "CLOSE" : "MENU"}
          </Button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl"
          >
             <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
               <filter id="navNoise"><feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" /></filter>
               <rect width="100%" height="100%" filter="url(#navNoise)" />
             </svg>

             <div className="relative z-10 w-full max-w-screen-xl" onClick={handleLinkClick}>
                <FlowingMenu items={navItems} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
