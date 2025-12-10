"use server";
import { Gender } from "@/interfaces";
import { productService } from "@/services";

export const getPaginatedProductsWithImages = async (options: {
  page?: number;
  take?: number;
  category?: Gender
}) => {
  return productService.getPaginatedProducts(options);
}
