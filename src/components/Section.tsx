"use client";
import React, { PropsWithChildren, useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type VariantKey = "fadeUp" | "fadeLeft" | "scaleIn" | "fade";

const variantsMap: Record<VariantKey, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  // Только прозрачность — без transform, чтобы не ломать position: sticky у потомков
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

type BaseProps = {
  className?: string;
  variant?: VariantKey;
  duration?: number;
  delay?: number;
};

type SectionProps = PropsWithChildren<
  Omit<HTMLMotionProps<"section">, "variants" | "initial" | "animate" | "transition"> &
    BaseProps
>;

export default function Section({
  children,
  className,
  variant = "fadeUp",
  duration = 0.8,
  delay = 0,
  ...rest
}: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, margin: "0px 0px -10% 0px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variantsMap[variant]}
      transition={{ duration, delay }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
