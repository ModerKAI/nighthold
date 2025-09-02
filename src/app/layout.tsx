import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import TopBar from "@/components/TopBar";
import BackgroundStones from "@/components/BackgroundStones";
import ClientOnly from "@/components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NightHold",
  description: "NightHold Trading Academy - Master NightHold Concepts",
  keywords: "trading, nighthold, forex, crypto, academy, institutional",
  authors: [{ name: "NightHold Academy" }],
  icons: {
    icon: "/media/logo.png",
    shortcut: "/media/logo.png",
    apple: "/media/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/media/logo.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {/* Overlay для деликатного затемнения фонового изображения */}
        <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',background:'rgba(10,10,26,0.82)'}} />
        
        <ClientOnly>
          <ScrollProgress />
          <TopBar />
        </ClientOnly>
        
        {/* Фоновые камни (абсолютный фон для всех секций) */}
        <div id="crypto-bg-stones" style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}>
          <ClientOnly>
            <BackgroundStones />
          </ClientOnly>
        </div>
        
        <div style={{position:'relative',zIndex:1}}>
          {children}
        </div>
      </body>
    </html>
  );
}
