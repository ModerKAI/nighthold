"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GrowthChart from './GrowthChart';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <motion.section
      ref={sectionRef}
      id="section-2"
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-cyberpunk-dark via-cyberpunk-dark to-black text-cyberpunk-neon py-20"
      suppressHydrationWarning
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
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
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyberpunk-green/40 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" suppressHydrationWarning>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            animate={isInView ? {
              textShadow: [
                "0 0 0px #00FFC2",
                "0 0 20px #00FFC2",
                "0 0 40px #00FFC2",
                "0 0 20px #00FFC2",
                "0 0 0px #00FFC2"
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            About <span className="text-cyberpunk-pink">NightHold</span> Academy
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto w-32 h-1 bg-gradient-to-r from-cyberpunk-green to-cyberpunk-pink"
          />
        </motion.div>

        {/* Content Grid */}
        <div className="space-y-24">
          
          {/* First Row: Text + Video */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Block */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="relative">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-cyberpunk-neon mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Our <span className="text-cyberpunk-green">Mission</span>
                </motion.h3>
                
                <motion.p
                  className="text-lg leading-relaxed text-cyberpunk-neon/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Nighthold, like our participants, grows by demonstrating successful trades. 
                  They all came with different levels of knowledge. But they all share one goal - 
                  to find a quality trader community built on{' '}
                  <span className="text-cyberpunk-pink font-semibold">mutual support</span> and{' '}
                  <span className="text-cyberpunk-green font-semibold">knowledge sharing</span>.
                </motion.p>

                {/* Highlight features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                >
                  {[
                    { icon: "🎯", label: "Quality Community", color: "text-cyberpunk-pink" },
                    { icon: "📈", label: "Proven Results", color: "text-cyberpunk-green" },
                    { icon: "🤝", label: "Mutual Support", color: "text-cyberpunk-yellow" },
                    { icon: "📚", label: "Knowledge Sharing", color: "text-cyberpunk-blue" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-cyberpunk-dark/30 border border-cyberpunk-green/20"
                      whileHover={{ scale: 1.05, borderColor: "rgba(0,255,194,0.5)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-xl">{feature.icon}</span>
                      <span className={`font-medium ${feature.color}`}>{feature.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Video Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-xl group">
                <video
                  className="w-full h-auto rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                >
                  <source src="/media/about-video-1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>

          {/* Second Row: Chart + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <GrowthChart className="w-full" />
            </motion.div>

            {/* Text Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-cyberpunk-neon mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                Our <span className="text-cyberpunk-yellow">Journey</span>
              </motion.h3>
              
              <motion.p
                className="text-lg leading-relaxed text-cyberpunk-neon/90"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                Over more than five years, the joint efforts of like-minded individuals 
                have formed a unique community where{' '}
                <span className="text-cyberpunk-green font-semibold">experienced traders</span> pass on 
                knowledge to newcomers and{' '}
                <span className="text-cyberpunk-pink font-semibold">progress together</span> with them.
              </motion.p>

              {/* Achievement Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="grid grid-cols-2 gap-6 mt-8"
              >
                {[
                  { value: "250+", label: "Active Members", color: "text-cyberpunk-green" },
                  { value: "5+", label: "Years Experience", color: "text-cyberpunk-pink" },
                  { value: "70%", label: "Success Rate", color: "text-cyberpunk-yellow" },
                  { value: "24/7", label: "Community Support", color: "text-cyberpunk-blue" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-lg bg-cyberpunk-dark/40 border border-cyberpunk-green/20"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(0,255,194,0.5)",
                      boxShadow: "0 0 20px rgba(0,255,194,0.2)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-cyberpunk-neon/70">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              textShadow: [
                "0 0 0px #00FFC2",
                "0 0 10px #00FFC2", 
                "0 0 0px #00FFC2"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyberpunk-green font-bold text-lg"
          >
            ↓ Scroll Down ↓
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
