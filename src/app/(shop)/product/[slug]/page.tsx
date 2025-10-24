"use client";
import { use } from "react";
import {
  QuantitySelector,
  SizeSelector,
  ProductSlideshow,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  // TODO: Eliminar el padding del bottom al agregar el footer
  return (
    <div className="sm:mt-5 mb-20 pb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideshow title={product.title} images={product.images} />
      </div>
      {/* Product Info */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg md:mb-5">$ {product.price}</p>
        {/* Size selector */}
        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />
        {/* Quantity selector */}
        <QuantitySelector quantity={2} />

        {/* Button */}
        <button className="btn-primary my-2 md:my-5">Add to Cart</button>
        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light text-justify">{product.description}</p>
      </div>
    </div>
  );
}
