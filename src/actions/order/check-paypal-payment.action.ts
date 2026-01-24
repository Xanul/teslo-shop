"use server";

import { orderService, paypalService } from "@/services";
import { revalidatePath } from "next/cache";

export const checkPaypalPayment = async (transactionId: string) => {
  try {
    const paymentData = await paypalService.verifyPaypalPayment(transactionId);

    if (!paymentData) {
      return {
        ok: false,
        message: "Error verifying payment",
      };
    }

    if (paymentData.status !== "COMPLETED") {
      return {
        ok: false,
        message: "Payment not completed",
      };
    }

    const { invoice_id: orderId } = paymentData.purchase_units[0];

    await orderService.markOrderAsPaid(orderId);
    await orderService.setPaymentMethod(orderId, "PAYPAL");

    revalidatePath(`/order/${orderId}`);

    return {
      ok: true,
      message: "Payment verified successfully",
      data: paymentData,
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Error verifying payment",
    };
  }
};
