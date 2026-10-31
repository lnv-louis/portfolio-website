#!/usr/bin/env bun
// Prerender every route into dist/ after the client build, so crawlers and agents get
// real HTML without running JavaScript. The client then hydrates it (src/main.tsx).
//
//   vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && bun scripts/prerender.ts
import { readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const SSR = join(ROOT, "dist-ssr/entry-server.js");

interface Route {
  title: string;
  description: string;
  file: string;
  markdown: string | null;
}

const { render, ROUTES } = (await import(SSR)) as { render: (path: string) => string; ROUTES: Record<string, Route> };
const template = await readFile(join(DIST, "index.html"), "utf8");
const ORIGIN = "https://lenguyenvu.com";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function replaceOnce(html: string, pattern: RegExp, value: string): string {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found in template: ${pattern}`);
  return html.replace(pattern, value);
}

for (const [path, route] of Object.entries(ROUTES)) {
  const url = path === "/404" ? `${ORIGIN}/404` : `${ORIGIN}${path}`;
  const title = escape(route.title);
  const description = escape(route.description);
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = replaceOnce(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`);
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceOnce(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`);
  html = replaceOnce(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceOnce(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`);
  html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

  if (route.markdown) {
    html = replaceOnce(html, /(<link rel="alternate" type="text\/markdown" href=")[^"]*(")/, `$1${route.markdown}$2`);
  } else {
    html = replaceOnce(html, /\s*<link rel="alternate" type="text\/markdown" href="[^"]*" \/>/, "");
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, '<meta name="robots" content="noindex" />');
    html = replaceOnce(html, /\s*<meta name="robots" content="index, follow[^"]*" \/>/, "");
  }
  if (path !== "/") {
    // ProfilePage and the hackathon events describe the homepage only.
    html = replaceOnce(html, /\s*<script type="application\/ld\+json" data-page="home">[\s\S]*?<\/script>/, "");
    html = replaceOnce(html, /(<meta property="og:type" content=")[^"]*(")/, "$1website$2");
  }

  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(path)}</div>`);
  await writeFile(join(DIST, route.file), html);
  console.log(`prerendered ${path.padEnd(9)} -> dist/${route.file} (${html.length} bytes)`);
}

await rm(join(ROOT, "dist-ssr"), { recursive: true, force: true });
