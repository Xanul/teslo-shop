'use server'

import { productService } from "@/services";
import { Product } from "@/interfaces";


export const getProductBySlug = async (slug: string):Promise<Product | null> => {

  return productService.getProductBySlug(slug);


}