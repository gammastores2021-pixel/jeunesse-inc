# Component & Page Inventory

## Components (`/components`)

| Component | Purpose | Notes |
|---|---|---|
| `Header.tsx` | Sticky nav, mobile menu, locale switcher | Active link highlighting; backdrop blur on scroll |
| `Footer.tsx` | Multi-column footer with offices, links, legal | Includes results disclaimer |
| `Hero.tsx` | Home hero block | Gradient backdrop; swap in Higgsfield video for production |
| `SectionHeader.tsx` | Eyebrow + H2 + lead | Used on every section |
| `PillarCard.tsx` | Service/value card with index | Optional href to make whole card clickable |
| `ProcessStep.tsx` | Numbered step row | Used on Home and service detail pages |
| `FinalCTA.tsx` | End-of-page conversion block | Three CTAs: Book / Proposal / Email |
| `ContactForm.tsx` | Contact form with validation, status, honeypot | Posts to `/api/contact` |
| `BookForm.tsx` | Book-a-call form | Posts to `/api/book` |
| `CookieBanner.tsx` | Consent banner, persists in `localStorage` | Lightweight, no third-party |
| `LocaleSwitcher.tsx` | EN / AR pivot | Preserves current path |
| `Logo.tsx` | Inline SVG wordmark | Bronze hairline mark |
| `OrganizationJsonLd.tsx` | Schema.org Organization JSON-LD | Includes both offices and contact points |

## Pages (`/app/[locale]`)

| Route | File | Purpose |
|---|---|---|
| `/` | `page.tsx` | Home — hero, pillars, process, industries, FAQ, final CTA |
| `/services` | `services/page.tsx` | Index of four practices |
| `/services/[slug]` | `services/[slug]/page.tsx` | Practice detail with scope + process |
| `/industries` | `industries/page.tsx` | Industry index |
| `/industries/[slug]` | `industries/[slug]/page.tsx` | Industry detail with related services |
| `/case-studies` | `case-studies/page.tsx` | Index with NDA-aware empty state |
| `/insights` | `insights/page.tsx` | Blog index with subscribe form |
| `/about` | `about/page.tsx` | Company narrative, values, offices |
| `/contact` | `contact/page.tsx` | Form + offices |
| `/book-a-call` | `book-a-call/page.tsx` | Lightweight booking request |
| `/privacy-policy` | `privacy-policy/page.tsx` | Bilingual privacy policy |
| `/cookie-policy` | `cookie-policy/page.tsx` | Cookie categories |
| `/terms` | `terms/page.tsx` | Terms of service |

## API (`/app/api`)

| Route | Method | Validation | Notes |
|---|---|---|---|
| `/api/contact` | POST | Zod | Honeypot, rate-limit (5/min/IP), structured logging |
| `/api/book` | POST | Zod | Honeypot |
| `/api/subscribe` | POST | Zod | Email-only newsletter intake |

## SEO & meta

| File | Output |
|---|---|
| `app/sitemap.ts` | `/sitemap.xml` |
| `app/robots.ts` | `/robots.txt` |
| `app/manifest.ts` | `/manifest.webmanifest` |
| `app/[locale]/layout.tsx` | per-locale `<title>`, OG, Twitter, hreflang alternates |
| `components/OrganizationJsonLd.tsx` | Schema.org Organization JSON-LD |
