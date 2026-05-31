import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, DM_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "CSS KRO — Master CSS with Confidence",
  description:
    "Pakistan's premier CSS civil services exam preparation platform. Newspapers, resources, past papers, timeline, and exam pattern — everything you need to succeed.",
  icons: {
    icon: [
      { url: "/atom-favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/atom-icon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0D1B2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${playfair.variable} ${sourceSerif.variable} ${dmMono.variable} font-body antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
