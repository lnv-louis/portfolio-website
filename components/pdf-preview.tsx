"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PDFPreview({ pdfUrl, title, isOpen, onClose }: PDFPreviewProps) {
  // If we can't use a robust PDF library, we can use an iframe with #toolbar=0
  // But browsers might ignore this.
  // To prevent download, we can render it as images using pdf.js, but that requires adding pdf.js
  // For now, we will use an iframe with #toolbar=0 and overlay a watermark div.
  // And disable right click.
  
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
            <div className="relative flex-grow bg-neutral-800 overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
                {/* Iframe with toolbar disabled */}
                <iframe 
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0"
                    title={title}
                />
                
                {/* Watermark Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 z-10 overflow-hidden">
                     <div className="text-9xl font-black text-white -rotate-45 whitespace-nowrap select-none">
                        VU LE PREVIEW
                     </div>
                </div>
                
                {/* Transparent click shield to prevent saving if needed, but might block scrolling */}
                {/* <div className="absolute inset-0 bg-transparent" onContextMenu={(e) => e.preventDefault()} /> */}
            </div>
        </div>
    </motion.div>
  );
}

