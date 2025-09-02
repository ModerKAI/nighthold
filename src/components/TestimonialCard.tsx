"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useEffect, useState } from "react";


interface TestimonialCardProps {
  date: string;
  index: number;
}

export default function TestimonialCard({
  date,
  index
}: TestimonialCardProps) {
  // Простые градиентные фоны для каждой карточки
  const backgroundColors = [
    'bg-gradient-to-br from-cyberpunk-pink/20 to-cyberpunk-blue/20',
    'bg-gradient-to-br from-cyberpunk-green/20 to-cyberpunk-yellow/20', 
    'bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-pink/20',
    'bg-gradient-to-br from-cyberpunk-yellow/20 to-cyberpunk-green/20'
  ];

  const borderColors = [
    'border-cyberpunk-pink/40',
    'border-cyberpunk-green/40',
    'border-cyberpunk-blue/40', 
    'border-cyberpunk-yellow/40'
  ];

  const profitColors = [
    'text-cyberpunk-pink',
    'text-cyberpunk-green',
    'text-cyberpunk-blue',
    'text-cyberpunk-yellow'
  ];

  // Генерируем фиксированные значения выплат для каждого студента (50-110k)
  const payoutValues = useMemo(() => [87, 103, 65, 91], []);
  const currentPayout = payoutValues[index];

  // Анимация счетчика
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 15 });
  const displayValue = useTransform(springValue, latest => Math.round(latest));
  
  const [animatedValue, setAnimatedValue] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", latest => {
      setAnimatedValue(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  useEffect(() => {
    if (inView) {
      // Задержка для каскадной анимации
      const timeout = setTimeout(() => {
        motionValue.set(currentPayout);
      }, index * 200 + 500);
      
      return () => clearTimeout(timeout);
    } else {
      motionValue.set(0);
    }
  }, [inView, currentPayout, index, motionValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div
        className={`relative backdrop-blur-md border-2 rounded-2xl p-6 md:p-8 h-80 md:h-96 ${backgroundColors[index]} ${borderColors[index]}`}
      >
        {/* Student Header */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-cyberpunk-neon">
            Student {index + 1}
          </h3>
        </div>

        {/* Profit Scale - центральная часть */}
        <div className="flex-1 flex flex-col justify-center items-center mb-6 md:mb-8">
          {/* Payout Amount с анимацией */}
          <motion.div 
            className={`text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 ${profitColors[index]} drop-shadow-lg`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { 
              scale: [0.5, 1.2, 1], 
              opacity: 1,
              textShadow: [
                "0 0 0px currentColor",
                "0 0 20px currentColor",
                "0 0 10px currentColor"
              ]
            } : { scale: 0.5, opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.2 + 0.3,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
          >
            {animatedValue}k
          </motion.div>
          
          {/* Анимированный текст "PAYOUTS" */}
          <motion.div
            initial={{ 
              y: 30, 
              opacity: 0, 
              scale: 0.8,
              rotateX: -90 
            }}
            animate={inView ? { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              rotateX: 0 
            } : { 
              y: 30, 
              opacity: 0, 
              scale: 0.8,
              rotateX: -90 
            }}
            transition={{ 
              duration: 1, 
              delay: index * 0.2 + 0.8,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="text-cyberpunk-neon/60 text-sm font-bold tracking-[0.5em] mb-6 relative"
          >
            <motion.span
              animate={inView ? {
                textShadow: [
                  "0 0 0px rgba(234,245,255,0.6)",
                  "0 0 10px rgba(234,245,255,0.8)",
                  "0 0 5px rgba(234,245,255,0.6)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2 + 1.5
              }}
            >
              PAYOUTS
            </motion.span>
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-xs">
            <div className="mb-2 text-center text-cyberpunk-neon/70 text-sm font-medium">
              Payout Scale
            </div>
            <div className="w-full bg-cyberpunk-dark/60 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${Math.min((currentPayout - 50) / 60 * 100, 100)}%` } : { width: 0 }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2 + 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`h-full rounded-full ${
                  index === 0 ? 'bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue' :
                  index === 1 ? 'bg-gradient-to-r from-cyberpunk-green to-cyberpunk-yellow' :
                  index === 2 ? 'bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink' :
                  'bg-gradient-to-r from-cyberpunk-yellow to-cyberpunk-green'
                }`}
              />
            </div>
            <div className="flex justify-between text-xs text-cyberpunk-neon/50 mt-1">
              <span>50k</span>
              <span>110k</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs sm:text-sm md:text-base text-cyberpunk-neon/80">
          <span className="text-xs sm:text-sm">{date}</span>
          <span className="text-cyberpunk-yellow font-medium text-xs sm:text-sm">✦ Verified Result</span>
        </div>
      </div>
    </motion.div>
  );
}