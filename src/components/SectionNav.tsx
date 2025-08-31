"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  ids: string[];
};

export default function SectionNav({ ids }: Props) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // выбираем секцию с наибольшей видимостью
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const items = useMemo(
    () =>
      ids.map((id, i) => ({ id, label: `Section ${i + 1}` })),
    [ids]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            aria-label={item.label}
            onClick={() => scrollTo(item.id)}
            className="relative w-4 h-4"
          >
            <span className="absolute inset-0 rounded-full bg-white/20" />
            <motion.span
              layout
              className="absolute inset-1 rounded-full bg-cyberpunk-pink"
              animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </button>
        );
      })}
    </div>
  );
}
