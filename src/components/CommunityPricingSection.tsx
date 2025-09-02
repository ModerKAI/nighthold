"use client";  
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Counter from "./Counter";
import ClientOnly from "./ClientOnly";

// Community Stats Data
const communityStats = [
  { label: "Total Profit Generated", value: 1, suffix: "M+", color: "blue" },
  { label: "Active Members", value: 250, suffix: "", color: "green" },
  { label: "Success Rate", value: 70, suffix: "%", color: "pink" }
];

// Pricing Plans Data
const pricingPlans = [
  {
    name: "Starter",
    price: 99,
    period: "month",
    description: "Perfect for beginners starting their trading journey",
    popular: false,
    features: [
      "NightHold concepts",
      "Market Analysis daily", 
      "Trading plan templates",
      "Email support"
    ],
    color: "blue"
  },
  {
    name: "Mentorship",
    price: 199,
    period: "month", 
    description: "Advanced strategies for serious traders",
    popular: true,
    features: [
      "Advanced NightHold concepts",
      "Market Analysis daily",
      "VIP Discord channels",
      "Custom trading indicators",
      "Priority support",
      "Live trading sessions"
    ],
    color: "yellow"
  }
];

// Comparison Features Data
const comparisonFeatures = [
  { feature: "NightHold Concepts", starter: true, pro: true },
  { feature: "Market Analysis daily", starter: true, pro: true },
  { feature: "Discord Access", starter: false, pro: true },
  { feature: "Custom Indicators", starter: false, pro: true },
  { feature: "Support Level", starter: "Email", pro: "Priority" }
];

