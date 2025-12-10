"use client";

import { useCartStore } from "@/store";
import { CheckoutProductItem } from "@/components";

export const ProductsInCheckout = () => {
  const { cart } = useCartStore();

  return (
    <div className="flex flex-col gap-3">
      {cart.map((product, index) => (
        <CheckoutProductItem
          key={`${product.id}-${index}`}
          product={product}
          quantity={product.quantity}
        />
      ))}
    </div>
  );
};
