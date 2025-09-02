"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import SectionNav from "@/components/SectionNav";

import ScrollPinSector from "@/components/ScrollPinSector";
import CountdownTimer from "@/components/CountdownTimer";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommunityPricingSection from "@/components/CommunityPricingSection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);


  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!loading) return;
    if (progress < 100) {
      const timeout = setTimeout(() => setProgress(progress + Math.floor((progress % 7) + 5)), 150);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [progress, loading]);

  return (
  <main className="text-cyberpunk-neon w-full overflow-x-hidden relative" suppressHydrationWarning>
      <ClientOnly>
        <SectionNav ids={["section-1","section-2","section-3","section-4","section-5","section-6"]} />
      </ClientOnly>
      {/* Preloader */}
      <AnimatePresence>
        {mounted && loading && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Crypto Chart Animation */}
            <div className="mb-8 flex flex-col items-center">
              <div className="w-40 h-40 flex items-center justify-center">
                {/* Animated Crypto Chart SVG */}
                <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="drop-shadow-lg">
                  {/* Grid Background */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,255,150,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="160" height="120" fill="url(#grid)" />
                  
                  {/* Animated Chart Line */}
                  <motion.path
                    d="M10 80 L25 70 L40 85 L55 60 L70 45 L85 55 L100 35 L115 40 L130 25 L145 30"
                    stroke="var(--cyberpunk-green)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  {/* Support/Resistance Lines */}
                  <line x1="10" y1="90" x2="150" y2="90" stroke="rgba(255,50,50,0.3)" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="10" y1="50" x2="150" y2="50" stroke="rgba(0,255,150,0.3)" strokeWidth="1" strokeDasharray="5,5" />
                  
                  {/* Candlesticks */}
                  <motion.rect x="20" y="65" width="3" height="15" fill="var(--cyberpunk-green)" 
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} />
                  <motion.rect x="35" y="75" width="3" height="10" fill="#ff3366" 
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} />
                  <motion.rect x="50" y="55" width="3" height="20" fill="var(--cyberpunk-green)" 
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.6, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} />
                  <motion.rect x="65" y="40" width="3" height="15" fill="var(--cyberpunk-green)" 
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.8, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} />
                  <motion.rect x="80" y="50" width="3" height="12" fill="#ff3366" 
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.0, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} />
                  <motion.rect x="95" y="30" width="3" height="18" fill="var(--cyberpunk-green)" 
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.2, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} />
                  
                  {/* Blinking Price Points */}
                  <motion.circle cx="145" cy="30" r="3" fill="var(--cyberpunk-yellow)"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </svg>
              </div>
              <div className="text-6xl font-extrabold text-white mt-4">{Math.min(progress, 100)}<span className="text-3xl align-top">%</span></div>
            </div>
            <div className="text-xl text-white font-bold tracking-widest text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(0,255,194,0.8)",
                      "0 0 20px rgba(0,255,194,0.8)",
                      "0 0 0px rgba(0,255,194,0.8)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="block"
                >
                  PLEASE WAIT
                </motion.span>
                <motion.span
                  animate={{ 
                    color: ["#ffffff", "#00FFC2", "#ffffff"],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                  className="block mt-2 text-lg"
                >
                  MAKING YOU PROFITABLE
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Первый сектор — фоновое видео + lorem ipsum */}
  <Section id="section-1" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" variant="scaleIn">
        {/* Видео-блок: немного меньше экрана + сильнее затемнение */}
        {/* Видео и эффекты — фон на всю секцию, без контейнеров и углов */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{
              opacity: 0.93
            }}
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
          {/* Glow-эффект и мягкий fade по краям */}
          <div className="absolute inset-0 pointer-events-none z-10"
               style={{
                 boxShadow: '0 0 120px 40px #ff00cc55, 0 0 180px 80px #00eaff33',
                 background: 'radial-gradient(ellipse at 80% 20%, rgba(255,0,204,0.10) 0%, transparent 70%), radial-gradient(ellipse at 10% 90%, rgba(0,234,255,0.08) 0%, transparent 70%)'
               }}
          />
          {/* Overlay для затемнения */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Текст: чуть меньше и смещён вниз-вправо */}
        <div className="relative z-10 w-full flex justify-end">
          <div className="max-w-3xl mr-8 mb-12 md:mr-16 md:mb-16 text-right">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-5xl font-extrabold mb-4 text-cyberpunk-pink drop-shadow-cyberpunk"
            >
              Learn How Institutional Traders Operate
            </motion.h1>
          </div>
        </div>

        {/* Статистика в левом нижнем углу */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div className="text-cyberpunk-green/80 text-sm md:text-base font-mono tracking-wider">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="text-cyberpunk-pink">15</span>
                <span className="ml-1">students</span>
              </span>
              <span className="text-cyberpunk-yellow">•</span>
              <span className="flex items-center">
                <span className="text-cyberpunk-blue">5</span>
                <span className="ml-1">mentors</span>
              </span>
            </div>
          </div>
        </motion.div>
  </Section>

      {/* Остальные 5 секторов */}
      {/* Сектор 2 — About Us Section */}
      <ClientOnly>
        <AboutSection />
      </ClientOnly>

      {/* Сектор 3 — Pinned elements / Scroll pinning */}
      <div className="mb-32 relative">
        <ScrollPinSector />
      </div>

      {/* Countdown Timer Section */}
      <ClientOnly>
        <CountdownTimer />
      </ClientOnly>

      {/* Сектор 5 — Результаты и кейсы */}
      <ClientOnly>
        <TestimonialsSection />
      </ClientOnly>

      {/* Сектор 6 — Community & Pricing */}
      <ClientOnly>
        <CommunityPricingSection />
      </ClientOnly>

      {/* Сектор 7 — FAQ */}
      <ClientOnly>
        <FAQSection />
      </ClientOnly>

      {/* Footer */}
      <footer className="py-12 px-4 flex flex-col items-center bg-cyberpunk-dark/90 mt-12">
        <p className="text-cyberpunk-green text-center text-sm tracking-widest opacity-70">
          © 2025 NIGHTHOLD. All rights reserved.
        </p>
      </footer>
    </main>
  );
}