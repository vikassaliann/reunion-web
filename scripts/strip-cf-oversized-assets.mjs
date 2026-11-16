#!/usr/bin/env node
/**
 * Cloudflare Workers static assets must be ≤ 25 MiB per file.
 * Drop local-only blobs and re-encode oversized videos before OpenNext bundles /public.
 */
import { rmSync, existsSync, statSync, readdirSync, renameSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const MAX_BYTES = 25 * 1024 * 1024;
const root = join(import.meta.dirname, "..", "public");

for (const rel of ["properties.zip"]) {
  const path = join(root, rel);
  if (existsSync(path)) {
    rmSync(path);
    console.log(`Removed oversized deploy artifact: public/${rel}`);
  }
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, name.name);
    if (name.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

function ensureUnderCfLimit(filePath) {
  const size = statSync(filePath).size;
  if (size <= MAX_BYTES) return;

  if (!filePath.toLowerCase().endsWith(".mp4")) {
    rmSync(filePath);
    console.log(
      `Removed non-video asset over 25 MiB: ${filePath.replace(root + "/", "public/")}`,
    );
    return;
  }

  const tmp = `${filePath}.cf-tmp.mp4`;
  console.log(
    `Re-encoding for Workers (≤25 MiB): ${filePath.replace(root + "/", "public/")} (${(size / 1024 / 1024).toFixed(1)} MiB)`,
  );

  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      filePath,
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "28",
      "-movflags",
      "+faststart",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      tmp,
    ],
    { stdio: "inherit" },
  );

  const outSize = statSync(tmp).size;
  if (outSize > MAX_BYTES) {
    rmSync(tmp);
    throw new Error(
      `${filePath} still ${(outSize / 1024 / 1024).toFixed(1)} MiB after encode; trim source or host outside Workers assets.`,
    );
  }

  rmSync(filePath);
  renameSync(tmp, filePath);
  console.log(
    `  → ${(outSize / 1024 / 1024).toFixed(1)} MiB (${((1 - outSize / size) * 100).toFixed(0)}% smaller)`,
  );
}

for (const filePath of walk(root)) {
  try {
    if (statSync(filePath).size > MAX_BYTES) ensureUnderCfLimit(filePath);
  } catch (err) {
    if (err?.code === "ENOENT") continue;
    throw err;
  }
}