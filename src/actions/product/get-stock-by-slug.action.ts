"use server";
import { productService } from "@/services"


export const getProductStockBySlug = async (slug: string) => {
  return productService.getStockBySlug(slug);
}