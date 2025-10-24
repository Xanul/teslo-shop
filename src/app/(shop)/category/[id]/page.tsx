import { PageTitle, ProductGrid } from "@/components";
import { Gender } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { use } from "react";

interface CategoryPageProps {
  params: Promise<{
    id: Gender;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);
 
  // if (id === "kids") {
  //   notFound();
  // }

  const categoryProducts = initialData.products.filter((product) => product.gender === id);
  const labels: Record<Gender, string> = {
    men: "Men's",
    women: "Women's",
    kid: "Kid's",
    unisex: "Unisex",
  }

  const subTitles: Record<Gender, string> = {
    men: "Discover our premium collection of men's apparel, designed for style, comfort, and durability.",
    women: "Explore our exclusive women's collection featuring modern designs and premium quality.",
    kid: "Shop our playful and comfortable kids' collection, perfect for active children.",
    unisex: "Browse our versatile unisex collection that works for everyone.",
  }

  return (
    <div>
      <PageTitle title={`${ labels[id] } Category`} subTitle={subTitles[id]} className="mb-2" />
      <ProductGrid products={categoryProducts} />
    </div>
  );
}
