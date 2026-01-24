"use server";

import { productService } from "@/services";
import { CreateProduct, Gender, Size } from "@/interfaces";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const updateProduct = async (formData: FormData) => {
  try {
    // Validar que venga un ID (esto es para actualizar, no crear)
    if (!formData.get("id")) {
      return {
        ok: false,
        message: "Product ID is required for update",
      };
    }

    // Transformar los datos del formulario al formato que espera el servicio
    const productData: Partial<CreateProduct> = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")) || 0,
      inStock: Number(formData.get("inStock")) || 0,
      gender: formData.get("gender") as Gender,
      categoryId: formData.get("categoryId") as string,
      sizes: JSON.parse(formData.get("sizes") as string) as Size[],
      // Transformar tags de string a array
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    // Obtener las nuevas imágenes del formulario (si las hay)
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    // Subir cada nueva imagen a cloudinary
    for (const file of imageFiles) {
      if (file.size > 0) {
        // Convertir File a Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Subir a cloudinary
        const result = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "teslo-shop/products",
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result!);
                },
              )
              .end(buffer);
          },
        );
        imageUrls.push(result.secure_url);
      }
    }

    // Si hay nuevas imágenes, agregarlas al productData
    if (imageUrls.length > 0) {
      productData.images = imageUrls;
    }

    // Llamar al servicio para actualizar el producto
    const product = await productService.updateProduct(
      formData.get("id") as string,
      productData,
    );

    return {
      ok: true,
      product,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error updating product",
    };
  }
};
