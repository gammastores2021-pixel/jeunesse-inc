import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import BookForm from "@/components/BookForm";

export const metadata = { title: "Book a Call" };

export default function BookPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-3xl">
          <SectionHeader eyebrow={t.cta.book} title={t.book.h1} lead={t.book.lead} />
          <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
            {t.book.bullets.map((b, i) => (
              <li
                key={i}
                className="rounded-md border border-border bg-white px-4 py-3 text-primary"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide max-w-3xl">
          <div className="card">
            <h2 className="font-display text-2xl text-primary mb-6">{t.book.formTitle}</h2>
            <BookForm t={t} locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
