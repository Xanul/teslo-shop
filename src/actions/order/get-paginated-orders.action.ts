"use server";

import { orderService } from "@/services";
import { auth } from "@/config/auth.config";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (!session?.user || session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const orders = await orderService.getAllOrders();
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
