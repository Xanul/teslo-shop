import { PayPalButton } from "@/components";

interface OrderAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string | null;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

interface OrderSummaryProps {
  orderAddress: OrderAddress;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  orderId: string;
  isPaid: boolean;
}

export const OrderSummary = ({
  orderAddress,
  subTotal,
  tax,
  total,
  itemsInOrder,
  orderId,
  isPaid,
}: OrderSummaryProps) => {
  return (
    <div
      className={
        "bg-gray-100 border border-gray-300 shadow-md p-5 rounded-lg h-fit"
      }
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Address</h3>
      <div className="flex flex-col mb-3">
        <span className="font-semibold">
          {orderAddress.firstName} {orderAddress.lastName}
        </span>
        <span>{orderAddress.phone}</span>
        <span>{orderAddress.address}</span>
        {orderAddress.address2 && <span>{orderAddress.address2}</span>}
        <span>
          {orderAddress.city}, {orderAddress.state}, {orderAddress.country}
        </span>
        <span>{orderAddress.postalCode}</span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3 pt-3 border-t border-gray-300">
        Cart Summary
      </h3>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p>No. of products:</p>
          <span>{itemsInOrder}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Subtotal:</p>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Tax:</p>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-300">
        <p className="text-xl font-semibold text-gray-900">Total:</p>
        <span className="text-xl font-semibold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>
      {!isPaid && (
        <div className="mt-5 w-full">
          <PayPalButton orderId={orderId} amount={total} />
        </div>
      )}
    </div>
  );
};
