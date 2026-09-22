import Link from "next/link";
import {
  IconAlert,
  IconCartCheck,
  IconFolder,
  IconPackage,
  IconWallet,
} from "@/components/icons";
import { getAdminStats, getRecentOrders } from "@/lib/data";
import { faDigits, jalaliDate, toman } from "@/lib/format";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/types";

const BADGE: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  paid: "bg-sky-50 text-sky-700",
  shipped: "bg-green-50 text-green-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-zinc-100 text-zinc-500",
};

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getAdminStats(), getRecentOrders(6)]);

  const cards = [
    { label: "محصولات", value: faDigits(stats.products), icon: IconPackage, accent: "text-brand-600 bg-brand-50" },
    { label: "دسته‌بندی‌ها", value: faDigits(stats.categories), icon: IconFolder, accent: "text-teal-600 bg-teal-50" },
    { label: "کل سفارش‌ها", value: faDigits(stats.orders), icon: IconCartCheck, accent: "text-sky-600 bg-sky-50" },
    { label: "فروش (غیرلغو)", value: toman(stats.revenue), icon: IconWallet, accent: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-zinc-900">داشبورد</h1>
          <p className="text-xs text-zinc-500">نمای کلی فروشگاه آواژنگ</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex h-10 items-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white shadow-md shadow-brand-200 transition hover:bg-brand-700"
        >
          + محصول جدید
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-zinc-200 bg-white p-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.accent}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-lg font-extrabold text-zinc-900">{c.value}</p>
            <p className="text-xs text-zinc-500">{c.label}</p>
          </div>
        ))}
      </div>

      {stats.lowStock > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <IconAlert className="h-5 w-5 shrink-0" />
          <span>
            {faDigits(stats.lowStock)} محصول در حال اتمام موجودی هستند (
            {faDigits(5)} عدد یا کمتر). لطفاً موجودی را به‌روزرسانی کنید.
          </span>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-100 p-4">
          <h2 className="text-sm font-extrabold text-zinc-900">آخرین سفارش‌ها</h2>
          <Link href="/admin/orders" className="text-xs font-bold text-brand-600 hover:text-brand-700">
            مشاهده همه
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-6 text-center text-sm text-zinc-400">هنوز سفارشی ثبت نشده است.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-right text-xs text-zinc-400">
                  <th className="px-4 py-3 font-medium">کد</th>
                  <th className="px-4 py-3 font-medium">مشتری</th>
                  <th className="px-4 py-3 font-medium">مبلغ</th>
                  <th className="px-4 py-3 font-medium">تاریخ</th>
                  <th className="px-4 py-3 font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-zinc-50 last:border-0">
                    <td className="px-4 py-3 font-bold text-zinc-800" dir="ltr">
                      {o.code}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{o.customerName}</td>
                    <td className="px-4 py-3 font-bold text-zinc-800">{toman(o.total)}</td>
                    <td className="px-4 py-3 text-xs text-zinc-500">{jalaliDate(o.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-lg px-2 py-1 text-[11px] font-bold ${BADGE[o.status as OrderStatus]}`}>
                        {ORDER_STATUS_LABELS[o.status as OrderStatus]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}