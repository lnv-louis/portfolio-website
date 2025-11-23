"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";

interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PDFPreview({ pdfUrl, title, isOpen, onClose }: PDFPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when opening new PDF
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, pdfUrl]);

  if (!isOpen) return null;

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
        onClick={onClose}
    >
        <div 
            className="relative w-full max-w-5xl h-full bg-neutral-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950">
                <h3 className="text-white font-bold truncate max-w-md">{title}</h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-neutral-800 text-neutral-400 hover:text-white">
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* PDF Viewer Container */}
            <div className="relative grow bg-neutral-800 overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
                    <div className="flex flex-col items-center gap-2 text-neutral-400">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm font-mono">Loading PDF...</p>
                    </div>
                  </div>
                )}

                {/* Iframe with toolbar disabled */}
                <iframe 
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0 cursor-auto"
                    title={title}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
        </div>
    </motion.div>
  );
}

