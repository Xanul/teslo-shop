"use client";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils";
import { LinkButton } from "@/components";

interface CartSummaryProps {
  className?: string;
}

export const CartSummary = ({ className }: CartSummaryProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems, subTotal, tax, shipping, totalPrice } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div
      className={cn(
        "bg-gray-100 border border-gray-300 shadow-md p-5 rounded-lg h-fit",
        className
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Cart Summary</h3>
      <div className="flex flex-col gap-2">
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
      <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-300">
        <p className="text-xl font-semibold text-gray-900">Total:</p>
        <span className="text-xl font-semibold text-gray-900">
          {currencyFormatter(totalPrice)}
        </span>
      </div>
      <div className="mt-5">
        <LinkButton href="/checkout/address" className="w-full">
          Checkout
        </LinkButton>
      </div>
    </div>
  );
};
