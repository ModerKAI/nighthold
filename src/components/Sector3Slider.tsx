"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// Горизонтальный sticky‑скролл «team‑cards»
export default function Sector3Slider() {
  const data = useMemo(
    () => [
      {
        role: "Founder",
        name: "Олександр Слобоженко",
        img: "https://cdn.prod.website-files.com/65ba96cbff5a579aa394be5d/65bc1e63a4cd34ac553af01c_Rectangle%2058.webp",
      },
      {
        role: "CEO",
        name: "Вікторія Тіхачова",
        img: "https://cdn.prod.website-files.com/65ba96cbff5a579aa394be5d/65bc1e63a4cd34ac553af01f_Rectangle%2058-1.webp",
      },
      {
        role: "HEAD OF PR",
        name: "Артур Жуков",
        img: "https://cdn.prod.website-files.com/65ba96cbff5a579aa394be5d/65bc1e6227903daa7f388b5a_Rectangle%2058-2.webp",
      },
      {
        role: "CBDO",
        name: "Данило Дяченко",
        img: "https://cdn.prod.website-files.com/65ba96cbff5a579aa394be5d/65bc1e636904e30369e7be1e_Rectangle%2058-3.webp",
      },
      {
        role: "TEAM LEAD",
        name: "Геннадий",
        img: "https://cdn.prod.website-files.com/65ba96cbff5a579aa394be5d/65bc2087da31c9ec1604cfa6_Rectangle%2058.webp",
      },
      {
        role: "TEAM LEAD",
        name: "Геннадий",
        img: "https://cdn.prod.website-files.com/65ba96cbff5a579aa394be5d/65bc20abfcb5dbe2a262d9ce_Rectangle%2058.webp",
      },
    ],
    []
  );

  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxX, setMaxX] = useState(0); // сколько нужно прокрутить по X
  const [spacerH, setSpacerH] = useState(1200);

  // Прогресс прокрутки в пределах секции
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, maxX * -1]);

  // Замер ширины дорожки и установка высоты обёртки: viewport + путь по X
  useEffect(() => {
    const measure = () => {
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const w = trackRef.current?.scrollWidth ?? 0;
      const delta = Math.max(0, w - viewportW);
      setMaxX(delta);
      setSpacerH(viewportH + delta);
    };

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    // первичный замер
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={outerRef} className="relative w-full" style={{ height: spacerH }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <motion.div
          ref={trackRef}
          className="flex h-full items-stretch gap-4 md:gap-6 will-change-transform"
          style={{ x, willChange: "transform", transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"] }}
        >
          {data.map((item, i) => (
            <Card key={i} {...item} />)
          )}
        </motion.div>
      </div>
    </section>
  );
}

type CardT = { role: string; name: string; img: string };

function Card({ role, name, img }: CardT) {
  return (
  <div className="relative h-full w-[72vw] max-w-[520px] flex-shrink-0 border border-dashed border-yellow-400/50 bg-black">
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 768px) 72vw, 520px"
        className="object-cover opacity-90"
        priority
      />

      {/* Диагональный паттерн поверх картинки */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(255,214,0,.35) 0 2px, transparent 2px 10px)",
        }}
      />

      {/* Подпись */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="text-xs md:text-sm uppercase text-gray-300 tracking-widest">{role}</div>
        <div className="text-lg md:text-2xl font-extrabold text-white mt-2 leading-tight">{name}</div>
      </div>
    </div>
  );
}
