import Link from "next/link";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { IconEdit, IconPlus } from "@/components/icons";
import { ProductVisual } from "@/components/ProductCard";
import { deleteProduct } from "@/lib/actions/admin";
import { prisma } from "@/lib/db";
import { faDigits, toman } from "@/lib/format";

export const metadata = { title: "مدیریت محصولات" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-zinc-900">محصولات</h1>
          <p className="text-xs text-zinc-500">{faDigits(products.length)} کالا در فروشگاه</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-bold text-white shadow-md shadow-brand-200 transition hover:bg-brand-700"
        >
          <IconPlus className="h-4 w-4" />
          محصول جدید
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {products.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-400">هنوز محصولی ثبت نشده است.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-right text-xs text-zinc-400">
                  <th className="px-4 py-3 font-medium">محصول</th>
                  <th className="px-4 py-3 font-medium">دسته</th>
                  <th className="px-4 py-3 font-medium">قیمت</th>
                  <th className="px-4 py-3 font-medium">موجودی</th>
                  <th className="px-4 py-3 font-medium">ویژه</th>
                  <th className="px-4 py-3 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-zinc-50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ProductVisual emoji={p.emoji} gradient={p.gradient} className="h-12 w-12 rounded-lg" emojiClass="text-xl" />
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-bold text-zinc-800">{p.title}</p>
                          <p className="text-xs text-zinc-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {p.category?.emoji} {p.category?.title ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-zinc-800">{toman(p.price)}</span>
                      {p.compareAtPrice && p.compareAtPrice > p.price && (
                        <span className="mr-1.5 text-xs text-zinc-400 line-through">{toman(p.compareAtPrice!)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                          p.stock === 0
                            ? "bg-rose-50 text-rose-600"
                            : p.stock <= 5
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {faDigits(p.stock)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{p.isFeatured ? "✓" : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          aria-label={`ویرایش ${p.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                        >
                          <IconEdit className="h-4 w-4" />
                        </Link>
                        <ConfirmDelete action={deleteProduct.bind(null, p.id)} label={p.title} />
                      </div>
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