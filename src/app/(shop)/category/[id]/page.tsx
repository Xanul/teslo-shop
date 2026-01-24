export const revalidate = 60;
import { getPaginatedProductsWithImages } from "@/actions";
import { PageTitle, Pagination, ProductGrid } from "@/components";
import { CATEGORY_LABELS, CATEGORY_SUBTITLES } from "@/constants";

import { Gender } from "@/interfaces";
import { isValidGender } from "@/utils";
import { redirect } from "next/navigation";

interface CategoryPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{
    id: Gender;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;

  if (!isValidGender(id)) {
    return {
      title: "Category not found",
      description: "Category not found",
    };
  }

  return {
    title: `${CATEGORY_LABELS[id]} Category | Teslo Shop`,
    description: `${CATEGORY_LABELS[id]} Category | Teslo Shop`,
    openGraph: {
      title: `${CATEGORY_LABELS[id]} Category | Teslo Shop`,
      description: `${CATEGORY_LABELS[id]} Category | Teslo Shop`,
      images: [`/categories/${id}.png`],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const props = await params;
  const searchProps = await searchParams;
  const page = searchProps.page ? parseInt(searchProps.page) : 1;
  const { id } = props;

  if (!isValidGender(id)) {
    redirect("/");
  }

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    category: id,
  });

  if (products.length === 0 && page > 1) redirect(`/category/${id}`);

  return (
    <div>
      <PageTitle
        title={`${CATEGORY_LABELS[id]} Category`}
        subTitle={CATEGORY_SUBTITLES[id]}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
