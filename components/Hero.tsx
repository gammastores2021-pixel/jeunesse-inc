"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const trigger = () => setShowVideo(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(trigger);
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(trigger, 200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!showVideo || !v || !section) return;
    v.play().catch(() => undefined);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) v.play().catch(() => undefined);
          else v.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/home-hero-001.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {showVideo && (
          <video
            ref={videoRef}
            src="/videos/home-hero-loop.mp4"
            poster="/images/home-hero-001.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(247,246,242,.92) 0%, rgba(247,246,242,.78) 40%, rgba(247,246,242,.55) 100%)"
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 500px at 0% 0%, rgba(11,31,58,.10), transparent 55%), radial-gradient(1100px 500px at 90% -10%, rgba(201,163,91,.18), transparent 60%)"
          }}
        />
      </div>

      <div className="container-wide pt-20 lg:pt-32 pb-20 lg:pb-32 relative">
        <p className="eyebrow mb-5">
          <span className="inline-block w-6 h-px bg-accent me-3" />
          {t.home.eyebrow}
        </p>
        <h1 className="font-display text-display-xl text-primary max-w-4xl">{t.home.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg text-mute leading-relaxed">{t.home.sub}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href={`/${locale}/book-a-call`} className="btn btn-primary">
            {t.cta.book}
          </Link>
          <Link href={`/${locale}/services`} className="btn btn-ghost">
            {t.cta.explore}
          </Link>
        </div>
      </div>
    </section>
  );
}
