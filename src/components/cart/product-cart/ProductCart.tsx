import { Product } from "@/interfaces";
import Image from "next/image";
// import { QuantitySelector } from "@/components";

interface ProductCartProps {
  product: Product;
  quantity?: number;
}

export const ProductCart = ({ product, quantity }: ProductCartProps) => {
  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <figure className="flex-shrink-0 flex items-center">
        <Image
          alt={product.title}
          src={`/products/${product.images[0]}`}
          width={120}
          height={120}
          className="w-18 h:18  object-cover rounded"
        />
      </figure>

      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {/* Product Title */}
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
          {product.title}
        </h3>
        {/* Product Size */}
        <p className="text-sm text-gray-700">
          Black, <span className="font-semibold">{product.sizes[0]}</span>
        </p>
        {/* Quantity Selector */}
        <div className="flex items-center flex-wrap gap-2 text-sm">
          <span className="text-gray-700">Quantity: </span>
          <select
            className="border border-gray-300 rounded px-2 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={quantity}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button className="text-gray-500 underline text-sm">Remove</button>
        </div>
      </div>

      {/* Product Price */}
      <div className="flex-shrink-0 text-right">
        <p className="text-base font-semibold text-gray-900">
          ${product.price}
        </p>
      </div>
    </div>
  );
};