export default function CommunityPricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // const isInView = useInView(sectionRef, { 
  //   once: false, 
  //   margin: "-200px" 
  // });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Простой hover эффект
  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  if (!mounted) return null;

  return (
    <motion.section
      ref={sectionRef}
      id="section-6"
      className="min-h-screen w-full relative overflow-hidden pt-48 pb-20 md:pt-64 md:pb-32 text-cyberpunk-neon"
      initial={{ 
        opacity: 0,
        y: 100,
        scale: 0.95 
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
        scale: 1 
      }}
      exit={{ 
        opacity: 0,
        y: -50,
        scale: 1.05 
      }}
      viewport={{ once: false, margin: "-150px" }}
      transition={{ 
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.8 },
        y: { duration: 1.2 },
        scale: { duration: 1.0 }
      }}
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyberpunk-dark/80 to-cyberpunk-dark/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Simplified Header */}
        <motion.div 
          className="section-header text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-cyberpunk-neon mb-6">
            Join the <span className="text-cyberpunk-yellow">Nighthold</span> Community
          </h2>
          <p className="text-xl text-cyberpunk-neon/80 max-w-3xl mx-auto">
            Become part of an elite trading community where NightHold concepts meet cutting-edge technology
          </p>
        </motion.div>

        {/* Simplified Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {communityStats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1
              }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <div className={`relative p-4 md:p-6 rounded-xl backdrop-blur-md bg-gradient-to-br from-black/60 to-cyberpunk-dark/40 transition-all duration-300 shadow-lg
                ${stat.color === 'green' ? 'bg-gradient-to-br from-cyberpunk-green/10 to-black/60' : ''}
                ${stat.color === 'yellow' ? 'bg-gradient-to-br from-cyberpunk-yellow/10 to-black/60' : ''}
                ${stat.color === 'blue' ? 'bg-gradient-to-br from-cyberpunk-blue/10 to-black/60' : ''}
                ${stat.color === 'pink' ? 'bg-gradient-to-br from-cyberpunk-pink/10 to-black/60' : ''}
              `}>
                <div className="text-center">
                  <ClientOnly>
                    <Counter
                      to={stat.value}
                      suffix={stat.suffix}
                      decimals={0}
                      duration={2}
                      className={`block text-2xl md:text-3xl font-bold mb-2
                        ${stat.color === 'green' ? 'text-cyberpunk-green' : ''}
                        ${stat.color === 'yellow' ? 'text-cyberpunk-yellow' : ''}
                        ${stat.color === 'blue' ? 'text-cyberpunk-blue' : ''}
                        ${stat.color === 'pink' ? 'text-cyberpunk-pink' : ''}
                      `}
                    />
                  </ClientOnly>
                  <div className="text-cyberpunk-neon/70 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simplified Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`pricing-card relative ${plan.popular ? 'pro-card' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2
              }}
              viewport={{ once: false, margin: "-100px" }}
            >
         <div 
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
                className={`relative p-6 md:p-8 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl overflow-hidden hover:scale-105
                  ${plan.popular 
                    ? 'bg-gradient-to-br from-yellow-900/25 via-black/80 to-amber-900/25 border border-yellow-600/30' 
                    : 'bg-gradient-to-br from-black/85 to-slate-900/25'
                  }
                `}
              >
                {/* Glow Effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: plan.popular 
                      ? 'radial-gradient(circle at 30% 20%, rgba(255,215,0,0.06) 0%, rgba(255,193,7,0.04) 40%, rgba(245,158,11,0.02) 70%, transparent 100%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(0,234,255,0.03) 0%, rgba(255,0,204,0.02) 50%, transparent 100%)'
                  }}
                />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div 
                    className={`absolute inset-0 transition-all duration-1000 ${
                      hoveredCard === index ? 'animate-pulse' : ''
                    }`}
                    style={{
                      background: hoveredCard === index 
                        ? (plan.popular 
                          ? 'linear-gradient(45deg, rgba(255,215,0,0.5), rgba(255,193,7,0.4), rgba(245,158,11,0.4), rgba(255,215,0,0.5))'
                          : 'linear-gradient(45deg, rgba(0,234,255,0.3), rgba(255,0,204,0.3), rgba(57,255,20,0.3), rgba(0,234,255,0.3))')
                        : 'transparent',
                      backgroundSize: hoveredCard === index ? '400% 400%' : 'auto',
                      animation: hoveredCard === index ? 'gradientShift 3s ease infinite' : 'none'
                    }}
                  />
                  <div className="absolute inset-[2px] bg-cyberpunk-dark/90 backdrop-blur-md rounded-2xl" />
                </div>
                
                {/* Plan Header */}
                <div className="relative z-10 text-center mb-8">
                  <motion.h3 
                    className={`text-2xl md:text-3xl font-bold mb-2
                      ${plan.popular ? 'text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]' : 'text-cyan-300'}
                    `}
                    animate={hoveredCard === index ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.name}
                  </motion.h3>
                  <p className="text-cyberpunk-neon/70 mb-6">
                    {plan.description}
                  </p>
                  <motion.div 
                    className="flex items-center justify-center"
                    animate={hoveredCard === index ? { y: -5 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`text-4xl md:text-5xl font-bold
                      ${plan.popular ? 'text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'text-cyan-300'}
                    `}>
                      ${plan.price}
                    </span>
                    <span className="text-cyberpunk-neon/60 ml-2">/{plan.period}</span>
                  </motion.div>
                </div>

                {/* Features List */}
                <div className="relative z-10 space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex items-center"
                      animate={hoveredCard === index ? { x: 10 } : { x: 0 }}
                      transition={{ delay: featureIndex * 0.1, duration: 0.3 }}
                    >
                      <motion.div 
                        className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center
                          ${plan.popular ? 'bg-gradient-to-r from-yellow-500 to-amber-600 shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'bg-cyan-600'}
                        `}
                        animate={hoveredCard === index ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                        transition={{ delay: featureIndex * 0.1, duration: 0.5 }}
                      >
                        <span className="text-cyberpunk-dark text-xs font-bold">✓</span>
                      </motion.div>
                      <span className="text-cyberpunk-neon/90">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <div className="relative z-10 text-center">
                  <motion.a 
                    href="https://t.me/mishacryptosss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden border-2 block text-center
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-yellow-900/60 via-amber-900/50 to-yellow-900/60 text-yellow-200 border-yellow-600/60 hover:border-yellow-500/90 shadow-[inset_0_1px_0_rgba(255,215,0,0.2)]' 
                        : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-cyan-300 border-cyan-600/50 hover:border-cyan-500/80'
                      }
                    `}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: plan.popular 
                        ? "0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2), 0 0 60px rgba(255,215,0,0.1)" 
                        : "0 0 15px rgba(6,182,212,0.3), 0 0 30px rgba(6,182,212,0.15)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={hoveredCard === index ? { y: -5 } : { y: 0 }}
                  >
                    <span className="relative z-10 font-extrabold tracking-wide">Get Started Now</span>
                    {/* Button hover effect */}
                    <motion.div
                      className={`absolute inset-0 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-yellow-400/15 to-amber-500/15'
                          : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                      }`}
                      initial={{ x: "-100%" }}
                      animate={hoveredCard === index ? { x: "100%" } : { x: "-100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.a>
                </div>

                {/* Enhanced floating particles effect */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Regular particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${
                          plan.popular 
                            ? (i % 2 === 0 ? 'bg-yellow-400 shadow-[0_0_4px_rgba(255,215,0,0.6)]' : 'bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]')
                            : (i % 2 === 0 ? 'bg-cyan-400' : 'bg-blue-500')
                        }`}
                        initial={{ 
                          x: `${((i * 12) % 80) + 10}%`, 
                          y: `${((i * 18) % 80) + 10}%`,
                          opacity: 0 
                        }}
                        animate={{ 
                          y: "-120%",
                          opacity: [0, 1, 0],
                        }}
                        transition={{ 
                          duration: 2.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                    

                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simplified Comparison Table */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center text-cyberpunk-neon mb-12">
            Feature Comparison
          </h3>
          
          <div className="overflow-hidden rounded-2xl bg-cyberpunk-dark/50 backdrop-blur-md shadow-2xl">
            <div className="p-6 md:p-8">
              {/* Table header */}
              <div className="comparison-row grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-cyberpunk-pink/30">
                <div className="text-cyberpunk-neon font-bold text-lg">Feature</div>
                <div className="text-cyan-300 font-bold text-lg text-center">Starter</div>
                <div className="text-yellow-300 font-bold text-lg text-center">Mentorship</div>
              </div>

              {/* Table rows */}
              {comparisonFeatures.map((row, index) => (
                <div 
                  key={index} 
                  className={`comparison-row grid grid-cols-3 gap-4 py-4 rounded-lg hover:bg-cyberpunk-neon/5 transition-colors ${index !== comparisonFeatures.length - 1 ? 'border-b border-cyberpunk-neon/10' : ''}`}
                >
                  <div className="text-cyberpunk-neon/90">{row.feature}</div>
                  <div className="text-center">
                    {typeof row.starter === 'boolean' ? (
                      <span className={`inline-block w-6 h-6 rounded-full ${row.starter ? 'bg-cyberpunk-green text-cyberpunk-dark' : 'bg-red-500/20 text-red-400'} flex items-center justify-center text-sm`}>
                        {row.starter ? '✓' : '✗'}
                      </span>
                    ) : (
                      <span className="text-cyan-300">{row.starter}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof row.pro === 'boolean' ? (
                      <span className={`inline-block w-6 h-6 rounded-full ${row.pro ? 'bg-cyberpunk-green text-cyberpunk-dark' : 'bg-red-500/20 text-red-400'} flex items-center justify-center text-sm`}>
                        {row.pro ? '✓' : '✗'}
                      </span>
                    ) : (
                      <span className="text-yellow-300">{row.pro}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* CSS for gradient animation and 3D effects */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.section>
  );
}