"use client";
import { cn } from "@/lib/utils";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

interface CheckoutSummaryProps {
  className?: string;
}

export const CheckoutSummary = ({ className }: CheckoutSummaryProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const address = useAddressStore((state) => state.address);
  const { totalItems, subTotal, tax, shipping, totalPrice } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    console.log(address);
    console.log(productsToOrder);

    setIsPlacingOrder(false);
    toast.success("Order placed successfully");
  };

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "bg-gray-100 border border-gray-300 shadow-md p-5 rounded-lg h-fit",
        className
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Address</h3>
      <div className="flex flex-col mb-3">
        <span>
          {address.firstName} {address.lastName}
        </span>
        <span>{address.address}</span>
        <span>
          {address.city}, {address.state}, {address.country.name}
        </span>
        <span>{address.postalCode}</span>
        <span>{address.phone}</span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3 pt-3 border-t border-gray-300">
        Cart Summary
      </h3>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p>No. of products:</p>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Subtotal:</p>
          <span>{currencyFormatter(subTotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping:</p>
          <span>{currencyFormatter(shipping)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Tax:</p>
          <span>{currencyFormatter(tax)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-300">
        <p className="text-xl font-semibold text-gray-900">Total:</p>
        <span className="text-xl font-semibold text-gray-900">
          {currencyFormatter(totalPrice)}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-xs">
          By placing your order, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
      <div className="mt-5">
        <button
          // href="/orders/1234"
          className="btn-primary w-full text-center block"
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};
