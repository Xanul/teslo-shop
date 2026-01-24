"use server";

import { productService } from "@/services";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("https")) {
    return {
      ok: false,
      message: "You can't delete images from file system",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0];
  try {
    await cloudinary.uploader.destroy(`teslo-shop/products/${imageName}`);
    await productService.deleteProductImage(imageId);
    return {
      ok: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error deleting image",
    };
  }
};
