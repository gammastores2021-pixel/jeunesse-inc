# Higgsfield Media Plan — Jeunesse Stores LLC

All assets are decorative. No logos, statistics, or quotes are baked into images or video.

## Global look

- Palette: deep navy `#0B1F3A`, bronze `#C9A35B`, warm white `#F7F6F2`.
- Mood: editorial, considered, calm. Cinematic depth of field. No stock-photo hand-shake.
- Format ladder: AVIF (preferred) → WebP (fallback) → JPG (legacy). Video MP4 H.264 + WebM VP9.
- Each hero asset must have a poster image of the first frame.

## File naming

`/public/images/<page>-<slot>-<seed>.{avif,webp,jpg}`
`/public/videos/<page>-<slot>-<seed>.{mp4,webm}`

Examples:
`home-hero-001.avif`, `home-hero-001.webm`, `service-ai-banner-001.avif`.

## 10 image prompts

| # | Slot | Prompt | Aspect | File hint |
|---|---|---|---|---|
| 1 | Home hero background | Cinematic wide shot, modern glass office at golden hour, floating holographic dashboards with subtle data flows, calm executive in tailored navy suit reviewing analytics, shallow depth of field, editorial photography, muted teal and warm bronze palette. | 16:9 | `home-hero-001` |
| 2 | Services / AI Transformation banner | Macro shot of a glowing neural network forming above an open laptop, soft bokeh, blue-to-amber gradient, premium minimal aesthetic. | 16:9 | `service-ai-banner-001` |
| 3 | Services / Integrated Marketing banner | Aerial flat-lay of campaign artifacts — printed brand book, smartphone with ad creative, coffee cup, marble desk, soft daylight, editorial. | 16:9 | `service-mkt-banner-001` |
| 4 | Services / Branding & Documentation banner | Designer's hands arranging brand guidelines pages, typography specimens, Pantone swatches, on a warm oak desk, top-down. | 16:9 | `service-brand-banner-001` |
| 5 | Services / Affiliate & Commission banner | Two professionals shaking hands across a glass conference table, city skyline through floor-to-ceiling windows, dusk lighting, documentary style. | 16:9 | `service-affiliate-banner-001` |
| 6 | Industries / Retail | Modern boutique storefront at night with subtle holographic product overlays, cinematic, minimal. | 4:3 | `industry-retail-001` |
| 7 | Industries / Finance | Trader's monitor wall reflecting on a polished desk, charts in soft amber, editorial close-up. | 4:3 | `industry-finance-001` |
| 8 | About / Team | Diverse team of six in business casual collaborating around a digital whiteboard, candid documentary photography, daylight studio. | 16:9 | `about-team-001` |
| 9 | Case Studies banner | Abstract macro of a particle-flow visualization shaping into a rising bar chart, deep navy background. | 21:9 | `case-banner-001` |
| 10 | Contact / Offices | Diptych — left half Albany NY brick architecture at dawn, right half Sheikh Zayed glass tower at dusk, color-matched, editorial. | 16:9 | `contact-offices-001` |

## 6 video prompts

| # | Slot | Prompt | Length | File hint |
|---|---|---|---|---|
| 1 | Home hero loop | Slow push-in on translucent data ribbons weaving through a sunlit boardroom, ribbons resolve into the Jeunesse wordmark; broadcast-grade color, no on-screen text. | 6 s | `home-hero-loop-001` |
| 2 | AI service reel | Particles assemble into a working AI agent UI on a laptop screen, hand types one query, agent replies; side-angle. | 5 s | `service-ai-reel-001` |
| 3 | Marketing service reel | Time-lapse of a campaign storyboard auto-arranging on a wall, then a subtle phone notification glow. (No specific number is shown.) | 5 s | `service-mkt-reel-001` |
| 4 | Process reel | Four-card horizontal pan: Discover → Design → Deploy → Optimize; subtle motion type. | 8 s | `process-reel-001` |
| 5 | Affiliate reel | Handshake macro dissolves into upward-flowing currency-stream particles, ends on a clean lockup shape. | 6 s | `service-affiliate-reel-001` |
| 6 | Founder cut (silent loop) | Cinematic portrait of a confident leader walking through office, looking at camera once. | 7 s | `about-founder-loop-001` |

## Production notes

- Render at 4K, deliver web at 1920×1080 + 1280×720.
- Color-grade to the brand palette in DaVinci or Adobe Premiere; export with rec.709.
- Compress video with `ffmpeg -i input.mp4 -c:v libx264 -crf 24 -preset slower -movflags +faststart output.mp4`.
- WebM: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 output.webm`.
- Always export the first frame as the poster: `ffmpeg -i input.mp4 -frames:v 1 poster.jpg`.

## Where assets are wired

| Asset | Component / Page |
|---|---|
| `home-hero-001` + `home-hero-loop-001` | `components/Hero.tsx`, `app/[locale]/page.tsx` |
| `service-*-banner-001` + reels | `app/[locale]/services/[slug]/page.tsx` (header band) |
| `industry-*-001` | `app/[locale]/industries/page.tsx` |
| `about-team-001`, `about-founder-loop-001` | `app/[locale]/about/page.tsx` |
| `case-banner-001` | `app/[locale]/case-studies/page.tsx` |
| `contact-offices-001` | `app/[locale]/contact/page.tsx` |

## Operational guardrails

- Re-run prompts twice; pick the better seed; archive both with metadata in `/docs/media/seeds.json`.
- Never auto-publish a generated face that resembles a real, identifiable person.
- Keep originals out of the repo; ship optimized derivatives only.
