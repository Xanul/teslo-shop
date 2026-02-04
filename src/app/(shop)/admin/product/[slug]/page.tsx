import { getAllCategories, getProductBySlug } from "@/actions";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components";

interface AdminProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductPage({
  params,
}: AdminProductPageProps) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    slug === "new" ? Promise.resolve(null) : getProductBySlug(slug),
    getAllCategories(),
  ]);

  // Solo redirigir si estamos buscando un producto existente y no se encuentra
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProductForm product={product ?? undefined} categories={categories} />
    </div>
  );
}
