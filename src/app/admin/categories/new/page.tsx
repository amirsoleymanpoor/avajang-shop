import Link from "next/link";
import { CategoryForm } from "@/components/CategoryForm";
import { saveCategory } from "@/lib/actions/admin";

export const metadata = { title: "دسته‌بندی جدید" };

export default function NewCategoryPage() {
  return (
    <div className="space-y-5">
      <nav className="text-xs text-zinc-500">
        <Link href="/admin/categories" className="transition hover:text-brand-600">
          دسته‌بندی‌ها
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-700">دسته جدید</span>
      </nav>
      <h1 className="text-xl font-extrabold text-zinc-900">افزودن دسته‌بندی جدید</h1>
      <CategoryForm action={saveCategory} />
    </div>
  );
}