"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartBadge } from "@/components/CartBadge";
import { BrandLogo } from "@/components/BrandLogo";
import { IconSearch, IconUser } from "@/components/icons";

export function HeaderShell() {
  const [compact, setCompact] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = (y: number) => {
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.scrollingElement ?? document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0;
      bar.style.setProperty("--scroll-x", p.toFixed(4));
    };

    const measure = () => {
      const doc = document.scrollingElement ?? document.documentElement;
      updateProgress(window.pageYOffset ?? doc.scrollTop ?? 0);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let ticking = false;
    let lastToggle = 0;
    let lastY = 0;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.scrollingElement ?? document.documentElement;
        const y = window.pageYOffset ?? doc.scrollTop ?? 0;
        const delta = y - lastY;
        lastY = y;
        updateProgress(y);
        const now = performance.now();
        if (now - lastToggle >= 180) {
          if (y < 80) {
            lastToggle = now;
            setCompact(false);
          } else if (delta > 10) {
            lastToggle = now;
            setCompact(true);
          } else if (delta < -10) {
            lastToggle = now;
            setCompact(false);
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 overflow-hidden">
      <div
        ref={barRef}
        className="absolute inset-x-0 top-0 z-30 h-1 bg-gradient-to-l from-brand-400 to-brand-600"
        style={{
          width: "100%",
          transform: "scaleX(var(--scroll-x, 0))",
          transformOrigin: "right",
        }}
      />
      <div
        className={`relative z-20 overflow-hidden bg-gradient-to-l from-brand-900 via-brand-700 to-brand-500 px-4 text-center text-xs font-medium text-white transition-all duration-300 ${
          compact ? "max-h-0 py-0" : "max-h-12 py-2"
        }`}
      >
        ارسال رایگان برای خرید بالای ۱۰ میلیون تومان ✦ ضمانت اصالت کالا
      </div>

      <div className="border-b border-zinc-200/70 bg-white shadow-soft">
        <div
          className={`relative z-10 mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all duration-300 ${
            compact ? "py-2" : "py-3"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <BrandLogo
              className={`transition-all duration-300 ${
                compact ? "h-10 w-10" : "h-20 w-20"
              }`}
            />
            <span className="hidden flex-col sm:flex">
              <span
                className={`font-black leading-none text-brand-900 transition-all duration-300 ${
                  compact ? "text-lg" : "text-3xl"
                }`}
              >
                آواژنگ
              </span>
              <span
                className={`mt-1 text-sm text-zinc-500 ${
                  compact ? "hidden" : ""
                }`}
              >
                خرید آنلاین کالای دیجیتال
              </span>
            </span>
          </Link>

          <form action="/shop" className="relative mx-auto hidden w-full max-w-xl md:block">
            <input
              type="search"
              name="q"
              placeholder="جستجوی محصول... (مثلاً: گوشی، لپ‌تاپ)"
              className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50 pr-4 pl-12 text-sm shadow-inner outline-none transition-all duration-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 ${
                compact ? "h-9" : "h-11"
              }`}
            />
            <button
              type="submit"
              aria-label="جستجو"
              className="absolute top-1/2 left-1.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700"
            >
              <IconSearch className="h-4 w-4" />
            </button>
          </form>

          <div className="mr-auto flex items-center gap-2 md:mr-0">
            <Link
              href="/admin"
              className={`hidden items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3.5 text-sm font-medium text-zinc-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:flex ${
                compact ? "h-9" : "h-11"
              }`}
            >
              <IconUser className="h-4 w-4" />
              پنل مدیریت
            </Link>
            <CartBadge />
          </div>
        </div>

        <form action="/shop" className="px-4 pb-3 md:hidden">
          <div className="relative">
            <input
              type="search"
              name="q"
              placeholder="جستجوی محصول..."
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pr-4 pl-11 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
            <button
              type="submit"
              aria-label="جستجو"
              className="absolute top-1/2 left-2 -translate-y-1/2 text-zinc-400"
            >
              <IconSearch className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}