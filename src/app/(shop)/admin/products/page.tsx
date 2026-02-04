import { PageTitle, Pagination, ProductsTable } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
    take: 10,
  });

  if (products.length === 0 && currentPage > 1) {
    redirect("/admin/products?page=1");
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageTitle title="Products Management" />
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
      </div>
      <ProductsTable products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
