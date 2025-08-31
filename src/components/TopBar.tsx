"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MenuOverlay from "@/components/MenuOverlay";

export default function TopBar() {
  // const [lang, setLang] = useState<"UA" | "EN">("UA");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем каждые 100мс, есть ли preloader на странице
    const checkPreloader = () => {
      const preloader = document.querySelector('.fixed.z-\\[100\\]');
      setLoading(!!preloader);
    };

    checkPreloader();
    const interval = setInterval(checkPreloader, 100);

    return () => clearInterval(interval);
  }, []);

  // Скрываем TopBar во время загрузки
  if (loading) {
    return null;
  }

  return (
    <>
  <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="#section-1"
          className="pointer-events-auto inline-flex items-center justify-center w-22 h-22 md:w-28 md:h-28 rounded-full"
          title="Home"
          aria-label="Home"
        >
          {/* Круг без фоновой плашки. Изображение внутри; при отсутствии файла покажется плейсхолдер. */}
          <div className="relative w-18 h-18 md:w-24 md:h-24">
            <Image
              src="/media/logo.png"
              alt="Logo"
              fill
              sizes="(max-width: 768px) 72px, 96px"
              className="object-contain opacity-90"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement as HTMLElement | null;
                if (parent && !parent.querySelector(".logo-ph")) {
                  const span = document.createElement("span");
                  span.className = "logo-ph absolute inset-0 grid place-items-center text-cyberpunk-pink text-xl font-extrabold";
                  span.textContent = "◎";
                  parent.appendChild(span);
                }
              }}
            />
          </div>
        </a>

        {/* Menu button */}
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto inline-flex items-center justify-center w-auto h-10 md:h-11 px-5 md:px-6 rounded-full transition-colors relative border-0 outline-none focus:outline-none focus-visible:outline-none btn-crypto"
        >
          {/* Обводка и неоновая тень удалены */}
          <span className="sr-only">Menu</span>
          <div className="relative w-5 h-5 md:w-6 md:h-6">
            <span className="absolute left-0 right-0 top-1 h-0.5 bg-white rounded opacity-90" />
            <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white rounded opacity-90" />
            <span className="absolute left-0 right-0 bottom-1 h-0.5 bg-white rounded opacity-90" />
          </div>
        </button>
  </div>
    </div>
  {/* Оверлей выводим вне контейнера с pointer-events-none */}
  <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
