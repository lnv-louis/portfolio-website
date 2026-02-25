"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import { PDFPreview } from "@/components/pdf-preview";

const getR2UrlRoot = (filename: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
    if (!baseUrl) return `/${filename}`;
    const cleanBase = baseUrl.replace(/\/$/, "");
    return `${cleanBase}/${encodeURIComponent(filename)}`;
};

const papers = [
  {
    title: "cancer subtype classification",
    subtitle: "Random Forest and RBF-SVM",
    description:
      "Classified AML subtypes on the GSE13159 clinical genomics dataset. Used LASSO for feature selection, compared 4 model variants including tuned RF and RBF-SVM. Best model achieved 82% accuracy.",
    pdf: getR2UrlRoot("ML-classification-leukaemia.pdf"),
    tags: ["R", "glmnet", "caret", "e1071", "GEOquery"],
  },
  {
    title: "comparative sentiment analysis",
    subtitle: "Bidirectional LSTM vs LinearSVC",
    description:
      "Built a full NLP preprocessing pipeline on the FinancialPhraseBank dataset. Compared Bidirectional LSTM against LinearSVC with TF-IDF. LinearSVC achieved F1 of 0.74, outperforming by 7.8%.",
    pdf: getR2UrlRoot("ML-sentiment-analysis.pdf"),
    tags: ["Python", "TensorFlow/Keras", "Scikit-learn", "NLTK"],
  },
];

export function Research() {
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="research" className="bg-background flex items-center justify-center py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-light tracking-tighter text-foreground sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            research <span className="text-primary">manuscripts</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Machine learning research in clinical genomics and financial NLP.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden border border-border bg-card/30 p-8 transition-all hover:border-primary/50 hover:bg-card/50"
            >
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{paper.title}</h3>
                <p className="text-primary font-mono text-sm mb-4">{paper.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {paper.description}
                </p>
              </div>

              <div className="mt-auto flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-border bg-transparent text-foreground hover:bg-primary/90 hover:text-primary-foreground hover:border-primary transition-all"
                  onClick={() => setPreviewPdf({ url: paper.pdf, title: paper.title })}
                >
                   preview <Eye className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-border bg-transparent text-foreground hover:bg-primary/90 hover:text-primary-foreground hover:border-primary transition-all"
                  asChild
                >
                  <Link href={paper.pdf} target="_blank">
                    download <FileText className="ml-2 h-4 w-4" />
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
