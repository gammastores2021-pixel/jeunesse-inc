# Brand Assets

Source files (committed at the project root):

- `logo.ai` — full wordmark + mark, Adobe Illustrator (PDF v1.6 compatible)
- `favicon.ai` — square mark for browser tab and app icon

> ⚠️ **Render check before exporting.** When the `.ai` files were inspected, both rendered as
> blank pages. The most common reason is *white-on-transparent artwork*. Open the file in
> Illustrator and add a colored artboard or temporary background to verify the strokes/fills
> are not pure white. If they are, save a second variant for light backgrounds (navy stroke
> on transparent), and use the white variant only on dark surfaces.

## Required output files

Drop these into the repo at the exact paths below; the metadata wiring is already done.

| Path | Size | Purpose |
|---|---|---|
| `public/favicon.ico` | 16 / 32 / 48 multi-size | Browser tab fallback |
| `public/icons/icon.svg` | vector | Modern browsers, mark only |
| `public/icons/icon-16.png` | 16×16 | Legacy fallback |
| `public/icons/icon-32.png` | 32×32 | Legacy fallback |
| `public/icons/apple-touch-icon.png` | 180×180 | iOS home screen |
| `public/icons/icon-192.png` | 192×192 | PWA |
| `public/icons/icon-512.png` | 512×512 | PWA, OG fallback |
| `public/icons/logo.svg` | vector | Header / footer wordmark |
| `public/images/og-default.jpg` | 1200×630 | OpenGraph share card |

## Option A — Manual export from Illustrator (recommended)

This is the most accurate path. The vector stays vector.

1. Open `logo.ai`. `File → Export → Export As…`
   - Format: **SVG**
   - Save as `public/icons/logo.svg`
   - Styling: **Internal CSS**, Font: **SVG**, Decimals: **2**, Minify: **On**, Responsive: **On**
2. Open `favicon.ai`. Repeat with `public/icons/icon.svg`.
3. With `favicon.ai` open, `File → Export → Export for Screens…`
   - Add the artboard once for each size: 16, 32, 180, 192, 512.
   - Format: **PNG 8** with transparent background.
   - Save into `public/icons/`. Rename `180×180` to `apple-touch-icon.png`.
4. Open `favicon-32.png` in any tool that exports `.ico` (e.g. https://realfavicongenerator.net or RealFaviconGenerator → "Favicon for desktop browsers"), or run the script in Option B which builds `favicon.ico` for you.
5. Sanity-check by running `npm run dev` and inspecting the browser tab.

## Option B — One-command Node export (PNG + ICO only)

Generates all PNG sizes and the multi-size `favicon.ico` from the `.ai` files. Vector SVGs still need Option A.

```bash
npm install --no-save pdfjs-dist@4 canvas sharp png-to-ico
npm run export:brand
```

If your `.ai` files render blank (white-on-transparent), composite the navy brand color first:

```bash
npm run export:brand -- --bg=#0B1F3A
```

That writes:

```
public/favicon.ico
public/icons/icon-16.png
public/icons/icon-32.png
public/icons/apple-touch-icon.png   (180x180)
public/icons/icon-192.png
public/icons/icon-512.png
public/icons/logo.png               (preview / OG fallback)
```

Then do Option A only for the SVGs (`icon.svg`, `logo.svg`).

## Verification

After dropping assets in:

- Hard-refresh `http://localhost:3000/en` and inspect:
  - Browser tab shows the favicon
  - Header logo crisp at all DPRs
  - DevTools → Application → Manifest shows the 192/512 icons
  - View-source → `<head>` contains the `icon`, `apple-touch-icon`, and `og:image` links

## OpenGraph image

Create `public/images/og-default.jpg` (1200×630). Recommended composition:

- Background: `#0B1F3A`
- Logo: bronze `#C9A35B` mark, top-left at 80px margin
- Headline: white, Fraunces 64pt, two lines max
- Subhead: warm white `#F7F6F2` at 60% opacity, Inter 28pt
- Right edge: subtle radial bronze glow (10–14% opacity)

Use the same image for `twitter:image`. The Next metadata is already wired to read it from this path.
