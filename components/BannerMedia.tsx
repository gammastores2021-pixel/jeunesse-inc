"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  image: string;
  video?: string;
  alt: string;
  ratio?: "16:9" | "21:9" | "4:3";
  priority?: boolean;
};

export default function BannerMedia({ image, video, alt, ratio = "16:9", priority }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useEffect(() => {
    if (!video) return;
    if (typeof window === "undefined") return;
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

  const aspect =
    ratio === "21:9" ? "aspect-[21/9]" : ratio === "4:3" ? "aspect-[4/3]" : "aspect-video";

  return (
    <div
      ref={containerRef}
      className={`relative ${aspect} w-full overflow-hidden rounded-lg border border-border bg-primary`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 1100px"
        className="object-cover"
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
