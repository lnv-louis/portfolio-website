#!/usr/bin/env bun
// Import the curated hackathon media listed in src/content/hackathon-curation.json.
//
//   bun scripts/import-hackathon-media.ts [source-dir] [--upload-films]
//   (source-dir defaults to ~/Downloads/hackathons)
//
// Photos: auto-oriented, EXIF stripped (camera, GPS), written to
//   public/hackathons/<name>-480.webp (wall) and <name>-1600.webp (large).
// Films: remuxed as-is with faststart (no re-encode, so no generation loss; the
//   source must already be web-playable H.264 + AAC). Workers static assets
//   ignore Range requests and Safari won't play MP4 without 206 responses, so
//   films are served from R2 (media.lenguyenvu.com), never public/. With
//   --upload-films the encode is uploaded to the `portfolio` bucket; the poster
//   frame is written to public/hackathons/<name>-poster.webp either way.
// Portraits: cover-cropped site images (hero, OG card) written to public/.
// Writes src/content/hackathon-media.json (names, alt text, real dimensions).
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { $ } from "bun";

interface Curated {
  event: string;
  // A path under the source dir, or an https:// URL (an event's own cover image).
  source: string;
  name: string;
  alt: string;
  // false: used only where referenced by name (event tooltips), not on the photo wall.
  wall?: boolean;
}

const ROOT = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const UPLOAD = args.includes("--upload-films");
const SRC = args.find((a) => !a.startsWith("--")) ?? join(homedir(), "Downloads/hackathons");
const OUT = join(ROOT, "public/hackathons");
const MEDIA_ORIGIN = "https://media.lenguyenvu.com";
const R2_ACCOUNT = "062a91f6e4ad306625307277f1fe668b";

interface Portrait {
  source: string;
  output: string;
  width: number;
  height: number;
  gravity: string;
  offsetY?: number;
  quality: number;
}

const curation: { photos: Curated[]; portraits: Portrait[]; films: Curated[] } = JSON.parse(
  await readFile(join(ROOT, "src/content/hackathon-curation.json"), "utf8"),
);

async function dims(file: string): Promise<[number, number]> {
  const out = (await $`magick identify -format "%w %h" ${file}`.text()).trim();
  const [w, h] = out.split(" ").map(Number);
  return [w, h];
}

// Build into a staging directory and swap it in only after every photo and film succeeds,
// so a missing source or failed conversion never leaves public/hackathons half-rebuilt.
const STAGE = `${OUT}.staging`;
process.on("exit", () => rmSync(STAGE, { recursive: true, force: true }));
await rm(STAGE, { recursive: true, force: true });
await mkdir(STAGE, { recursive: true });

// Remote sources are downloaded once into a scratch file and converted like local ones.
async function resolveSource(source: string, work: string): Promise<string> {
  if (!source.startsWith("https://")) return join(SRC, source);
  // Some sites reject requests without a browser-like User-Agent.
  const res = await fetch(source, { headers: { "User-Agent": "Mozilla/5.0 (compatible; lenguyenvu-import/1.0)" } });
  if (!res.ok) throw new Error(`import-media: ${source} returned ${res.status}`);
  const file = join(work, `remote-${createHash("sha1").update(source).digest("hex").slice(0, 12)}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

const downloads = await mkdtemp(join(tmpdir(), "hackathon-sources-"));
process.on("exit", () => rmSync(downloads, { recursive: true, force: true }));

const photos: (Omit<Curated, "source"> & { width: number; height: number })[] = [];
for (const p of curation.photos) {
  const src = await resolveSource(p.source, downloads);
  const large = join(STAGE, `${p.name}-1600.webp`);
  await $`magick ${src} -auto-orient -strip -resize ${"1600x1600>"} -quality 78 ${large}`;
  await $`magick ${src} -auto-orient -strip -resize ${"480x480>"} -quality 72 ${join(STAGE, `${p.name}-480.webp`)}`;
  const [width, height] = await dims(large);
  photos.push({ event: p.event, name: p.name, alt: p.alt, wall: p.wall ?? true, width, height });
  console.log(`photo  ${p.name} (${width}x${height})`);
}

// Site portraits (hero, social card): cover-cropped to an exact size in public/.
for (const p of curation.portraits) {
  const size = `${p.width}x${p.height}`;
  await $`magick ${join(SRC, p.source)} -auto-orient -strip -resize ${size + "^"} -gravity ${p.gravity} -extent ${`${size}+0+${p.offsetY ?? 0}`} -quality ${p.quality} ${join(ROOT, "public", p.output)}`;
  console.log(`site   public/${p.output} (${size})`);
}

const films: (Omit<Curated, "source"> & { width: number; height: number; src: string })[] = [];
for (const f of curation.films) {
  const work = await mkdtemp(join(tmpdir(), "hackathon-film-"));
  try {
    const mp4 = join(work, `${f.name}.mp4`);
    await $`ffmpeg -v error -y -i ${join(SRC, f.source)} -c copy -movflags +faststart ${mp4}`;
    const poster = join(work, "poster.jpg");
    await $`ffmpeg -v error -y -ss 1 -i ${mp4} -frames:v 1 -q:v 3 ${poster}`;
    await $`magick ${poster} -strip -quality 78 ${join(STAGE, `${f.name}-poster.webp`)}`;
    const [width, height] = await dims(poster);
    const key = `${f.name}.mp4`;
    if (UPLOAD) {
      await $`cf r2 objects put ${key} --bucket-name portfolio --file ${mp4} --content-type video/mp4`
        .env({ ...process.env, CLOUDFLARE_ACCOUNT_ID: R2_ACCOUNT })
        .quiet();
    }
    films.push({ event: f.event, name: f.name, alt: f.alt, width, height, src: `${MEDIA_ORIGIN}/${key}` });
    console.log(`film   ${f.name} (${width}x${height})${UPLOAD ? ` -> ${MEDIA_ORIGIN}/${key}` : " (not uploaded)"}`);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
}

await rm(OUT, { recursive: true, force: true });
await rename(STAGE, OUT);
await writeFile(join(ROOT, "src/content/hackathon-media.json"), JSON.stringify({ photos, films }, null, 2) + "\n");
console.log(`\n${photos.length} photos, ${films.length} films -> public/hackathons, src/content/hackathon-media.json`);
