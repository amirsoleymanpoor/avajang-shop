import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/CategoryForm";
import { saveCategory } from "@/lib/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "ویرایش دسته‌بندی" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (!Number.isFinite(id)) notFound();

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="space-y-5">
      <nav className="text-xs text-zinc-500">
        <Link href="/admin/categories" className="transition hover:text-brand-600">
          دسته‌بندی‌ها
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-700">ویرایش: {category.title}</span>
      </nav>
      <h1 className="text-xl font-extrabold text-zinc-900">ویرایش دسته‌بندی</h1>
      <CategoryForm initial={category} action={saveCategory} />
    </div>
  );
}