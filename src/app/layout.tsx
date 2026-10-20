import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

/** The deck's face, Geist, served from the `geist` package so the build needs no network; the kit sets in it through `--dk-face`. */
const geist = localFont({ src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2", variable: "--font-geist", weight: "100 900" });

/** Shared by its link only: search engines are asked to leave it alone. */
export const metadata: Metadata = {
  title: "Agentic AI at the City",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
