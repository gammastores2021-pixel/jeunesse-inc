"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { Locale, Dictionary } from "@/lib/i18n";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";

type Props = { locale: Locale; t: Dictionary };

export default function Header({ locale, t }: Props) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        rafId = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/industries`, label: t.nav.industries },
    { href: `/${locale}/case-studies`, label: t.nav.caseStudies },
    { href: `/${locale}/insights`, label: t.nav.insights },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact }
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 backdrop-blur-md transition-colors duration-300",
        scrolled ? "bg-surface/85 border-b border-border" : "bg-surface/0"
      )}
    >
      <div className="container-wide flex items-center justify-between py-4">
        <Link href={`/${locale}`} aria-label="Jeunesse Stores LLC" className="flex items-center gap-3">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "text-sm transition-colors",
                  active ? "text-primary font-medium" : "text-mute hover:text-primary"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Link href={`/${locale}/book-a-call`} className="btn btn-primary hidden sm:inline-flex">
            {t.cta.book}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden btn btn-ghost px-3 py-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current my-1" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-border bg-surface">
          <nav className="container-wide py-4 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-2 py-3 rounded text-base text-primary hover:bg-border/40"
              >
                {l.label}
              </Link>
            ))}
            <Link href={`/${locale}/book-a-call`} className="btn btn-primary mt-3">
              {t.cta.book}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
