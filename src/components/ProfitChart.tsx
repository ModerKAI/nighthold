"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

interface DataPoint {
  month: string;
  value: number;
}

const profitData: DataPoint[] = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 52 },
  { month: "May", value: 67 },
  { month: "Jun", value: 84 },
  { month: "Jul", value: 280 },
  { month: "Aug", value: 338 }
];

export default function ProfitChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && svgRef.current) {
      animateChart();
    } else if (!isInView) {
      resetChart();
    }
  }, [isInView]);

  const animateChart = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const lines = svg.querySelectorAll('.chart-line');
    const dots = svg.querySelectorAll('.chart-dot');
    const bars = svg.querySelectorAll('.chart-bar');
    const labels = svg.querySelectorAll('.chart-label');

    // Анимация линии графика
    lines.forEach(line => {
      if (line instanceof SVGPathElement && line.getTotalLength) {
        const length = line.getTotalLength();
        gsap.fromTo(line, 
          { 
            strokeDasharray: length,
            strokeDashoffset: length
          },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut"
          }
        );
      }
    });

    // Анимация точек
    gsap.fromTo(dots, 
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        delay: 1,
        ease: "back.out(1.7)"
      }
    );

    // Анимация столбцов
    gsap.fromTo(bars,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 1.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      }
    );

    // Анимация подписей (месяцы)
    const monthLabels = Array.from(labels).filter(label => 
      label.getAttribute('y') === '230'
    );
    const percentageLabels = Array.from(labels).filter(label => 
      label.getAttribute('y') !== '230'
    );

    // Обычная анимация для месяцев
    gsap.fromTo(monthLabels,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.5,
        ease: "power2.out"
      }
    );

     // Анимация появления процентов
     gsap.fromTo(percentageLabels,
       { opacity: 0, y: 20 },
       {
         opacity: 1,
         y: 0,
         duration: 0.8,
         stagger: 0.1,
         delay: 1.5,
         ease: "power2.out"
       }
     );
  };

  const resetChart = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const lines = svg.querySelectorAll('.chart-line');
    const dots = svg.querySelectorAll('.chart-dot');
    const bars = svg.querySelectorAll('.chart-bar');
    const labels = svg.querySelectorAll('.chart-label');

    // Останавливаем текущие анимации
    gsap.killTweensOf([lines, dots, bars, labels]);

    // Сброс линий с путем
    lines.forEach(line => {
      if (line instanceof SVGPathElement && line.getTotalLength) {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length
        });
      }
    });

    // Сброс к начальному состоянию для следующей анимации
    gsap.set(dots, { scale: 0, opacity: 0 });
    gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(labels, { opacity: 0, y: 20 });
  };

  // Создаем path для линии графика
  const createPath = () => {
    const width = 400;
    const height = 200;
    const maxValue = Math.max(...profitData.map(d => d.value));
    
    let path = "";
    profitData.forEach((point, index) => {
      const x = (index / (profitData.length - 1)) * width;
      const y = height - (point.value / maxValue) * height;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="bg-cyberpunk-dark/60 backdrop-blur-md border border-cyberpunk-green/40 rounded-2xl p-6 md:p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-cyberpunk-green mb-2">
            Average Student Progress
          </h3>
          <p className="text-cyberpunk-neon/70">
            Portfolio growth over 8 months
          </p>
        </div>

        {/* Chart Container */}
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox="0 0 400 240"
            className="w-full h-auto"
            style={{ maxHeight: '300px' }}
          >
            {/* Grid lines */}
            <defs>
              <pattern id="chartGrid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path 
                  d="M 40 0 L 0 0 0 20" 
                  fill="none" 
                  stroke="rgba(0,255,194,0.1)" 
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="400" height="200" fill="url(#chartGrid)" />

            {/* Background bars */}
            {profitData.map((point, index) => {
              const x = (index / (profitData.length - 1)) * 400;
              const maxValue = Math.max(...profitData.map(d => d.value));
              const barHeight = (point.value / maxValue) * 180;
              
              return (
                <rect
                  key={`bar-${index}`}
                  className="chart-bar"
                  x={x - 8}
                  y={200 - barHeight}
                  width="16"
                  height={barHeight}
                  fill="url(#barGradient)"
                  opacity="0.3"
                />
              );
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--cyberpunk-pink)" />
                <stop offset="50%" stopColor="var(--cyberpunk-blue)" />
                <stop offset="100%" stopColor="var(--cyberpunk-green)" />
              </linearGradient>
              <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--cyberpunk-green)" />
                <stop offset="100%" stopColor="var(--cyberpunk-blue)" />
              </linearGradient>
            </defs>

            {/* Main chart line */}
            <path
              className="chart-line"
              d={createPath()}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Chart dots */}
            {profitData.map((point, index) => {
              const x = (index / (profitData.length - 1)) * 400;
              const maxValue = Math.max(...profitData.map(d => d.value));
              const y = 200 - (point.value / maxValue) * 200;
              
              return (
                <g key={`dot-${index}`}>
                  <circle
                    className="chart-dot"
                    cx={x}
                    cy={y}
                    r="6"
                    fill="var(--cyberpunk-yellow)"
                    stroke="var(--cyberpunk-dark)"
                    strokeWidth="2"
                  />
                  {/* Glow effect */}
                  <circle
                    className="chart-dot"
                    cx={x}
                    cy={y}
                    r="10"
                    fill="var(--cyberpunk-yellow)"
                    opacity="0.3"
                  />
                </g>
              );
            })}

            {/* Labels */}
            {profitData.map((point, index) => {
              const x = (index / (profitData.length - 1)) * 400;
              
              return (
                <text
                  key={`label-${index}`}
                  className="chart-label"
                  x={x}
                  y="230"
                  textAnchor="middle"
                  fill="var(--cyberpunk-neon)"
                  fontSize="12"
                  opacity="0.8"
                >
                  {point.month}
                </text>
              );
            })}

            {/* Value labels */}
            {profitData.map((point, index) => {
              const x = (index / (profitData.length - 1)) * 400;
              const maxValue = Math.max(...profitData.map(d => d.value));
              const y = 200 - (point.value / maxValue) * 200;
              
              return (
                <text
                  key={`value-${index}`}
                  className="chart-label"
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  fill="var(--cyberpunk-yellow)"
                  fontSize="11"
                  fontWeight="bold"
                >
                  +{point.value}%
                </text>
              );
            })}
          </svg>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-cyberpunk-green/20">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-cyberpunk-pink">
              +112%
            </div>
            <div className="text-xs text-cyberpunk-neon/60">
              Avg. Growth
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-cyberpunk-blue">
              8 months
            </div>
            <div className="text-xs text-cyberpunk-neon/60">
              Time Period
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-cyberpunk-green">
              70%
            </div>
            <div className="text-xs text-cyberpunk-neon/60">
              Success Rate
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
