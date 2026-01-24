"use server";

import { productService } from "@/services";
import { CreateProduct, Gender, Size } from "@/interfaces";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const createProduct = async (formData: FormData) => {
  try {
    // Validar que no venga un ID (esto es para crear, no actualizar)
    if (formData.get("id")) {
      return {
        ok: false,
        message: "Cannot create a product with an existing ID",
      };
    }

    // Transformar los datos del formulario al formato que espera el servicio
    const productData: CreateProduct = {
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

    // Obtener las imagenes del formulario
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    // Subir cada imagen a cloudinary
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

    // Llamar al servicio para crear el producto
    const product = await productService.createProduct({
      ...productData,
      images: imageUrls,
    });

    return {
      ok: true,
      product,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error creating product",
    };
  }
};
