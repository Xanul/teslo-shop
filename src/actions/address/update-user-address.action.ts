'use server';


import { addressService } from "@/services";
import { UserAddressInput } from "@/interfaces";
import { auth } from "@/config/auth.config";

export const updateUserAddress = async (addressId: string, address: UserAddressInput) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated"
    };
  }

  try {
    const updatedAddress = await addressService.updateAddress(
      addressId,
      session.user.id,
      address
    );
    return {
      ok: true,
      address: updatedAddress
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error updating address"
    };
  }
};