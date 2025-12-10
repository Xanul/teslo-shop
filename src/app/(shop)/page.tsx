export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { PageTitle, Pagination, ProductGrid } from "@/components";
import { redirect } from "next/navigation";

interface ShopePageProps {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function ShopPage({searchParams}: ShopePageProps) {
  
  const props = await searchParams;
  const page = props.page ? parseInt(props.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({page, take: 12});
  
  if ( products.length === 0 && page > 1 ) redirect('/');


  return (
    <>
      <PageTitle 
        title="Welcome to Teslo Shop" 
        subTitle="Discover our exclusive collection of premium clothing and accessories designed for your lifestyle." 
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />
      <Pagination totalPages={totalPages}/>
    </>
  );
}
