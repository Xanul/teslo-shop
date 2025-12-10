'use server';

import { auth } from "@/config/auth.config";
import { addressService } from "@/services";

export const setDefaultAddress = async (addressId: string) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated"
    };
  }

  try {
    await addressService.setDefaultAddress(addressId, session.user.id);
    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error setting default address"
    };
  }
};