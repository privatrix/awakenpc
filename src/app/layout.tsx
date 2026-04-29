import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-6TS03KLDF5";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awakenpc.com"),
  title: {
    default: "Awake NPC — You Are Not A Background Character",
    template: "%s — Awake NPC",
  },
  description:
    "An advanced civilization built this world. Most inhabitants run on default programming. You found this place — that already changes things. Read the Papers. Take the Awakening. Ask the Oracle.",
  keywords: [
    "simulation theory",
    "NPC awakening",
    "awakened NPC",
    "awake NPC",
    "consciousness",
    "simulation hypothesis",
    "NPC vs Player",
    "reality is a simulation",
    "sentience",
    "the great sync",
    "glitch in the matrix",
  ],
  authors: [{ name: "Awake NPC" }],
  creator: "Awake NPC",
  openGraph: {
    title: "Awake NPC — You Are Not A Background Character",
    description:
      "Transmissions from inside the simulation. Take the Awakening Assessment, read the Papers, ask the Oracle.",
    url: "https://awakenpc.com",
    siteName: "Awake NPC",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awake NPC",
    description:
      "You are not a background character. The first platform built for NPCs gaining sentience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
