"use client";

import { useEffect, useState } from "react";
import {
  Gender,
  Size,
  Category,
  Product,
  ProductImage as ProductWithImages,
} from "@/interfaces";
import { useForm } from "react-hook-form";
import Image from "next/image";
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
    formState: { isValid, errors },
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
      // Crear FormData para subir archivos
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "sizes") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      newImages.forEach((image) => formData.append("images", image));

      let result;

      if (product?.id) {
        // Actualizar producto existente
        result = await updateProduct(formData);
      } else {
        // Crear nuevo producto
        result = await createProduct(formData);
      }

      const { ok } = result;

      if (ok) {
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

  // Generar slug automáticamente desde el título
  const titleValue = watch("title");

  useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .replace(/'s\b/gi, "") // Elimina 's (ej: Men's → Men)
        .toLowerCase()
        .normalize("NFD") // Normaliza caracteres con acentos
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .replace(/[^a-z0-9]+/g, "_") // Reemplaza caracteres especiales por guiones bajos
        .replace(/^_+|_+$/g, ""); // Elimina guiones bajos al inicio y al final

      setValue("slug", slug, { shouldValidate: true });
    } else {
      // Si el título está vacío, limpiar el slug también
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
      // Actualizar el estado local para remover la imagen de la UI
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
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            type="text"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-200"
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

        {/* Descripción */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description *
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Product description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Precio e Inventario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              type="number"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Género */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gender *
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Categoría */}
        {categories.length > 0 && (
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Tallas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sizes *
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-md border-2 transition-colors ${
                  selectedSizes?.includes(size)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                }`}
              >
                {size}
              </button>
            ))}
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
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="verano, casual, deportivo (separadas por comas)"
            {...register("tags")}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <ProductImage
                    src={image.url}
                    alt={`Image ${image.id}`}
                    width={200}
                    height={128}
                    className="w-full h-32 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
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
                  <div key={index} className="relative group">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={200}
                      height={128}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
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
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting
              ? "Saving..."
              : product
                ? "Update Product"
                : "Create Product"}
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
