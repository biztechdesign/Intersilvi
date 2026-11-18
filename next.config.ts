import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a second dev server run beside the first without sharing .next (set NEXT_DIST_DIR).
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    // Remote images are resized by their own CDN (see src/lib/images/loader.ts), not by the Next.js server.
    loader: "custom",
    loaderFile: "./src/lib/images/loader.ts",
  },
};

export default nextConfig;
