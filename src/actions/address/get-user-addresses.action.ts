'use server';

import { auth } from "@/config/auth.config";
import { addressService } from "@/services";

export const getUserAddresses = async () => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated",
      addresses: []
    };
  }

  try {
    const addresses = await addressService.getUserAddresses(session.user.id);
    console.log("get user addresses", addresses);
    return {
      ok: true,
      addresses
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error fetching addresses",
      addresses: []
    };
  }
};