"use client";

import { useEffect, useState, memo } from "react";
import {
  Gender,
  Size,
  Category,
  Product,
  ProductImage as ProductWithImages,
} from "@/interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormData } from "@/schemas";
import { createProduct, deleteProductImage, updateProduct } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductImage } from "./ProductImage";

interface ProductFormProps {
  product?: Product & { ProductImage?: ProductWithImages[] };
  categories?: Category[];
}

const genderOptions: Gender[] = ["men", "women", "kid", "unisex"];
const sizeOptions: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

// Hoist static SVG icon outside component (Vercel best practice: rendering-hoist-jsx)
const CloseIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

// Memoize ImagePreview to prevent unnecessary re-renders (Vercel: rerender-memo)
const ImagePreview = memo(({ file, onRemove }: ImagePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!imageUrl) {
    return (
      <div className="w-full h-32 bg-gray-100 rounded-md border animate-pulse" />
    );
  }

  return (
    <div className="relative group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={file.name}
        className="w-full h-32 object-cover rounded-md border"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        aria-label={`Remove ${file.name}`}
      >
        {CloseIcon}
      </button>
    </div>
  );
});

ImagePreview.displayName = "ImagePreview";

export const ProductForm = ({ product, categories = [] }: ProductFormProps) => {
  const router = useRouter();
  const [images, setImages] = useState<ProductWithImages[]>(
    product?.ProductImage || [],
  );

  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: product?.id || null,
      title: product?.title || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price || 0,
      inStock: product?.inStock || 0,
      gender: product?.gender || ("men" as Gender),
      categoryId: product?.categoryId || "",
      sizes: product?.sizes || ([] as Size[]),
      tags: (product?.tags?.join(", ") || "") as string,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "sizes") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      newImages.forEach((image) => formData.append("images", image));

      const result = product?.id
        ? await updateProduct(formData)
        : await createProduct(formData);

      if (result.ok) {
        toast.success("Product saved successfully");
        router.push("/admin/products");
      } else {
        toast.error("Error saving product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate slug from title
  const titleValue = watch("title");

  useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .replace(/'s\b/gi, "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");

      setValue("slug", slug, { shouldValidate: true });
    } else {
      setValue("slug", "", { shouldValidate: true });
    }
  }, [titleValue, setValue]);

  const selectedSizes = watch("sizes");
  const handleSizeToggle = (size: Size) => {
    const currentSizes = selectedSizes || [];
    if (currentSizes.includes(size)) {
      setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true },
      );
    } else {
      setValue("sizes", [...currentSizes, size], { shouldValidate: true });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setNewImages((prev) => [...prev, ...fileArray]);
  };

  const handleRemoveImage = async (data: ProductWithImages) => {
    const { ok, message } = await deleteProductImage(data.id, data.url);

    if (ok) {
      setImages((prev) => prev.filter((img) => img.id !== data.id));
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {product ? "Edit Product" : "Create Product"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none"
            placeholder="Product title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="mb-4">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Slug *
          </label>
          <input
            id="slug"
            type="text"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            placeholder="product-slug"
            {...register("slug", { required: true })}
            readOnly={!!product}
          />
          {!product && (
            <p className="text-xs text-gray-500 mt-1">
              The slug is generated automatically from the title
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            rows={4}
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none resize-none"
            placeholder="Product description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price *
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none"
              placeholder="0.00"
              {...register("price", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="inStock"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stock *
            </label>
            <input
              id="inStock"
              type="number"
              min="0"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none"
              placeholder="0"
              {...register("inStock", { required: true, valueAsNumber: true })}
            />
            {errors.inStock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.inStock.message}
              </p>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gender *
          </label>
          <select
            id="gender"
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none"
            {...register("gender", { required: true })}
          >
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Category */}
        {categories.length > 0 && (
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="categoryId"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none"
              {...register("categoryId", { required: true })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        )}

        {/* Sizes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sizes *
          </label>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Product sizes"
          >
            {sizeOptions.map((size) => {
              const isSelected = selectedSizes?.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-md border-2 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isSelected
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {errors.sizes && (
            <p className="text-red-500 text-sm mt-1">{errors.sizes.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <input
            id="tags"
            type="text"
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent focus-visible:outline-none"
            placeholder="summer, casual, sport (comma separated)"
            {...register("tags")}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="mb-4">
          <label
            htmlFor="product-images"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Images
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <ProductImage
                    src={image.url}
                    alt={`Product image ${image.id}`}
                    width={200}
                    height={128}
                    className="w-full h-32 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    aria-label={`Remove image ${image.id}`}
                  >
                    {CloseIcon}
                  </button>
                </div>
              ))}
            </div>
          )}

          {newImages.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">
                New Images ({newImages.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {newImages.map((file, index) => (
                  <ImagePreview
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    file={file}
                    onRemove={() => handleRemoveNewImage(index)}
                  />
                ))}
              </div>
            </div>
          )}
          <input
            id="product-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can select multiple images
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || selectedSizes?.length === 0}
            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {isSubmitting
              ? "Saving…"
              : product
                ? "Update Product"
                : "Create Product"}
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
