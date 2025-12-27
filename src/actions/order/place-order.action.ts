'use server';

import { auth } from "@/config/auth.config";
import { Size, UserAddress } from "@/interfaces";
import { orderService } from "@/services";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsToOrder: ProductToOrder[],
  orderAddress: UserAddress
) => {

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated"
    };
  }

  if (!productsToOrder || productsToOrder.length === 0) {
    return {
      ok: false,
      message: "No products to order"
    };
  }

  try {
    const order = await orderService.createOrder(productsToOrder, userId, orderAddress);

    return {
      ok: true,
      message: "Order created successfully",
      orderId: order.id,
      order: order
    };
  } catch (error) {
    console.error("Error creating order:", error);

    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error creating the order"
    };
  }
}
