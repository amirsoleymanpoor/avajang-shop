import Link from "next/link";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { IconEdit, IconPlus } from "@/components/icons";
import { deleteCategory } from "@/lib/actions/admin";
import { prisma } from "@/lib/db";
import { faDigits } from "@/lib/format";

export const metadata = { title: "دسته‌بندی‌ها" };

export default async function AdminCategoriesPage() {
  const [categories, counts] = await Promise.all([
    prisma.category.findMany({ orderBy: { title: "asc" } }),
    prisma.product.groupBy({ by: ["categoryId"], _count: { _all: true } }),
  ]);
  const countBy = new Map(counts.map((c) => [c.categoryId, c._count._all]));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-zinc-900">دسته‌بندی‌ها</h1>
          <p className="text-xs text-zinc-500">{faDigits(categories.length)} دسته</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-bold text-white shadow-md shadow-brand-200 transition hover:bg-brand-700"
        >
          <IconPlus className="h-4 w-4" />
          دسته جدید
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${c.color}`}
            >
              <span className="drop-shadow">{c.emoji}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-zinc-800">{c.title}</p>
              <p className="mt-0.5 text-xs text-zinc-400">
                {faDigits(countBy.get(c.id) ?? 0)} کالا
                <span className="mx-1.5" dir="ltr">
                  /{c.slug}
                </span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/categories/${c.id}/edit`}
                aria-label={`ویرایش ${c.title}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <IconEdit className="h-4 w-4" />
              </Link>
              <ConfirmDelete action={deleteCategory.bind(null, c.id)} label={c.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}