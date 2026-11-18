import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Intersilvi redesign prototypes", template: "%s · Intersilvi prototype" },
  description: "Homepage concept prototypes for the Intersilvi redesign.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Icons: Material Symbols Rounded only (variable weight 100–700, fill 0–1). display=block hides ligature text until it loads. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,100..700,0..1,0&display=block" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
