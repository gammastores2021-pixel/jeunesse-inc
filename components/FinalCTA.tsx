import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function FinalCTA({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="rounded-xl bg-primary text-surface p-10 lg:p-16 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="font-display text-display-md leading-tight">{t.home.finalCtaTitle}</h2>
            <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">{t.home.finalCtaSub}</p>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3 justify-end">
            <Link href={`/${locale}/book-a-call`} className="btn btn-secondary">
              {t.cta.book}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn bg-transparent text-surface border border-white/30 hover:border-white"
            >
              {t.cta.proposal}
            </Link>
            <a
              href="mailto:info@jeunesse-inc.co"
              className="btn bg-transparent text-surface border border-white/30 hover:border-white"
            >
              {t.cta.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
