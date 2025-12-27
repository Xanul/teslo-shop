"use server";

import { auth } from "@/config/auth.config";
import { orderService } from "@/services";

export const getOrderById = async (orderId: string) => {
  // Verificar autenticación
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated",
    };
  }

  try {
    const order = await orderService.getOrderById(orderId);

    // Verificar autorización: el usuario solo puede ver sus propias órdenes
    // (a menos que sea admin)
    if (order.userId !== userId && session.user.role !== "admin") {
      return {
        ok: false,
        message: "You don't have permission to view this order",
      };
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.error("Error fetching order:", error);

    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error fetching the order",
    };
  }
};
