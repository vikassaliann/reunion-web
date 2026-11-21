#!/usr/bin/env node
/** Build public/favicon.ico (16/32/48) for Google Search + browsers. */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const root = join(import.meta.dirname, "..");
const source = join(root, "public", "logoo.png");
const out = join(root, "public", "favicon.ico");
const bg = { r: 8, g: 8, b: 8, alpha: 1 };

const bufs = [];
for (const size of [16, 32, 48]) {
  bufs.push(
    await sharp(source).resize(size, size, { fit: "contain", background: bg }).png().toBuffer(),
  );
}

const ico = await toIco(bufs);
writeFileSync(out, ico);
console.log(`Wrote ${out} (${ico.length} bytes, 16/32/48)`);