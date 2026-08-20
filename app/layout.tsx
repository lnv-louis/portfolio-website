import type { Metadata } from "next";
import "./globals.css";
import { AgentationToolbar } from "@/components/agentation";
import { LenisProvider } from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: {
    default: "Louis Le",
    template: "%s | Louis Le",
  },
  description:
    "Co-Founder & CTO at cf0.ai. Building production multi-agent orchestration systems and LLM-powered financial infrastructure.",
  metadataBase: new URL("https://lenguyenvu.com"),
  openGraph: {
    title: "Louis Le | AI Infrastructure Engineer",
    description:
      "Co-Founder & CTO at cf0.ai. Building production multi-agent orchestration systems and LLM-powered financial infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Louis Le | AI Infrastructure Engineer",
    description:
      "Co-Founder & CTO at cf0.ai. Building production multi-agent orchestration systems and LLM-powered financial infrastructure.",
    creator: "@lnv007",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Louis Le",
              url: "https://lenguyenvu.com",
              jobTitle: "Co-Founder & CTO, cf0.ai",
              knowsAbout: [
                "Multi-agent orchestration",
                "LLM systems",
                "Financial infrastructure",
                "Claude Agent SDK",
              ],
              sameAs: [
                "https://github.com/lnv-louis",
                "https://linkedin.com/in/le-nguyen-vu",
                "https://x.com/lnv007",
              ],
            }),
          }}
        />
      </head>
      <body>
        <LenisProvider>
          {children}
          <AgentationToolbar />
        </LenisProvider>
      </body>
    </html>
  );
}
