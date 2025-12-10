import { CartSummary, CartGuard, PageTitle, ProductsInCart } from "@/components";
import Link from "next/link";

export default function CartPage() {
  
  return (
    <CartGuard>
      <div className="flex justify-center items-center px-2 ">
        <div className="flex flex-col w-6xl">
          <PageTitle title="Cart" subTitle="Items in your cart" />

          <Link href={"/"}>
            <span className="text-xl">Add more items</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Cart */}
            <ProductsInCart />
            {/* Order Summary */}
            <CartSummary />
          </div>
        </div>
      </div>
    </CartGuard>
  );
}
