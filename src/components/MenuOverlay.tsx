"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MenuOverlay({ open, onClose }: Props) {
  function handleNav(toId: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClose();
      // Небольшая задержка, чтобы убрать lock и плавно проскроллить
      setTimeout(() => {
        const el = document.getElementById(toId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };
  }
  // Блокируем скролл страницы, когда меню открыто
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Полноэкранный контент */}
          <motion.div
            className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Кнопка закрыть */}
            <button
              aria-label="Close menu"
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/25 hover:border-cyberpunk-pink transition-colors"
            >
              <span className="sr-only">Close</span>
              <div className="relative w-6 h-6">
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white rotate-45" />
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white -rotate-45" />
              </div>
            </button>

            {/* Левая колонка: крупные пункты */}
            <motion.nav
              className="flex flex-col justify-center"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {[
                { id: "section-1", text: "ГОЛОВНА" },
                { id: "section-3", text: "ВАКАНСІЇ" },
                { id: "section-4", text: "БЛОГ" },
                { id: "section-6", text: "КОНТАКТИ" },
              ].map((it, i) => (
                <motion.a
                  key={i}
                  href={`#${it.id}`}
                  variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                  className="text-5xl md:text-7xl font-extrabold tracking-wide text-white/90 neon-hover mb-4 md:mb-6"
                  onClick={handleNav(it.id)}
                >
                  {it.text}
                </motion.a>
              ))}
            </motion.nav>

            {/* Правая колонка: единая панель соцсетей */}
            <motion.div
              className="flex items-center lg:items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-full border border-white/20 bg-black/40">
                <div className="grid grid-cols-4">
                  {[
                    { label: "YOUTUBE", icon: YoutubeIcon, href: "https://youtube.com/" },
                    { label: "INSTAGRAM", icon: InstagramIcon, href: "https://instagram.com/" },
                    { label: "TELEGRAM", icon: TelegramIcon, href: "https://t.me/" },
                    { label: "GMAIL", icon: GmailIcon, href: "mailto:hello@example.com" },
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      target={s.href.startsWith('mailto:') ? undefined : "_blank"}
                      rel={s.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                      className={`flex flex-col items-start justify-between p-6 min-h-[200px] hover:bg-white/5 transition-colors ${idx !== 0 ? 'border-l border-white/15' : ''}`}
                    >
                      <div className="opacity-90">{s.icon()}</div>
                      <div className="text-white/85 font-bold tracking-widest text-sm mt-8">{s.label}</div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function YoutubeIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="20" rx="3" fill="#000" stroke="white" opacity=".6"/>
      <path d="M12 6L18 10L12 14V6Z" fill="white"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" opacity=".6"/>
      <circle cx="12" cy="12" r="4" stroke="white"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="24" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3L3 11l7 2 2 7 9-17Z" stroke="white" opacity=".6"/>
      <path d="M10 13l2 7 3-8" stroke="white"/>
    </svg>
  );
}
function GmailIcon() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" opacity=".6"/>
      <path d="M3 7l9 6 9-6" stroke="white"/>
    </svg>
  );
}
