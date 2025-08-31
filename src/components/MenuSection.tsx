"use client";
import { useEffect } from "react";

export default function MenuSection() {
  // Закрытие по Esc — возвращаемся к сохранённой позиции
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAndReturn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function closeAndReturn() {
    const saved = sessionStorage.getItem("menu:prevScrollY");
    if (saved) {
      const y = Number(saved);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      // если не сохранили — к первому экрану
      document.getElementById("section-1")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section id="menu" className="min-h-screen w-full relative bg-black/90 border-b-2 border-cyberpunk-pink px-6 py-24 md:py-28">
      {/* Кнопка закрыть */}
      <button
        aria-label="Close menu"
        onClick={closeAndReturn}
        className="absolute top-6 right-6 md:top-8 md:right-8 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/25 hover:border-cyberpunk-pink transition-colors"
      >
        <span className="sr-only">Close</span>
        <div className="relative w-6 h-6">
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white rotate-45" />
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white -rotate-45" />
        </div>
      </button>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Левая колонка: пункты */}
        <div className="flex flex-col justify-center pt-10">
          {[
            { href: "#section-1", text: "ГОЛОВНА" },
            { href: "#section-3", text: "ВАКАНСІЇ" },
            { href: "#section-4", text: "БЛОГ" },
            { href: "#section-6", text: "КОНТАКТИ" },
          ].map((it, i) => (
            <a
              key={i}
              href={it.href}
              onClick={closeAndReturn}
              className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-wide text-white/90 hover:text-cyberpunk-yellow transition-colors mb-4 md:mb-6"
            >
              {it.text}
            </a>
          ))}
        </div>

        {/* Правая колонка: плитки */}
        <div className="flex items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { label: "YOUTUBE", href: "#" },
              { label: "INSTAGRAM", href: "#" },
              { label: "TELEGRAM", href: "#" },
              { label: "GMAIL", href: "#" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                className="group rounded-xl border border-white/15 bg-black/40 p-6 hover:border-cyberpunk-blue transition-colors"
                target="_blank" rel="noreferrer"
              >
                <div className="mb-6 opacity-90 group-hover:opacity-100 transition-opacity text-white">{s.label}</div>
                <div className="text-white/80 font-bold tracking-widest text-sm">{s.label}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
