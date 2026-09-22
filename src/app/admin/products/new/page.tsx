import Link from "next/link";
import { ProductForm } from "@/components/ProductForm";
import { saveProduct } from "@/lib/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "محصول جدید" };

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="space-y-5">
      <nav className="text-xs text-zinc-500">
        <Link href="/admin/products" className="transition hover:text-brand-600">
          محصولات
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-700">محصول جدید</span>
      </nav>
      <h1 className="text-xl font-extrabold text-zinc-900">افزودن محصول جدید</h1>
      <ProductForm categories={categories} action={saveProduct} />
    </div>
  );
}