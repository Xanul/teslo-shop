'use server';

import { auth } from "@/config/auth.config";
import { addressService } from "@/services";

export const getAddressById = async (addressId: string) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated",
      address: null
    };
  }

  try {
    const address = await addressService.getAddressById(addressId);
    
    if (!address) {
      return {
        ok: false,
        message: "Address not found",
        address: null
      };
    }

    // Verificar que la dirección pertenece al usuario autenticado
    if (address.userId !== session.user.id) {
      return {
        ok: false,
        message: "Unauthorized access to this address",
        address: null
      };
    }

    return {
      ok: true,
      address
    };
  } catch {
    return {
      ok: false,
      message: "Error fetching address",
      address: null
    };
  }
};
