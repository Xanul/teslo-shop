import { Product } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ProductGridItem } from "./ProductGridItem";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export const ProductGrid = ({ products, className }: ProductGridProps) => {
  return (
    <div
      className={cn("grid grid-cols-2 md:grid-cols-3 gap-10 mb-10", className)}
    >
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
