export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  gender: Gender;
  categoryId: string;
}

export interface ProductImage {
  url: string;
  id: number;
}

export interface CreateProduct {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  gender: Gender;
  categoryId: string;
  sizes: Size[];
  tags: string[];
  images?: string[];
}

export interface UpdateProduct {
  id: string;
  data: {
    title?: string;
    description?: string;
    price?: number;
    inStock?: number;
    gender?: Gender;
    categoryId?: string;
    sizes?: Size[];
    tags?: string[];
  };
}

export interface AddEditProduct {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  gender: Gender;
  categoryId: string;
  ProductImage: ProductImage[];
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

export type Gender = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
