import { cn } from "@/lib/utils";
import Link from "next/link";

interface CheckoutSummaryProps {
  className?: string;
}

export const CheckoutSummary = ({ className }: CheckoutSummaryProps) => {
  return (
    <div
      className={cn(
        "bg-gray-100 border border-gray-300 shadow-md p-5 rounded-lg h-fit",
        className
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Address</h3>
      <div className="flex flex-col mb-3">
        <span>John Doe</span>
        <span>123 Main St</span>
        <span>Anytown, USA</span>
        <span>12345</span>
        <span>USA</span>
        <span>1234567890</span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3 pt-3 border-t border-gray-300">
        Cart Summary
      </h3>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p>No. of products:</p>
          <span>3</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Subtotal:</p>
          <span>$100</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping:</p>
          <span>$10</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Tax:</p>
          <span>$10</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-300">
        <p className="text-xl font-semibold text-gray-900">Total:</p>
        <span className="text-xl font-semibold text-gray-900">$120</span>
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
        <Link
          href="/orders/1234"
          className="btn-primary w-full text-center block"
        >
          Place Order
        </Link>
      </div>
    </div>
  );
};
