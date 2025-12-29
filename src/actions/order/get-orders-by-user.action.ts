"use server";

import { auth } from "@/config/auth.config";
import { orderService } from "@/services";

export const getOrdersByUser = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated",
    };
  }
  try {
    const orders = await orderService.getOrdersByUser(userId);

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);

    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error fetching orders",
    };
  }
};
