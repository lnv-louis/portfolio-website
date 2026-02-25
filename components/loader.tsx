"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Signature } from "@/components/signature";

export function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2900); // Total draw time (~2.5s) + brief hold

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.4 }}
        className="w-[320px] sm:w-[400px] md:w-[480px] text-foreground"
      >
        <Signature />
      </motion.div>
    </div>
  );
}
