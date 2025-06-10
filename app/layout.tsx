// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { proximaVara } from "./fonts";
import "./globals.css";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Default metadata for the application
export const metadata: Metadata = {
  title: "T3 Chat clone for hackathon",
  description: "a cheap alternative to chatgpt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-proxima-vara text-[#501854]">{children}</body>
    </html>
  );
}
