"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import {
  attachTransactionReferenceToOrder,
  checkPaypalPayment,
} from "@/actions";
import { toast } from "sonner";

interface PayPalButtonProps {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse flex flex-col gap-5">
        <div className="h-13 bg-gray-300 rounded" />
        <div className="h-13 bg-gray-300 rounded" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    });

    const { ok, message } = await attachTransactionReferenceToOrder({
      orderId,
      transactionId,
    });

    if (!ok) {
      throw new Error(message);
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details || !details.id) return;

    const { ok } = await checkPaypalPayment(details.id);

    if (!ok) {
      toast.error("Error verifying payment");
      return;
    }

    toast.success("Payment verified successfully");
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
