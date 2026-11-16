#!/usr/bin/env node
/**
 * Loss-aware recompress of public images (keeps filenames/paths).
 * PNG: high-quality palette-friendly compression. JPEG: quality 85 mozjpeg.
 * Skips files already under minBytes and skips if output would grow.
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..", "public");
const MIN_BYTES = 180_000;
const JPEG_QUALITY = 85;
const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (exts.has(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

let saved = 0;
let touched = 0;

for (const file of walk(ROOT)) {
  const before = statSync(file).size;
  if (before < MIN_BYTES) continue;

  const ext = extname(file).toLowerCase();
  const input = readFileSync(file);
  let pipeline = sharp(input, { failOn: "none" });

  let out;
  if (ext === ".png") {
    out = await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toBuffer();
  } else if (ext === ".webp") {
    out = await pipeline.webp({ quality: JPEG_QUALITY, effort: 6 }).toBuffer();
  } else {
    out = await pipeline
      .rotate()
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    if (ext === ".jpeg" || ext === ".jpg") {
      // keep extension; content is jpeg
    }
  }

  if (out.length < before * 0.98) {
    writeFileSync(file, out);
    saved += before - out.length;
    touched++;
    console.log(
      `${file.replace(ROOT, "")}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(out.length / 1024 / 1024).toFixed(2)}MB`
    );
  }
}

console.log(`Done. ${touched} files, saved ${(saved / 1024 / 1024).toFixed(1)} MB`);