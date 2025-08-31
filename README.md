# Lending (Next.js + Tailwind + Framer Motion)

Киберпанк-лендинг на Next.js (App Router, TypeScript), Tailwind CSS и Framer Motion.

## Быстрый старт

```powershell
# Установка зависимостей
npm ci  # или npm install, если нет package-lock.json

# Разработка (HMR):
# Вариант 1 (автопорт, может быть 3001):
npm run dev
# Вариант 2 (стабильный IPv4/порт 3010 — рекомендуется на Windows):
npm run dev:ipv4

# Прод-сборка и запуск (бережливый режим):
npm run build
# Прод-запуск (стабильно на IPv4/3010):
npm run start:ipv4
```

## Миграция/перенос в новую папку

```powershell
# Скопировать проект без артефактов сборки
robocopy D:\Lending D:\Lending_new /MIR /XD node_modules .next .turbo

cd D:\Lending_new
npm ci  # или npm install

# При необходимости восстановить .env.local и public/media/*
```

## Что хранится в public/media
- hero.mp4 — видео-фон первого экрана
- bg-cyberpunk.png — глобальный фон body
 - logo.png — логотип в шапке

## Полезные скрипты в package.json
- dev — запуск dev-сервера с HMR
- build — прод-сборка
- start — запуск прод-сборки

## Навигация и меню
- В шапке есть круглая кнопка, открывающая полноэкранное меню.
- Пункты меню кликабельны: плавно скроллят к секциям `#section-1`, `#section-3`, `#section-4`, `#section-6` и закрывают оверлей.
- Соц‑плитки кликабельны (заглушки): YouTube/Instagram/Telegram в новой вкладке, почта через `mailto:`.

## Частые проблемы
- ERR_CONNECTION_REFUSED на http://localhost:3000 — сервер не запущен либо порт занят.
	- Запустите dev: `npm run dev` и смотрите лог. Часто он пишет: `Port 3000 is in use... using 3001 instead`.
	- Тогда открывайте http://localhost:3001.
	- Или используйте стабильный скрипт: `npm run dev:ipv4` и открывайте http://127.0.0.1:3010.
- EBUSY при сборке на Windows (`rmdir ... .next\export`) — закройте проводники/процессы, держащие папку `.next`, повторите `npm run build`.

## Готовый промпт для следующего помощника
Скопируйте и вставьте это в начало новой сессии:

"""
Контекст: у меня Next.js проект (App Router, TypeScript) с Tailwind и Framer Motion. Папка public/media содержит hero.mp4 и bg-cyberpunk.png. Хочу продолжить разработку киберпанк-лендинга.

Проверь, пожалуйста:
- версии Node/npm, наличие и корректность зависимостей (npm ci),
- работоспособность сборки и запуска (npm run build, npm run start),
- отсутствуют ли 404 по статике (особенно пути /media/*),
- нет ли SSR/гидрационных предупреждений.

Затем:
- запусти проект в подходящем режиме (dev или build/start по ситуации),
- сделай небольшой аудит кода (src/app/layout.tsx, src/app/page.tsx, src/components/*, src/app/globals.css),
- предложи оптимизации производительности и анимаций,
- и продолжим реализовывать следующий функционал по моим задачам.
"""

## Замечания
- Если заметите 404 по изображению bg-cyberпанк.jpg — замените путь на /media/bg-cyberpunk.png и сделайте жёсткое обновление (Ctrl+F5) или очистите кэш.
- Для снижения нагрузки используйте цикл: правка → npm run build → npm run start; останавливайте сервер Ctrl+C, когда он не нужен.
