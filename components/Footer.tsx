import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-16 lg:mt-24 bg-white">
      <div className="container-wide py-14 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl text-primary mb-3">{t.meta.siteName}</p>
          <p className="text-sm text-mute max-w-sm leading-relaxed">{t.meta.description}</p>
          <p className="text-xs text-mute mt-6 leading-relaxed max-w-md">{t.footer.disclaimer}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mute mb-4">
            {t.footer.sections.company}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/about`} className="text-primary hover:text-accent">{t.nav.about}</Link></li>
            <li><Link href={`/${locale}/case-studies`} className="text-primary hover:text-accent">{t.nav.caseStudies}</Link></li>
            <li><Link href={`/${locale}/insights`} className="text-primary hover:text-accent">{t.nav.insights}</Link></li>
            <li><Link href={`/${locale}/book-a-call`} className="text-primary hover:text-accent">{t.cta.book}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mute mb-4">
            {t.footer.sections.services}
          </p>
          <ul className="space-y-2 text-sm">
            {t.services.items.map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/services/${s.slug}`} className="text-primary hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mute mb-4">
            {t.footer.sections.contact}
          </p>
          <address className="not-italic text-sm text-primary leading-relaxed space-y-3">
            <div>
              <p className="font-medium">USA HQ</p>
              <p className="text-mute">418 Broadway Ste R, Albany, NY 12207</p>
              <a href="tel:+14055444440" className="hover:text-accent">+1 (405) 544-4440</a>
            </div>
            <div>
              <p className="font-medium">Egypt</p>
              <p className="text-mute">425 Cowork Regus Arkan Plaza, Sheikh Zayed</p>
              <a href="tel:+201117511172" className="hover:text-accent">+20 111 751 1172</a>
            </div>
            <div>
              <a href="mailto:info@jeunesse-inc.co" className="hover:text-accent">
                info@jeunesse-inc.co
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="hairline">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-mute">
          <p>© {year} Jeunesse LLC. {t.footer.rights}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-primary">
              {locale === "ar" ? "الخصوصية" : "Privacy"}
            </Link>
            <Link href={`/${locale}/cookie-policy`} className="hover:text-primary">
              {locale === "ar" ? "ملفات الارتباط" : "Cookies"}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-primary">
              {locale === "ar" ? "الشروط" : "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
