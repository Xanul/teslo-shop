"use server";

import { paypalService } from "@/services";

interface SetTransactionProps {
  orderId: string;
  transactionId: string;
}

export const attachTransactionReferenceToOrder = async ({
  orderId,
  transactionId,
}: SetTransactionProps) => {
  try {
    if (!orderId?.trim() || !transactionId?.trim()) {
      return {
        ok: false,
        message: "Order ID and transaction ID are required",
      };
    }

    const order = await paypalService.assignTransactionToOrder(
      orderId,
      transactionId
    );

    return {
      ok: true,
      message: "Transaction reference attached to order successfully",
      orderId: order.id,
      order: order,
    };
  } catch (error) {
    console.error("Error attaching transaction reference to order:", error);

    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Error attaching transaction reference to order",
    };
  }
};
