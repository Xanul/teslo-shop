import { Gender } from "@/interfaces";

const VALID_GENDERS = ["men", "women", "kid", "unisex"] as const;

export function isValidGender(value: unknown): value is Gender {
  return typeof value === "string" && VALID_GENDERS.includes(value as Gender);
}

export function validatePaginationParams(
  page?: number,
  take?: number
): { page: number; take: number } {
  
  // Normalizar page
  let validPage = 1;
  if (page && !isNaN(page) && page >= 1) {
    validPage = page;
  }

  // Normalizar take
  let validTake = 12;
  if (take && !isNaN(take) && take >= 1) {
    validTake = Math.min(take, 50);
  }


  return { page: validPage, take: validTake };

}
