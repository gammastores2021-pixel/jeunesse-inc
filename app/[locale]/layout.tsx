import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, dirOf, locales, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return {
    title: { default: `${t.meta.siteName} — ${t.meta.tagline}`, template: `%s · ${t.meta.siteName}` },
    description: t.meta.description,
    keywords: t.meta.keywords.split(",").map((s) => s.trim()),
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: "/en", ar: "/ar" }
    },
    openGraph: {
      type: "website",
      locale: params.locale === "ar" ? "ar" : "en_US",
      siteName: t.meta.siteName,
      title: `${t.meta.siteName} — ${t.meta.tagline}`,
      description: t.meta.description,
      url: `/${params.locale}`,
      images: ["/images/og-default.webp"]
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.meta.siteName} — ${t.meta.tagline}`,
      description: t.meta.description,
      images: ["/images/og-default.webp"]
    }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const dir = dirOf(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap"
        />
        <link rel="preload" as="image" href="/images/home-hero-001.webp" fetchPriority="high" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50
                     focus:bg-primary focus:text-surface focus:px-4 focus:py-2 focus:rounded"
        >
          {t.nav.skip}
        </a>
        <Header locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <CookieBanner t={t.cookieBanner} locale={locale} />
        <OrganizationJsonLd locale={locale} />
      </body>
    </html>
  );
}
