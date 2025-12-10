import { PageTitle, ProductsInCheckout } from "@/components";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center px-2 ">
      <div className="flex flex-col w-6xl">
        <PageTitle title="Checkout" subTitle="Review your order" />

        <Link href={"/"}>
          <span className="text-xl">Add more items</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Cart */}
          <ProductsInCheckout />
          {/* Order Summary */}
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
