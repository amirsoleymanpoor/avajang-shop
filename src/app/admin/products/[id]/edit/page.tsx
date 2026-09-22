import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/ProductForm";
import { saveProduct } from "@/lib/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "ویرایش محصول" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (!Number.isFinite(id)) notFound();

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { title: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-5">
      <nav className="text-xs text-zinc-500">
        <Link href="/admin/products" className="transition hover:text-brand-600">
          محصولات
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-700">ویرایش: {product.title}</span>
      </nav>
      <h1 className="text-xl font-extrabold text-zinc-900">ویرایش محصول</h1>
      <ProductForm categories={categories} initial={product} action={saveProduct} />
    </div>
  );
}