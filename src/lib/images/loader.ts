/**
 * next/image loader. Remote images are resized by their own CDN, never downloaded or re-encoded by the Next.js server.
 * - Unsplash: imgix resizing parameters.
 * - Intersilvi media host (live store): served as-is; the width hint is a harmless query parameter.
 * - Local paths pass through.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  if (src.startsWith("https://")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    return url.toString();
  }
  // Local files are served as-is; the width hint keeps next/image from warning about an ignored width.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
