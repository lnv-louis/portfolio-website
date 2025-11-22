"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import { PDFPreview } from "@/components/pdf-preview";

// R2 URL Helper
const getR2UrlRoot = (filename: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
    if (!baseUrl) return `/${filename}`;
    const cleanBase = baseUrl.replace(/\/$/, "");
    return `${cleanBase}/${encodeURIComponent(filename)}`;
};

const papers = [
  {
    title: "ML: Cancer Subtype Classification",
    subtitle: "Random Forest and RBF-SVM",
    description:
      "Developed and benchmarked Random Forest and RBF-SVM models to classify Acute Myeloid Leukaemia subtypes from high-dimensional gene expression data. Achieved 82% accuracy with the tuned RBF-SVM model.",
    pdf: getR2UrlRoot("AML-Classification-Research-Manuscript.pdf"),
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    title: "ML: Comparative Sentiment Analysis",
    subtitle: "Bidirectional LSTM vs LinearSVC",
    description:
      "Implemented and compared a Bidirectional LSTM (Keras) and a LinearSVC model (Scikit-Learn) for sentiment classification on financial news. The LinearSVC achieved an F1 score of 0.74, outperforming the Bi-LSTM.",
    pdf: getR2UrlRoot("ML-sentiment-analysis.pdf"),
    tags: ["Python", "Keras", "NLTK", "TensorFlow"],
  },
];

export function Research() {
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section className="snap-section bg-black flex items-center justify-center py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl font-mono">
            Research <span className="text-primary">Manuscripts</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-400">
            Academic research in Machine Learning and Natural Language Processing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 transition-all hover:border-primary/50 hover:bg-neutral-900/50"
            >
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{paper.title}</h3>
                <p className="text-primary font-mono text-sm mb-4">{paper.subtitle}</p>
                <p className="text-neutral-400 leading-relaxed mb-8">
                  {paper.description}
                </p>
              </div>

              <div className="mt-auto flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-neutral-700 bg-transparent text-white hover:bg-primary hover:text-white hover:border-primary transition-all"
                  onClick={() => setPreviewPdf({ url: paper.pdf, title: paper.title })}
                >
                   Preview <Eye className="ml-2 h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-neutral-700 bg-transparent text-white hover:bg-primary hover:text-white hover:border-primary transition-all"
                  asChild
                >
                  <Link href={paper.pdf} target="_blank">
                    Download <FileText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PDFPreview 
        isOpen={!!previewPdf}
        pdfUrl={previewPdf?.url || ""}
        title={previewPdf?.title || ""}
        onClose={() => setPreviewPdf(null)}
      />
    </section>
  );
}
