#!/usr/bin/env node
/**
 * Cloudflare Workers static assets must be ≤ 25 MiB per file.
 * Remove local-only blobs before OpenNext bundles /public.
 */
import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "public");
for (const rel of ["properties.zip"]) {
  const path = join(root, rel);
  if (existsSync(path)) {
    rmSync(path);
    console.log(`Removed oversized deploy artifact: public/${rel}`);
  }
}