import { prisma } from "@/lib/db";
import type { Category, Product } from "@/generated/prisma/client";
import type { Spec } from "@/lib/types";

export type ProductDTO = Product & { category: Category };

export function getCategories(): Promise<Category[]> {
  return prisma.category.findMany({ orderBy: { id: "asc" } });
}

function pct(p: { price: number; compareAtPrice: number | null }): number {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
  return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
}

export type CatalogParams = {
  q?: string;
  category?: string;
  sort?: string;
};

export async function getCatalog(params: CatalogParams): Promise<ProductDTO[]> {
  const where: {
    title?: { contains: string };
    category?: { slug: string };
  } = {};
  if (params.q) where.title = { contains: params.q };
  if (params.category) where.category = { slug: params.category };

  const rows = await prisma.product.findMany({
    where,
    include: { category: true },
  });

  switch (params.sort) {
    case "price-asc":
      rows.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      rows.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      rows.sort((a, b) => pct(b) - pct(a));
      break;
    default:
      rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  return rows;
}

export async function getFeatured(): Promise<ProductDTO[]> {
  const rows = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return rows;
}

export async function getLatest(): Promise<ProductDTO[]> {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

export async function getDeals(): Promise<ProductDTO[]> {
  const rows = await prisma.product.findMany({
    where: { NOT: { compareAtPrice: null } },
    include: { category: true },
    take: 40,
  });
  const withDiscount = rows.filter((p) => pct(p) > 0);
  withDiscount.sort((a, b) => pct(b) - pct(a));
  return withDiscount.slice(0, 10);
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return product;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getSimilar(product: Product, take = 4): Promise<ProductDTO[]> {
  return prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export function parseFeatures(json: unknown): Spec[] {
  if (!Array.isArray(json)) return [];
  return json.filter(
    (s): s is Spec =>
      !!s && typeof s === "object" && typeof (s as Spec).label === "string" && typeof (s as Spec).value === "string",
  );
}

export async function getAdminStats() {
  const [products, categories, orders, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.product.count({ where: { stock: { lte: 5 } } }),
  ]);
  const paid = await prisma.order.findMany({ where: { NOT: { status: "cancelled" } }, select: { total: true } });
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  return { products, categories, orders, revenue, lowStock };
}

export async function getRecentOrders(take = 5) {
  return prisma.order.findMany({ orderBy: { createdAt: "desc" }, take });
}

export async function getAllOrders() {
  return prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
}

export async function getOrderByCode(code: string) {
  return prisma.order.findUnique({ where: { code } });
}