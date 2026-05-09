/**
 * Export brand assets from the Illustrator source files.
 *
 * Inputs (must exist at the project root):
 *   - logo.ai
 *   - favicon.ai
 *
 * Outputs:
 *   - public/icons/logo.svg            (wordmark + mark, used by <Logo variant="full" />)
 *   - public/icons/icon.svg            (mark only, used by <Logo variant="mark" />)
 *   - public/icons/icon-16.png         (favicon raster fallback)
 *   - public/icons/icon-32.png
 *   - public/icons/apple-touch-icon.png   (180x180)
 *   - public/icons/icon-192.png        (PWA)
 *   - public/icons/icon-512.png        (PWA)
 *   - public/favicon.ico               (multi-size)
 *
 * How it works:
 *   .ai files are PDF-compatible. We treat them as PDFs, render with pdfjs-dist + node-canvas,
 *   then resize with sharp and write all sizes.
 *
 * Run:
 *   npm install --no-save pdfjs-dist@4 canvas sharp png-to-ico
 *   node scripts/export-brand-assets.mjs
 *
 * If the .ai file uses white-on-transparent artwork, pass --bg=#0B1F3A to composite the rendered
 * page on a navy background BEFORE downsampling, otherwise the result will be blank.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const out = resolve(root, "public/icons");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);
const BG = typeof args.bg === "string" ? args.bg : null;

async function main() {
  const inputLogo = resolve(root, "logo.ai");
  const inputFav = resolve(root, "favicon.ai");
  if (!existsSync(inputLogo) || !existsSync(inputFav)) {
    console.error("Missing logo.ai or favicon.ai at project root.");
    process.exit(1);
  }
  await mkdir(out, { recursive: true });

  const [{ getDocument, GlobalWorkerOptions }, { createCanvas }, sharpMod, pngToIcoMod] =
    await Promise.all([
      import("pdfjs-dist/legacy/build/pdf.mjs").catch(() => import("pdfjs-dist")),
      import("canvas"),
      import("sharp"),
      import("png-to-ico")
    ]);
  GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker.mjs";
  const sharp = sharpMod.default;
  const pngToIco = pngToIcoMod.default;

  async function renderToPng(pdfBytes, targetSize) {
    const doc = await getDocument({ data: pdfBytes }).promise;
    const page = await doc.getPage(1);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = targetSize / Math.max(baseViewport.width, baseViewport.height);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");
    if (BG) {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, viewport.width, viewport.height);
    }
    await page.render({ canvasContext: ctx, viewport, intent: "print" }).promise;
    return canvas.toBuffer("image/png");
  }

  const logoBytes = new Uint8Array(await readFile(inputLogo));
  const favBytes = new Uint8Array(await readFile(inputFav));

  const logoSquare = await renderToPng(logoBytes, 1024);
  const favSquare = await renderToPng(favBytes, 1024);

  const sizes = [16, 32, 48, 180, 192, 512];
  for (const s of sizes) {
    const fileName =
      s === 180
        ? "apple-touch-icon.png"
        : `icon-${s}.png`;
    await sharp(favSquare).resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(resolve(out, fileName));
  }

  await writeFile(resolve(out, "logo.png"), await sharp(logoSquare).resize(960, null, { fit: "inside" }).png({ compressionLevel: 9 }).toBuffer());

  const ico = await pngToIco([
    await sharp(favSquare).resize(16, 16).png().toBuffer(),
    await sharp(favSquare).resize(32, 32).png().toBuffer(),
    await sharp(favSquare).resize(48, 48).png().toBuffer()
  ]);
  await writeFile(resolve(root, "public/favicon.ico"), ico);

  console.log("Wrote:", [
    "public/favicon.ico",
    ...sizes.map((s) => `public/icons/${s === 180 ? "apple-touch-icon.png" : `icon-${s}.png`}`),
    "public/icons/logo.png"
  ].join("\n  "));
  console.log(
    "\nNote: SVG output is not produced by this script. For crisp vector icons, export manually from Illustrator (see docs/ASSETS.md)."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
