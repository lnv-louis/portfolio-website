// The full HTML document for a prerendered page. Rendered at build time only
// (scripts/prerender.ts via src/entry-server.tsx); index.html is the dev shell.
import type { ReactNode } from "react";

import { ORIGIN, type Route } from "@/app/routes";
import { HOME_GRAPH, SITE_GRAPH } from "@/content/structured-data";

export interface DocumentAssets {
  script: string;
  styles: string[];
  preloads: string[];
}

const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap";
const OG_IMAGE = `${ORIGIN}/og-image.jpg`;
const OG_IMAGE_ALT = "Louis Le at the Grok Bot hackathon in London";

// Declared before any stylesheet so StyleX's priority layers always sit above the base reset.
const LAYER_ORDER = "@layer base, priority1, priority2, priority3, priority4, priority5, priority6, priority7;";
// Lets globals.css hide the hero until StaggerReveal runs, without hiding it when JS is off.
const JS_CLASS = 'document.documentElement.classList.add("js")';

function JsonLd({ data }: { data: unknown }) {
  // Escape "<" so no string in the data can close the script element.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function Document({
  path,
  route,
  assets,
  children,
}: {
  path: string;
  route: Route;
  assets: DocumentAssets;
  children: ReactNode;
}) {
  const isHome = path === "/";
  const indexable = route.markdown !== null;
  const url = `${ORIGIN}${path}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <style dangerouslySetInnerHTML={{ __html: LAYER_ORDER }} />
        <script dangerouslySetInnerHTML={{ __html: JS_CLASS }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#f5f5f5" />
        <link rel="icon" href="/favicon2.png" type="image/png" />

        <title>{route.title}</title>
        <meta name="description" content={route.description} />
        <meta name="author" content="Louis Le" />
        {indexable ? (
          <>
            <link rel="canonical" href={url} />
            <meta name="robots" content="index, follow, max-image-preview:large" />
            <link rel="alternate" type="text/markdown" href={route.markdown!} />
          </>
        ) : (
          <meta name="robots" content="noindex" />
        )}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />

        <meta property="og:site_name" content="Louis Le" />
        <meta property="og:title" content={route.title} />
        <meta property="og:description" content={route.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={isHome ? "profile" : "website"} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />
        {isHome && (
          <>
            <meta property="profile:first_name" content="Louis" />
            <meta property="profile:last_name" content="Le" />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@lnv007" />
        <meta name="twitter:title" content={route.title} />
        <meta name="twitter:description" content={route.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://media.lenguyenvu.com" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/GeistSerif-Regular.woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_CSS} />
        {assets.styles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {assets.preloads.map((href) => (
          <link key={href} rel="modulepreload" href={href} />
        ))}

        <JsonLd data={SITE_GRAPH} />
        {isHome && <JsonLd data={HOME_GRAPH} />}
      </head>
      <body>
        {children}
        <script type="module" src={assets.script} />
      </body>
    </html>
  );
}
