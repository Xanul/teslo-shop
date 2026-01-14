import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";

interface ProductRowProps {
  product: Product;
}

export const ProductRow = ({ product }: ProductRowProps) => {
  const imageUrl = `/products/${product.images[0]}` || `/imgs/placeholder.png`;

  return (
    <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
      {/* Image */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageUrl}
            alt={product.title}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded"
          />
        </Link>
      </td>

      {/* Title */}
      <td className="text-sm text-gray-900 font-light px-6 py-4">
        <Link href={`/product/${product.slug}`} className="hover:underline">
          {product.title}
        </Link>
      </td>

      {/* Price */}
      <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
        ${product.price.toFixed(2)}
      </td>

      {/* Gender */}
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <span className="capitalize">{product.gender}</span>
      </td>

      {/* Stock */}
      <td className="text-sm px-6 py-4 whitespace-nowrap">
        <span
          className={`font-semibold ${
            product.inStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.inStock}
        </span>
      </td>

      {/* Sizes */}
      <td className="text-sm text-gray-900 font-light px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300"
            >
              {size}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};
