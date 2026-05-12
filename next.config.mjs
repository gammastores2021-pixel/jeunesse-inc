/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  }
];

// Long-cache for static media. Files are content-addressable enough by name; use no-store fallback for safety.
const mediaCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Drop AVIF — encoding is CPU-heavy and offers small wins over our pre-optimized WebP.
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.higgsfield.ai" },
      { protocol: "https", hostname: "**.higgsfield.ai" },
      { protocol: "https", hostname: "**.cloudfront.net" }
    ]
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/images/:path*", headers: mediaCache },
      { source: "/videos/:path*", headers: mediaCache },
      { source: "/icons/:path*", headers: mediaCache },
      { source: "/fonts/:path*", headers: mediaCache }
    ];
  }
};

export default nextConfig;
