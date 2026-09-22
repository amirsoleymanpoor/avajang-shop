import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { IconCheck } from "@/components/icons";
import { getOrderByCode } from "@/lib/data";
import { faDigits, jalaliDate, toman } from "@/lib/format";

export const metadata: Metadata = { title: "ثبت سفارش موفق | آواژنگ" };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const code = typeof sp.code === "string" ? sp.code : "";
  const order = code ? await getOrderByCode(code) : null;
  if (!order) notFound();

  const items = (Array.isArray(order.items) ? order.items : []) as { title: string; price: number; qty: number }[];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <ClearCartOnMount />
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <IconCheck className="h-10 w-10" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold text-zinc-900">سفارش شما ثبت شد</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          از خرید شما سپاسگزاریم. کد پیگیری سفارش:
        </p>
        <div
          className="mx-auto mt-4 w-fit rounded-xl bg-zinc-900 px-6 py-2.5 text-lg font-extrabold text-white tracking-widest"
          dir="ltr"
        >
          {order.code}
        </div>
        <p className="mt-3 text-xs leading-5 text-zinc-400">
          برای پیگیری و هماهنگی پرداخت، با شما تماس خواهیم گرفت. لطفاً این کد را نگه دارید.
        </p>

        <div className="mt-6 space-y-2 rounded-2xl bg-zinc-50 p-4 text-left text-sm" dir="ltr">
          <div className="flex justify-between">
            <span className="text-zinc-500">Receiver</span>
            <span className="font-bold text-zinc-800">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Phone</span>
            <span className="font-bold text-zinc-800" dir="ltr">
              {faDigits(order.phone)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-zinc-500">Address</span>
            <span className="text-zinc-800">{order.city} — {order.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Date</span>
            <span className="font-bold text-zinc-800">{jalaliDate(order.createdAt)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-dashed border-zinc-200 pt-5 text-right">
          {items.map((it) => (
            <div key={it.title} className="flex justify-between text-sm text-zinc-600">
              <span>
                {it.title} <span className="text-zinc-400">× {faDigits(it.qty)}</span>
              </span>
              <span className="font-bold">{toman(it.price * it.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-zinc-200 pt-3 text-base">
            <span className="font-extrabold text-zinc-900">مبلغ کل</span>
            <span className="font-extrabold text-brand-700">{toman(order.total)}</span>
          </div>
        </div>

        <div className="mt-7 flex justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700"
          >
            ادامه خرید
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-bold text-zinc-700 transition hover:border-brand-300 hover:text-brand-600"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
}