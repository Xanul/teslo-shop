// export const revalidate = 604800;
import { ProductSlideshow, StockLabel, AddToCart } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Construir URL absoluta para OpenGraph
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const ogImage = product?.images[0]
    ? `${baseUrl}/products/${product.images[0]}`
    : `${baseUrl}/imgs/placeholder.jpg`;

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "Product not found",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "Product not found",
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Formatear precio con internacionalización
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="sm:mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideshow title={product.title} images={product.images} />
      </div>
      {/* Product Info */}
      <div className="col-span-1 px-5 md:px-8 space-y-4 animate-in fade-in slide-in-from-right duration-500">
        {/* Stock label */}
        <StockLabel slug={slug} />

        {/* Product title and price */}
        <div className="space-y-2">
          <h1
            className={`${titleFont.className} antialiased font-bold text-2xl md:text-3xl`}
          >
            {product.title}
          </h1>

          <p
            className="text-2xl md:text-3xl font-semibold text-gray-600"
            aria-label="Precio"
          >
            {`${formattedPrice}`}
          </p>
        </div>

        {/* Add to cart */}
        <AddToCart product={product} />

        {/* Description */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="font-bold text-base mb-2">Description</h2>
          <p className="font-light text-justify leading-relaxed text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
