import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { getCatalog, getCategories, getCategoryBySlug } from "@/lib/data";
import { faDigits } from "@/lib/format";

function first(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const q = first(sp.q);
  const category = slug;
  const sort = first(sp.sort);

  const [categoryRow, categories, products] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getCatalog({ q, category, sort }),
  ]);

  if (!categoryRow) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-5 text-xs text-zinc-500">
        <Link href="/" className="transition hover:text-brand-600">
          خانه
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-700">{categoryRow.title}</span>
      </nav>

      <div className="mb-6 flex items-center gap-4">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl ${categoryRow.color}`}
        >
          <span className="drop-shadow">{categoryRow.emoji}</span>
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">{categoryRow.title}</h1>
          <p className="mt-0.5 text-xs text-zinc-500">{faDigits(products.length)} کالا در این دسته</p>
        </div>
      </div>

      <div className="mb-6">
        <ShopFilters categories={categories} current={{ q, category, sort }} />
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-zinc-300 bg-white py-20 text-center">
          <span className="text-5xl">🛒</span>
          <p className="text-sm font-bold text-zinc-700">هنوز محصولی در این دسته ثبت نشده است.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}