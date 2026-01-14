import { PageTitle, Pagination, ProductsTable } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

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

  return (
    <>
      <PageTitle title="Products Management" />
      <ProductsTable products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
