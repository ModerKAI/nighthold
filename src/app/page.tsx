"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import SectionNav from "@/components/SectionNav";
import Counter from "@/components/Counter";
import ScrollPinSector from "@/components/ScrollPinSector";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const stats: { label: string; val: number; suffix?: string; color: 'pink'|'blue'|'yellow'|'green'; decimals?: number }[] = [
    { label: "Successful Orders", val: 7000, suffix: "+", color: "pink" },
    { label: "Years of Success", val: 8, suffix: "", color: "blue" },
    { label: "Students Trained", val: 10000, suffix: "+", color: "yellow" },
    { label: "Win Rate", val: 94.2, suffix: "%", color: "green", decimals: 1 },
  ];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!loading) return;
    if (progress < 100) {
      const timeout = setTimeout(() => setProgress(progress + Math.floor(Math.random() * 10 + 5)), 150);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [progress, loading]);

  return (
  <main className="text-cyberpunk-neon w-full overflow-x-hidden relative">
      <SectionNav ids={["section-1","section-2","section-3","section-4","section-5","section-6"]} />
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                INITIALIZING<br />TRADING<br />PLATFORM
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
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl text-cyberpunk-neon opacity-90"
            >
              Exclusive Course on Smart Money Concepts
            </motion.p>
          </div>
        </div>
  </Section>

      {/* Остальные 5 секторов */}
      {/* Сектор 2 — Неоновые метрики и преимущества */}
      <Section
        id="section-2"
        className="min-h-[80vh] w-full px-6 py-24"
        variant="fadeUp"
        duration={0.8}
        delay={0.05}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-cyberpunk-yellow">
          Smart Money Trading — Facts & Figures
        </h2>
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Стат-карточки */}
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 30, 
                scale: 0.9,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              viewport={{ once: false, margin: "-50px" }} // Убираем once: true
              className={`rounded-2xl border-2 p-4 md:p-6 backdrop-blur-md shadow-cyberpunk hover:scale-[1.02] transition-transform duration-300 min-h-[140px] flex flex-col justify-center
                ${s.color === 'pink' ? 'border-cyberpunk-pink/70 bg-cyberpunk-pink/10' : ''}
                ${s.color === 'blue' ? 'border-cyberpunk-blue/70 bg-cyberpunk-blue/10' : ''}
                ${s.color === 'yellow' ? 'border-cyberpunk-yellow/70 bg-cyberpunk-yellow/10' : ''}
                ${s.color === 'green' ? 'border-cyberpunk-green/70 bg-cyberpunk-green/10' : ''}
              `}
            >
              <div className="text-xs md:text-sm tracking-widest uppercase opacity-80 mb-2 text-center">{s.label}</div>
              <Counter
                to={s.val}
                decimals={s.decimals ?? 0}
                suffix={s.suffix ?? ""}
                duration={2 + idx * 0.3} // Каскадная анимация: 2s, 2.3s, 2.6s, 2.9s
                className={`block text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-cyberpunk text-center leading-tight ${
                  s.color === 'pink' ? 'text-cyberpunk-pink' :
                  s.color === 'blue' ? 'text-cyberpunk-blue' :
                  s.color === 'yellow' ? 'text-cyberpunk-yellow' :
                  'text-cyberpunk-green'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Trading Advantages */}
        <div className="mx-auto max-w-5xl mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Smart Money Flow", d: "Learn to identify institutional order flow and market manipulation." },
            { t: "Risk Management", d: "Master professional risk management and position sizing techniques." },
            { t: "Market Structure", d: "Understand market cycles, liquidity zones and order block concepts." },
          ].map((f, i) => (
            <div key={i} className="rounded-xl border-2 border-cyberpunk-pink/60 bg-black/30 p-6">
              <div className="text-cyberpunk-pink font-bold tracking-wide mb-2">{f.t}</div>
              <div className="text-cyberpunk-neon/90">{f.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Сектор 3 — Pinned elements / Scroll pinning */}
      <div className="mb-32">
        <ScrollPinSector />
      </div>

      {/* Countdown Timer Section */}
      <CountdownTimer />

      {/* Сектор 4..6 — шаблон */}
      {[...Array(3)].map((_, j) => (
        <Section
          id={`section-${j + 4}`}
          key={j}
          className={`min-h-[80vh] flex flex-col items-center justify-center w-full px-4 py-20 border-b-2 ${
            j === 0 ? 'bg-cyberpunk-yellow/10 border-cyberpunk-green' :
            j === 1 ? 'bg-cyberpunk-green/10 border-cyberpunk-pink' :
            'bg-cyberpunk-blue/10 border-cyberpunk-blue'
          }`}
          variant={j % 2 === 0 ? 'fadeUp' : 'fadeLeft'}
          duration={0.8}
          delay={j * 0.05}
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 text-center ${
            j === 0 ? 'text-cyberpunk-green' :
            j === 1 ? 'text-cyberpunk-pink' :
            'text-cyberpunk-blue'
          }`}>
            {j === 0 ? 'Our Results' : j === 1 ? 'Community' : 'Get Started'}
          </h2>
          <p className="max-w-2xl text-lg md:text-2xl text-cyberpunk-neon text-center">
            {j === 0 ? 'See the amazing results achieved by our students through smart money concepts and institutional trading strategies.' :
             j === 1 ? 'Join our exclusive community of traders who share knowledge, strategies and support each other on the trading journey.' :
             'Ready to transform your trading? Get instant access to our complete course and start your journey to financial freedom.'}
          </p>
        </Section>
      ))}

      {/* About Section */}
      <section className="py-32 px-4 flex flex-col items-center bg-cyberpunk-dark/90 border-t-2 border-cyberpunk-pink">
        <motion.h2
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-cyberpunk-yellow mb-6 text-center"
        >
          Smart Money Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl text-cyberpunk-neon text-lg md:text-xl text-center"
        >
          Join thousands of successful traders who have mastered institutional trading concepts. Our exclusive community provides ongoing support, advanced strategies, and direct access to professional trading insights.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 bg-cyberpunk-dark flex flex-col items-center border-t-2 border-cyberpunk-blue">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-cyberpunk-blue mb-12 text-center"
        >
          Trading Skills You'll Master
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[1,2,3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="rounded-xl bg-cyberpunk-dark border-2 border-cyberpunk-pink p-8 shadow-cyberpunk flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-cyberpunk-pink mb-4 flex items-center justify-center text-cyberpunk-dark text-2xl font-bold shadow-cyberpunk">
                0{i}
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyberpunk-yellow">
                {i === 1 ? 'Market Structure' : i === 2 ? 'Order Flow' : 'Risk Management'}
              </h3>
              <p className="text-cyberpunk-neon text-center">
                {i === 1 ? 'Understand how institutional traders analyze market structure and identify key levels.' :
                 i === 2 ? 'Learn to read order flow and smart money movements in real-time market conditions.' :
                 'Master professional risk management techniques used by successful institutional traders.'}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 flex flex-col items-center bg-cyberpunk-dark/95 border-t-2 border-cyberpunk-yellow">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-cyberpunk-green mb-8 text-center"
        >
          Ready to Start Trading Like a Pro?
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="px-12 py-4 rounded-xl bg-cyberpunk-pink text-cyberpunk-dark font-bold text-2xl shadow-cyberpunk hover:bg-cyberpunk-yellow hover:text-cyberpunk-pink transition duration-300"
        >
          Get Instant Access
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 flex flex-col items-center border-t-2 border-cyberpunk-pink bg-cyberpunk-dark/90 mt-12">
        <p className="text-cyberpunk-green text-center text-sm tracking-widest opacity-70">
          © 2025 Smart Money Academy. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
