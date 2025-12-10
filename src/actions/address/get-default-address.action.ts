'use server';


import { auth } from "@/config/auth.config";
import { addressService } from "@/services";

export const getDefaultAddress = async () => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated",
      address: null
    };
  }

  try {
    return await addressService.getDefaultAddress(session.user.id);
  } catch (error) {
    console.error("Error fetching default address:", error);
    return null;
  }
};