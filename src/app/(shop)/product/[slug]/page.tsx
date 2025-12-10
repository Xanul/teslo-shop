// export const revalidate = 604800;
import { ProductSlideshow, StockLabel, AddToCart } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  {params}: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "Product not found",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "Product not found",
      images: [`/products/${product?.images[1] ?? ""}`]
    }
  }

}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
        {/* Stock label */}
        <StockLabel slug={slug}/>
        {/* Product title */}
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg md:mb-5">$ {product.price}</p>
        <AddToCart product={product} />
        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light text-justify">{product.description}</p>
      </div>
    </div>
  );
}
