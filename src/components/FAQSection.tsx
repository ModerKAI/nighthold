"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Zap, Shield, TrendingUp, Clock, Users, Award } from "lucide-react";

// Регистрируем ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// FAQ данные с иконками
const faqData = [
  {
    id: "smart-money",
    question: "What is the NightHold concept?",
    answer: "NightHold is a revolutionary trading approach based on analyzing the behavior of large institutional players. We teach how to read the traces of 'institutional money' in the market, identify accumulation and distribution zones, and find entry points where banks and hedge funds operate.",
    icon: TrendingUp,
    color: "green"
  },
  {
    id: "course-duration",
    question: "How long is the course and how does the training work?",
    answer: "The full course is designed for 8-12 weeks of intensive training. Includes: 40+ hours of video content, live trading sessions every week, personal mentor, access to private Discord community, and lifetime material updates.",
    icon: Clock,
    color: "blue"
  },
  {
    id: "experience-required",
    question: "Is trading experience required to start?",
    answer: "No! We start with the basics and gradually move to advanced strategies. Our methodology suits both beginners and experienced traders. 70% of our students started from scratch and achieved stable profitability within 3 months.",
    icon: Users,
    color: "pink"
  },
  {
    id: "tools-platforms",
    question: "What platforms and tools are used?",
    answer: "We work with TradingView (professional plan included), MetaTrader 5, and specialized NightHold indicators. All necessary tools are provided for free. We support trading on Forex, cryptocurrencies, and stock market.",
    icon: Zap,
    color: "blue"
  },
  {
    id: "success-rate",
    question: "What is the success rate of students?",
    answer: "100% of our students achieve stable profitability within the first 6 months. Average annual return is +127%. We track each student's results and provide additional support to those experiencing difficulties.",
    icon: Award,
    color: "green"
  }
];

interface FAQItemProps {
  item: typeof faqData[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || !iconRef.current || !glowRef.current) return;

    // Мощная GSAP анимация появления
    // const tl = gsap.timeline({ paused: true });
    
    // Начальное состояние
    gsap.set(itemRef.current, { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      rotationY: -15
    });

    gsap.set(iconRef.current, { 
      scale: 0, 
      rotation: -180,
      opacity: 0
    });

    gsap.set(glowRef.current, { 
      scale: 0, 
      opacity: 0
    });

