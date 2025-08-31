"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STONE_IMAGES = [
  "/media/rock1.png",
  "/media/rock2.png"
];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
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
    const count = Math.floor(random(4, 6)); // 4–5 камней
    const arr: Stone[] = Array.from({ length: count }).map(() => {
      const img = STONE_IMAGES[Math.floor(Math.random() * STONE_IMAGES.length)];
      const moving = Math.random() < 0.6; // часть движется, часть статична
      const dx = moving ? random(-200, 200) : 0;
      const dy = moving ? random(-120, 120) : 0;
      const z = Math.random() > 0.5 ? 0 : 1 as 0 | 1;
      return {
        img,
        top: random(5, 90) + "%",
        left: random(2, 95) + "%",
        size: random(80, 180),
        opacity: random(0.2, 0.35),
        blur: random(0, 2.5),
        z,
        animDur: moving ? random(12, 24) : 0,
        animDelay: random(0, 2),
        moving,
        dx,
        dy,
      } satisfies Stone;
    });
    if (!arr.some((s) => s.moving) && arr.length > 0) {
      arr[0].moving = true;
      arr[0].dx = random(-200, 200);
      arr[0].dy = random(-120, 120);
      arr[0].animDur = random(12, 24);
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
