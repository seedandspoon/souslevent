import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { BottomNav } from "@/components/nav/BottomNav";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import { EnsureProfile } from "@/components/EnsureProfile";
import { scriptAntiFlash } from "@/lib/textScale";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sous le vent — Apprendre la voile",
  description:
    "Apprends la voile de manière progressive et concrète : leçons courtes, quiz, nœuds, glossaire et fiches rapides pour tes sorties en mer.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sous le vent",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1D7CA8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Applique la taille de texte mémorisée avant le premier rendu,
            pour éviter un flash à la taille par défaut (voir useTailleTexte
            dans src/lib/textScale.ts, qui prend le relais côté React). */}
        <script dangerouslySetInnerHTML={{ __html: scriptAntiFlash() }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <RegisterServiceWorker />
        <EnsureProfile />
        <div className="flex-1 pb-20">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
