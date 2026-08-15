import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
  async headers() {
    const cache = [
      { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
    ];
    return [
      { source: "/images/logo/:path*", headers: cache },
      { source: "/favicon.ico", headers: cache },
      { source: "/favicon-16x16.png", headers: cache },
      { source: "/favicon-32x32.png", headers: cache },
      { source: "/apple-touch-icon.png", headers: cache },
      { source: "/android-chrome-192x192.png", headers: cache },
      { source: "/android-chrome-512x512.png", headers: cache },
      { source: "/og.png", headers: cache },
    ];
  },
};

export default nextConfig;
