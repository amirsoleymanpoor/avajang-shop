"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Category } from "@/generated/prisma/client";

const SORTS = [
  { value: "", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
];

export function ShopFilters({
  categories,
  current,
}: {
  categories: Category[];
  current: { q?: string; category?: string; sort?: string };
}) {
  const router = useRouter();
  const pathname = usePathname();

  function apply(patch: Record<string, string>) {
    const params = new URLSearchParams();
    const merged = { ...current, ...patch };
    if (merged.q) params.set("q", merged.q);
    if (merged.category) params.set("category", merged.category);
    if (merged.sort) params.set("sort", merged.sort);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={current.category ?? ""}
        onChange={(e) => apply({ category: e.target.value })}
        className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-brand-500"
      >
        <option value="">همه دسته‌بندی‌ها</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.title}
          </option>
        ))}
      </select>
      <select
        value={current.sort ?? ""}
        onChange={(e) => apply({ sort: e.target.value })}
        className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-700 outline-none transition focus:border-brand-500"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {current.q && (
        <span className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700">
          جستجو: «{current.q}»
          <button
            type="button"
            onClick={() => apply({ q: "" })}
            className="font-bold text-brand-600 hover:text-brand-800"
            aria-label="حذف جستجو"
          >
            ×
          </button>
        </span>
      )}
    </div>
  );
}