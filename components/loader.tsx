"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/magicui/number-ticker";
import { TypingAnimation } from "@/components/magicui/terminal";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [showTicker, setShowTicker] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTicker(true), 500); 
    const timer2 = setTimeout(() => {
        onComplete();
    }, 3500); // Finish

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-full max-w-2xl p-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
            {showTicker && (
                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-4"
                >
                    <div className="text-8xl font-black text-white tracking-tighter">
                        <NumberTicker value={100} />
                    </div>
                    <TypingAnimation className="text-primary text-xl font-mono uppercase tracking-widest" duration={50}>
                        SYSTEM INITIALIZING...
                    </TypingAnimation>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