    // Анимация появления при скролле
    ScrollTrigger.create({
      trigger: itemRef.current,
      start: "top 85%",
      onEnter: () => {
        const masterTl = gsap.timeline();
        
        // Основной контейнер
        masterTl.to(itemRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        });

        // Иконка с эффектным появлением
        masterTl.to(iconRef.current, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.4");

        // Эффект свечения
        masterTl.to(glowRef.current, {
          scale: 1,
          opacity: 0.3,
          duration: 0.5,
        ease: "power2.out"
      }, "-=0.3");

        // Пульсация свечения
        masterTl.to(glowRef.current, {
          scale: 1.2,
          opacity: 0.1,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      },
      once: true
    });

    // Hover эффекты
    const handleMouseEnter = () => {
      gsap.to(itemRef.current, {
        scale: 1.02,
        y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
        
      gsap.to(iconRef.current, {
        rotation: 10,
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(glowRef.current, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(itemRef.current, {
        scale: 1,
        y: 0,
          duration: 0.3,
          ease: "power2.out"
        });

      gsap.to(iconRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.1,
        duration: 0.3
      });
    };

    const currentRef = itemRef.current;
    currentRef.addEventListener("mouseenter", handleMouseEnter);
    currentRef.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mouseenter", handleMouseEnter);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Анимация открытия/закрытия
  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
          ease: "power2.out"
        });
    } else {
      gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut"
        });
      }
  }, [isOpen]);

  const Icon = item.icon;
  const colorClasses = {
    green: {
      border: "border-cyberpunk-green/40 hover:border-cyberpunk-green/60",
      icon: "text-cyberpunk-green",
      glow: "bg-cyberpunk-green/20"
    },
    blue: {
      border: "border-cyberpunk-blue/40 hover:border-cyberpunk-blue/60", 
      icon: "text-cyberpunk-blue",
      glow: "bg-cyberpunk-blue/20"
    },
    pink: {
      border: "border-cyberpunk-pink/40 hover:border-cyberpunk-pink/60",
      icon: "text-cyberpunk-pink", 
      glow: "bg-cyberpunk-pink/20"
    },
    yellow: {
      border: "border-cyberpunk-yellow/40 hover:border-cyberpunk-yellow/60",
      icon: "text-cyberpunk-yellow",
      glow: "bg-cyberpunk-yellow/20"
    }
  };

  const colors = colorClasses[item.color as keyof typeof colorClasses];

  return (
    <motion.div
      ref={itemRef}
      layout
      className={`relative border-2 rounded-xl bg-cyberpunk-dark/60 backdrop-blur-sm overflow-hidden transition-all duration-300 ${colors.border}`}
      style={{ zIndex: 10 - index }}
    >
      {/* Эффект свечения */}
      <div
        ref={glowRef}
        className={`absolute inset-0 ${colors.glow} blur-xl pointer-events-none`}
      />

      {/* Заголовок */}
      <motion.button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between relative z-10"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-4">
          <div
            ref={iconRef}
            className={`p-3 rounded-lg bg-cyberpunk-dark/80 ${colors.icon}`}
          >
            <Icon size={24} />
      </div>
          <h3 className="text-lg md:text-xl font-bold text-cyberpunk-neon">
            {item.question}
          </h3>
      </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${colors.icon} flex-shrink-0`}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      {/* Контент */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pb-6 relative z-10">
          <div className="pl-16">
            <p className="text-cyberpunk-neon/80 leading-relaxed">
              {item.answer}
          </p>
        </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const [mounted, setMounted] = useState(false);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax эффект
  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (!mounted || !titleRef.current || !backgroundRef.current || !particlesRef.current) return;

    // Мощная анимация заголовка
    const titleTl = gsap.timeline();
    
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationX: -90
    });

    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 80%",
      onEnter: () => {
        titleTl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        });

        // Эффект печатной машинки для подзаголовка
        const subtitle = titleRef.current?.querySelector('.subtitle');
        if (subtitle) {
          gsap.fromTo(subtitle.querySelectorAll('span'), {
            opacity: 0,
            y: 20
          }, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.02,
            delay: 0.5
          });
        }
      },
      once: true
    });

    // Анимация фоновых частиц
    const particles = particlesRef.current.querySelectorAll('.faq-particle');
    
    gsap.set(particles, {
      opacity: 0,
      scale: 0,
      rotation: 0
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(particles, {
          opacity: 0.6,
          scale: 1,
          rotation: 360,
          duration: 2,
          stagger: 0.1,
          ease: "elastic.out(1, 0.3)",
          repeat: -1,
          yoyo: true,
          repeatDelay: 3
        });
      },
      once: true
    });

    // Орбитальное движение частиц
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        rotation: 360,
        duration: 20 + i * 5,
        ease: "none",
        repeat: -1,
        transformOrigin: `${100 + i * 50}px center`
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [mounted]);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (!mounted) {
    return null;
  }

            return (
    <motion.section
      ref={sectionRef}
      id="section-7"
      className="min-h-screen w-full relative overflow-hidden py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1 }}
      suppressHydrationWarning
    >
      {/* Сложный анимированный фон */}
              <motion.div
        ref={backgroundRef}
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Сетка */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(57,255,20,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(57,255,20,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
                </div>

        {/* Градиентные слои */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-green/5 via-transparent to-cyberpunk-blue/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyberpunk-pink/5 via-transparent to-cyberpunk-yellow/5" />
        
        {/* Радиальные градиенты */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyberpunk-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyberpunk-blue/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Анимированные частицы */}
      <motion.div
        ref={particlesRef}
        style={{ y: particlesY }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="faq-particle absolute w-1 h-1 bg-cyberpunk-green rounded-full"
            style={{
              left: `${((i * 17 + 25) % 100)}%`,
              top: `${((i * 23 + 15) % 100)}%`,
            }}
          />
        ))}
        
        {[...Array(20)].map((_, i) => (
          <div
            key={`blue-${i}`}
            className="faq-particle absolute w-2 h-2 bg-cyberpunk-blue/60 rounded-full"
            style={{
              left: `${((i * 19 + 40) % 100)}%`,
              top: `${((i * 29 + 30) % 100)}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-6" suppressHydrationWarning>
                        {/* Заголовок секции */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-cyberpunk-green drop-shadow-cyberpunk">
            FAQ
          </h1>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-cyberpunk-neon drop-shadow-cyberpunk">
            Frequently Asked Questions
          </h2>
          <div className="subtitle text-lg md:text-xl text-cyberpunk-neon/80 max-w-3xl mx-auto">
            Everything you need to know about NightHold Academy — answers to the most important questions
                  </div>
                </div>

        {/* FAQ Аккордеон */}
        <div className="max-w-4xl mx-auto space-y-6" suppressHydrationWarning>
          {faqData.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>

        {/* CTA в конце секции */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div id="contacts" className="bg-cyberpunk-dark/40 backdrop-blur-sm border-2 border-cyberpunk-green/40 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-cyberpunk-green mb-4">
              Still have questions?
            </h3>
            <p className="text-cyberpunk-neon/80 mb-6">
              Contact our support team and get a personal consultation
          </p>
          <motion.a
              href="https://www.instagram.com/nighthold_trading/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(57,255,20,0.6)"
              }}
            whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyberpunk-green to-cyberpunk-blue hover:from-cyberpunk-pink hover:to-cyberpunk-yellow text-cyberpunk-dark font-bold text-lg rounded-xl shadow-cyberpunk transition-all duration-300"
            >
              Ask a Question
            </motion.a>
            </div>
        </motion.div>
      </div>
    </motion.section>
  );
}