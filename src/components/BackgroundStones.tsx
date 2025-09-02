"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STONE_IMAGES = [
  "/media/rock1.png",
  "/media/rock2.png"
];

function seededRandom(seed: number, min: number, max: number) {
  // Простой детерминированный генератор
  const x = Math.sin(seed) * 10000;
  const value = x - Math.floor(x);
  return value * (max - min) + min;
}

type Stone = {
  img: string;
  top: string;
  left: string;
  size: number;
  opacity: number;
  blur: number;
  z: 0 | 1;
  animDur: number; // seconds
  animDelay: number; // seconds
  moving: boolean;
  dx: number;
  dy: number;
};

export default function BackgroundStones() {
  // Рендерим камни только после монтирования на клиенте, чтобы избежать SSR/CSR mismatch
  const [ready, setReady] = useState(false);
  const stonesRef = useRef<Stone[]>([]);

  useEffect(() => {
    const count = 5; // фиксированное количество камней
    const arr: Stone[] = Array.from({ length: count }).map((_, i) => {
      const seed = i + 1; // уникальный сид для каждого камня
      const img = STONE_IMAGES[i % STONE_IMAGES.length];
      const moving = seededRandom(seed, 0, 1) < 0.6; // часть движется, часть статична
      const dx = moving ? seededRandom(seed + 10, -200, 200) : 0;
      const dy = moving ? seededRandom(seed + 20, -120, 120) : 0;
      const z = seededRandom(seed + 30, 0, 1) > 0.5 ? 0 : 1 as 0 | 1;
      return {
        img,
        top: seededRandom(seed + 40, 5, 90) + "%",
        left: seededRandom(seed + 50, 2, 95) + "%",
        size: seededRandom(seed + 60, 80, 180),
        opacity: seededRandom(seed + 70, 0.2, 0.35),
        blur: seededRandom(seed + 80, 0, 2.5),
        z,
        animDur: moving ? seededRandom(seed + 90, 12, 24) : 0,
        animDelay: seededRandom(seed + 100, 0, 2),
        moving,
        dx,
        dy,
      } satisfies Stone;
    });
    if (!arr.some((s) => s.moving) && arr.length > 0) {
      arr[0].moving = true;
      arr[0].dx = seededRandom(1001, -200, 200);
      arr[0].dy = seededRandom(1002, -120, 120);
      arr[0].animDur = seededRandom(1003, 12, 24);
    }
    stonesRef.current = arr;
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="pointer-events-none fixed inset-0 w-full h-full z-0 select-none" aria-hidden />;
  }

  const stones = stonesRef.current;

  return (
    <div className="pointer-events-none fixed inset-0 w-full h-full z-0 select-none" aria-hidden>
  {stones.map((s, i) => (
        <Image
          key={i}
          alt=""
          src={s.img}
          width={s.size}
          height={s.size}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size + "px",
            height: "auto",
            opacity: s.opacity,
            filter: `blur(${s.blur}px)` + (s.z === 0 ? " grayscale(0.2)" : ""),
            zIndex: s.z,
            animation: s.moving ? `stoneTravel${i} ${s.animDur}s ${s.animDelay}s infinite alternate linear` : undefined
          }}
          className="transition-opacity duration-700"
        />
  ))}
      <style>{stones.map((s, i) => `
        @keyframes stoneTravel${i} {
          0% { transform: translate(0px,0px); }
          100% { transform: translate(${s.dx}px,${s.dy}px); }
        }
      `).join("\n")}</style>
    </div>
  );
}
