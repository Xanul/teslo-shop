'use server';


import { addressService } from "@/services";
import { UserAddressInput } from "@/interfaces";
import { auth } from "@/config/auth.config";

export const createUserAddress = async (address: UserAddressInput) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated"
    };
  }

  try {
    const newAddress = await addressService.createAddress(session.user.id, address);
    return {
      ok: true,
      address: newAddress
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error creating address"
    };
  }
};