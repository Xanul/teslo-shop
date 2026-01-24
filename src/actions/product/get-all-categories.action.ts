"use server";
import { productService } from "@/services";

export async function getAllCategories() {
  try {
    const categories = await productService.getAllCategories();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
