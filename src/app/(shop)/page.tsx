import { PageTitle, ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;


export default function ShopPage() {
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
    </>
  );
}
