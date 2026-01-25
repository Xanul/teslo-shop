"use server";

import { auth } from "@/config/auth.config";
import { addressService } from "@/services";

export const deleteUserAddress = async (addressId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated",
    };
  }

  try {
    await addressService.deleteAddress(addressId, session.user.id);
    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error deleting address",
    };
  }
};
