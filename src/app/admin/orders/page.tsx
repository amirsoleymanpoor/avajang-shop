import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { updateOrderStatus } from "@/lib/actions/admin";
import { getAllOrders } from "@/lib/data";
import { faDigits, jalaliDate, toman } from "@/lib/format";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/types";

export const metadata = { title: "سفارش‌ها" };

type OrderItemRow = { slug?: string; title: string; price: number; qty: number };

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-zinc-900">سفارش‌ها</h1>
        <p className="text-xs text-zinc-500">{faDigits(orders.length)} سفارش ثبت‌شده</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-400">
          هنوز سفارشی ثبت نشده است. سفارش‌ها بعد از خرید مشتریان اینجا نمایش داده می‌شوند.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const items = (Array.isArray(o.items) ? o.items : []) as OrderItemRow[];
            return (
              <div key={o.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 p-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div>
                      <p className="text-base font-extrabold text-zinc-900" dir="ltr">
                        {o.code}
                      </p>
                      <p className="text-xs text-zinc-400">{jalaliDate(o.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-800">{o.customerName}</p>
                      <p className="text-xs text-zinc-400" dir="ltr">
                        {faDigits(o.phone)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-extrabold text-brand-700">{toman(o.total)}</span>
                    <OrderStatusSelect
                      status={o.status as OrderStatus}
                      action={updateOrderStatus.bind(null, o.id)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 p-4 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-bold text-zinc-400">اقلام سفارش ({faDigits(items.length)})</p>
                    <ul className="space-y-1.5">
                      {items.map((it, i) => (
                        <li key={i} className="flex justify-between gap-3 text-sm">
                          <span className="text-zinc-600">
                            {it.title}{" "}
                            <span className="text-zinc-400">× {faDigits(it.qty)}</span>
                          </span>
                          <span className="font-bold text-zinc-800">{toman(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold text-zinc-400">آدرس ارسال</p>
                    <p className="rounded-xl bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
                      <span className="font-bold text-zinc-800">{o.city}</span> — {o.address}
                    </p>
                    <p className="mt-2 text-[11px] text-zinc-400">
                      وضعیت: {ORDER_STATUS_LABELS[o.status as OrderStatus]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}