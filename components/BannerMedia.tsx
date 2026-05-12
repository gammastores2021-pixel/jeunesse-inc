"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  image: string;
  video?: string;
  alt: string;
  ratio?: "16:9" | "21:9" | "4:3";
  priority?: boolean;
};

const RATIO_DIMS: Record<NonNullable<Props["ratio"]>, { w: number; h: number; cls: string }> = {
  "16:9": { w: 1600, h: 900, cls: "aspect-video" },
  "21:9": { w: 1600, h: 686, cls: "aspect-[21/9]" },
  "4:3": { w: 1600, h: 1200, cls: "aspect-[4/3]" }
};

export default function BannerMedia({ image, video, alt, ratio = "16:9", priority }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useEffect(() => {
    if (!video || typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldRenderVideo(true);
            videoRef.current?.play().catch(() => undefined);
          } else {
            videoRef.current?.pause();
          }
        }
      },
      { threshold: 0.25, rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  const dims = RATIO_DIMS[ratio];

  return (
    <div
      ref={containerRef}
      className={`relative ${dims.cls} w-full overflow-hidden rounded-lg border border-border bg-primary`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        width={dims.w}
        height={dims.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {video && shouldRenderVideo && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,31,58,0) 45%, rgba(11,31,58,.55) 100%)"
        }}
      />
    </div>
  );
}
