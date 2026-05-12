# Launch Checklist — Jeunesse LLC

Use as a gate. Nothing ships until every box is checked, owner signed, date logged.

## 1. Content & accuracy

- [ ] Company legal name spelled exactly as **Jeunesse LLC**, in EN and AR.
- [ ] **US HQ** address, phone, and ZIP verified: `418 Broadway Ste R, Albany, NY 12207 · +1 (405) 544-4440`.
- [ ] **Egypt office** verified: `425 Cowork Regus Arkan Plaza, Sheikh Zayed · +20 111 751 1172`.
- [ ] `info@jeunesse-inc.co` resolves; SPF + DKIM + DMARC records pass.
- [ ] No invented awards, clients, certifications, or stats anywhere on the site.
- [ ] EN ↔ AR copy parity verified by a native Arabic editor (no machine-translated paragraphs).

## 2. SEO & social

- [ ] `NEXT_PUBLIC_SITE_URL` set to the production origin.
- [ ] Each page has unique `<title>` and `description`.
- [ ] `hreflang` alternates render in `<head>` for `en` and `ar`.
- [ ] `Organization` JSON-LD validates in Schema Validator.
- [ ] OG image 1200×630 in `public/images/og-default.jpg`; per-page OG where it adds value.
- [ ] `robots.txt` and `sitemap.xml` reachable; submitted to Google Search Console + Bing Webmaster.
- [ ] Canonical URLs are correct on every page.

## 3. Performance

- [ ] Lighthouse ≥ 95 on Performance / Accessibility / Best Practices / SEO (mobile and desktop).
- [ ] LCP ≤ 2.0 s on Moto G4 throttled to slow 4G.
- [ ] CLS ≤ 0.05; INP ≤ 200 ms.
- [ ] Hero asset ≤ 180 KB AVIF (image) or ≤ 1.6 MB MP4 (video) with poster.
- [ ] All images use `next/image` and have width / height.
- [ ] No render-blocking third-party JS.

## 4. Accessibility

- [ ] Manual tab-through reaches every interactive element in logical order.
- [ ] Skip link visible on focus, lands on `#main`.
- [ ] All form fields have visible labels and aria attributes.
- [ ] Color-contrast checker passes WCAG 2.1 AA across all pages.
- [ ] Screen-reader pass on Home, Services, Contact (NVDA + VoiceOver).
- [ ] `prefers-reduced-motion` disables motion / video autoplay.

## 5. Internationalization

- [ ] `dir="rtl"` applied to `/ar/*`; layout mirrors correctly.
- [ ] Fonts loaded for AR (IBM Plex Sans Arabic) and EN (Inter, Fraunces).
- [ ] Numbers, dates, and phone formats render correctly in both locales.
- [ ] Locale switch on every page preserves the current path.

## 6. Forms & anti-spam

- [ ] `/api/contact` and `/api/book` reject empty honeypot submissions.
- [ ] Rate limiter wired to **Upstash Redis** (or Vercel KV) before launch — in-memory limiter is dev-only.
- [ ] Submissions trigger email via Resend / SES; failures alert ops.
- [ ] CRM webhook (HubSpot) creates contact + deal where applicable.
- [ ] GDPR / Egyptian PDPL consent checkbox stored with submission.

## 7. Compliance

- [ ] Privacy policy, cookie policy, and terms are reviewed by counsel.
- [ ] Cookie banner presents accept / decline; no analytics fires before consent.
- [ ] Outbound emails include unsubscribe link.
- [ ] Data-retention policy documented internally.

## 8. Security

- [ ] HTTPS only; HSTS preload eligible (`max-age=63072000; includeSubDomains; preload`).
- [ ] Security headers verified (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- [ ] No secrets in client bundle (`grep -R "API_KEY" .next/static`).
- [ ] Dependabot / Renovate enabled.
- [ ] Production logs scrub message bodies / PII beyond what's needed.

## 9. Analytics

- [ ] Privacy-first analytics (Plausible / Fathom / GA4 with anonymized IP) loads only after consent.
- [ ] Goals set: `book_a_call_submit`, `contact_submit`, `subscribe_submit`, `service_card_click`.
- [ ] Search Console + analytics dashboards shared with leads.

## 10. Operations

- [ ] Domain `jeunesse-inc.co` configured in production with apex + `www` redirect.
- [ ] DNS for `mail`, MX, SPF, DKIM, DMARC checked.
- [ ] Status / uptime monitor (e.g. BetterStack) configured for `/en`, `/ar`, `/api/contact`.
- [ ] Backup of dictionaries and case-study assets stored in shared drive.
- [ ] Runbook: "site down" / "form down" lives in the team docs.

## 11. Sign-off

- [ ] Brand: ____________ (date / signature)
- [ ] Legal: ____________
- [ ] Engineering: ____________
- [ ] Marketing: ____________
- [ ] Founder: ____________
