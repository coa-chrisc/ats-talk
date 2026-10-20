import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import "./globals.css";

/** Austin Public Health's face (docs/bchc-brand.md); the kit sets in it through `--dk-face`. */
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

/** Shared by its link only: search engines are asked to leave it alone. */
export const metadata: Metadata = {
  title: "Building with AI in Austin",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
