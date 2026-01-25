"use server";

import { auth } from "@/config/auth.config";
import { addressService } from "@/services";

export const getUserAddresses = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated",
      addresses: [],
    };
  }

  try {
    const addresses = await addressService.getUserAddresses(session.user.id);
    return {
      ok: true,
      addresses,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error fetching addresses",
      addresses: [],
    };
  }
};
