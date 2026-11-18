import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@/content/media";

/**
 * Official Intersilvi logo from intersilvi.com. Only a 189×81 raster exists there,
 * so it renders at or below that size; request the vector original for production.
 * On navy, it sits on a white tile because the logo artwork has dark lettering.
 */
export function Logo({ tone = "dark", base = "/concept-b" }: { tone?: "dark" | "light"; base?: string }) {
  return (
    <Link
      href={base}
      aria-label="Intersilvi, home"
      className={`inline-flex min-h-11 w-fit flex-none items-center justify-self-start no-underline ${tone === "light" ? "rounded-b bg-b-paper px-3 py-2" : ""}`}
    >
      <Image src={brandLogo.src} alt="" width={brandLogo.width} height={brandLogo.height} priority={tone === "dark"} className="h-10 w-auto sm:h-11" />
    </Link>
  );
}
