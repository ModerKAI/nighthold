"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import TestimonialCard from "./TestimonialCard";
import ProfitChart from "./ProfitChart";
import ClientOnly from "./ClientOnly";

// Упрощенные данные отзывов - только даты
const testimonials = [
  {
    date: "January 2025"
  },
  {
    date: "February 2025"
  },
  {
    date: "March 2025"
  },
  {
    date: "March 2025"
  }
];

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax scroll для фона - только после монтирования
  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  useEffect(() => {
    // GSAP анимация для фоновых элементов
    if (backgroundRef.current && typeof window !== 'undefined') {
      // Добавляем задержку для полной загрузки DOM
      const timer = setTimeout(() => {
        const particles = backgroundRef.current?.querySelectorAll('.bg-particle');
        
        if (particles && particles.length > 0) {
          gsap.set(particles, {
            opacity: 0,
            scale: 0
          });

          gsap.to(particles, {
            opacity: 0.6,
            scale: 1,
            duration: 2,
            stagger: 0.1,
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.section
      ref={sectionRef}
      id="section-5"
      className="min-h-screen w-full relative overflow-hidden py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      {/* Parallax Background */}
      <motion.div
        ref={backgroundRef}
        style={{
          y: backgroundY,
          opacity: backgroundOpacity
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,194,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,194,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="bg-particle absolute w-2 h-2 bg-cyberpunk-yellow rounded-full"
            style={{
              left: `${((i * 17) % 100)}%`,
              top: `${((i * 23) % 100)}%`,
            }}
          />
        ))}

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-pink/5 via-transparent to-cyberpunk-blue/5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyberpunk-green/5 via-transparent to-cyberpunk-yellow/5" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-cyberpunk-green drop-shadow-cyberpunk">
            Real Results from Real Students
          </h2>
          <p className="text-lg md:text-xl text-cyberpunk-neon/80 max-w-3xl mx-auto">
            See the amazing transformations achieved by our students through NightHold concepts and institutional trading strategies.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Average Profit", value: "+127%", color: "pink" },
            { label: "Success Rate", value: "70%", color: "green" },
            { label: "Students Helped", value: "250", color: "blue" },
            { label: "Months to Profit", value: "2/3", color: "yellow" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`text-center p-6 rounded-xl border-2 bg-cyberpunk-dark/40 backdrop-blur-sm
                ${stat.color === 'pink' ? 'border-cyberpunk-pink/40' : ''}
                ${stat.color === 'green' ? 'border-cyberpunk-green/40' : ''}
                ${stat.color === 'blue' ? 'border-cyberpunk-blue/40' : ''}
                ${stat.color === 'yellow' ? 'border-cyberpunk-yellow/40' : ''}
              `}
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2
                ${stat.color === 'pink' ? 'text-cyberpunk-pink' : ''}
                ${stat.color === 'green' ? 'text-cyberpunk-green' : ''}
                ${stat.color === 'blue' ? 'text-cyberpunk-blue' : ''}
                ${stat.color === 'yellow' ? 'text-cyberpunk-yellow' : ''}
              `}>
                {stat.value}
              </div>
              <div className="text-cyberpunk-neon/70 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Profit Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <ClientOnly>
            <ProfitChart />
          </ClientOnly>
        </motion.div>

        {/* Testimonials Grid */}
        <ClientOnly>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                date={testimonial.date}
                index={index}
              />
            ))}
          </div>
        </ClientOnly>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.a
            href="https://t.me/+NUnUvdcg4IBjNDhi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0,255,194,0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-4 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue hover:from-cyberpunk-green hover:to-cyberpunk-yellow text-cyberpunk-dark font-bold text-xl rounded-xl shadow-cyberpunk transition-all duration-300"
          >
            Join Our Success Stories
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}


