import { cn } from "@/lib/utils";
import Link from "next/link";

interface CartSummaryProps {
  className?: string;
}

export const CartSummary = ({ className }: CartSummaryProps) => {
  return (
    <div className={cn("bg-gray-100 border border-gray-300 shadow-md p-5 rounded-lg h-fit", className)}>
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Cart Summary</h3>
      <div className="flex flex-col gap-2">
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
      <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-300">
        <p className="text-xl font-semibold text-gray-900">Total:</p>
        <span className="text-xl font-semibold text-gray-900">$120</span>
      </div>
      <div className="mt-5">
        <Link 
          href="/checkout/address"
          className="btn-primary w-full text-center block"
          >
          Checkout
        </Link>
      </div>
    </div>
  )
}