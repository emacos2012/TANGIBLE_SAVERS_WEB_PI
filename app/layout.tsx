import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { PiProvider } from "@/components/PiProvider";
import { RootLayoutClient } from "./RootLayoutClient";
import PiScriptLoader from "@/components/PiScriptLoader";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tangible Savers",
  description: "Save money on transportation, shopping, malls, and logistics. Find the best deals and discounts across all your favorite services and stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PiScriptLoader />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <PiProvider>
            <Navbar />
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
          </PiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
