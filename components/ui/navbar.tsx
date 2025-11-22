"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FlowingMenu from "@/components/reactbits/flowing-menu";

const navItems = [
  { 
    text: "ABOUT", 
    link: "#about", 
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
  },
  { 
    text: "PROJECTS", 
    link: "#projects", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
  },
  { 
    text: "CONTACT", 
    link: "#contact", 
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
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
  
  // Close menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
          scrolled && !isOpen ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center justify-center h-10 w-10 overflow-hidden rounded-md" onClick={handleLinkClick}>
            <Image 
                src="/favicon2.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-cover"
            />
        </Link>

        {/* Menu Button */}
        <Button
          onClick={toggleMenu}
          variant="default"
          size="lg"
          className="z-50 rounded-full bg-primary text-white hover:bg-red-600 font-bold px-8 tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]"
        >
          {isOpen ? "CLOSE" : "MENU"}
        </Button>
      </motion.nav>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-xl"
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             
             <div className="relative z-10 w-full max-w-screen-xl" onClick={handleLinkClick}>
                <FlowingMenu items={navItems} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
