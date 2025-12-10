'use client'
import { ProductCart } from "@/components";
import { useCartStore } from "@/store";

export const ProductsInCart = () => {
  const { cart, updateProductQuantity, removeProduct } = useCartStore();


  
  return (
    <div className="flex flex-col gap-3">
      {cart.map((product, index) => (
        <ProductCart 
          product={product} 
          key={`${product.slug}-${index}`} 
          onQuantityChange={(quantity) => updateProductQuantity(product.id, product.size, quantity)} 
          onRemoveProduct={() => removeProduct(product.id, product.size)} />
      ))}
    </div>
  );
};
