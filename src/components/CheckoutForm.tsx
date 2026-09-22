"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { createOrder, type CreateOrderResult } from "@/lib/actions/shop";
import { faDigits, toman } from "@/lib/format";

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [state, formAction, pending] = useActionState(
    async (_prev: CreateOrderResult | null): Promise<CreateOrderResult | null> => {
      const res = await createOrder({ customerName, phone, city, address, lines: items });
      if (res.ok) clear();
      return res;
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) router.push(`/shop/success?code=${state.code}`);
  }, [state, router]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center">
        <span className="text-4xl">🧾</span>
        <p className="text-sm font-bold text-zinc-700">سبد خرید خالی است</p>
        <Link href="/shop" className="text-sm font-bold text-brand-600 hover:text-brand-700">
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  const fields = [
    { key: "name", label: "نام و نام خانوادگی", value: customerName, set: setCustomerName, ph: "مثلاً: علی رضایی", dir: "rtl" as const },
    { key: "phone", label: "شماره موبایل", value: phone, set: setPhone, ph: "0912 345 6789", dir: "ltr" as const },
    { key: "city", label: "شهر", value: city, set: setCity, ph: "مثلاً: تهران", dir: "rtl" as const },
    { key: "address", label: "آدرس کامل", value: address, set: setAddress, ph: "خیابان، کوچه، پلاک...", dir: "rtl" as const },
  ];

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 lg:col-span-2">
        <h2 className="mb-4 text-base font-extrabold text-zinc-900">اطلاعات گیرنده سفارش</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className={f.key === "address" ? "sm:col-span-2" : undefined}>
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">{f.label}</span>
              <input
                required
                dir={f.dir}
                value={f.value}
                disabled={pending}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.ph}
                className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 disabled:opacity-60"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="mb-3 text-base font-extrabold text-zinc-900">مبلغ سفارش</h2>
          {items.map((line) => (
            <div key={line.slug} className="flex justify-between gap-3 text-xs text-zinc-500">
              <span className="line-clamp-1">
                {line.emoji} {line.title} × {faDigits(line.qty)}
              </span>
              <span className="font-bold text-zinc-700">{toman(line.price * line.qty)}</span>
            </div>
          ))}
          <div className="mt-3 flex justify-between border-t border-dashed border-zinc-200 pt-3 text-sm">
            <span className="font-bold text-zinc-900">قابل پرداخت</span>
            <span className="font-extrabold text-brand-700">{toman(total)}</span>
          </div>
          {total >= 10_000_000 ? (
            <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] text-emerald-700">
              ارسال رایگان فعال شد 🎉
            </p>
          ) : (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-1.5 text-[11px] text-amber-700">
              ارسال به عهده مشتری (رایگان برای خرید بالای ۱۰ میلیون تومان)
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[11px] leading-5 text-amber-800">
          ⚠️ این صفحه پیش‌نمایش است و پرداخت واقعی آنلاین هنوز فعال نشده است. با ثبت سفارش، یک کد پیگیری دریافت می‌کنید و
          هماهنگی پرداخت به صورت تلفنی انجام می‌شود.
        </div>

        <button
          type="submit"
          disabled={pending}
          className="flex h-13 min-h-12 w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "در حال ثبت..." : "ثبت و تکمیل سفارش"}
        </button>
      </div>

      {state && !state.ok && (
        <div className="col-span-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.error}
        </div>
      )}
    </form>
  );
}