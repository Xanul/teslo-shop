import { Gender } from "@/interfaces";

export const CATEGORY_LABELS: Record<Gender, string> = {
  men: "Men's",
  women: "Women's",
  kid: "Kid's",
  unisex: "Unisex",
} as const;

export const CATEGORY_SUBTITLES: Record<Gender, string> = {
  men: "Discover our premium collection of men's apparel, designed for style, comfort, and durability.",
  women: "Explore our exclusive women's collection featuring modern designs and premium quality.",
  kid: "Shop our playful and comfortable kids' collection, perfect for active children.",
  unisex: "Browse our versatile unisex collection that works for everyone.",
}as const;
