'use server';

import { auth } from "@/config/auth.config";
import { Size, UserAddress } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async(productsToOrder: ProductToOrder[], orderAddress: UserAddress) => {

  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated"
    };
  }



  
}
