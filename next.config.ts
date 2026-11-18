import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages: STATIC_EXPORT=1 turns on `output: "export"` and trailing slashes, and
 * NEXT_PUBLIC_BASE_PATH (for example "/Intersilvi") serves the site from a sub-path. Without them this is the normal dev/build setup.
 */
const exportMode = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a second dev server run beside the first without sharing .next (set NEXT_DIST_DIR).
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  ...(exportMode ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    // Remote images are resized by their own CDN (see src/lib/images/loader.ts), not by the Next.js server.
    loader: "custom",
    loaderFile: "./src/lib/images/loader.ts",
  },
};

export default nextConfig;
