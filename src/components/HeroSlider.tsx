"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";

export type HeroSlide = {
  image: string;
  alt: string;
  href?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  accent?: string;
};

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/1] max-h-[340px] w-full overflow-hidden bg-black sm:aspect-[4/1] sm:max-h-[400px]">
        {slides.map((s, i) => (
          <Link
            key={s.image}
            href={s.href ?? "/"}
            aria-hidden={i !== index}
            className={`absolute inset-0 block transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-contain object-center"
            />
            {s.title && (
              <div className="relative z-10 flex h-full items-center p-6 sm:p-12">
                <div className="max-w-xl">
                  {s.accent && (
                    <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur">
                      {s.accent}
                    </span>
                  )}
                  <h2 className="mt-4 text-2xl font-black leading-tight text-white drop-shadow-sm sm:text-4xl sm:leading-[1.2]">
                    {s.title}
                  </h2>
                  {s.subtitle && <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">{s.subtitle}</p>}
                  {s.cta && (
                    <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-zinc-900 shadow-lift transition hover:-translate-y-0.5">
                      {s.cta}
                      <IconChevronLeft className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/35"
            aria-label="قبلی"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/35"
            aria-label="بعدی"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" dir="ltr">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                aria-label={`اسلاید ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}