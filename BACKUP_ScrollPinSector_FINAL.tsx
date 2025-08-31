"use client";
/*
 * ✅ ГОТОВЫЙ КОМПОНЕНТ ScrollPinSector
 * 📅 Дата завершения: 31 августа 2025
 * 🏆 Статус: ПОЛНОСТЬЮ РАБОЧИЙ И ПРОТЕСТИРОВАННЫЙ
 * 
 * 🎯 Функциональность:
 * - Постепенная анимация 1↔6 блоков
 * - Двусторонняя навигация (вверх/вниз)
 * - Умный вход/выход из секции
 * - Сохранение позиции при выходе
 * - Строгая активация только в центре экрана
 */
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

const steps = [
  { title: "Market Structure", desc: "Analyze current market conditions and identify key institutional levels and zones" },
  { title: "Liquidity", desc: "Understand liquidity pools and how smart money targets retail stop losses" },
  { title: "Order Blocks", desc: "Master order block concepts and institutional order flow patterns" },
  { title: "Risk Management", desc: "Implement professional risk management and position sizing strategies" },
  { title: "Optimization", desc: "Optimize your trading approach for consistent and profitable results" },
  { title: "Results", desc: "Achieve stable and predictable trading outcomes with minimized risk" },
];

export default function ScrollPinSector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [lastCompletedStep, setLastCompletedStep] = useState(0); // Запоминаем последний пройденный шаг
  const [isLocked, setIsLocked] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [frozenPosition, setFrozenPosition] = useState<number | null>(null);
  const [rotationCount, setRotationCount] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false); // Состояние фиксации
  
  // Motion values для плавного движения
  const xMotion = useMotionValue(0);
  const xSpring = useSpring(xMotion, { damping: 35, stiffness: 300 }); // Быстрая и плавная анимация
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  // Основное горизонтальное движение
  const x = useTransform(scrollYProgress, [0, 1], [0, -83.33]);
  const xPercent = useTransform(x, (value) => `${value}%`);
  const xSpringPercent = useTransform(xSpring, (value) => `${value}%`);

  // Отслеживание видимости секции
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Секция считается "в viewport" только если видна ПОЛНОСТЬЮ (90%+)
        const isFullyVisible = entry.intersectionRatio > 0.9;
        setIsInViewport(isFullyVisible);
        
        console.log('Intersection:', { 
          isIntersecting: entry.isIntersecting, 
          intersectionRatio: entry.intersectionRatio,
          isFullyVisible,
          boundingRect: entry.boundingClientRect
        });
        
        // Если секция стала полностью видимой, сбрасываем состояние
        if (isFullyVisible && recentlyUnlocked) {
          setRecentlyUnlocked(false);
        }
      },
      { 
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0], // Множественные пороги для точности
        rootMargin: '-10px' // Небольшой отступ для более строгой проверки
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [recentlyUnlocked]);

  // Отключаем автоматическое определение шага - только ручное управление
  useEffect(() => {
    // Автоматическая анимация ОТКЛЮЧЕНА
    // Шаг изменяется только при ручном управлении колесиком
    console.log('Auto step calculation disabled');
  }, []);
  
  // Обновление позиции при изменении currentStep
  useEffect(() => {
    if (isLocked && isAnimationActive) {
      const currentPos = -currentStep * 16.666;
      xMotion.set(currentPos);
    } else {
      // В разблокированном состоянии сбрасываем позицию
      xMotion.set(0);
    }
  }, [currentStep, isLocked, isAnimationActive, xMotion]);

  // Обработчики событий
  const handleWheel = useCallback((e: WheelEvent) => {
    console.log('Wheel event:', { isLocked, isAnimationActive, isFrozen, deltaY: e.deltaY, currentStep });
    
    // Блокируем колесико если не заблокировано ИЛИ если в режиме фиксации
    if ((!isLocked || !isAnimationActive) || isFrozen) {
      if (isFrozen) {
        console.log('Wheel ignored - position is FROZEN');
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY;
    
    if (delta > 0) {
      // Скролл вниз
      if (currentStep < steps.length - 1) {
        console.log('Moving forward to next step:', currentStep + 1);
        setCurrentStep(currentStep + 1);
        setRotationCount(prev => prev + 1);
      } else {
        // На последнем (6-м) шаге - разрешаем скролл вниз и выходим из секции
        console.log('At last step - allowing scroll down and EXIT section');
        setLastCompletedStep(steps.length - 1); // Запоминаем что дошли до 6-го блока
        setIsLocked(false);
        setIsAnimationActive(false);
        setRecentlyUnlocked(true);
        setFrozenPosition(-5 * 16.666); // Замораживаем на 6-м блоке
        // НЕ сбрасываем currentStep! Оставляем на 6-м блоке
        document.body.style.overflow = 'auto';
        
        // Продолжаем скролл вниз
        requestAnimationFrame(() => {
          window.scrollBy({ top: 100, behavior: 'smooth' });
        });
      }
    } else {
      // Скролл вверх
      if (currentStep > 0) {
        console.log('Moving backward to previous step:', currentStep - 1);
        setCurrentStep(currentStep - 1);
        setRotationCount(prev => prev + 1);
      } else {
        // На первом (1-м) шаге - разрешаем скролл вверх и выходим из секции
        console.log('At first step - allowing scroll up and EXIT section');
        setIsLocked(false);
        setIsAnimationActive(false);
        setRecentlyUnlocked(true);
        setFrozenPosition(0); // Замораживаем на 1-м блоке
        // НЕ сбрасываем currentStep! Оставляем на 1-м блоке
        document.body.style.overflow = 'auto';
        
        // Продолжаем скролл вверх
        requestAnimationFrame(() => {
          window.scrollBy({ top: -100, behavior: 'smooth' });
        });
      }
    }
  }, [isLocked, isAnimationActive, currentStep, isFrozen]);

  const handleScroll = useCallback(() => {
    if (isLocked || recentlyUnlocked) {
      console.log('Scroll blocked:', { isLocked, recentlyUnlocked });
      return;
    }
    
    const element = containerRef.current;
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // ОЧЕНЬ СТРОГАЯ проверка - секция должна быть ТОЧНО по центру экрана
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    const sectionHeight = rect.height;
    const sectionCenter = sectionTop + sectionHeight / 2;
    const viewportCenter = viewportHeight / 2;
    
    // Секция должна занимать минимум 80% экрана и быть центрирована
    const isNearCenter = Math.abs(sectionCenter - viewportCenter) < 50; // Только 50px отклонения
    const isMostlyVisible = sectionTop < viewportHeight * 0.1 && sectionBottom > viewportHeight * 0.9;
    
    console.log('Scroll check:', { 
      sectionTop, 
      sectionBottom,
      sectionCenter,
      viewportCenter,
      distanceFromCenter: Math.abs(sectionCenter - viewportCenter),
      isNearCenter,
      isMostlyVisible,
      shouldActivate: isNearCenter && isMostlyVisible
    });
    
    // Активация ТОЛЬКО когда секция ТОЧНО центрирована И занимает почти весь экран
    if (isNearCenter && isMostlyVisible) {
      console.log('Activating scroll lock - section is PERFECTLY centered');
      
      // Сохраняем текущую позицию скролла ПЕРЕД блокировкой
      const scrollY = window.scrollY;
      
      setIsLocked(true);
      setIsAnimationActive(true);
      setFrozenPosition(null);
      setRotationCount(0);
      
      // Определяем направление входа в секцию и начальный шаг
      const previousScrollY = element.dataset.savedScrollY ? parseInt(element.dataset.savedScrollY) : 0;
      if (scrollY > previousScrollY) {
        // Скролл сверху вниз - начинаем с первого шага
        console.log('Entering from top - start from step 0');
        setCurrentStep(0);
      } else {
        // Скролл снизу вверх - начинаем с последнего пройденного шага
        console.log('Entering from bottom - start from step:', lastCompletedStep || 5);
        setCurrentStep(lastCompletedStep || 5); // По умолчанию 6-й блок
      }
      
      // Блокируем скролл БЕЗ position: fixed (это вызывает прыжки)
      document.body.style.overflow = 'hidden';
      
      // Сохраняем позицию для восстановления
      if (element) {
        element.dataset.savedScrollY = scrollY.toString();
      }
    }
  }, [isLocked, recentlyUnlocked]);

  // Event listeners
  useEffect(() => {
    console.log('Setting up listeners:', { isLocked, isAnimationActive });
    
    if (isLocked && isAnimationActive) {
      console.log('Adding wheel listener');
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.removeEventListener('scroll', handleScroll);
    } else {
      console.log('Adding scroll listener');
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.removeEventListener('wheel', handleWheel);
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLocked, isAnimationActive, handleWheel, handleScroll]);

  // Быстрый сброс состояния при выходе из секции
  useEffect(() => {
    const onScroll = () => {
      const element = containerRef.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Если секция НЕ в центре экрана - сбрасываем ВСЕ состояния
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      const isOutOfCenter = distanceFromCenter > 100; // Больше 100px от центра
      const isOutOfView = rect.bottom < 0 || rect.top > viewportHeight;
      
      if ((isOutOfCenter || isOutOfView) && (isLocked || recentlyUnlocked || isFrozen)) {
        console.log('Section out of center/view - RESET states but KEEP currentStep');
        setRecentlyUnlocked(false);
        setIsLocked(false);
        setIsAnimationActive(false);
        // НЕ сбрасываем frozenPosition и currentStep - сохраняем последнюю позицию!
        setIsFrozen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLocked, recentlyUnlocked, isFrozen]);

  // Логирование изменений состояния
  useEffect(() => {
    console.log('State changed:', { 
      isLocked, 
      isAnimationActive, 
      recentlyUnlocked, 
      currentStep,
      lastCompletedStep,
      bodyOverflow: document.body.style.overflow 
    });
  }, [isLocked, isAnimationActive, recentlyUnlocked, currentStep, lastCompletedStep]);

  // Убираем ненужную логику с задержками
  useEffect(() => {
    return () => {
      // Принудительно восстанавливаем скролл при размонтировании БЕЗ сброса позиции
      document.body.style.overflow = 'auto';
      console.log('Component unmounted - scroll restored');
    };
  }, []);

  // Принудительная проверка и восстановление скролла
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLocked && !isAnimationActive && document.body.style.overflow === 'hidden') {
        console.log('Force restoring scroll');
        document.body.style.overflow = 'auto';
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked, isAnimationActive]);

  return (
    <section 
      id="section-3" 
      ref={containerRef} 
      className="relative min-h-screen w-full px-0 py-12 border-b-2 border-cyberpunk-green"
    >
      {/* Закрепленный контейнер */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">{/* Убрали bg-cyberpunk-dark */}
        {/* Заголовок */}
        <h2 className="text-4xl md:text-6xl font-bold text-cyberpunk-green mb-12 text-center z-10">
          6 Steps to Success
        </h2>

        {/* Контейнер для движущихся карточек */}
        <div className="relative w-full h-[450px] overflow-hidden">
          <motion.div 
            style={{ 
              x: frozenPosition !== null ? `${frozenPosition}%` : 
                 (isLocked && isAnimationActive) ? xSpringPercent : 
                 `${-currentStep * 16.666}%` // Всегда показываем текущий шаг
            }}
            className="flex absolute top-0 left-0 h-full items-center"
          >
            {steps.map((step, i) => (
              <div 
                key={i}
                className="w-screen h-full flex items-center justify-center px-20"
              >
                <motion.div 
                  className={`w-full max-w-[500px] h-[400px] rounded-2xl border-2 border-cyberpunk-green/50 flex flex-col items-center justify-center p-8 shadow-cyberpunk relative overflow-hidden
                    ${i === 0 ? 'bg-gradient-to-br from-cyberpunk-pink/30 via-cyberpunk-pink/10 to-cyberpunk-dark' :
                      i === 1 ? 'bg-gradient-to-br from-cyberpunk-blue/30 via-cyberpunk-blue/10 to-cyberpunk-dark' :
                      i === 2 ? 'bg-gradient-to-br from-cyberpunk-yellow/30 via-cyberpunk-yellow/10 to-cyberpunk-dark' :
                      i === 3 ? 'bg-gradient-to-br from-cyberpunk-green/30 via-cyberpunk-green/10 to-cyberpunk-dark' :
                      i === 4 ? 'bg-gradient-to-br from-purple-500/30 via-purple-500/10 to-cyberpunk-dark' :
                      'bg-gradient-to-br from-orange-500/30 via-orange-500/10 to-cyberpunk-dark'}`}
                  animate={{
                    scale: i === currentStep ? 1.05 : 1,
                    borderColor: i === currentStep ? "var(--cyberpunk-green)" : "rgba(57, 255, 20, 0.5)",
                    boxShadow: i === currentStep 
                      ? "0 0 30px rgba(57, 255, 20, 0.3), 0 0 60px rgba(57, 255, 20, 0.1)" 
                      : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 22,
                    duration: 0.4
                  }}
                >
                  {/* Дополнительный фоновый слой */}
                  <div className={`absolute inset-0 opacity-20 ${
                    i === 0 ? 'bg-gradient-to-r from-cyberpunk-pink/40 to-transparent' :
                    i === 1 ? 'bg-gradient-to-r from-cyberpunk-blue/40 to-transparent' :
                    i === 2 ? 'bg-gradient-to-r from-cyberpunk-yellow/40 to-transparent' :
                    i === 3 ? 'bg-gradient-to-r from-cyberpunk-green/40 to-transparent' :
                    i === 4 ? 'bg-gradient-to-r from-purple-400/40 to-transparent' :
                    'bg-gradient-to-r from-orange-400/40 to-transparent'
                  }`} />
                  
                  {/* Анимированный фоновый эффект */}
                  <motion.div 
                    className="absolute inset-0"
                    animate={{
                      background: i === currentStep 
                        ? `radial-gradient(circle at 30% 20%, ${
                            i === 0 ? 'rgba(255, 0, 204, 0.3)' :
                            i === 1 ? 'rgba(0, 234, 255, 0.3)' :
                            i === 2 ? 'rgba(242, 169, 0, 0.3)' :
                            i === 3 ? 'rgba(57, 255, 20, 0.3)' :
                            i === 4 ? 'rgba(147, 51, 234, 0.3)' :
                            'rgba(249, 115, 22, 0.3)'
                          } 0%, transparent 60%)`
                        : 'none',
                      opacity: i === currentStep ? 1 : 0.4
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Паттерн фона */}
                  <div className={`absolute inset-0 opacity-10 ${
                    i === 0 ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,204,0.4)_0%,transparent_50%)]' :
                    i === 1 ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,234,255,0.4)_0%,transparent_50%)]' :
                    i === 2 ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(242,169,0,0.4)_0%,transparent_50%)]' :
                    i === 3 ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.4)_0%,transparent_50%)]' :
                    i === 4 ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.4)_0%,transparent_50%)]' :
                    'bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.4)_0%,transparent_50%)]'
                  }`} />
                  
                  {/* Номер шага */}
                  <motion.div 
                    className={`w-20 h-20 rounded-full border-2 border-cyberpunk-green flex items-center justify-center mb-8 relative z-10 ${
                      i === 0 ? 'bg-cyberpunk-pink/20' :
                      i === 1 ? 'bg-cyberpunk-blue/20' :
                      i === 2 ? 'bg-cyberpunk-yellow/20' :
                      i === 3 ? 'bg-cyberpunk-green/20' :
                      i === 4 ? 'bg-purple-500/20' :
                      'bg-orange-500/20'
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: i === currentStep ? 1.1 : 1, 
                      rotate: i === currentStep ? 0 : -180,
                      borderColor: i === currentStep ? "var(--cyberpunk-green)" : "rgba(57, 255, 20, 0.5)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 350, 
                      damping: 22,
                      duration: 0.4
                    }}
                  >
                    <motion.span 
                      className="text-cyberpunk-green text-2xl font-bold"
                      initial={{ opacity: 0, y: 10, rotate: 0 }}
                      animate={{ 
                        opacity: i === currentStep ? 1 : 0.7,
                        y: i === currentStep ? 0 : 10,
                        scale: i === currentStep ? 1.2 : 1,
                        rotate: rotationCount * 360
                      }}
                      transition={{ 
                        delay: 0.05,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 18
                      }}
                      key={`${i}-${rotationCount}`}
                    >
                      {i + 1}
                    </motion.span>
                  </motion.div>
                  
                  {/* Заголовок */}
                  <motion.h3 
                    className="text-cyberpunk-neon text-2xl font-bold mb-6 text-center leading-tight relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: i === currentStep ? 1 : 0.6,
                      y: i === currentStep ? 0 : 20,
                      scale: i === currentStep ? 1 : 0.95
                    }}
                    transition={{ 
                      delay: 0.1,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 180
                    }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  {/* Описание */}
                  <motion.p 
                    className="text-cyberpunk-neon/80 text-base text-center leading-relaxed relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: i === currentStep ? 1 : 0.5,
                      y: i === currentStep ? 0 : 30
                    }}
                    transition={{ 
                      delay: 0.15,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    {step.desc}
                  </motion.p>
                  
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Индикатор прогресса */}
        <div className="flex gap-4 mt-8 z-10">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="relative w-6 h-6 rounded-full border-2 border-cyberpunk-green/50 bg-transparent overflow-hidden"
              animate={{
                borderColor: i <= currentStep ? "var(--cyberpunk-green)" : "rgba(57, 255, 20, 0.3)",
                scale: i === currentStep ? 1.2 : 1,
                boxShadow: i === currentStep ? "0 0 15px rgba(57, 255, 20, 0.6)" : "none"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Заполнение индикатора */}
              <motion.div
                className="absolute inset-0 bg-cyberpunk-green rounded-full"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: i <= currentStep ? 1 : 0,
                  opacity: i <= currentStep ? 1 : 0
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: i <= currentStep ? i * 0.1 : 0,
                  ease: "backOut"
                }}
              />
              
              {/* Число внутри */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                animate={{
                  color: i <= currentStep ? "var(--cyberpunk-dark)" : "var(--cyberpunk-green)",
                  scale: i === currentStep ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {i + 1}
              </motion.span>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
