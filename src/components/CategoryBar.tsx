"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/generated/prisma/client";

const VISIBLE_CATEGORIES = 4;

export function CategoryBar({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative border-b border-zinc-200/70 bg-white shadow-soft">
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center gap-2 overflow-hidden px-4 py-3">
        <Link
          href="/shop"
          className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-l from-brand-600 to-brand-800 px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110"
        >
          <span className="text-base leading-none">🛍️</span>
          همه محصولات
        </Link>
        {categories.slice(0, VISIBLE_CATEGORIES).map((c) => (
          <Link
            key={c.id}
            href={`/shop/category/${c.slug}`}
            className="flex shrink-0 items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
          >
            <span className="text-base leading-none">{c.emoji}</span>
            {c.title}
          </Link>
        ))}
        {categories.length > VISIBLE_CATEGORIES && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex shrink-0 items-center gap-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
            aria-expanded={open}
          >
            بیشتر
            <span className={`text-xs leading-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
              ⋯
            </span>
          </button>
        )}
        {open && (
          <>
            <button
              type="button"
              aria-label="بستن"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-x-0 top-full z-50 mt-2 grid grid-cols-2 gap-2 rounded-2xl border border-zinc-200 bg-white p-3 shadow-lift sm:grid-cols-3">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="col-span-full flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-600 to-brand-800 px-3 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                <span>🛍️</span>
                همه محصولات
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop/category/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  <span className="text-lg leading-none">{c.emoji}</span>
                  {c.title}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}