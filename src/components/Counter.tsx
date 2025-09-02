"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useSpring } from "framer-motion";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number; // seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function Counter({
  to,
  from = 0,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { 
    once: false, // Убираем once: true чтобы анимация повторялась
    margin: "0px 0px -100px 0px",
    amount: 0.3
  });
  const motion = useMotionValue(from);
  const spring = useSpring(motion, { stiffness: 80, damping: 15 });
  const [val, setVal] = useState(from);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => setVal(latest));
    return () => { unsub(); };
  }, [spring]);

  useEffect(() => {
    if (inView) {
      // Элемент в viewport - запускаем анимацию
      const timeout = setTimeout(() => {
        const controls = animate(motion, to, { 
          duration, 
          ease: [0.23, 1, 0.32, 1]
        });
        return () => controls.stop();
      }, 200);
      
      return () => clearTimeout(timeout);
    } else {
      // Элемент вне viewport - сбрасываем к начальному значению
      motion.set(from);
      setVal(from);
    }
  }, [inView, to, duration, from, motion]);

  const formatted = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
