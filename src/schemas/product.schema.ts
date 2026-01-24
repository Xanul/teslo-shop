import { z } from "zod";
// import { Gender, Size } from "@/interfaces";

// Schema para el formulario (tags como string)
export const productFormSchema = z.object({
  id: z.uuid().optional().nullable(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9_]+(?:-[a-z0-9_]+)*$/,
      "El slug debe ser válido (solo minúsculas, números y guiones)",
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  inStock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  gender: z.enum(["men", "women", "kid", "unisex"] as const),
  categoryId: z.uuid("Invalid category"),
  sizes: z
    .array(z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const))
    .min(1, "At least one size must be selected"),
  tags: z.string(), // String en el formulario
  images: z.array(z.instanceof(File)).optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// Schema para el backend (tags como array)
export const productSchema = z.object({
  id: z.uuid().optional().nullable(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9_]+(?:-[a-z0-9_]+)*$/,
      "El slug debe ser válido (solo minúsculas, números y guiones)",
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  inStock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  gender: z.enum(["men", "women", "kid", "unisex"] as const),
  categoryId: z.uuid("Invalid category"),
  sizes: z
    .array(z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const))
    .min(1, "At least one size must be selected"),
  tags: z.array(z.string()), // Array en el backend
  images: z.array(z.url()).optional(),
});

export type ProductData = z.infer<typeof productSchema>;
