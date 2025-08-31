"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Устанавливаем дату окончания (например, через 2 дня)
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Вычисляем сразу
    calculateTimeLeft();

    // Обновляем каждую секунду
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null; // Предотвращаем гидрацию
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-screen w-full px-6 py-24 flex flex-col items-center justify-center">
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-cyberpunk-pink drop-shadow-cyberpunk"
        >
          Time is Running Out!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-cyberpunk-neon mb-4 opacity-90"
        >
          Don't miss out — limited spots available and disappearing fast!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-base text-cyberpunk-neon/70 mb-12"
        >
          * Join now and get instant access to the complete course, exclusive bonus materials, and lifetime updates.
        </motion.p>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.6 + index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }
              }}
              viewport={{ once: false }}
              className="relative"
            >
              <div className="bg-cyberpunk-dark/80 border-2 border-cyberpunk-yellow/70 rounded-xl p-6 backdrop-blur-md shadow-cyberpunk">
                <div className="text-4xl md:text-6xl font-extrabold text-cyberpunk-yellow drop-shadow-cyberpunk mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-cyberpunk-neon uppercase tracking-widest opacity-80">
                  {unit.label}
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyberpunk-yellow/20 rounded-xl blur-xl opacity-60 animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              duration: 0.8,
              delay: 1.2,
              ease: [0.23, 1, 0.32, 1]
            }
          }}
          viewport={{ once: false }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255, 0, 204, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 rounded-xl bg-cyberpunk-pink text-cyberpunk-dark font-bold text-xl md:text-2xl shadow-cyberpunk hover:bg-cyberpunk-yellow hover:text-cyberpunk-pink transition-colors duration-300"
        >
          Get Instant Access
        </motion.button>

        {/* Sparkle decoration */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-10 text-cyberpunk-pink text-2xl"
        >
          ✨
        </motion.div>
      </div>
    </section>
  );
}
