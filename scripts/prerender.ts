#!/usr/bin/env bun
// Prerender every route into dist/ after the client build, so crawlers and agents get
// real HTML without running JavaScript. The client then hydrates it (src/main.tsx).
//
//   vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && bun scripts/prerender.ts
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const SSR = join(ROOT, "dist-ssr/entry-server.js");
const ORIGIN = "https://lenguyenvu.com";

interface Route {
  file: string;
}

interface DocumentAssets {
  script: string;
  styles: string[];
  preloads: string[];
}

interface ManifestChunk {
  file: string;
  css?: string[];
  imports?: string[];
}

const { renderPage, ROUTES, serverCard } = (await import(SSR)) as {
  renderPage: (path: string, assets: DocumentAssets) => string;
  ROUTES: Record<string, Route>;
  serverCard: () => Record<string, unknown>;
};

// Hashed client assets for the index.html entry, from Vite's build manifest.
const manifestPath = join(DIST, ".vite/manifest.json");
const manifest: Record<string, ManifestChunk> = JSON.parse(await readFile(manifestPath, "utf8"));
const entry = manifest["index.html"];
if (!entry) throw new Error("prerender: no index.html entry in the Vite manifest");
const assets: DocumentAssets = {
  script: `/${entry.file}`,
  styles: (entry.css ?? []).map((file) => `/${file}`),
  preloads: (entry.imports ?? []).map((key) => `/${manifest[key].file}`),
};

for (const [path, route] of Object.entries(ROUTES)) {
  const html = renderPage(path, assets);
  await writeFile(join(DIST, route.file), html);
  console.log(`prerendered ${path.padEnd(9)} -> dist/${route.file} (${html.length} bytes)`);
}
await rm(join(DIST, ".vite"), { recursive: true, force: true });

// Agent discovery files, generated so digests and the MCP server card match the deploy.
const WELL_KNOWN = join(DIST, ".well-known");
const writeJson = async (path: string, data: unknown) => {
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2) + "\n");
  console.log(`generated   ${path.slice(DIST.length)}`);
};

const skillPath = "/.well-known/agent-skills/louis-le/SKILL.md";
const skill = await readFile(join(DIST, skillPath));
const skillDigest = `sha256:${createHash("sha256").update(skill).digest("hex")}`;
const skillDescription =
  "Answer questions about Louis Le (Le Nguyen Vu) using lenguyenvu.com: roles, hackathons, projects, research and contact links.";

await writeJson(join(WELL_KNOWN, "agent-skills/index.json"), {
  $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  skills: [{ name: "louis-le", type: "skill-md", description: skillDescription, url: `${ORIGIN}${skillPath}`, digest: skillDigest }],
});

const card = serverCard();
await writeJson(join(WELL_KNOWN, "mcp/server-card.json"), card);

const trust = { identity: ORIGIN, identityType: "https" };
const catalog = {
  specVersion: "1.0",
  host: { displayName: "Louis Le", documentationUrl: `${ORIGIN}/llms.txt` },
  entries: [
    {
      identifier: "urn:air:lenguyenvu.com:mcp:site",
      displayName: "Louis Le MCP server",
      type: "application/mcp-server-card+json",
      url: `${ORIGIN}/mcp/server-card`,
      description: card.description,
      capabilities: ["get_profile", "list_hackathons", "get_contact_links", "get_page_markdown"],
      representativeQueries: ["who is Louis Le", "which hackathons has Louis Le hosted", "how do I contact Louis Le"],
      tags: ["mcp", "profile"],
      trustManifest: trust,
    },
    {
      identifier: "urn:air:lenguyenvu.com:skills:louis-le",
      displayName: "Louis Le skill",
      type: "application/agent-skills+md",
      url: `${ORIGIN}${skillPath}`,
      description: skillDescription,
      digest: skillDigest,
      representativeQueries: ["what is Louis Le building", "what does The Hack Collective do"],
      tags: ["skill"],
      trustManifest: trust,
    },
    {
      identifier: "urn:air:lenguyenvu.com:docs:llms",
      displayName: "lenguyenvu.com llms.txt",
      type: "text/markdown",
      url: `${ORIGIN}/llms.txt`,
      description: "Index of the site for agents, with when-to-use guidance.",
      representativeQueries: ["summarise Louis Le's site", "what pages does lenguyenvu.com have"],
      tags: ["llms.txt", "docs"],
      trustManifest: trust,
    },
    {
      identifier: "urn:air:lenguyenvu.com:site:home",
      displayName: "Louis Le (Le Nguyen Vu)",
      type: "text/markdown",
      url: `${ORIGIN}/index.md`,
      description: "Homepage as markdown: current roles, hackathons, cf0.ai, research and contact links.",
      representativeQueries: ["who is Louis Le", "what is Louis Le working on"],
      tags: ["website", "profile"],
      trustManifest: trust,
    },
  ],
};
await writeJson(join(WELL_KNOWN, "ard.json"), catalog);
await writeJson(join(WELL_KNOWN, "ai-catalog.json"), catalog);

await rm(join(ROOT, "dist-ssr"), { recursive: true, force: true });
