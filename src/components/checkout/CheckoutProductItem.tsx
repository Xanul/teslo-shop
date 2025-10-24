// src/components/checkout/CheckoutProductItem.tsx
import { Product } from "@/interfaces";
import Image from "next/image";

interface CheckoutProductItemProps {
  product: Product;
  quantity?: number;
}

export const CheckoutProductItem = ({
  product,
  quantity,
}: CheckoutProductItemProps) => {
  const subtotal = product.price * (quantity || 1);

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
      {/* Product Image */}
      <figure className="flex-shrink-0 flex items-center">
        <Image
          alt={product.title}
          src={`/products/${product.images[0]}`}
          width={120}
          height={120}
          className="w-18 h-18 object-cover rounded"
        />
      </figure>

      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
          {product.title}
        </h3>
        <p className="text-sm text-gray-700">
          Black, <span className="font-semibold">{product.sizes[0]}</span>
        </p>
        <p className="text-sm text-gray-700">
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>
      </div>

      {/* Pricing */}
      <div className="flex-shrink-0 text-right">
        <p className="text-sm text-gray-600">
          <span>${product.price}</span> x {quantity}
        </p>
        <p className="text-base font-bold text-gray-900 mt-1">
          ${subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
