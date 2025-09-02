"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface GrowthChartProps {
  className?: string;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ className = '' }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(chartRef, { once: false, amount: 0.3 });

  // Data points for 5+ years growth
  const dataPoints = [
    { year: 2019, value: 10, label: "Start" },
    { year: 2020, value: 25, label: "Growth" },
    { year: 2021, value: 45, label: "Expansion" },
    { year: 2022, value: 80, label: "Success" },
    { year: 2023, value: 150, label: "Momentum" },
    { year: 2024, value: 250, label: "Excellence" },
    { year: 2025, value: 350, label: "Future" }
  ];

  // Convert data to SVG coordinates
  const chartWidth = 400;
  const chartHeight = 200;
  const padding = 40;

  const xScale = (index: number) => 
    padding + (index * (chartWidth - 2 * padding)) / (dataPoints.length - 1);
  
  const yScale = (value: number) => 
    chartHeight - padding - ((value - 10) * (chartHeight - 2 * padding)) / 340;

  // Create path string for the line
  const pathData = dataPoints
    .map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.value)}`
    )
    .join(' ');

  // Create area path for gradient fill
  const areaData = `${pathData} L ${xScale(dataPoints.length - 1)} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`;

  const animateChart = () => {
    if (!svgRef.current || typeof window === 'undefined') return;

    const svg = svgRef.current;
    const path = svg.querySelector('.growth-line') as SVGPathElement;
    const area = svg.querySelector('.growth-area') as SVGPathElement;
    const dots = svg.querySelectorAll('.growth-dot');
    const labels = svg.querySelectorAll('.growth-label');

    if (!path || !area) {
      console.warn('GSAP: Growth chart elements not found, skipping animation');
      return;
    }

    // Reset everything
    gsap.set([path, area], { strokeDasharray: "0 1000", fillOpacity: 0 });
    gsap.set(dots, { scale: 0, opacity: 0 });
    gsap.set(labels, { opacity: 0, y: 10 });

    // Animate the line drawing
    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength });
    gsap.fromTo(path, 
      { strokeDashoffset: pathLength },
      { 
        strokeDashoffset: 0, 
        duration: 2,
        ease: "power2.inOut"
      }
    );

    // Animate the area fill
    gsap.to(area, {
      fillOpacity: 0.3,
      duration: 1.5,
      delay: 0.5,
      ease: "power2.out"
    });

    // Animate dots with stagger
    gsap.to(dots, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      delay: 1,
      ease: "back.out(1.7)"
    });

    // Animate labels
    gsap.to(labels, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 1.2,
      ease: "power2.out"
    });

    // Add pulse animation to the last dot (current year)
    const lastDot = dots[dots.length - 2]; // 2024 dot
    if (lastDot) {
      gsap.to(lastDot, {
        scale: 1.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2
      });
    }
  };

  useEffect(() => {
    if (isInView && typeof window !== 'undefined') {
      // Добавляем задержку для полной загрузки DOM
      const timer = setTimeout(() => {
        animateChart();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={chartRef}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Chart Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-cyberpunk-neon mb-2">
          Community Growth
        </h3>
        <p className="text-cyberpunk-green/80 text-sm md:text-base">
          5+ Years of Excellence
        </p>
      </motion.div>

      {/* SVG Chart */}
      <div className="relative bg-cyberpunk-dark/40 rounded-xl border border-cyberpunk-green/30 p-6 backdrop-blur-sm">
        <svg
          ref={svgRef}
          width="100%"
          height="250"
          viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FFC2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00FFC2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFC2" />
              <stop offset="50%" stopColor="#00E5AA" />
              <stop offset="100%" stopColor="#FF6B9D" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((percent, index) => (
            <line
              key={index}
              x1={padding}
              y1={padding + percent * (chartHeight - 2 * padding)}
              x2={chartWidth - padding}
              y2={padding + percent * (chartHeight - 2 * padding)}
              stroke="rgba(0, 255, 194, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path
            className="growth-area"
            d={areaData}
            fill="url(#areaGradient)"
            fillOpacity="0"
          />

          {/* Main line */}
          <path
            className="growth-line"
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            filter="url(#glow)"
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <g key={index}>
              {/* Dot */}
              <circle
                className="growth-dot"
                cx={xScale(index)}
                cy={yScale(point.value)}
                r="6"
                fill="#00FFC2"
                stroke="#0A0A0A"
                strokeWidth="2"
                filter="url(#glow)"
                style={{ cursor: 'pointer' }}
              />
              
              {/* Value label */}
              <text
                className="growth-label"
                x={xScale(index)}
                y={yScale(point.value) - 15}
                textAnchor="middle"
                fill="#00FFC2"
                fontSize="12"
                fontWeight="bold"
              >
                {point.value}
              </text>
              
              {/* Year label */}
              <text
                className="growth-label"
                x={xScale(index)}
                y={index % 2 === 0 ? chartHeight - padding + 20 : chartHeight - padding + 50}
                textAnchor="middle"
                fill="#EAFAFF"
                fontSize="11"
              >
                {point.year}
              </text>

              {/* Status label */}
              <text
                className="growth-label"
                x={xScale(index)}
                y={index % 2 === 0 ? chartHeight - padding + 35 : chartHeight - padding + 65}
                textAnchor="middle"
                fill="#00E5AA"
                fontSize="9"
                fontStyle="italic"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Achievement badges */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="px-3 py-1 bg-cyberpunk-pink/20 border border-cyberpunk-pink/50 rounded-full text-xs text-cyberpunk-pink font-mono"
          >
            +2400% Growth
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="px-3 py-1 bg-cyberpunk-yellow/20 border border-cyberpunk-yellow/50 rounded-full text-xs text-cyberpunk-yellow font-mono"
          >
            5+ Years
          </motion.div>
        </div>
      </div>

      {/* Chart Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-center mt-6"
      >
        <p className="text-cyberpunk-neon/80 text-sm md:text-base leading-relaxed max-w-md mx-auto">
          Steady growth through dedication, community support, and proven trading strategies
        </p>
      </motion.div>
    </motion.div>
  );
};

export default GrowthChart;
