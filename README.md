# Jeunesse Stores LLC — Marketing Site

Premium, bilingual (EN / AR) marketing site for **Jeunesse Stores LLC** — AI business transformation and integrated marketing.

- **US HQ:** 418 Broadway Ste R, Albany, NY 12207, USA · +1 (405) 544-4440
- **Egypt Office:** 425 Cowork Regus Arkan Plaza, Sheikh Zayed, Egypt · +20 111 751 1172
- **Email:** info@jeunesse-inc.co

## Stack

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** (custom design tokens)
- **Zod** for server-side validation
- Native i18n via `[locale]` segment + middleware
- RTL/LTR via `dir` attribute
- Static generation where possible; API routes for forms

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000` — the middleware redirects `/` → `/en` (or `/ar` based on `Accept-Language`).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only (no emit) |
| `npm run format` | Prettier |

## Routes

```
/                       → middleware → /en or /ar
/[locale]               Home
/[locale]/services
/[locale]/services/[slug]   ai-transformation | integrated-marketing | branding-documentation | affiliate-commission
/[locale]/industries
/[locale]/industries/[slug] retail-ecommerce | financial-services | healthcare | saas-technology
/[locale]/case-studies
/[locale]/insights
/[locale]/about
/[locale]/contact
/[locale]/book-a-call
/[locale]/privacy-policy
/[locale]/cookie-policy
/[locale]/terms

/api/contact            POST  — contact form (rate-limited, honeypot, Zod)
/api/book               POST  — book-a-call form
/api/subscribe          POST  — newsletter
/sitemap.xml            generated
/robots.txt             generated
/manifest.webmanifest   generated
```

## File map

```
app/                       # routes, layouts, API
components/                # UI primitives
lib/i18n.ts                # locale helpers
lib/dictionaries/{en,ar}.ts  # all copy
public/                    # static assets, OG images
styles/globals.css         # tokens + components
docs/                      # strategy, launch checklist, media plan
```

## Editing copy

All copy lives in `lib/dictionaries/en.ts` and `lib/dictionaries/ar.ts`. Both files share the `Dictionary` type — adding a key in `en` enforces parity in `ar` at type-check time.

## Forms

Contact and book-a-call POST to `/api/contact` and `/api/book`. Both:

- Validate with Zod
- Reject submissions where the hidden `website` honeypot is non-empty
- Apply an in-memory rate limit (5 / minute / IP) — replace with Upstash Redis or Vercel KV in production
- Currently `console.info` the payload. To deliver email, wire **Resend / SES** in the route handler. To push to CRM, wire **HubSpot** with `HUBSPOT_PRIVATE_APP_TOKEN`.

## SEO

- Per-locale `<html lang dir>`
- Per-page `<title>`, description, OG, and canonical
- `hreflang` alternates between `en` and `ar`
- `Organization` JSON-LD on every page (offices, contact points)
- Sitemap auto-generated from a static path list
- `robots.txt` allows everything except `/api/*`

## Performance

- Static rendering for marketing pages
- Self-hosted variable fonts (drop into `public/fonts/`) — see `styles/globals.css` for `--font-sans`, `--font-display`, `--font-ar`
- AVIF / WebP via `next/image`
- Hero is gradient-only by default; swap in a poster image and lazy-load Higgsfield video when ready
- Targets: LCP ≤ 2.0s on 4G, JS ≤ 170 KB gzipped per route

## Accessibility

- Skip-to-content link
- Visible focus rings (bronze, 2px)
- All forms have explicit `<label>`s, ARIA `role="status"` for async feedback
- Color contrast ≥ 4.5:1 body, ≥ 3:1 large text
- `prefers-reduced-motion` respected

## Higgsfield media

See [`docs/MEDIA-PLAN.md`](docs/MEDIA-PLAN.md) for the 10 image + 6 video prompts, with placement notes and export specs. Generated assets land in `public/images/` (filename pattern: `<page>-<slot>-<seed>.{avif,webp,mp4}`).

## Launch

See [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md).

## License

© Jeunesse Stores LLC. All rights reserved.
