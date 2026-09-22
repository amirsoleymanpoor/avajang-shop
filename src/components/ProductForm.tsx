"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { IconPlus, IconX } from "@/components/icons";
import type { Product } from "@/generated/prisma/client";
import type { ActionResult } from "@/lib/actions/admin";
import { faDigits, toman } from "@/lib/format";
import type { Spec } from "@/lib/types";

const GRADIENTS = [
  "from-slate-800 to-slate-950",
  "from-teal-500 to-emerald-800",
  "from-emerald-500 to-teal-800",
  "from-lime-500 to-green-800",
  "from-cyan-500 to-blue-800",
  "from-emerald-500 to-teal-900",
  "from-green-600 to-emerald-900",
  "from-rose-400 to-pink-700",
  "from-orange-400 to-red-700",
  "from-amber-500 to-orange-800",
  "from-lime-400 to-green-700",
  "from-neutral-700 to-neutral-950",
];

function toFeatures(raw: unknown): Spec[] {
  if (!Array.isArray(raw)) return [];
  return (raw as Spec[])
    .filter((f) => f && typeof f === "object")
    .map((f) => ({ label: String(f.label ?? ""), value: String(f.value ?? "") }));
}

export function ProductForm({
  categories,
  initial,
  action,
}: {
  categories: { id: number; title: string; emoji: string }[];
  initial?: Product;
  action: (input: {
    id?: number;
    title: string;
    brand: string;
    price: number;
    compareAtPrice?: number | null;
    stock: number;
    emoji: string;
    gradient: string;
    description: string;
    features: Spec[];
    isFeatured: boolean;
    categoryId: number;
  }) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? 0);
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    initial?.compareAtPrice ? String(initial.compareAtPrice) : "",
  );
  const [stock, setStock] = useState(initial ? String(initial.stock) : "0");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "📦");
  const [gradient, setGradient] = useState(initial?.gradient ?? GRADIENTS[0]);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [features, setFeatures] = useState<Spec[]>(toFeatures(initial?.features));
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);

  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResult | null): Promise<ActionResult> => {
      const res = await action({
        id: initial?.id,
        title,
        brand,
        price: Number(price) || 0,
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        stock: Number(stock) || 0,
        emoji,
        gradient,
        description,
        features,
        isFeatured,
        categoryId,
      });
      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      }
      return res;
    },
    null,
  );

  const updateFeature = (i: number, patch: Partial<Spec>) => {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  };

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-extrabold text-zinc-900">اطلاعات پایه</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">عنوان محصول *</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثلاً: گوشی موبایل اپل آیفون ۱۵ پرو"
                required
                className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">برند *</span>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="مثلاً: اپل"
                required
                className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-brand-500"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">دسته‌بندی *</span>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none transition focus:border-brand-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">قیمت (تومان) *</span>
              <input
                type="number"
                min="0"
                dir="ltr"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="15000000"
                required
                className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-left text-sm outline-none transition focus:border-brand-500"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">قیمت قبل از تخفیف</span>
              <input
                type="number"
                min="0"
                dir="ltr"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="مثلاً 18000000"
                className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-left text-sm outline-none transition focus:border-brand-500"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">موجودی</span>
              <input
                type="number"
                min="0"
                dir="ltr"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-left text-sm outline-none transition focus:border-brand-500"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">توضیحات کوتاه</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="نکات کلیدی محصول..."
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-brand-500"
              />
            </label>
          </div>

          <label className="mt-4 flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4.5 w-4.5 accent-brand-600"
            />
            <span className="text-sm font-bold text-zinc-700">نمایش در بخش «پیشنهاد ویژه» صفحه اصلی</span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-extrabold text-zinc-900">تصویر محصول</h2>
            <label>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">ایموجی</span>
              <input
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-center text-xl outline-none transition focus:border-brand-500"
              />
            </label>
            <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-zinc-50 p-4">
              <span className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br text-4xl ${gradient}`}>
                <span className="drop-shadow">{emoji}</span>
              </span>
              <p className="text-[11px] text-zinc-400">پیش‌نمایش بلوک تصویر روی بسته‌های رنگی</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGradient(g)}
                  aria-label={g}
                  className={`h-10 rounded-lg bg-gradient-to-br ${g} ${
                    gradient === g ? "ring-2 ring-brand-600 ring-offset-2" : "opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-zinc-900">مشخصات فنی</h2>
          <button
            type="button"
            onClick={() => setFeatures((prev) => [...prev, { label: "", value: "" }])}
            className="flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-bold text-zinc-600 transition hover:border-brand-300 hover:text-brand-600"
          >
            <IconPlus className="h-3.5 w-3.5" />
            افزودن ردیف
          </button>
        </div>
        {features.length === 0 ? (
          <p className="rounded-xl bg-zinc-50 p-4 text-center text-xs text-zinc-400">
            هنوز ویژگی‌ای ثبت نشده (مثلاً: پردازنده → A17 Pro)
          </p>
        ) : (
          <div className="space-y-2">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={f.label}
                  onChange={(e) => updateFeature(i, { label: e.target.value })}
                  placeholder="نام ویژگی"
                  className="h-10 w-1/3 rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-brand-500"
                />
                <input
                  value={f.value}
                  onChange={(e) => updateFeature(i, { value: e.target.value })}
                  placeholder="مقدار"
                  className="h-10 flex-1 rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setFeatures((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label="حذف ردیف"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {price && Number(price) > 0 && (
        <p className="text-xs text-zinc-500">
          نمایش قیمت نهایی: <span className="font-bold text-zinc-800">{toman(Number(price))}</span>
          {compareAtPrice && Number(compareAtPrice) > Number(price) ? (
            <>
              {" "}
              با {faDigits(Math.round(((Number(compareAtPrice) - Number(price)) / Number(compareAtPrice)) * 100))}٪
              تخفیف
            </>
          ) : null}
        </p>
      )}

      {state && !state.ok && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="flex h-12 items-center justify-center rounded-xl bg-brand-600 px-8 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "در حال ذخیره..." : isEdit ? "ذخیره تغییرات" : "ثبت محصول"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="h-12 rounded-xl border border-zinc-300 px-6 text-sm font-bold text-zinc-600 transition hover:border-zinc-400"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}