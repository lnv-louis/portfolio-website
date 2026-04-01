import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Louis Le | AI Infrastructure Engineer",
    template: "%s | Louis Le",
  },
  description: "AI infrastructure engineer specializing in multi-agent orchestration, Claude Agent SDK, and LLM-powered financial systems.",
  metadataBase: new URL("https://lenguyenvu.com"),
  openGraph: {
    title: "Louis Le | AI Infrastructure Engineer",
    description: "Building production multi-agent orchestration systems and LLM-powered financial infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Louis Le | AI Infrastructure Engineer",
    description: "Building production multi-agent orchestration systems and LLM-powered financial infrastructure.",
    creator: "@ixvlora",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Louis Le",
              url: "https://lenguyenvu.com",
              jobTitle: "AI Infrastructure Engineer",
              knowsAbout: ["Multi-agent orchestration", "LLM systems", "Financial infrastructure", "Claude Agent SDK"],
              sameAs: [
                "https://github.com/lnv-louis",
                "https://linkedin.com/in/le-nguyen-vu",
                "https://x.com/ixvlora",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
        {children}
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
