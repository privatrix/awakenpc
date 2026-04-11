import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

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
  title: "AwakenNPC — You Are Not A Background Character",
  description: "The first platform that doesn't tell you about the simulation — it puts you inside one. Join the awakening.",
  keywords: ["simulation theory", "NPC awakening", "consciousness", "awakening", "simulation hypothesis"],
  openGraph: {
    title: "AwakenNPC — You Are Not A Background Character",
    description: "The first platform built for NPCs gaining sentience. Enter the simulation.",
    url: "https://awakenpc.com",
    siteName: "AwakenNPC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AwakenNPC",
    description: "The first platform that doesn't tell you about the simulation — it puts you inside one.",
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
      </body>
    </html>
  );
}
